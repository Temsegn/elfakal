# Elfakal API Server

Express + PostgreSQL backend for the Elfakal public website.

## Setup

```bash
cd server
npm install
cp .env.example .env
# Edit DATABASE_URL if using PostgreSQL
npm run dev
```

API runs at `http://localhost:4000/api/v1`

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/products` | All products |
| GET | `/api/v1/products/:slug` | Product detail |
| GET | `/api/v1/services` | All services |
| GET | `/api/v1/services/:slug` | Service detail |
| GET | `/api/v1/projects` | All projects |
| GET | `/api/v1/projects/:slug` | Project detail |
| GET | `/api/v1/news` | All news |
| GET | `/api/v1/news/:slug` | News detail |
| GET | `/api/v1/certifications` | All certifications |
| POST | `/api/v1/inquiries` | Submit business inquiry |

## Database

Without `DATABASE_URL`, the server uses in-memory seed data (same as frontend fallback).

With PostgreSQL:
```bash
npm run db:setup   # creates tables
npm run db:seed    # seeds initial data (auto on startup if empty)
```

## Deploy on Render

1. Push this repo to GitHub/GitLab.
2. In [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint** and connect the repo (uses `render.yaml`), **or** create a **Web Service** manually:
   - **Root Directory:** `server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/v1/health`
3. Set environment variables in Render:

| Variable | Example |
|----------|---------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Your Neon or Render Postgres connection string |
| `JWT_SECRET` | Long random string (Render can auto-generate) |
| `CORS_ORIGIN` | `https://your-frontend.vercel.app` |
| `ADMIN_PASSWORD` | Strong password for admin login |

4. After deploy, set in `client/.env.local` (or Vercel env):
   ```
   NEXT_PUBLIC_API_URL=https://elfakal-api.onrender.com/api/v1
   ```

The API auto-runs schema setup and seeds data on first boot when `DATABASE_URL` is set.

## Frontend Connection

Set in `client/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```
