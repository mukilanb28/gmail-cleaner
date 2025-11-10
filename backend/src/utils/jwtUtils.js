const jwt = require('jsonwebtoken');

function generateJWT(payload) {
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.TOKEN_EXPIRY || '1h',
	});
}

function verifyJWT(token) {
	return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateJWT, verifyJWT };
