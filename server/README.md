# Voyagr — Backend (FastAPI)

FastAPI API for the Voyagr travel app.  
Serves itinerary endpoints and is designed to verify **Clerk** JWTs (auth is **future**). OpenAI usage will be proxied by the backend when enabled.

> **Status:** Core API scaffold + mock itinerary endpoint.  
> **Planned (disabled by default):** Clerk-protected routes and OpenAI-powered itinerary generation.

---

## ✨ Features

- FastAPI app with CORS configured for the Vite frontend
- Simple health check & mock itinerary endpoints
- Clean, layered layout: `api/` (routers) · `core/` (config/security) · `auth/` (Clerk JWKS verify) · `data/` (mock)
- Future **Clerk** auth (JWT via JWKS)
- Future **OpenAI** endpoint (backend calls OpenAI; key never in frontend)

---

## ✅ Prerequisites

- Python **3.10+**
- **uv** 
- Frontend running at `http://localhost:5173` (or adjust `FRONTEND_ORIGIN`)

---

## ⚙️ Setup

### 1) Create env file
```bash
cp .env.example .env
```
### 2A) Install & run with uv (recommended)
```bash
uv sync
```
### 3) Run dev server
```bash
uv run uvicorn app.main:app --reload --port 8000
```



