# UrlShortner

A simple URL shortener (frontend + backend). This repo contains a basic web app to create short aliases for long URLs and redirect users using those aliases.

---

## Contents

* `backend/` — Node.js/Express API that creates and resolves short URLs.
* `frontend/` — Simple web UI (React or plain JS) to create and use short links.

---

## Features

* Shorten long URLs
* Redirect from short code to original URL
* Basic validation to ensure target URL is valid

---

## Tech stack (what to expect)

* JavaScript (Node.js + Express) for backend
* A simple frontend (React or vanilla JS + HTML/CSS)
* Persistent store (MongoDB, JSON file, or in-memory map) — configure in backend

> NOTE: The exact stack/config may be located in `backend/package.json` and `frontend/package.json`. If you need the README adapted to the exact tech choices in the repo, tell me and I'll read those files and update.

---

## Prerequisites

* Node.js (v16+ recommended)
* npm or yarn
* (Optional) MongoDB if backend is configured to use it

---

## Quick start — Backend

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
# or
# yarn
```

3. Create a `.env` file (if required) and add environment variables. Common ones:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlshortner
BASE_URL=http://localhost:5000
```

4. Start the backend:

```bash
npm start
# or
npm run dev  # if repo includes nodemon/dev script
```

The API should be available at `http://localhost:5000` (or the `PORT` you set).

---

## Quick start — Frontend

1. Open a terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Configure the API base URL (if needed). Usually in an `.env` or a config file:

```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the frontend:

```bash
npm start
```

Open `http://localhost:3000` (or the port the frontend uses).

---

## API (common endpoints)

These are typical endpoints for a URL shortener. Verify actual routes in `backend` source.

* `POST /api/shorten` — create a short URL. Body: `{ "url": "https://example.com" }` → returns short code + short URL.
* `GET /:code` — redirect to original URL contained by `code`.
* `GET /api/stat/:code` — (optional) stats about a short link.

---

## Environment / Configuration tips

* Use a persistent DB (MongoDB) for production. For quick demos, an in-memory store is fine but data will be lost on restart.
* Set `BASE_URL` to the domain where you host the frontend or backend (used to generate full short links).

---

## Deployment (short)

* Backend: host on platforms like Heroku, Railway, Render, Vercel (serverless), or any VPS. Ensure environment variables and DB connection are set.
* Frontend: host on Vercel, Netlify, or GitHub Pages and point the API calls to the deployed backend.

---

## Tests

If repo includes tests, run:

```bash
npm test
```

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/awesome`
3. Commit and push
4. Open a PR with a clear description


