# Architecture

Kalakshetra Handpaintings now has four parts in this repo:

```
                    ┌─────────────────────────┐
                    │   backend/ (Spring Boot) │
                    │   PostgreSQL, JWT auth,  │
                    │   S3 presign, Flyway     │
                    └───────────┬──────────────┘
                     public API │ admin API (JWT)
              ┌──────────────────┴───────────────────┐
              │                                       │
   ┌──────────▼──────────┐               ┌────────────▼────────────┐
   │  frontend/ (Next.js) │               │   admin/ (Next.js)      │
   │  kalakshetra          │               │   admin.kalakshetra…    │
   │  handpaintings.com    │               │   handpaintings.com     │
   │  SSG/ISR, public       │               │   httpOnly-cookie auth, │
   │  read-only              │               │   Server Actions CRUD  │
   └───────────┬──────────┘               └────────────┬────────────┘
               │                                        │
               └───────────────┐          ┌─────────────┘
                                ▼          ▼
                          AWS S3 (product/lookbook images,
                          uploaded via presigned URLs —
                          browser talks to S3 directly)
```

Plus, untouched: the legacy static site (root `index.html` et al., still served by GitHub Pages
until DNS is cut over) and the design-system package (`components/**`, `tokens/**`,
`foundations/**`) that `frontend/`/`admin/` copied assets from rather than importing.

## Data flow

1. An admin edits content in `admin/` → a Server Action calls the backend's authenticated API →
   Postgres is updated → the backend fires an async ping to `frontend/`'s
   `/api/revalidate` route → the public site's cached page for that content is invalidated, so
   the change shows up on the next request instead of waiting out the hour-long ISR TTL.
2. Uploading a photo (in `admin/`, either for an item or a lookbook slide): the browser asks
   the backend (via `admin/`'s own server, keeping the JWT server-side) for a presigned S3 PUT
   URL, then uploads the file bytes directly to S3 — the backend never sees the image bytes,
   only the resulting URL, which gets saved on the item/slide record.
3. `frontend/` fetches public content server-side at build/request time (with ISR), so every
   page — including the new `/shop/[category]/[item]` detail pages — is real, crawlable HTML on
   first load, unlike the old site's client-only rendering.

## Why two separate Next.js apps instead of one

`frontend/` and `admin/` are deliberately separate deployments, not one app with a protected
route group: they have opposite caching needs (public/ISR vs. always-fresh authenticated data),
opposite SEO needs (indexable vs. `noindex`), and different domains
(`kalakshetrahandpaintings.com` vs. `admin.kalakshetrahandpaintings.com`). Splitting them also
means a bug or outage in one never takes down the other, and the admin portal's dependency
surface (auth, Server Actions, cookies) never leaks into the public site's build.

## See also

- `MIGRATION.md` — what's new vs. untouched, and the cutover sequence.
- `docs/deployment.md` — Railway services and every environment variable.
- `backend/docs/aws-setup.md` — the AWS S3 bucket/CORS/IAM setup (manual, real AWS account
  required).
- `backend/README.md`, `frontend/README.md`, `admin/README.md` — per-app details.
