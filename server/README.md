# Treatment-Finder (server)

This folder contains the Express server for the Treatment-Finder site.

## Quick start (local)

1. Copy `.env.example` to `.env` and fill values (do NOT commit `.env`):

   - `MONGO_URL` — MongoDB connection string (use MongoDB Atlas in production)
   - `PORT` — port to run on (optional; defaults to 8080)

2. Install and run:

```powershell
cd "server"
npm install
npm run dev    # for development with nodemon
# or
npm start      # to run with node
```

3. Open: `http://localhost:8080` (or your configured PORT)

## Health check

- `GET /health` returns a small JSON object for load balancers and uptime checks.

## Deploying

Recommended (simple): Render.com

- Push your repo to GitHub.
- Create a new Web Service on Render and connect to your repo.
- Set the Build Command to the default (Render runs `npm install`).
- Set the Start Command to `npm start`.
- Add environment variables in Render:
  - `MONGO_URL` = your MongoDB Atlas connection string
  - (Optional) `NODE_ENV` = production

Heroku (alternative):

- Ensure `Procfile` exists (this repo includes one).
- Set the `MONGO_URL` config var in Heroku settings.
- Deploy via GitHub or Heroku Git.

## Notes

- Use MongoDB Atlas for production; update `MONGO_URL` accordingly.
- Keep secrets out of git; use environment variables.
- If you need a static-only deployment, deploy `client/` separately to Netlify/Vercel and point API calls to the server URL.
