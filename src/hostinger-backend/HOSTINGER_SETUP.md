# 🏗️ CementHub — Hostinger Deployment Guide

This guide walks you through deploying CementHub Blog on Hostinger using Node.js hosting. No advanced technical knowledge required — just follow the steps in order.

---

## ⚡ Quick Start (For Experienced Users)

```
1. Build frontend:   cd src/frontend && pnpm install && pnpm build
2. Upload backend files to public_html/cementhub/
3. Copy dist/ output to public_html/cementhub/public/
4. hPanel → Node.js → Create app (entry point: server.js, Node 18+)
5. Run NPM Install from hPanel
6. Set env vars: JWT_SECRET, ADMIN_USERNAME=admin, ADMIN_PASSWORD_HASH
7. Start the app
8. Visit https://yourdomain.com — done!
```

---

## 📋 Table of Contents

1. [What You Need](#what-you-need)
2. [Project Structure](#project-structure)
3. [Building the Frontend](#building-the-frontend)
4. [Uploading Files to Hostinger](#uploading-files-to-hostinger)
5. [Setting Up Node.js in hPanel](#setting-up-nodejs-in-hpanel)
6. [Installing Dependencies](#installing-dependencies)
7. [Setting Up Admin Password](#setting-up-admin-password)
8. [Configuring Environment Variables](#configuring-environment-variables)
9. [Starting the App](#starting-the-app)
10. [Testing Your Deployment](#testing-your-deployment)
11. [Default Admin Credentials](#default-admin-credentials)
12. [Changing the Admin Password](#changing-the-admin-password)
13. [Troubleshooting](#troubleshooting)
14. [MySQL Upgrade Path](#mysql-upgrade-path)

---

## What You Need

Before you begin, make sure you have:

- ✅ A Hostinger hosting plan that supports **Node.js** (Business plan or higher)
- ✅ Access to your Hostinger **hPanel** dashboard
- ✅ [Node.js 18+](https://nodejs.org/) installed on your local computer (for building the frontend)
- ✅ [pnpm](https://pnpm.io/) installed locally (`npm install -g pnpm`)
- ✅ The CementHub project files (this repository)

> **Note:** Hostinger's **Shared Hosting** and **WordPress Hosting** plans do **not** support Node.js. You need a **VPS** or a plan with Node.js app support (look for "Node.js" in the hPanel features).

---

## Project Structure

Here is what the CementHub project looks like and where each part goes:

```
cementhub/                          ← Your app folder on Hostinger
│
├── server.js                       ← Main application entry point
├── package.json                    ← Node.js dependencies list
├── .env                            ← Environment variables (you create this)
├── generate-hash.js                ← Tool to generate admin password hash
│
├── routes/
│   ├── articles.js                 ← Public API: list, read, search articles
│   └── admin.js                    ← Protected API: create, edit, delete articles
│
├── middleware/
│   └── auth.js                     ← JWT authentication middleware
│
├── db/
│   ├── database.js                 ← Database module (lowdb JSON adapter)
│   └── data.json                   ← Auto-created on first startup (your data lives here)
│
└── public/                         ← React frontend (built files go here)
    ├── index.html
    ├── assets/
    └── ...
```

### What Goes Where on Hostinger

| Local Path | Hostinger Path |
|---|---|
| `src/hostinger-backend/` (all files) | `public_html/cementhub/` |
| `src/frontend/dist/` (after build) | `public_html/cementhub/public/` |

---

## Building the Frontend

Before uploading to Hostinger, you must build the React frontend into static files.

**On your local computer:**

```bash
# 1. Navigate to the frontend directory
cd src/frontend

# 2. Install frontend dependencies
pnpm install

# 3. Build for production
pnpm build
```

After the build completes, a `dist/` folder will appear inside `src/frontend/`. This folder contains the compiled React app.

**Important:** The contents of `src/frontend/dist/` must be copied into `public_html/cementhub/public/` on your Hostinger server. The `public/` folder must be created inside your app directory if it doesn't exist yet.

> **Tip:** If you don't have pnpm installed, run `npm install -g pnpm` first, then retry.

---

## Uploading Files to Hostinger

You can upload files using Hostinger's **File Manager** or via **FTP/SFTP**.

### Option A: File Manager (Recommended for Beginners)

1. Log in to [hPanel](https://hpanel.hostinger.com)
2. Click **File Manager** in the left sidebar
3. Navigate to `public_html/`
4. Create a new folder named `cementhub`
5. Open the `cementhub/` folder
6. Upload all files from `src/hostinger-backend/` into this folder
   - You can zip the folder and use the **Upload & Extract** feature
7. Inside `cementhub/`, create a folder named `public`
8. Upload all files from `src/frontend/dist/` into `cementhub/public/`

### Option B: FTP/SFTP

1. In hPanel, go to **Files > FTP Accounts** to get your FTP credentials
2. Use an FTP client like [FileZilla](https://filezilla-project.org/)
3. Connect using your FTP credentials
4. Upload `src/hostinger-backend/` contents to `public_html/cementhub/`
5. Upload `src/frontend/dist/` contents to `public_html/cementhub/public/`

> **Do not upload** `node_modules/` — Hostinger will install dependencies for you in the next step.

---

## Setting Up Node.js in hPanel

1. Log in to [hPanel](https://hpanel.hostinger.com)
2. In the left sidebar, find and click **Node.js** (under the Hosting section)
3. Click **Create Application**
4. Fill in the settings:

   | Setting | Value |
   |---|---|
   | **Node.js version** | `18` or `20` (choose the highest available) |
   | **Application mode** | `Production` |
   | **Application root** | `public_html/cementhub` |
   | **Application URL** | Your domain (e.g. `yourdomain.com`) |
   | **Application startup file** | `server.js` |

5. Click **Create** to provision the Node.js environment

> **Note:** The application root is the folder where `server.js` lives, not `public_html` itself. Using a subfolder like `cementhub` keeps things organized if you have other sites.

---

## Installing Dependencies

Once your files are uploaded and the Node.js app is created:

1. In hPanel, go to **Node.js**
2. Find your CementHub application in the list
3. Click the **three-dot menu** (⋮) next to your app
4. Click **Run NPM Install**
5. Wait for it to complete — this installs all packages listed in `package.json`

You should see a success message when it finishes. This step creates the `node_modules/` folder on the server.

---

## Setting Up Admin Password

The admin password is stored as a **SHA-256 hash** (not plain text) for security. You need to generate a hash of your chosen password before configuring the environment variables.

### To generate a password hash:

**On your local computer**, run:

```bash
# Navigate to the backend folder
cd src/hostinger-backend

# Option 1: Pass password directly
node generate-hash.js YourNewPassword123!

# Option 2: Interactive prompt
node generate-hash.js
```

The script will output something like:

```
SHA-256 hash for: YourNewPassword123!
a3f8c2d1e4b5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1

Copy this value into your .env file as ADMIN_PASSWORD_HASH
```

Copy the hash value — you will need it in the next step.

> **Security tip:** Never use a simple or guessable password. The default password `CementHub2024!` is fine to use initially, but **change it** once your site is live.

---

## Configuring Environment Variables

Environment variables hold sensitive settings like your secret key and admin credentials. They must be set in hPanel — **never commit them to version control**.

### Setting Variables in hPanel

1. In hPanel, go to **Node.js**
2. Click the **three-dot menu** (⋮) next to your app
3. Click **Edit** (or **Environment Variables**)
4. Add each variable below:

### Required Environment Variables

| Variable | Value | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on. Hostinger may override this automatically. |
| `JWT_SECRET` | A long random string | Used to sign admin login tokens. **Must be secret and unique.** |
| `ADMIN_USERNAME` | `admin` | The username to log in to the admin dashboard. |
| `ADMIN_PASSWORD_HASH` | (hash from previous step) | SHA-256 hash of your admin password. |
| `ALLOWED_ORIGIN` | `https://yourdomain.com` | Your domain. Prevents other sites from calling your API. |

### Generating a Strong JWT_SECRET

You can generate a secure random string using Node.js on your local machine:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

This outputs a 128-character hex string — copy and paste it as your `JWT_SECRET`.

### Alternative: Using a .env File

If hPanel doesn't offer a UI for environment variables, you can upload a `.env` file directly:

1. Copy `.env.example` to `.env` in your local `src/hostinger-backend/` folder
2. Edit `.env` with your actual values (never use the example values in production)
3. Upload the `.env` file to `public_html/cementhub/` via File Manager

**Example `.env` file:**

```env
PORT=3000
JWT_SECRET=your-very-long-random-secret-here-min-64-chars
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
ALLOWED_ORIGIN=https://yourdomain.com
```

> **Important:** The hash above is for the default password `CementHub2024!`. Replace it with your own hash generated by `generate-hash.js`.

---

## Starting the App

1. In hPanel, go to **Node.js**
2. Find your CementHub application
3. Click the **Start** button (or **Restart** if it was already running)
4. Wait a few seconds for the app to initialize
5. The status indicator should turn **green** (Running)

**On first startup**, the app will automatically:
- Create the `db/data.json` database file
- Seed it with **3 example articles** (Kiln Thermal Efficiency, Raw Mill Operations, Specific Heat Consumption)

---

## Testing Your Deployment

Once the app is running, verify it works by visiting these URLs in your browser:

| URL | Expected Result |
|---|---|
| `https://yourdomain.com/` | CementHub homepage with article cards |
| `https://yourdomain.com/api/articles` | JSON list of published articles |
| `https://yourdomain.com/api/articles?category=Kiln` | JSON list filtered by category |
| `https://yourdomain.com/admin` | Admin login page |
| `https://yourdomain.com/api/admin/verify` | `{"ok":true}` if logged in (or 401 if not) |

### Testing the Admin Dashboard

1. Visit `https://yourdomain.com/admin`
2. Log in with:
   - **Username:** `admin`
   - **Password:** `CementHub2024!` (or your custom password)
3. You should see the article management dashboard
4. Try creating, editing, and deleting a test article to confirm everything works

---

## Default Admin Credentials

> ⚠️ **Change these immediately after your first login!**

| Field | Value |
|---|---|
| **Username** | `admin` |
| **Password** | `CementHub2024!` |

The hash for this default password is already in `.env.example`:
```
8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
```

---

## Changing the Admin Password

To change your admin password after deployment:

1. **On your local computer**, run:
   ```bash
   cd src/hostinger-backend
   node generate-hash.js MyNewSecurePassword!
   ```

2. **Copy the output hash**

3. **Update the environment variable** in hPanel:
   - Go to Node.js → your app → Edit
   - Update `ADMIN_PASSWORD_HASH` with the new hash
   - Save changes

4. **Restart the app** in hPanel (Node.js → Restart)

5. **Test** by logging in with your new password at `https://yourdomain.com/admin`

---

## Troubleshooting

### ❌ App won't start / status shows Error

**Cause:** Missing dependencies or wrong startup file.

**Fix:**
1. Check the application startup file is set to `server.js` (not `index.js` or `app.js`)
2. In hPanel → Node.js, click **Run NPM Install** again
3. Check that all files including `package.json` are in `public_html/cementhub/`
4. Restart the app

---

### ❌ Homepage shows blank page or 404

**Cause:** Frontend files not in the `public/` subfolder.

**Fix:**
1. Confirm `public_html/cementhub/public/index.html` exists
2. If the `public/` folder is empty, re-upload the contents of `src/frontend/dist/`
3. Make sure you ran `pnpm build` locally before uploading

---

### ❌ API returns 404 for /api/articles

**Cause:** App is not running, or the route files are missing.

**Fix:**
1. Check the app status in hPanel → Node.js (should be green/Running)
2. Confirm `routes/articles.js` and `routes/admin.js` are uploaded
3. Check the app logs in hPanel for error messages
4. Restart the app

---

### ❌ Cannot log in to admin dashboard

**Cause:** Wrong password hash or environment variables not set.

**Fix:**
1. Confirm `ADMIN_PASSWORD_HASH` is set correctly in hPanel environment variables
2. Re-run `node generate-hash.js YourPassword` locally to get a fresh hash
3. Make sure there are no extra spaces or line breaks in the hash value
4. Confirm `ADMIN_USERNAME` matches what you type in the login form
5. Restart the app after changing any environment variable

---

### ❌ CORS errors in browser console

**Cause:** `ALLOWED_ORIGIN` is set incorrectly, or frontend is calling a different domain.

**Fix:**
1. Set `ALLOWED_ORIGIN` to your exact domain, including `https://` and no trailing slash:
   ```
   ALLOWED_ORIGIN=https://yourdomain.com
   ```
2. If your site is accessed with and without `www`, pick one and stick with it
3. For local development/testing, leave `ALLOWED_ORIGIN` empty to allow all origins
4. Restart the app after updating the variable

---

### ❌ Articles disappear after restarting the app

**Cause:** The `db/data.json` file is being overwritten on startup, or it's in the wrong location.

**Fix:**
1. The database file is at `public_html/cementhub/db/data.json` — check it exists
2. On first startup only, the database is seeded with 3 example articles. This only happens when `data.json` doesn't exist yet.
3. Make sure the `db/` folder exists inside `public_html/cementhub/` and the app has write permission

---

### ❌ node_modules not found

**Cause:** NPM install was not run, or failed silently.

**Fix:**
1. In hPanel → Node.js → your app → Run NPM Install
2. Wait for the process to complete fully before starting the app
3. If it keeps failing, check that `package.json` is present in `public_html/cementhub/`

---

### ❌ Port conflict (EADDRINUSE)

**Cause:** Another app is already using port 3000, or Hostinger assigned a different port.

**Fix:**
1. Hostinger Node.js hosting automatically assigns a port — you don't usually need to set `PORT` manually
2. If needed, change `PORT` in your environment variables to a different number (e.g. `8080`)
3. Restart the app

---

## Database: How It Works

CementHub uses **lowdb**, a simple JSON file-based database. All your articles are stored in:

```
public_html/cementhub/db/data.json
```

- **Auto-created** on first startup if it doesn't exist
- **Pre-seeded** with 3 example articles (Kiln Thermal Efficiency, Raw Mill Operations, Specific Heat Consumption)
- **No setup required** — it just works out of the box
- **Backed up automatically** every time you make changes (the file is rewritten atomically)

> **Tip:** To back up your articles, simply download `db/data.json` from Hostinger's File Manager. To restore, upload it back.

---

## MySQL Upgrade Path

The current flat-file database (lowdb JSON) is great for getting started and handles hundreds of articles without any issues.

If you later need a MySQL database (e.g. for better performance, multiple app instances, or backups via Hostinger's hPanel database tools), it is possible to migrate:

1. **Export** your current articles from `db/data.json`
2. **Create a MySQL database** in hPanel → Databases → MySQL Databases
3. **Update** `db/database.js` to use a MySQL adapter (e.g. `mysql2` or `knex`)
4. **Import** your articles into the new database

This migration is a future enhancement and is not required to run CementHub successfully on Hostinger.

---

## File Structure Reference

Here is a complete checklist of every file that should be on your Hostinger server:

```
public_html/
└── cementhub/
    ├── server.js                  ✅ Required
    ├── package.json               ✅ Required
    ├── .env                       ✅ Required (you create this)
    ├── generate-hash.js           ✅ Recommended (for password changes)
    ├── routes/
    │   ├── articles.js            ✅ Required
    │   └── admin.js               ✅ Required
    ├── middleware/
    │   └── auth.js                ✅ Required
    ├── db/
    │   └── database.js            ✅ Required
    │   └── data.json              ⚙️  Auto-created on first startup
    ├── node_modules/              ⚙️  Created by NPM Install in hPanel
    └── public/
        ├── index.html             ✅ Required (from dist/)
        ├── assets/                ✅ Required (from dist/)
        └── ...                    ✅ All other dist/ files
```

---

## Summary Checklist

Use this checklist to make sure you haven't missed any steps:

- [ ] Built the frontend locally with `pnpm build`
- [ ] Uploaded all backend files to `public_html/cementhub/`
- [ ] Uploaded `dist/` contents to `public_html/cementhub/public/`
- [ ] Created Node.js app in hPanel with entry point `server.js`
- [ ] Set Node.js version to 18 or 20
- [ ] Ran NPM Install from hPanel
- [ ] Generated a strong `JWT_SECRET`
- [ ] Generated `ADMIN_PASSWORD_HASH` with `generate-hash.js`
- [ ] Set all environment variables in hPanel
- [ ] Started the app and confirmed green status
- [ ] Visited `https://yourdomain.com/api/articles` and saw JSON
- [ ] Logged in to admin at `https://yourdomain.com/admin`
- [ ] Changed default admin password

---

*CementHub — A professional knowledge platform for cement industry professionals.*
