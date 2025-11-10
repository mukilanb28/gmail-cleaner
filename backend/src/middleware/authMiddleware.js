const { verifyJWT } = require('../utils/jwtUtils');

function authenticateJWT(req, res, next) {
	const token = req.cookies.token;
	if (!token)
		return res.status(401).json({ error: 'Missing Authorization cookies' });
	next();
}

module.exports = authenticateJWT;
