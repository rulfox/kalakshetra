# Migration notes

This branch adds a full dynamic-content system alongside the existing static site — nothing
about the legacy site was touched, and nothing here is live until you deploy it and cut DNS
over.

## What's new

- **`backend/`** — Spring Boot + PostgreSQL API. Serves public read endpoints (categories,
  items, lookbook, site text) and an authenticated admin API (CRUD, drag-reorder, S3 presigned
  uploads).
- **`frontend/`** — the public website, rebuilt on Next.js (same homepage/brand experience,
  plus new SEO-indexable `/shop/[category]/[item]` pages). Meant to replace the root
  `index.html` once deployed.
- **`admin/`** — the web admin portal (login + category/item/lookbook CRUD + site-text editor +
  newsletter list), meant to be deployed at `admin.kalakshetrahandpaintings.com`.

## What's untouched

- Root `index.html`, `_build_index.py`, `scripts/pre-commit`, `CNAME`, root `robots.txt`/
  `sitemap.xml` — the legacy static site. GitHub Pages keeps serving it exactly as before.
- `components/**`, `tokens/**`, `foundations/**`, `SKILL.md`, `readme.md` — the reusable
  design-system package. `frontend/` and `admin/` copied what they needed from `tokens/*.css`
  and `components/**` rather than importing them directly, so this package has no build-time
  coupling to the new apps and stays a separate, still-current deliverable.

## Cutting over (when you're ready)

1. Deploy `backend/` to Railway (Postgres plugin + the env vars in `docs/deployment.md`), then
   apply the AWS setup in `backend/docs/aws-setup.md` (S3 bucket, CORS, IAM policy).
2. Deploy `frontend/` to Railway pointed at the backend; verify it on its Railway-provided
   subdomain before touching DNS.
3. Deploy `admin/` to Railway pointed at the backend; log in with the bootstrap admin account
   and add/verify content.
4. Only then: point `kalakshetrahandpaintings.com`'s DNS at the `frontend/` Railway service and
   `admin.kalakshetrahandpaintings.com` at the `admin/` service, replacing the GitHub Pages
   CNAME. The two can run side by side for as long as you like before that switch — nothing
   forces an immediate cutover.
