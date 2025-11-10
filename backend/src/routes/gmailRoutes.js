const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware');
const {
	getAggregatedMessages,
	deleteMessages,
} = require('../controllers/gmailController');

const router = express.Router();

// Read and aggregate messages
router.get('/aggregate', authenticateJWT, getAggregatedMessages);

// Delete messages by sender/domain
router.delete('/delete', authenticateJWT, deleteMessages);

module.exports = router;
