# Deployment (Railway)

Three separate Railway services, one shared Postgres plugin. None of this was run from inside
the build session — no real Railway/AWS credentials were available there (only sandbox
placeholders) — so this is the checklist for you to run once, by hand or via the Railway CLI.

## 1. `backend` service

- Deploy from `backend/` (Dockerfile present — Railway auto-detects it).
- Add Railway's **Postgres plugin** to the project; it injects `PGHOST`/`PGPORT`/`PGDATABASE`/
  `PGUSER`/`PGPASSWORD` automatically — `application-prod.yml` reads those directly (not
  `DATABASE_URL`, whose `postgres://` scheme the JDBC driver doesn't accept as-is).
- Environment variables to set:

  | Var | Value |
  |---|---|
  | `SPRING_PROFILES_ACTIVE` | `prod` |
  | `JWT_SECRET` | a random 32+ byte string (e.g. `openssl rand -base64 48`) |
  | `ADMIN_BOOTSTRAP_USERNAME` | the studio owner's admin username |
  | `ADMIN_BOOTSTRAP_PASSWORD` | a strong password — only used once, to create the first admin row |
  | `PUBLIC_SITE_ORIGINS` | `https://kalakshetrahandpaintings.com` |
  | `ADMIN_PORTAL_ORIGINS` | `https://admin.kalakshetrahandpaintings.com` |
  | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` | from `backend/docs/aws-setup.md` |
  | `AWS_S3_BUCKET` | e.g. `kalakshetra-handpaintings-media` |
  | `AWS_S3_PUBLIC_BASE_URL` | the bucket's (or CloudFront's) public base URL |
  | `NEXTJS_REVALIDATE_URL` | `https://kalakshetrahandpaintings.com/api/revalidate` |
  | `NEXTJS_REVALIDATE_SECRET` | matches `frontend`'s `REVALIDATE_SECRET` |
  | `REVALIDATION_ENABLED` | `true` |

- Assign a Railway domain or a custom subdomain (e.g. `api.kalakshetrahandpaintings.com`) — the
  other two services need its URL.

## 2. `frontend` service (public site)

- Deploy from `frontend/`.
- Build-time env vars (Next.js inlines `NEXT_PUBLIC_*` into the client bundle, so these must be
  set *before* the build, not just at runtime):

  | Var | Value |
  |---|---|
  | `NEXT_PUBLIC_API_BASE_URL` | the backend service's URL |
  | `NEXT_PUBLIC_SITE_URL` | `https://kalakshetrahandpaintings.com` |
  | `NEXT_PUBLIC_S3_PUBLIC_BASE_URL` | same S3/CloudFront URL as the backend's `AWS_S3_PUBLIC_BASE_URL` |
- Runtime env var: `REVALIDATE_SECRET` (matches the backend's `NEXTJS_REVALIDATE_SECRET`).
- Point the apex domain `kalakshetrahandpaintings.com` at this service once you're ready to cut
  over from GitHub Pages (see root `MIGRATION.md`).

## 3. `admin` service (admin portal)

- Deploy from `admin/`.
- Runtime env var: `BACKEND_API_BASE_URL` (the backend service's URL) — this is the only one it
  needs; it makes no client-side calls to the backend at all.
- Point `admin.kalakshetrahandpaintings.com` at this service. Keep it off any public listing —
  its own `robots.txt`/metadata already say `noindex`, but the real gate is the login page.

## Order of operations

1. Deploy `backend` first, confirm `GET /api/public/categories` returns `[]` (empty, no data
   yet) on its Railway URL.
2. Deploy `admin`, log in with the bootstrap admin account, add the real categories/items/
   lookbook/site text (or port today's content by hand — the same copy `DataSeeder` uses
   locally is a good starting point, see `backend/src/main/java/.../config/DataSeeder.java`).
3. Deploy `frontend`, verify it renders the content you just added.
4. Cut DNS over per `MIGRATION.md`.
