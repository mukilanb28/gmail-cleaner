const { google } = require('googleapis');
require('dotenv').config();

const FETCH_LIMIT = process.env.FETCH_MSG_LIMIT || 100;
const CONCURRENCY_LIMIT = process.env.MSG_CONCURRENCY_LIMIT || 5;

// 🔹 Helper: Fetch message IDs (paginated)
async function fetchMessages(auth, query = '', max = 100) {
	const gmail = google.gmail({ version: 'v1', auth });
	const messages = [];
	let nextPageToken = null;

	do {
		const res = await gmail.users.messages.list({
			userId: 'me',
			maxResults: 100,
			q: query,
			pageToken: nextPageToken,
		});
		messages.push(...(res.data.messages || []));
		nextPageToken = res.data.nextPageToken;
	} while (messages.length < max && nextPageToken);

	return messages.slice(0, max);
}

// 🔹 Aggregate by sender/domain

async function aggregateSenders(
	auth,
	limit = Number(FETCH_LIMIT),
	concurrency = Number(CONCURRENCY_LIMIT)
) {
	const gmail = google.gmail({ version: 'v1', auth });
	const messages = await fetchMessages(auth, '', limit);

	const senderCounts = {};

	// Process messages in batches of `concurrency`
	const processBatch = async (batch) => {
		const results = await Promise.allSettled(
			batch.map(async (msg) => {
				const res = await gmail.users.messages.get({
					userId: 'me',
					id: msg.id,
					format: 'metadata',
					metadataHeaders: ['From'],
				});
				const header = res.data.payload.headers.find(
					(h) => h.name === 'From'
				);
				if (!header) return;

				const from = header.value;
				const match = from.match(/<([^>]+)>/);
				const email = match ? match[1] : from;
				const domain = email.split('@')[1]?.trim();

				const key = domain || email;
				senderCounts[key] = (senderCounts[key] || 0) + 1;
			})
		);

		// Log failures (optional)
		results
			.filter((r) => r.status === 'rejected')
			.forEach((r) =>
				console.warn('Failed message fetch:', r.reason?.message)
			);
	};

	for (let i = 0; i < messages.length; i += concurrency) {
		const batch = messages.slice(i, i + concurrency);
		await processBatch(batch);
	}

	return Object.entries(senderCounts)
		.map(([sender, count]) => ({ sender, count }))
		.sort((a, b) => b.count - a.count);
}

// 🔹 Move messages by sender or domain to Trash
// 🔹 Move messages to Trash for multiple senders with limits
async function moveMessagesToTrash(auth, senderObj) {
	const gmail = google.gmail({ version: 'v1', auth });

	let totalMoved = 0;
	const details = [];

	// Process each sender in parallel
	await Promise.all(
		Object.entries(senderObj).map(async ([email, limitValue]) => {
			const limit = Number(limitValue) || 100; // default limit
			const query = email.includes('@') ? `from:${email}` : `from:@${email}`;

			try {
				const messages = await fetchMessages(auth, query, limit);
				if (!messages.length) {
					details.push({ sender: email, moved: 0 });
					return;
				}

				const ids = messages.map((m) => m.id);

				// ✅ Move to Trash (batch)
				await gmail.users.messages.batchModify({
					userId: 'me',
					requestBody: {
						ids,
						addLabelIds: ['TRASH'],
					},
				});

				totalMoved += ids.length;
				details.push({ sender: email, moved: ids.length });
			} catch (err) {
				console.error(`Error moving messages for ${email}:`, err.message);
				details.push({ sender: email, error: err.message });
			}
		})
	);

	return { movedCount: totalMoved, details };
}

module.exports = {
	aggregateSenders,
	moveMessagesToTrash,
};
