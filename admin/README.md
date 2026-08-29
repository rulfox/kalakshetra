# Kalakshetra Handpaintings — admin portal (Next.js)

Private, authenticated web admin at `admin.kalakshetrahandpaintings.com` for managing
categories, items, lookbook slides, homepage text, and viewing newsletter subscribers. Talks to
the same `backend/` API as the public site.

## Architecture

The browser only ever talks to this app's own server (Server Components/Actions/Route
Handlers) — it never calls the Spring backend directly. `/api/auth/login` calls the backend and
stores the resulting JWT/refresh token pair as **httpOnly cookies** on this app's domain;
`lib/backendClient.ts`'s `backendFetch()` reads that cookie on every backend call, and
transparently refreshes+retries once on a 401 before redirecting to `/login`. This means no
token is ever readable by client-side JS, and there's no CORS surface between the browser and
the backend to worry about.

Mutations (create/update/delete/reorder) are plain **Server Actions** (`'use server'` functions
in each section's `actions.ts`) bound directly to `<form action={...}>` — no client-side fetch
plumbing needed for CRUD. Image uploads are the one place the browser talks to something other
than this app's server: `components/ImageUploadField.tsx` requests a presigned URL from
`/api/uploads/presign` (itself a server-side proxy to the backend), then `PUT`s the file bytes
straight to S3 from the browser.

Reordering is "move up / move down" buttons rather than drag-and-drop — same outcome
(categories/items/lookbook slides can be reordered), less client-side complexity.

## Local development

```sh
cp .env.example .env.local   # point BACKEND_API_BASE_URL at your local backend
npm install
npm run dev                  # http://localhost:3100
```

Sign in with whatever `ADMIN_BOOTSTRAP_USERNAME`/`ADMIN_BOOTSTRAP_PASSWORD` the backend was
started with (the `dev` profile defaults to `admin` / `dev-admin-password` — see
`backend/src/main/resources/application-dev.yml`).

## Structure

- `middleware.ts` — fast cookie-presence redirect gate (real auth enforcement is
  `backendFetch`'s 401 handling on every backend call).
- `app/login/page.tsx`, `app/api/auth/{login,logout}/route.ts` — auth.
- `app/(dashboard)/categories/`, `.../[id]/items/`, `.../lookbook/`, `.../content/`,
  `.../newsletter/` — one folder per admin section, each with a `page.tsx` (data + forms) and
  `actions.ts` (the Server Actions that mutate).
- `components/ImageUploadField.tsx` — the presigned-upload widget shared by items and lookbook
  slides.

## Deployment

Dockerfile is multi-stage (`output: 'standalone'`), reads `PORT` from the environment (Railway
injects it). Only env var needed: `BACKEND_API_BASE_URL` (server-only — never baked into the
client bundle, since this app makes no client-side calls to the backend).
