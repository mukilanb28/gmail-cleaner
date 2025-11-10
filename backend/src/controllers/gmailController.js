const { google } = require('googleapis');
const {
	aggregateSenders,
	moveMessagesToTrash,
} = require('../services/gmailService');
const { verifyJWT } = require('../utils/jwtUtils');

// GET /gmail/aggregate
exports.getAggregatedMessages = async (req, res) => {
	const token = req.cookies.token;
	if (!token) return res.status(400).json({ error: 'Missing auth token' });

	try {
		const payload = verifyJWT(token);
		const gmailClient = new google.auth.OAuth2();
		gmailClient.setCredentials(payload.tokens);
		const result = await aggregateSenders(gmailClient);
		res.json(result);
	} catch (err) {
		console.error('Gmail aggregation failed:', err);
		res.status(500).json({ error: 'Failed to fetch Gmail messages' });
	}
};

// DELETE /gmail/delete
exports.deleteMessages = async (req, res) => {
	const token = req.cookies.token;
	if (!token) return res.status(400).json({ error: 'Missing auth token' });

	const senderObj = req.body;
	// Validate that body is a non-empty object
	if (
		!senderObj ||
		typeof senderObj !== 'object' ||
		Array.isArray(senderObj) ||
		Object.keys(senderObj).length === 0
	) {
		return res.status(400).json({
			error: 'Request body must be a JSON object, e.g. { "email@gmail.com": 50, "@domain.com": 20 }',
		});
	}

	try {
		const payload = verifyJWT(token);
		const gmailClient = new google.auth.OAuth2();
		gmailClient.setCredentials(payload.tokens);

		const result = await moveMessagesToTrash(gmailClient, senderObj);
		res.json({
			message: `Moved ${result.movedCount} messages to Trash`,
			...result,
		});
	} catch (err) {
		console.error('Delete failed:', err);
		res.status(500).json({ error: 'Failed to delete messages' });
	}
};
