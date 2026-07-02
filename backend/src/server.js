require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const donationRoutes = require('./routes/donation');

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware (if DEBUG enabled)
if (process.env.DEBUG === 'true') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api', donationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.DEBUG === 'true' ? err.stack : undefined
  });
});

// Start server
function startServer(port, attempt = 1) {
  const server = app.listen(port, () => {
    console.log(`🚀 MSF Donation API running on http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log(`🔌 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      if (attempt <= 10) {
        console.warn(`Port ${port} is busy. Trying ${nextPort} instead...`);
        server.close(() => startServer(nextPort, attempt + 1));
      } else {
        console.error(`Unable to start server after ${attempt - 1} attempts.`);
        process.exit(1);
      }
    } else {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  });
}

startServer(DEFAULT_PORT);

module.exports = app;