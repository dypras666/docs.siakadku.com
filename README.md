# docs.siakadku.com

Platform API documentation terpisah dari SIAKADKU main app.

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 14 App Router + shadcn/ui + Tailwind CSS |
| Backend | Express.js + TypeScript (port 1919) |
| Data | JSON file storage |
| Auth | JWT (7 days expiry) |

## Struktur

```
docs.siakadku.com/
├── src/                    # Next.js frontend
│   ├── app/
│   │   ├── docs/           # Public docs viewer
│   │   ├── admin/          # Admin panel (CRUD docs)
│   │   └── api/            # API proxy (optional)
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   ├── docs/          # Docs viewer components
│   │   └── layout/        # Layout components
│   └── lib/
├── backend/                # Express.js backend
│   ├── src/index.ts        # Server + routes
│   └── data/               # JSON storage
│       ├── docs.json       # Dokumentasi content
│       └── users.json      # User accounts
└── package.json            # Frontend deps
```

## Setup

### 1. Backend (port 1919)

```bash
cd backend
npm install
npm run dev
# Server jalan di http://localhost:1919
```

### 2. Frontend

```bash
# Root directory
npm install

# Init shadcn/ui
npx shadcn-ui@latest init

# Install components
npx shadcn-ui@latest add button card input textarea label table switch scroll-area dialog toast

# Run dev
npm run dev
# Frontend di http://localhost:3000
```

## Default Login

```
Username: admin
Password: admin123
```

## API Endpoints

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| GET | `/health` | No | Health check |
| GET | `/api/docs` | No | List published docs |
| GET | `/api/docs/:slug` | No | Get doc by slug |
| GET | `/api/docs/search?q=` | No | Search docs |
| GET | `/api/categories` | No | List categories |
| POST | `/api/auth/login` | No | Login |
| GET | `/api/auth/me` | Yes | Verify token |
| GET | `/api/admin/docs` | Yes | List all docs |
| POST | `/api/admin/docs` | Yes | Create doc |
| PUT | `/api/admin/docs/:id` | Yes | Update doc |
| DELETE | `/api/admin/docs/:id` | Yes | Delete doc |
| PUT | `/api/admin/docs/:id/publish` | Yes | Toggle publish |

## Curl Examples

```bash
# Login
curl -X POST http://localhost:1919/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# List docs
curl http://localhost:1919/api/docs

# Get doc
curl http://localhost:1919/api/docs/autentikasi

# Create doc (replace TOKEN)
curl -X POST http://localhost:1919/api/admin/docs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Test","slug":"test","category":"Test","content":"# Test"}'

# Update doc
curl -X PUT http://localhost:1919/api/admin/docs/doc-001 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Updated Title"}'
```

## Deploy

### Backend (port 1919)

```bash
cd backend
npm run build
npm start
# atau via PM2
pm2 start dist/index.js --name docs-api
```

### Frontend

```bash
npm run build
npm start
# Port default: 3000
```

## Features

- [x] Dark/Light mode
- [x] Table of Contents auto-generate dari heading Markdown
- [x] Print to PDF (browser print dialog)
- [x] Search API docs
- [x] Admin panel CRUD
- [x] JWT authentication
- [x] Mobile responsive
- [x] Markdown rendering
- [x] Copy code button
