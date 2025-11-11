const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware');
const {
	aggregateSenders,
	deleteMessages,
} = require('../controllers/gmailController');

const router = express.Router();

// Read and aggregate messages
router.get('/aggregate', authenticateJWT, aggregateSenders);

// Delete messages by sender/domain
router.delete('/messages', authenticateJWT, deleteMessages);

module.exports = router;
