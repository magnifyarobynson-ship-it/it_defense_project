const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const dotenv   = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// Allow requests from our Frontend (CORS)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Serve the Frontend folder as static files
// So you can open http://localhost:5000 in the browser
const path = require('path');
app.use(express.static(path.join(__dirname, '../Frontend')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/tasks', require('./routes/tasks'));

// Health-check route
app.get('/api', (req, res) => {
  res.json({ message: '✅ Task Manager API is running!' });
});

// Catch-all: serve index.html for any unknown route (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// ─── Connect to MongoDB & Start Server ───────────────────────────────────────
const PORT     = process.env.PORT     || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📋 API available at http://localhost:${PORT}/api/tasks`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

