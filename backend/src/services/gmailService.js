const { google } = require('googleapis');
require('dotenv').config();
const pLimit = require('p-limit').default;

const FETCH_LIMIT = process.env.GMAIL_FETCH_LIMIT_PER_REQUEST || 100;
const CONCURRENCY_LIMIT = process.env.GMAIL_MESSAGE_CONCURRENCY_LIMIT || 5;
const MAX_LIMIT = process.env.GMAIL_MAX_FETCH_LIMIT || 500;
const DEFAULT_LIMIT = process.env.GMAIL_DEFAULT_FETCH_LIMIT || 500;

// 🔹 Helper: Fetch message IDs (paginated)
async function fetchMessages(auth, query = '', max) {
	const gmail = google.gmail({ version: 'v1', auth });
	const messages = [];
	let nextPageToken = null;
	const effectiveMax = Math.min(max, Number(MAX_LIMIT));

	console.log(`Effective Max ${effectiveMax}`, max);
	do {
		const remaining = effectiveMax - messages.length;
		const limit = Math.min(Number(FETCH_LIMIT), remaining);

		const res = await gmail.users.messages.list({
			userId: 'me',
			maxResults: limit,
			q: query,
			pageToken: nextPageToken,
		});
		messages.push(...(res.data.messages || []));
		nextPageToken = res.data.nextPageToken;
	} while (messages.length < effectiveMax && nextPageToken);

	return messages.slice(0, max);
}

async function aggregateSenders(res, params, auth) {
	const groupByDomain = params.groupByDomain || false;
	console.log(`Effective Size `, params.processCount);
	const gmail = google.gmail({ version: 'v1', auth });
	const messages = await fetchMessages(auth, '', params.processCount || DEFAULT_LIMIT);
	const senderCounts = {};

	// Create a concurrency limiter
	const limitFn = pLimit(Number(CONCURRENCY_LIMIT));

	const total = messages.length;
	let processed = 0;

	// Initial progress (10%)
	const initialPercent = 10;
	const initialCompleted = (initialPercent / 100) * total;
	res.write(`event: progress\ndata: ${initialPercent}\n\n`);

	const tasks = messages.map((msg) =>
		limitFn(async () => {
			try {
				const response = await gmail.users.messages.get({
					userId: 'me',
					id: msg.id,
					format: 'metadata',
					metadataHeaders: ['From'],
				});

				const header = response.data.payload.headers.find(
					(h) => h.name === 'From'
				);
				if (!header) return;

				const from = header.value;
				const match = from.match(/<([^>]+)>/);
				const email = match ? match[1] : from;
				const domain = email.split('@')[1]?.trim();
				const key = groupByDomain ? domain : email;

				senderCounts[key] = (senderCounts[key] || 0) + 1;
			} catch (err) {
				console.warn('Failed to fetch message:', err.message);
			} finally {
				processed++;

				// Update progress dynamically
				const completed = Math.min(initialCompleted + processed, total);
				const percent = ((completed / total) * 100).toFixed(2);
				res.write(`event: progress\ndata: ${percent}\n\n`);
			}
		})
	);

	// Wait for all to complete
	await Promise.all(tasks);

	// Return sorted sender counts
	return Object.entries(senderCounts)
		.map(([sender, count]) => ({ id: sender, sender, count }))
		.sort((a, b) => b.count - a.count);
}

// 🔹 Move messages by sender or domain to Trash
// 🔹 Move messages to Trash for multiple senders with limits
async function moveMessagesToTrash(auth, payload) {
	const gmail = google.gmail({ version: 'v1', auth });

	let totalMoved = 0;
	const details = [];

	// Process each sender in parallel
	await Promise.all(
		payload.map(async ({ email, limitValue }) => {
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
