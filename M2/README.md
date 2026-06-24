# Diploma — Base Scaffold

Minimal full-stack scaffold: Go backend, React + Tailwind frontend, SQLite database.

---

## Project Structure

```
diploma/
├── backend/
│   ├── db/           # Database connection
│   ├── handlers/     # HTTP handler functions
│   ├── middleware/   # HTTP middleware (logging)
│   ├── models/       # Data structs
│   ├── services/     # Business logic (empty)
│   ├── main.go
│   ├── go.mod
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/      # Fetch utility
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── .env.example
```

---

## Setup

### Backend

```bash
cd backend
cp .env.example .env
go mod tidy
go run main.go
```

Requires `gcc` for `go-sqlite3` (CGO). On macOS: `xcode-select --install`.

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## To run

**Backend** — requires `gcc` for cgo/sqlite3:

```bash
cd backend && cp .env.example .env && go mod tidy && go run main.go
```

**Frontend:**

```bash
cd frontend && cp .env.example .env && npm install && npm run dev
```

The Vite dev server proxies `/api/*` to the Go backend automatically, so no CORS config is needed during development.

---

## API

| Method | Path         | Description   |
|--------|--------------|---------------|
| GET    | /api/health  | Health check  |

---

## Extending

- **New route**: add handler in `backend/handlers/`, register in `main.go`.
- **New model**: add struct in `backend/models/`.
- **New page**: add file in `frontend/src/pages/`, add `<Route>` in `App.jsx`.
