'use strict';

const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

// ---------------------------------------------------------------------------
// POST /api/admin/login
// Body: { username, password }
// ---------------------------------------------------------------------------
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedHash) {
    return res
      .status(500)
      .json({ error: 'Server misconfiguration: ADMIN_PASSWORD_HASH not set' });
  }

  const providedHash = sha256(password);

  if (username !== expectedUsername || providedHash !== expectedHash) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return res.json({ token, expiresIn: 86400 });
});

// ---------------------------------------------------------------------------
// POST /api/admin/logout  (client-side token discard — stateless)
// ---------------------------------------------------------------------------
router.post('/logout', requireAdmin, (_req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// ---------------------------------------------------------------------------
// GET /api/admin/verify
// ---------------------------------------------------------------------------
router.get('/verify', requireAdmin, (req, res) => {
  res.json({ valid: true, username: req.admin.username });
});

module.exports = router;
