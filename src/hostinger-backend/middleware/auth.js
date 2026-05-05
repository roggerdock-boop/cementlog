'use strict';

const jwt = require('jsonwebtoken');

/**
 * Express middleware that verifies the Authorization Bearer JWT token.
 * Attaches decoded payload to req.admin on success.
 * Returns 401 if the token is missing or invalid.
 */
function requireAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorised: missing token' });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorised: invalid or expired token' });
  }
}

module.exports = { requireAdmin };
