const oauth2Client = require('../config/googleClient');
const { generateJWT, verifyJWT } = require('../utils/jwtUtils');
const { google } = require('googleapis');
require('dotenv').config();

exports.googleAuth = (req, res) => {
	const scopes = [
		'openid',
		'email',
		'profile',
		'https://www.googleapis.com/auth/gmail.modify',
	];
	const url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		prompt: 'consent',
		scope: scopes,
		redirect_uri: 'http://localhost:5000/api/auth/google/callback',
	});
	res.redirect(url);
};

exports.googleCallback = async (req, res) => {
	const { code } = req.query;
	try {
		const { tokens } = await oauth2Client.getToken(code);
		oauth2Client.setCredentials(tokens);

		// Decode ID token to get email & name
		if (!tokens.id_token) {
			throw new Error('No ID token returned');
		}

		const ticket = await oauth2Client.verifyIdToken({
			idToken: tokens.id_token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();
		const email = payload.email;
		const name = payload.name;

		// Create JWT including profile info
		const jwtToken = generateJWT({ tokens, email, name });
		res.cookie('token', jwtToken, {
			httpOnly: true, // frontend JS cannot read
			secure: false, // true only in production with HTTPS
			sameSite: 'lax', // allow cross-origin requests
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: '/',
		});

		res.redirect(`${process.env.FRONTEND_URL}`);
	} catch (err) {
		console.error('OAuth2 callback failed:', err);
		res.status(500).json({ error: 'Token exchange failed' });
	}
};

exports.getMyProfile = (req, res) => {
	try {
		const token = req.cookies.token; // read JWT from cookie
		if (!token) return res.status(401).json({ error: 'Unauthorized' });

		const payload = verifyJWT(token); // utility to verify JWT
		const { email, name } = payload;
		res.json({ user: { email, name } });
	} catch (err) {
		res.status(401).json({ error: 'Invalid token' });
	}
};

exports.logout = (req, res) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
	});
	res.status(200).json({ message: 'Logged out successfully' });
};
