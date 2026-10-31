const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zyna_scrubs';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Health Endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'ZYNA Scrubs MERN Stack API & Inventory Server',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Database Connection & Server Initialization
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Database: zyna_scrubs');
    app.listen(PORT, () => {
      console.log(`🚀 ZYNA Scrubs API Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection warning (Running in memory/standalone mode):', err.message);
    app.listen(PORT, () => {
      console.log(`🚀 ZYNA Scrubs API Server running at http://localhost:${PORT}`);
    });
  });
