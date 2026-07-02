# Mohd Tashwaruddin Safin — Portfolio

A modern, professional developer portfolio built with the **MERN stack**, deployed on **Render** (backend) and **Vercel** (frontend).

- **Frontend:** React + Vite + Material UI + Framer Motion → Vercel
- **Backend:** Node.js + Express + MongoDB Atlas → Render (long-lived Web Service)
- **Deployment:** Render + Vercel (both have generous free tiers)

## Project Structure

```
portfolio/
├── client/                  # React frontend (Vite) — deployed to Vercel
│   ├── public/
│   │   └── safin.jpg        # Your photo (place here)
│   ├── src/
│   │   ├── components/      # Section components
│   │   ├── data/            # Static content fallback
│   │   ├── services/        # API client
│   │   ├── theme.js         # MUI theme
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── api/                     # Express API — deployed to Render
│   ├── server.js            # Long-lived server entrypoint
│   ├── app.js               # Express factory (middleware + routes)
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── seed/
│   └── package.json
├── render.yaml              # Render blueprint (auto-provisions the API)
├── vercel.json              # Vercel config (builds client/)
└── README.md
```

---

## Live Deployment Guide (step-by-step)

You will deploy **two services**:

1. **Backend API** → [Render](https://render.com) (free Web Service)
2. **Frontend** → [Vercel](https://vercel.com) (free static hosting)
3. **Database** → [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free M0 cluster)

The order matters: deploy the **backend first**, get its URL, then point the frontend at it.
Vercel should deploy only the static `client/` app. The backend stays on Render, which avoids the Hobby-plan serverless function limit.

### Step 1 — Push the repo to GitHub

```bash
cd "/home/safin/Documents/Drive E/professional/portfolio"
git init
git add .
git commit -m "Initial portfolio"
# Create an empty repo at github.com/new, then:
git branch -M main
git remote add origin git@github.com:<your-username>/<repo-name>.git
git push -u origin main
```

### Step 2 — Create the MongoDB Atlas database

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → **Sign up** → **Build a Database** → **Free (M0)**.
2. Pick any cloud provider/region close to you → name the cluster → click **Create**.
3. **Create a database user** (username + password) — save these, you'll need them.
4. **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`). Render's IPs rotate, so this is required for the free tier.
5. **Database** → **Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```
   Replace `<username>` and `<password>` with the credentials you just created.

### Step 3 — Deploy the backend to Render

**Option A — Blueprint (recommended):**

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New +** → **Blueprint**.
2. Connect your GitHub account and select your portfolio repo.
3. Render reads `render.yaml` and proposes a `safin-portfolio-api` Web Service → click **Apply**.
4. Once the service is created, open it → **Environment** → fill in:
   - `MONGODB_URI` = the Atlas connection string from Step 2.
   - `CLIENT_ORIGIN` = *(fill this after Step 4)* your Vercel URL.
5. Click **Save Changes** → Render redeploys automatically. Watch the logs for `🚀 API listening on...`.
6. Your API is live at `https://safin-portfolio-api.onrender.com`. Test it:
   ```
   https://safin-portfolio-api.onrender.com/api/health
   ```
   should return `{"status":"ok","uptime":...}`.

**Option B — Manual:**

1. **New +** → **Web Service** → connect your repo.
2. Settings:
   - **Root Directory:** `api`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
   - **Health Check Path:** `/api/health`
3. Add the same environment variables as above.

### Step 4 — Seed the database

After the first successful deploy, populate MongoDB with your CV data:

```bash
# From your machine
curl -X POST https://safin-portfolio-api.onrender.com/api/seed
```

You should see:
```json
{"message":"Database seeded.","profileId":"...","projects":2,"experiences":1}
```

Verify with:
```
https://safin-portfolio-api.onrender.com/api/profile
https://safin-portfolio-api.onrender.com/api/projects
```

### Step 5 — Deploy the frontend to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) → **Import** your GitHub repo.
2. Vercel auto-detects `vercel.json`. Keep the build focused on the client only: `cd client && npm install && npm run build`, with `client/dist` as the output directory.
3. **Environment Variables** → add:
   - `VITE_API_BASE` = `https://safin-portfolio-api.onrender.com`  *(no trailing slash)*
4. Click **Deploy**. Vercel gives you a URL like `https://your-portfolio.vercel.app`.

### Step 6 — Lock down CORS

Go back to your Render service → **Environment** → set:

- `CLIENT_ORIGIN` = your Vercel URL (`https://your-portfolio.vercel.app`)

Render auto-redeploys. Reload the frontend — the contact form should now POST to Render successfully.

### Step 7 — Custom domain (optional)

- **On Vercel:** Project → **Settings → Domains** → add your domain and follow the DNS instructions.
- After the domain is live, update `CLIENT_ORIGIN` on Render to the new domain too.

---

## Local Development

```bash
# 1. Install all deps
cd "/home/safin/Documents/Drive E/professional/portfolio"
cd api  && npm install
cd ../client && npm install
cd ..

# 2. Create local env files
cp api/.env.example api/.env
cp client/.env.example client/.env
# Edit api/.env: set MONGODB_URI to your Atlas string (or a local mongodb://localhost:27017/portfolio)
# Edit client/.env: set VITE_API_BASE=http://localhost:5000

# 3. Seed once (optional — only needed if DB is empty)
cd api && npm run seed && cd ..

# 4. Run both services
# Terminal 1 — backend on :5000
cd api && npm run dev

# Terminal 2 — frontend on :5173
cd client && npm run dev

# 5. Open http://localhost:5173
```

If `VITE_API_BASE` is empty, the frontend will use relative `/api/...` paths. The Vite dev server proxies these to `http://localhost:5000` (see `client/vite.config.js`).

---

## Where You Add Information Manually

This project is pre-loaded with your CV data (name, education, projects, experience, contact links) inside `api/seed/seedData.js` and the mirrored static file `client/src/data/fallback.js`. **You usually don't need to touch code at all.** The few manual spots are external — they live in dashboards, env files, and one optional file replace. Below is the full list, in the order you'll hit them.

### 1. Local secrets — `.env` files (only if you run locally)

Copy the example files once:

```bash
cp api/.env.example api/.env
cp client/.env.example client/.env
```

Edit these two values in `api/.env`:

| Variable | What to put |
| --- | --- |
| `MONGODB_URI` | The connection string from MongoDB Atlas (or `mongodb://localhost:27017/portfolio` for a local DB). |
| `CLIENT_ORIGIN` | `http://localhost:5173` while developing. |

Edit this in `client/.env`:

| Variable | What to put |
| --- | --- |
| `VITE_API_BASE` | Leave blank to use the Vite proxy, or set to `http://localhost:5000`. |

`.env` files are git-ignored, so secrets never leak.

### 2. MongoDB Atlas — `MONGODB_URI`

On **Step 2** of the deploy guide above, create the M0 cluster, then in **Database Access** create a user (username + password). The connection string has the form:

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

Paste the **whole string** into Render → Environment → `MONGODB_URI`. This is the single most important value — nothing else works without it.

### 3. Render — `MONGODB_URI` and `CLIENT_ORIGIN`

In Render → your `safin-portfolio-api` service → **Environment**:

| Variable | When to set | Value |
| --- | --- | --- |
| `MONGODB_URI` | Before first deploy | Atlas connection string from step 2. |
| `CLIENT_ORIGIN` | After Vercel gives you a URL (Step 5) | `https://your-portfolio.vercel.app` — controls CORS for the contact form. |

`PORT` (10000) and `HOST` (0.0.0.0) are already pinned by `render.yaml`, so leave them alone.

### 4. Seed the database — one curl after first Render deploy

After Render reports `🚀 API listening on...`, POST to the seed endpoint:

```bash
curl -X POST https://safin-portfolio-api.onrender.com/api/seed
```

This loads everything in `api/seed/seedData.js` into MongoDB. Re-run it any time you change that seed file.

### 5. Vercel — `VITE_API_BASE`

In Vercel → Project → **Settings → Environment Variables**:

| Variable | Value |
| --- | --- |
| `VITE_API_BASE` | `https://safin-portfolio-api.onrender.com` (no trailing slash). |

Without this, the page still renders (fallback data) and the contact form just won't reach the API.

### 6. CV content — `api/seed/seedData.js` (and mirror in `client/src/data/fallback.js`)

When your CV changes, edit `api/seed/seedData.js`. The `profile`, `projects`, and `experiences` arrays are fully populated — you only change values, not structure. After editing, re-run the curl above.

**Also keep `client/src/data/fallback.js` in sync.** It's the snapshot used the first 5 s (and on Render cold starts, when the API is slow). If you only edit the seed file, the fallback drifts and offline visitors see old info.

### 7. Photo — `client/public/safin.jpg`

`client/public/safin.jpg` is already in place. If you want to swap it: drop a new image at that exact path (overwrite), commit, and push — Vite serves files from `public/` as-is with hashed filenames not applied.

### 8. Custom domain — two places, if you buy one

- **Vercel → Settings → Domains** → add the domain, copy the DNS records into your registrar.
- **Render → Environment → `CLIENT_ORIGIN`** → set to the new Vercel domain so CORS still allows the contact form.

### 9. (Rare) `render.yaml` — service name

The blueprint names the service `safin-portfolio-api`. If that name is taken on Render, edit `render.yaml` line 3 (`name: safin-portfolio-api`) before clicking **Apply**, or pick **Manual** deploy instead of the blueprint.

---

**TL;DR — the only things you type yourself:**

1. `<username>` / `<password>` / `<cluster>` in the Atlas connection string.
2. The Atlas connection string → Render's `MONGODB_URI`.
3. The Render URL → Vercel's `VITE_API_BASE`.
4. The Vercel URL → Render's `CLIENT_ORIGIN`.
5. The one `curl -X POST .../api/seed` call.
6. Optionally edit `api/seed/seedData.js` + `client/src/data/fallback.js` when your CV changes.

---

## What's Deployed Where

| Concern | Host | Why |
| --- | --- | --- |
| React frontend | Vercel | Free, fast static hosting + global CDN, instant preview deploys from PRs. |
| Express API | Render | Long-lived Node process — better fit than Vercel serverless for a portfolio's low traffic (no cold starts). |
| MongoDB | Atlas | Free M0 tier, no credit card, no expiration. |

## License

MIT