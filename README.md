# Voyagr — AI Travel Agent 🗺️

Voyagr is a React + Vite frontend and FastAPI backend that implements a RAG pipeline (LangChain + OpenAI). Content is embedded with OpenAI, stored in Chroma, retrieved per-query, and composed into itinerary drafts with sources attached. The API exposes generation, retrieval, and trip CRUD endpoints; optional Clerk auth for saved trips.

---

### ✨ Inspiration

Before starting my software engineering degree, I dove into a LangChain + OpenAI bootcamp. One of the projects we built in Jupyter Notebooks was an AI travel agent. I wanted to take that prototype out of the notebook and turn it into a real, interactive web app.


### 👩🏻‍💻 Status 
Active development. This README covers repo‑wide setup, conventions, and workflows. See `/frontend` and `/backend` READMEs for service‑specific details.

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
|  /frontend          |                     |  /backend           |
|  Clerk (frontend)   |      REST/JSON      |  RAG with Langchain |
+----------+----------+                     |  DB (Postgres)
           |                                |  Auth (Clerk JWKS)  |
           |  .env (VITE_*)                 +----------+----------+
           |                                            |
           |                                 External providers
           |                              (Langchain, OpenAI model, MapBox)
```

---

## Prerequisites

* **Node.js** ≥ 18 (20+ recommended) and **npm**
* **Python** 3.11+ with **conda**

---

## Quickstart

### Local dev (will deploy when finished)

**1) Clone & set envs**

```bash
git clone https://github.com/akeight/voyagr.git voyagr
cd voyagr
cp frontend/.env.local.example frontend/.env.local   # create & fill
cp backend/.env.example backend/.env                 # create & fill
```

**2) Backend** (FastAPI)

```bash
cd backend
# Create env
conda create -n voyagr-py311 python=3.11 -y && conda activate voyagr-py311

# Install deps
pip install -r requirements.txt  # or: pip install -e .

# Run API
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

* API dev URL: `http://localhost:8000`
* Docs: `http://localhost:8000/docs`

**3) Frontend** (React + Vite)

```bash
cd ../frontend
npm install
npm run dev
```

* Web dev URL: `http://localhost:5173`

> Ensure `VITE_API_URL` in `frontend/.env.local` matches the backend URL.

---

## Common Workflows

**Run everything (two terminals)**

```bash
# Terminal 1
cd backend && uvicorn app.main:app --reload
# Terminal 2
cd frontend && npm run dev
```

**Type‑check & lint**

```bash
# Frontend
cd frontend && npm tsc && npm lint
# Backend
cd backend && ruff check . && mypy app
```

**Run tests**

```bash
# Frontend
cd frontend && npm test
# Backend
cd backend && pytest -q
```

**Format**

```bash
# Frontend
cd frontend && npm format
# Backend
cd backend && ruff format . && black .
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
