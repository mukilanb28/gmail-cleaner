require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const gmailRoutes = require('./routes/gmailRoutes');

const app = express();

// Hide framework info
app.disable('x-powered-by');

app.use(cookieParser());

// Secure common HTTP headers
app.use(helmet());

// Rate limit to protect against abuse or brute force
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP
	message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Parse incoming JSON bodies
app.use(express.json());

// Enable CORS (restrict to known origin in production)
const corsOptions = {
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
	credentials: true,
};
app.use(cors(corsOptions));

/* -----------------------------------------
   🚀 Routes
------------------------------------------ */
app.use('/api/auth', authRoutes);
app.use('/api/gmail', gmailRoutes);

// Health check
app.get('/', (req, res) => res.json({ status: 'Gmail Cleaner API running' }));

/* -----------------------------------------
   ⚠️ Global Error Handler
------------------------------------------ */
app.use((err, req, res, next) => {
	console.error('Unhandled Error:', err);
	res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
