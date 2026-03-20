require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/akinator';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// API info route (fixes "Cannot GET /api")
app.get('/api', (req, res) => {
  res.json({
    message: 'Akinator AI API',
    version: '1.0.0',
    endpoints: {
      'POST /api/start-game': 'Start a new game',
      'POST /api/answer-question': 'Answer a question',
      'POST /api/submit-feedback': 'Submit guess feedback',
      'POST /api/submit-new-character': 'Teach AI a new character',
      'GET  /api/stats': 'Get game statistics'
    }
  });
});

// Game routes
app.use('/api', gameRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.method} ${req.path} not found` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Connect to MongoDB then start server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB:', MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
      console.log(`❤️  Health check at http://localhost:${PORT}/health`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;
