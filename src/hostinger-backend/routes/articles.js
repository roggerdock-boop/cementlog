'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('../db/database');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const VALID_CATEGORIES = ['RawMill', 'CementMill', 'Kiln', 'AFR', 'EnergyOptimization'];
const VALID_STATUSES = ['published', 'draft'];
const DEFAULT_PAGE_SIZE = 9;
const MAX_PAGE_SIZE = 50;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert a title string into a URL-safe slug */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Validate required fields for create/update */
function validateArticleBody(body) {
  const errors = [];
  const required = ['title', 'content', 'excerpt', 'authorName', 'category', 'status'];
  for (const field of required) {
    if (!body[field] || String(body[field]).trim() === '') {
      errors.push(`'${field}' is required`);
    }
  }
  if (body.category && !VALID_CATEGORIES.includes(body.category)) {
    errors.push(`'category' must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }
  if (body.status && !VALID_STATUSES.includes(body.status)) {
    errors.push(`'status' must be one of: ${VALID_STATUSES.join(', ')}`);
  }
  return errors;
}

// ---------------------------------------------------------------------------
// GET /api/articles
// Query params: category, status, page, pageSize, sortBy
// ---------------------------------------------------------------------------
router.get('/', (req, res) => {
  const db = getDb();
  let articles = [...db.data.articles];

  // Filter
  if (req.query.category) {
    articles = articles.filter((a) => a.category === req.query.category);
  }
  if (req.query.status) {
    articles = articles.filter((a) => a.status === req.query.status);
  } else {
    // Public endpoint: only published by default unless admin token present
    // (admin pages send status param explicitly)
    articles = articles.filter((a) => a.status === 'published');
  }

  // Sort
  const sortBy = req.query.sortBy || 'publishDate';
  articles.sort((a, b) => {
    if (sortBy === 'viewCount') return b.viewCount - a.viewCount;
    return new Date(b.publishDate) - new Date(a.publishDate);
  });

  // Pagination
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE)
  );
  const total = articles.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const items = articles.slice(start, start + pageSize);

  res.json({ items, total, page, pageSize, totalPages });
});

// ---------------------------------------------------------------------------
// GET /api/articles/search?q=
// ---------------------------------------------------------------------------
router.get('/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase().trim();
  if (!q) return res.json({ items: [], total: 0 });

  const db = getDb();
  const items = db.data.articles.filter(
    (a) =>
      a.status === 'published' &&
      (a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q))
  );

  res.json({ items, total: items.length });
});

// ---------------------------------------------------------------------------
// GET /api/articles/latest?limit=
// ---------------------------------------------------------------------------
router.get('/latest', (req, res) => {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 5));
  const db = getDb();
  const items = db.data.articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, limit);
  res.json({ items });
});

// ---------------------------------------------------------------------------
// GET /api/articles/popular?limit=
// ---------------------------------------------------------------------------
router.get('/popular', (req, res) => {
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 5));
  const db = getDb();
  const items = db.data.articles
    .filter((a) => a.status === 'published')
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
  res.json({ items });
});

// ---------------------------------------------------------------------------
// GET /api/articles/slug/:slug
// ---------------------------------------------------------------------------
router.get('/slug/:slug', (req, res) => {
  const db = getDb();
  const article = db.data.articles.find(
    (a) => a.slug === req.params.slug && a.status === 'published'
  );
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json(article);
});

// ---------------------------------------------------------------------------
// GET /api/articles/:id
// ---------------------------------------------------------------------------
router.get('/:id', (req, res) => {
  const db = getDb();
  const article = db.data.articles.find((a) => a.id === req.params.id);
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json(article);
});

// ---------------------------------------------------------------------------
// POST /api/articles/:id/view  — increment view count
// ---------------------------------------------------------------------------
router.post('/:id/view', (req, res) => {
  const db = getDb();
  const article = db.data.articles.find((a) => a.id === req.params.id);
  if (!article) return res.status(404).json({ error: 'Article not found' });
  article.viewCount = (article.viewCount || 0) + 1;
  db.write();
  res.json({ viewCount: article.viewCount });
});

// ---------------------------------------------------------------------------
// POST /api/articles  — create (admin only)
// ---------------------------------------------------------------------------
router.post('/', requireAdmin, (req, res) => {
  const errors = validateArticleBody(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  const db = getDb();
  const now = new Date().toISOString();

  // Ensure slug uniqueness
  let slug = req.body.slug ? slugify(req.body.slug) : slugify(req.body.title);
  const slugExists = db.data.articles.some((a) => a.slug === slug);
  if (slugExists) slug = `${slug}-${Date.now()}`;

  const article = {
    id: uuidv4(),
    title: req.body.title.trim(),
    slug,
    content: req.body.content,
    excerpt: req.body.excerpt.trim(),
    authorName: req.body.authorName.trim(),
    category: req.body.category,
    metaDescription: (req.body.metaDescription || '').trim(),
    featuredImageUrl: (req.body.featuredImageUrl || '').trim(),
    status: req.body.status,
    publishDate: req.body.publishDate || now,
    lastUpdated: now,
    viewCount: 0,
  };

  db.data.articles.push(article);
  db.write();

  res.status(201).json(article);
});

// ---------------------------------------------------------------------------
// PUT /api/articles/:id  — update (admin only)
// ---------------------------------------------------------------------------
router.put('/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const idx = db.data.articles.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Article not found' });

  const errors = validateArticleBody(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  const existing = db.data.articles[idx];
  const now = new Date().toISOString();

  // Recompute slug if title changed and no explicit slug provided
  let slug = req.body.slug ? slugify(req.body.slug) : slugify(req.body.title);
  // Check slug uniqueness (exclude current article)
  const slugConflict = db.data.articles.some((a) => a.slug === slug && a.id !== req.params.id);
  if (slugConflict) slug = `${slug}-${Date.now()}`;

  const updated = {
    ...existing,
    title: req.body.title.trim(),
    slug,
    content: req.body.content,
    excerpt: req.body.excerpt.trim(),
    authorName: req.body.authorName.trim(),
    category: req.body.category,
    metaDescription: (req.body.metaDescription || '').trim(),
    featuredImageUrl: (req.body.featuredImageUrl || '').trim(),
    status: req.body.status,
    publishDate: req.body.publishDate || existing.publishDate,
    lastUpdated: now,
  };

  db.data.articles[idx] = updated;
  db.write();

  res.json(updated);
});

// ---------------------------------------------------------------------------
// DELETE /api/articles/:id  — delete (admin only)
// ---------------------------------------------------------------------------
router.delete('/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const idx = db.data.articles.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Article not found' });

  db.data.articles.splice(idx, 1);
  db.write();

  res.json({ message: 'Article deleted successfully' });
});

module.exports = router;
