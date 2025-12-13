# Voyagr — AI Travel Agent 🗺️

A full‑stack, AI‑powered travel itinerary app. The frontend (React + Vite) lets users generate and manage trips; the backend (FastAPI) orchestrates AI calls (OpenAI), persists data, and exposes REST endpoints. Optional user auth via Clerk to store trips.

**Status**: active development. This README covers repo‑wide setup, conventions, and workflows. See `/client` and `/server` READMEs for service‑specific details.

---

## Features

* ✈️ **AI itinerary generation** from user preferences, budgets, and trip goals
* 🗺️ **Editable, day‑by‑day plans** with activities, food, and logistics
* 🔐 **Auth (optional)** with Clerk (JWT verification in FastAPI)
* ⚙️ **Typed API** (Pydantic / TypeScript types), request validation, CORS
* 🧪 **Tests** across frontend (vitest/testing‑library) and backend (pytest)
* **Future**: OpenAI integration, map integrations, saved trips, sharing.

---

## Architecture

```
+---------------------+        HTTPS        +---------------------+
|  React + Vite (TS)  |  <--------------->  |     FastAPI (Py)    |
|  /client            |                     |  /server            |
|  Clerk (frontend)   |      REST/JSON      |  OpenAI client      |
+----------+----------+                     |  DB (Postgres)
           |                                |  Auth (Clerk JWKS)  |
           |  .env (VITE_*)                 +----------+----------+
           |                                            |
           |                                 External providers
           |                              (OpenAI, Maps, etc.)
```

---

## Prerequisites

* **Node.js** ≥ 18 (20+ recommended) and **npm**
* **Python** 3.11+ with **conda**

---

## Quickstart

### Option A: Local dev (recommended)

**1) Clone & set envs**

```bash
git clone https://github.com/akeight/voyagr.git voyagr
cd voyagr
cp clent/.env.local.example client/.env.local   # create & fill
cp server/.env.example server/.env                 # create & fill
```

**2) Backend** (FastAPI)

```bash
cd client
# Create env
conda create -n voyagr-py311 python=3.11 -y && conda activate travel-agent

# Install deps
pip install -r requirements.txt  # or: pip install -e .

# Run API
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

* API dev URL: `http://localhost:8000`
* Docs: `http://localhost:8000/docs`

**3) Frontend** (React + Vite)

```bash
cd ../client
npm install
npm run dev
```

* Web dev URL: `http://localhost:5173`

> Ensure `VITE_API_URL` in `client/.env.local` matches the backend URL.

---

## Common Workflows

**Run everything (two terminals)**

```bash
# Terminal 1
cd server && uvicorn app.main:app --reload
# Terminal 2
cd client && npm run dev
```

**Type‑check & lint**

```bash
# Frontend
cd client && npm tsc && npm lint
# Backend
cd server && ruff check . && mypy app
```

**Run tests**

```bash
# Frontend
cd client && npm test
# Backend
cd server && pytest -q
```

**Format**

```bash
# Frontend
cd client && npm format
# Backend
cd server && ruff format . && black .
```

---

## Roadmap

* [ ] Integrate Clerk end‑to‑end (frontend gate + backend JWT verify)
* [ ] Add Alembic migrations and Postgres by default
* [ ] Ship CI (ruff/black/mypy/pytest + frontend checks)
* [ ] Map & place details view; image galleries; better day editor UX
* [ ] Rate limiting & request caching for AI endpoints
* [ ] Save and share itineraries

---

## License


---
