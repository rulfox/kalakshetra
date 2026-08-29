# Deploying with the Railway CLI

Exact commands for standing up all three services (`backend`, `frontend`, `admin`) plus
Postgres in one Railway project, using the CLI (`npm install -g @railway/cli`, verified against
`railway 5.45.7`). Run these **from your own machine** — see "Why this wasn't run from inside
the build session" below for why it can't be run from there.

Run each block from the repo root unless noted. Replace `kalakshetra-handpaintings` with
whatever project name you prefer.

## 1. Sign in and create the project

```sh
railway login                       # opens a browser; --browserless for headless machines
railway init --name kalakshetra-handpaintings
```

`init` creates the project and links the current directory's environment — you only need to do
this once, from the repo root.

## 2. Add Postgres

```sh
railway add --database postgres --json
```

This provisions the plugin and injects `PGHOST`/`PGPORT`/`PGDATABASE`/`PGUSER`/`PGPASSWORD` into
services in the same project automatically — `backend/src/main/resources/application-prod.yml`
already reads those directly.

## 3. Create the three services

```sh
railway add --service backend --json
railway add --service frontend --json
railway add --service admin --json
```

This creates three empty services in the project (no source yet — that's `up`, next).

## 4. Set each service's environment variables

Generate a JWT secret and pick your two domains before running these:

```sh
JWT_SECRET=$(openssl rand -base64 48)

railway variable set SPRING_PROFILES_ACTIVE=prod --service backend --skip-deploys
railway variable set JWT_SECRET="$JWT_SECRET" --service backend --skip-deploys
railway variable set ADMIN_BOOTSTRAP_USERNAME=<studio-owner-username> --service backend --skip-deploys
railway variable set ADMIN_BOOTSTRAP_PASSWORD=<a-strong-password> --service backend --skip-deploys
railway variable set PUBLIC_SITE_ORIGINS=https://kalakshetrahandpaintings.com --service backend --skip-deploys
railway variable set ADMIN_PORTAL_ORIGINS=https://admin.kalakshetrahandpaintings.com --service backend --skip-deploys
railway variable set NEXTJS_REVALIDATE_URL=https://kalakshetrahandpaintings.com/api/revalidate --service backend --skip-deploys
railway variable set NEXTJS_REVALIDATE_SECRET=<shared-secret> --service backend --skip-deploys
railway variable set REVALIDATION_ENABLED=true --service backend --skip-deploys
# AWS_* vars: only after completing backend/docs/aws-setup.md (needs a real AWS account)
railway variable set AWS_ACCESS_KEY_ID=<from-aws-setup> --service backend --skip-deploys
railway variable set AWS_SECRET_ACCESS_KEY=<from-aws-setup> --service backend --skip-deploys
railway variable set AWS_REGION=ap-south-1 --service backend --skip-deploys
railway variable set AWS_S3_BUCKET=kalakshetra-handpaintings-media --service backend --skip-deploys
railway variable set AWS_S3_PUBLIC_BASE_URL=https://kalakshetra-handpaintings-media.s3.ap-south-1.amazonaws.com --service backend --skip-deploys

railway variable set NEXT_PUBLIC_SITE_URL=https://kalakshetrahandpaintings.com --service frontend --skip-deploys
railway variable set NEXT_PUBLIC_S3_PUBLIC_BASE_URL=https://kalakshetra-handpaintings-media.s3.ap-south-1.amazonaws.com --service frontend --skip-deploys
railway variable set REVALIDATE_SECRET=<shared-secret> --service frontend --skip-deploys
# NEXT_PUBLIC_API_BASE_URL is set in step 6, once the backend's URL is known

railway variable set BACKEND_API_BASE_URL=<set-in-step-6> --service admin --skip-deploys
```

(`--skip-deploys` just avoids triggering a deploy before there's any code to deploy — the
values are saved regardless.)

## 5. Deploy each service from its own directory

```sh
cd backend  && railway up --service backend  --detach --ci && cd ..
cd frontend && railway up --service frontend --detach --ci && cd ..
cd admin    && railway up --service admin    --detach --ci && cd ..
```

`--ci` streams build logs and exits when the build finishes (doesn't wait for the health check).
Watch progress with:

```sh
railway logs --service backend
railway deployment list --service backend --json
```

## 6. Wire the backend URL into `frontend`/`admin`, then redeploy them

```sh
railway domain --service backend --json          # or set a custom api.kalakshetrahandpaintings.com domain
# copy the resulting URL, then:
railway variable set NEXT_PUBLIC_API_BASE_URL=<backend-url> --service frontend --skip-deploys
railway variable set BACKEND_API_BASE_URL=<backend-url> --service admin --skip-deploys

# NEXT_PUBLIC_* vars are baked in at build time, so frontend needs a rebuild to pick it up:
cd frontend && railway up --service frontend --detach --ci && cd ..
cd admin    && railway up --service admin    --detach --ci && cd ..
```

## 7. Custom domains

```sh
railway domain kalakshetrahandpaintings.com --service frontend --port 3000
railway domain admin.kalakshetrahandpaintings.com --service admin --port 3100
```

Each prints the DNS records to add at your domain registrar (CNAME to Railway, typically) —
that's the actual DNS cutover step described in the root `MIGRATION.md`.

## Why this wasn't run from inside the build session

The session that built this branch had no real Railway account behind it, and its network
policy explicitly blocks `backboard.railway.app` (Railway's API host) — confirmed with
`railway whoami` (no session) and a direct `curl` to that host returning a `403` from the
sandbox's own egress proxy, not from Railway. It's the same reason `backend/docs/aws-setup.md`
is a checklist rather than an already-provisioned bucket: neither service is reachable with real
credentials from that environment. Run the commands above from a machine that has a browser (for
`railway login`) and normal internet access.
