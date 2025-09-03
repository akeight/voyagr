# Voyagr — Frontend (Vite + React + TypeScript + Tailwind)

This is the React SPA for Voyagr, an AI-powered travel itinerary app.

> **Status:** Core UI is implemented. API calls target your FastAPI backend.  
> **Planned (disabled by default):** Authentication via **Clerk** and itinerary generation via **OpenAI** (proxied through backend).

---

## ✨ Features

- **Vite + React + TypeScript** for fast DX
- **TailwindCSS** utility styling (+ custom fade-in animations)
- **React Router** pages: `/`, `/generate`, `/ideas`
- **State via context** for trip ideas + loading overlay
- **Axios** API client

**Planned Future Features:**
- **Clerk** authentication and route gating
- **OpenAI LLM** itinerary generation

---

## 🧰 Tech Stack

- React 18, TypeScript, Vite
- TailwindCSS, PostCSS, Autoprefixer
- React Router, TanStack Query
- Axios for HTTP

---

## ✅ Prerequisites

- Node 18+ and **npm**
- A running backend at `http://localhost:8000` (or set `VITE_API_URL`)
- *(Only when you enable auth later)* A Clerk application (publishable key)

---

## 📜 Scripts & How to Use Them

| Command | What it does | When to use |
|---|---|---|
| `npm install` | Install dependencies | Initializing project
| `npm run dev` | Starts the Vite dev server at `http://localhost:5173` | Day-to-day development with hot reloading |
| `npm build` | Creates a production build in `dist/` | Before deploying or testing production assets |
| `npm preview` | Serves the `dist/` build locally | Sanity-check the production build locally |
| `npm lint` | Runs ESLint on the codebase | Keep code quality consistent; CI checks |
| `npm tsc` | Type-checks the project (no emit) | Catch TypeScript errors without building |



