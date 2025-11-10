const express = require('express');
const {
	googleAuth,
	googleCallback,
	getMyProfile,
	logout,
} = require('../controllers/authController');

const router = express.Router();

router.get('/login', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/profile', getMyProfile);
router.post('/logout', logout);

module.exports = router;
