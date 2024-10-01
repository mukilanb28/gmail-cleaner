import fs from 'fs';
import open from 'open';
import readline from 'readline';
import { google } from 'googleapis';

const SCOPES = ['https://mail.google.com/'];
const TOKEN_PATH = 'token.json';
const AUTH_CRED_FILE = 'credentials.json';

export let authCache = null;

const getCredentials = () => {
	const data = JSON.parse(fs.readFileSync(AUTH_CRED_FILE, 'utf8'));
	return data;
};
export const authorize = () => {
	authorizeFromToken(getCredentials(), (auth) => {
		authCache = auth;
		console.log('Login success!');
	});
};

function authorizeFromToken(credentials, callback) {
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		if (err) return getNewToken(oAuth2Client);
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}

function getNewToken(oAuth2Client) {
	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log('Authorize this app by visiting this url:', authUrl);
	open(authUrl);
	return authUrl;
}
export function updateToken(code) {
	const credentials = getCredentials();
	const { client_secret, client_id, redirect_uris } = credentials.installed;

	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris
	);

	if (!code) {
		return res.status(400).send('No code provided');
	}

	// Exchange authorization code for an access token
	oAuth2Client.getToken(code, (err, token) => {
		if (err) {
			console.error('Error retrieving access token', err);
			return res.status(500).send('Error retrieving access token');
		}

		// Set the token to the OAuth client
		oAuth2Client.setCredentials(token);
		authCache = oAuth2Client;

		// Store the token to disk for later program executions
		fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
			if (err) return console.error(err);
			console.log('Token stored to', TOKEN_PATH);
		});
		open('http://localhost:3002');
	});
}
