'use strict';

require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const articlesRouter = require('./routes/articles');
const adminRouter = require('./routes/admin');

// ---------------------------------------------------------------------------
// App setup
// ---------------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// Security middleware
// ---------------------------------------------------------------------------
app.use(
  helmet({
    // Allow inline scripts/styles needed by the React SPA
    contentSecurityPolicy: false,
  })
);

// CORS
const allowedOrigin = process.env.ALLOWED_ORIGIN;
app.use(
  cors(
    allowedOrigin
      ? {
          origin: allowedOrigin,
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          credentials: true,
        }
      : {
          origin: '*',
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        }
  )
);

// ---------------------------------------------------------------------------
// Body parsing
// ---------------------------------------------------------------------------
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// ---------------------------------------------------------------------------
// API routes
// ---------------------------------------------------------------------------
app.use('/api/articles', articlesRouter);
app.use('/api/admin', adminRouter);

// ---------------------------------------------------------------------------
// Serve React SPA from the 'public' subdirectory
// ---------------------------------------------------------------------------
const PUBLIC_DIR = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_DIR));

// SPA fallback — serve index.html for all non-API routes
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

// ---------------------------------------------------------------------------
// Error handling
// ---------------------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`CementHub backend running on port ${PORT}`);
  console.log(`  API:    http://localhost:${PORT}/api/articles`);
  console.log(`  Admin:  http://localhost:${PORT}/api/admin/login`);
  console.log(`  Static: http://localhost:${PORT}/`);
});

module.exports = app;
