# Hippo Studio

A product experience portfolio for [Hippo](https://github.com/sumaanta99/hippo) — built around an interactive terminal that talks to the real Hippo backend.

## Stack

- Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion
- Hippo API (Python · FastAPI · SQLite · OpenAI)

## Local development

### 1. Start the Hippo backend

From the `hippo` project:

```bash
cd ../hippo
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add OPENAI_API_KEY
python app/run_api.py
```

The API runs at `http://127.0.0.1:8000`.

### 2. Start the studio

```bash
cd hippo-studio
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The frontend proxies `/backend/*` to the Hippo API. Every terminal message hits `POST /chat` on the real engine.

## Production deployment

**Your API:** [https://hippo-api.onrender.com](https://hippo-api.onrender.com) (live — `/health` returns ok)

Deploy the **frontend** to Netlify (backend is already on Render).

### Netlify — Environment Variables

In Netlify → your site → **Site configuration → Environment variables**, add:

| Variable | Value |
|---|---|
| `HIPPO_API_URL` | `https://hippo-api.onrender.com` |
| `NEXT_PUBLIC_HIPPO_API_URL` | `/backend` |
| `NEXT_PUBLIC_SITE_URL` | Your Netlify URL, e.g. `https://hippo-studio.netlify.app` |
| `ANALYTICS_ADMIN_KEY` | Copy from Render → **hippo-api** → **Environment** |

Redeploy after saving (or push a commit to trigger a build).

### Render — after Netlify deploy

In Render → **hippo-api** → **Environment**, set:

```
HIPPO_CORS_ORIGINS=https://your-site.netlify.app,http://localhost:3000
```

> With `NEXT_PUBLIC_HIPPO_API_URL=/backend`, chat goes through Netlify's server — CORS is optional for chat, but set it for analytics.

### Sync your analytics key

Copy `ANALYTICS_ADMIN_KEY` from Render into Netlify env vars and your local `.env.local` (for `npm run analytics`).

### Deploy frontend

Connect the GitHub repo at [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**. Netlify reads `netlify.toml` automatically.

### Verify

```bash
curl https://hippo-api.onrender.com/health
# → {"status":"ok"}

# After Vercel deploy — open your studio URL and send a message in the terminal
# First request after idle may take ~30s (Render cold start)

export HIPPO_API_URL=https://hippo-api.onrender.com
export ANALYTICS_ADMIN_KEY=<from Render dashboard>
npm run analytics
```

---

Deploy **backend first**, then **frontend**. The studio is a static Next.js app that proxies API calls server-side.

### Backend (Hippo API)

Deploy the `hippo` repo to a persistent host (Railway, Render, Fly.io, etc.).

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `HOST` | No | Bind address (use `0.0.0.0` in production) |
| `PORT` | No | Port (default `8000`) |
| `RELOAD` | No | Set `false` in production |
| `HIPPO_CORS_ORIGINS` | Yes | Your studio URL, e.g. `https://hippo.example.com` |
| `ANALYTICS_ADMIN_KEY` | Yes | Secret for private usage reports |
| `DATABASE_PATH` | No | SQLite path (use a persistent volume) |

Start command:

```bash
cd app && uvicorn api.server:create_app --factory --host 0.0.0.0 --port $PORT
```

Verify: `GET https://your-api.example.com/health` → `{"status":"ok"}`

### Frontend (Hippo Studio)

Deploy to Vercel, Netlify, or any Node host.

| Variable | Required | Description |
|---|---|---|
| `HIPPO_API_URL` | Yes | Public backend URL, e.g. `https://api.example.com` |
| `NEXT_PUBLIC_HIPPO_API_URL` | No | Keep `/backend` (recommended — uses proxy) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public studio URL for SEO metadata |
| `ANALYTICS_ADMIN_KEY` | Yes | Same value as backend — for `npm run analytics` |

Build:

```bash
npm run build
npm run start
```

### Post-deploy checklist

- [ ] Backend `/health` returns ok
- [ ] Studio terminal sends a message and gets a response
- [ ] `HIPPO_CORS_ORIGINS` matches your studio domain exactly
- [ ] `NEXT_PUBLIC_SITE_URL` matches your deployed studio URL
- [ ] OpenAI key is set on the backend (not exposed to the browser)
- [ ] SQLite database is on a persistent volume

## Private analytics

Usage is tracked on the backend (SQLite) — not shown on the site.

```bash
# Set the same ANALYTICS_ADMIN_KEY on backend and in .env.local
export ANALYTICS_ADMIN_KEY=your-secret
export HIPPO_API_URL=https://your-api.example.com
npm run analytics
```

Or call the admin API directly:

```bash
curl -H "Authorization: Bearer $ANALYTICS_ADMIN_KEY" \
  "$HIPPO_API_URL/admin/analytics"
```

## Environment reference

| Variable | Where | Default |
|---|---|---|
| `HIPPO_API_URL` | Studio (server) | `http://127.0.0.1:8000` |
| `NEXT_PUBLIC_HIPPO_API_URL` | Studio (browser) | `/backend` |
| `NEXT_PUBLIC_SITE_URL` | Studio | `http://localhost:3000` |
| `ANALYTICS_ADMIN_KEY` | Both | — |
| `HIPPO_CORS_ORIGINS` | Backend | `*` |

## Project structure

```
components/     UI — Terminal, Hero, CaseStudy, Navigation
hooks/          useTerminal, useChat, useSession
lib/            api.ts, analytics-client.ts, constants.ts
app/            Next.js routes, error pages, SEO
types/          Shared TypeScript types
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run analytics` | Print private usage report |

## Keyboard shortcuts

- **Enter** — Send message
- **↑ / ↓** — Input history
- **Ctrl+L** — Clear terminal
