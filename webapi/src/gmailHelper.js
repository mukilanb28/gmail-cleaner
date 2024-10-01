import { google } from 'googleapis';
import { authCache } from './auth.js';
import { DEFAULT_PAGE_SIZE } from './constants.js';
import { extractEmailAddress, extractDomainAddress } from './util.js';
import pLimit from 'p-limit';
const limit = pLimit(20);

let currentPageNumber = 1;
let currentPageSize = DEFAULT_PAGE_SIZE;
let groupByDomain = false;
let nextPageToken = null;

export let processedMessages = new Map();

export function getMessageMetrics() {
	let response = [];
	let rId = 1;
	processedMessages.forEach((value, key) => {
		response.push({ id: rId++, name: key, count: value.size });
	});
	response.sort((a, b) => b.count - a.count);
	return { data: response, hasNextpage: nextPageToken };
}

export async function triggerAndGetProgress(callBack) {
	await mailEngine([], callBack);
}
export async function mailEngine(tasks = [], callBack) {
	const gmail = google.gmail({ version: 'v1', auth: authCache });

	try {
		const messages = [];
		for (let i = 1; i <= 10; i++) {
			console.log(`Running for page ${i}`);
			const tempRes = await gmail.users.messages.list({
				userId: 'me',
				maxResults: currentPageSize,
				pageToken: nextPageToken,
			});
			messages.push(...tempRes.data.messages);
			nextPageToken = tempRes.data.nextPageToken;
		}

		if (!messages || messages.length === 0) {
			console.log('No messages found.');
			return;
		}
		const totalMessageCount = messages.length;
		console.log('Total Messages ', messages.length);

		for (let index = 0; index < totalMessageCount; index++) {
			tasks.push(
				limit(async () => {
					const messageId = messages[index].id;
					let fromHeader = '';

					try {
						const msg = await gmail.users.messages.get({
							userId: 'me',
							id: messageId,
						});
						const { headers } = msg.data.payload;
						fromHeader = headers.find((header) => header.name === 'From');
					} catch (err) {
						console.log('API Returned error', err);
					}

					if (fromHeader) {
						let fromAddress = fromHeader.value;
						if (groupByDomain) {
							fromAddress = extractDomainAddress(fromHeader.value);
						} else {
							fromAddress = extractEmailAddress(fromHeader.value);
						}
						if (processedMessages.has(fromAddress)) {
							const idSet = processedMessages.get(fromAddress);
							idSet.add(messageId);
							processedMessages.set(fromAddress, idSet);
						} else {
							processedMessages.set(fromAddress, new Set([messageId]));
						}
					}

					// Calculate and print percentage completion
					const completed = index + 1;
					const percentage = (
						(completed / totalMessageCount) *
						100
					).toFixed(2);
					console.log(
						`Progress: ${completed}/${totalMessageCount} (${percentage}%)`
					);
					callBack(percentage);
				})
			);
		}
		await Promise.all(tasks);
		callBack(100);
	} catch (err) {
		console.log('The List Message API returned an error:', err);
	}
}

export async function batchDeleteMessages(fromAddress) {
	const gmail = google.gmail({ version: 'v1', auth: authCache });

	try {
		await gmail.users.messages.batchDelete(
			{
				userId: 'me',
				requestBody: {
					ids: processedMessages.get(fromAddress),
				},
			},
			(err, res) => {
				if (err) {
					console.log('Batch delete unsuccessful');
					return false;
				} else {
					console.log('Batch delete successful');
					processedMessages.delete(fromAddress);
					return true;
				}
			}
		);
	} catch (err) {
		console.log('Error in batch delete api', err);
	}
}

export function resetToDefault() {
	currentPageNumber = 1;
	currentPageSize = DEFAULT_PAGE_SIZE;
	groupByDomain = false;
	nextPageToken = null;
}
export function updatePageSize(pageSize = currentPageSize) {
	currentPageSize = pageSize;
}
export function updateGroupBy(byDomain = false) {
	groupByDomain = byDomain;
}

export async function getProfile() {
	if (authCache === null) {
		return null;
	}
	const gmail = google.gmail({ version: 'v1', auth: authCache });
	try {
		const profileResponse = await gmail.users.getProfile({ userId: 'me' });

		return profileResponse.data;
	} catch (error) {
		console.error('Error retrieving profile:', error);
		return null;
	}
}
