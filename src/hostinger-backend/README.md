# CementHub Backend — Hostinger Deployment Guide

This is the production-ready Node.js/Express backend for CementHub Blog.
It uses a JSON flat-file database (`lowdb`) so no MySQL or external database is needed.

---

## Directory Structure

```
hostinger-backend/
├── server.js              # Express app entry point
├── package.json
├── .env.example           # Copy to .env and fill in values
├── generate-hash.js       # Utility: generate SHA-256 password hash
├── db/
│   ├── database.js        # lowdb setup + seed data
│   └── data.json          # Created automatically on first run
├── middleware/
│   └── auth.js            # JWT verification middleware
├── routes/
│   ├── articles.js        # Article CRUD + public endpoints
│   └── admin.js           # Login / logout / verify
└── public/                # ← Place your built React frontend here
    └── index.html
```

---

## Quick Start (local)

```bash
cd hostinger-backend
npm install
cp .env.example .env
# Edit .env — at minimum set JWT_SECRET
node server.js
```

The server starts on `http://localhost:3000`.

---

## Environment Variables

| Variable               | Required | Default       | Description                                     |
|------------------------|----------|---------------|-------------------------------------------------|
| `PORT`                 | No       | `3000`        | Port the server listens on                      |
| `JWT_SECRET`           | **Yes**  | —             | Long random string for signing JWT tokens       |
| `ADMIN_USERNAME`       | No       | `admin`       | Admin login username                            |
| `ADMIN_PASSWORD_HASH`  | **Yes**  | —             | SHA-256 hash of the admin password              |
| `ALLOWED_ORIGIN`       | No       | `*` (all)     | Production CORS origin, e.g. `https://yourdomain.com` |

### Generating a password hash

```bash
node generate-hash.js "YourNewPassword"
```

Copy the output into `.env` as `ADMIN_PASSWORD_HASH`.

The **default password** is `CementHub2024!`  
Its hash: `8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918`

> ⚠️ Change the default password before deploying to production.

---

## Hostinger Deployment (Node.js Hosting)

### Step 1 — Upload files

1. Log in to hPanel → **Hosting** → **File Manager**.
2. Navigate to `public_html/`.
3. Upload the entire `hostinger-backend/` folder contents **directly** into `public_html/`  
   (so `public_html/server.js`, `public_html/package.json`, etc.).

### Step 2 — Install dependencies

In hPanel → **Node.js** → open the built-in terminal or SSH:

```bash
cd public_html
npm install --production
```

### Step 3 — Set environment variables

In hPanel → **Node.js** → **Environment Variables**, add:

| Key                    | Value                                      |
|------------------------|--------------------------------------------|
| `JWT_SECRET`           | *(long random string)*                     |
| `ADMIN_USERNAME`       | `admin`                                    |
| `ADMIN_PASSWORD_HASH`  | *(hash from `generate-hash.js`)*           |
| `ALLOWED_ORIGIN`       | `https://yourdomain.com`                   |

### Step 4 — Set entry point

In hPanel → **Node.js** → **Application settings**:
- **Application root**: `public_html`
- **Application startup file**: `server.js`
- **Node.js version**: 18 or higher

Click **Save** and then **Restart**.

### Step 5 — Place the frontend build

1. Build the React frontend: `pnpm build` (from the project root).
2. Copy the contents of the `dist/` folder into `public_html/public/`.

Your site will then be served at `https://yourdomain.com/`  
The API will be at `https://yourdomain.com/api/`.

---

## API Reference

### Public endpoints

| Method | Path                          | Description                          |
|--------|-------------------------------|--------------------------------------|
| GET    | `/api/articles`               | List published articles (paginated)  |
| GET    | `/api/articles?category=Kiln` | Filter by category                   |
| GET    | `/api/articles/search?q=text` | Search articles                      |
| GET    | `/api/articles/latest?limit=5`| Latest published articles            |
| GET    | `/api/articles/popular?limit=5`| Most-viewed published articles       |
| GET    | `/api/articles/slug/:slug`    | Get article by URL slug              |
| GET    | `/api/articles/:id`           | Get article by ID                    |
| POST   | `/api/articles/:id/view`      | Increment view counter               |

### Admin endpoints (require `Authorization: Bearer <token>` header)

| Method | Path                    | Description              |
|--------|-------------------------|--------------------------|
| POST   | `/api/admin/login`      | Login — returns JWT      |
| POST   | `/api/admin/logout`     | Logout (token discard)   |
| GET    | `/api/admin/verify`     | Verify token validity    |
| POST   | `/api/articles`         | Create new article       |
| PUT    | `/api/articles/:id`     | Update article           |
| DELETE | `/api/articles/:id`     | Delete article           |

### Pagination query params for `GET /api/articles`

| Param      | Default | Max | Description             |
|------------|---------|-----|-------------------------|
| `page`     | 1       | —   | Page number             |
| `pageSize` | 9       | 50  | Items per page          |
| `sortBy`   | `publishDate` | — | `publishDate` or `viewCount` |
| `category` | —       | —   | Category filter         |
| `status`   | `published` | — | `published` or `draft`  |

---

## Database

- Articles are stored in `db/data.json` (auto-created on first start).
- The 3 seed articles are inserted automatically when the database is empty.
- **Back up `db/data.json`** regularly to preserve your content.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Cannot find module 'lowdb'` | Run `npm install` in `public_html/` |
| 401 on all admin requests | Check `JWT_SECRET` env var is set |
| Admin login fails | Run `node generate-hash.js` and update `ADMIN_PASSWORD_HASH` |
| Articles not saving | Ensure `db/` directory is writable by the Node process |
| Frontend shows blank page | Confirm `public/index.html` exists |
