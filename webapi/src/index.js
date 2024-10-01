import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authorize, updateToken } from './auth.js';
import {
	batchDeleteMessages,
	resetToDefault,
	updatePageSize,
	updateGroupBy,
	getProfile,
	triggerAndGetProgress,
	getMessageMetrics,
} from './gmailHelper.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Routes */
app.get('/ping', (req, res) => {
	res.json('pong');
});

app.get('/redirect', (req, res) => {
	updateToken(req.query.code);
	res.json('SUCCESS');
});

app.get('/api/profile', async (req, res) => {
	res.json(await getProfile());
});

app.get('/api/login', (req, res) => {
	const authUrl = authorize();
	res.send(
		`Authorize the app by visiting this URL: <a href="${authUrl}">Authorize</a>`
	);
});

app.get('/api/readMessages', async (req, res) => {
	res.setHeader('Content-Type', 'text/event-stream');
	res.setHeader('Cache-Control', 'no-cache');
	res.setHeader('Connection', 'keep-alive');

	await triggerAndGetProgress((percentage) => {
		res.write(`data: ${JSON.stringify({ percentage })}\n\n`);
	});

	req.on('close', () => {
		console.log(`Closed`);
		res.end();
	});
});
app.get('/api/getMetrics', async (req, res) => {
	res.json(getMessageMetrics());
});

app.post('/api/batchDelete', (req, res) => {
	res.send(batchDeleteMessages(req.body.senderAddress));
});

app.get('/api/reset', async (req, res) => {
	resetToDefault();
	res.send('SUCCESS');
});

app.post('/api/saveConfig', async (req, res) => {
	const { pageSize, groupBy } = req.body;
	updatePageSize(pageSize);
	updateGroupBy(groupBy);
	res.json({ pageSize, groupBy });
});

app.listen(port, () => {
	console.log(`Worker ${process.pid} started and listening on port ${port}`);
});
