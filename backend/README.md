# Kalakshetra Handpaintings — backend (Spring Boot)

The admin API used by both `frontend/` (public read-only) and `admin/` (authenticated CRUD).
Java 21, Spring Boot 3, PostgreSQL in production, H2 for local dev.

## Local development (no Docker/Postgres required)

```sh
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

This uses a file-based H2 database (`backend/data/`, gitignored) and seeds it with the exact
content that's hardcoded today in `ui_kits/website/sections.jsx` (`DataSeeder`), plus a default
admin login (`admin` / `dev-admin-password` — see `application-dev.yml`; never used in `prod`,
which requires `ADMIN_BOOTSTRAP_USERNAME`/`ADMIN_BOOTSTRAP_PASSWORD` to be set explicitly).

```sh
mvn test          # unit tests + a full integration test against an in-memory H2 instance
```

## API surface

- `GET /api/public/{categories,items,lookbook,site-content}`, `POST /api/public/newsletter` —
  no auth, consumed by `frontend/`.
- `POST /api/admin/auth/{login,refresh,logout}`, full CRUD + `/reorder` on
  `/api/admin/{categories,items,lookbook}`, `GET/PUT /api/admin/site-content`,
  `GET /api/admin/newsletter-subscribers`, `POST /api/admin/uploads/presign` — JWT-protected,
  consumed by `admin/`.

## Images

`S3UploadService` issues presigned S3 `PUT` URLs (`POST /api/admin/uploads/presign`) — this
backend never proxies image bytes. See `docs/aws-setup.md` for the one-time bucket/CORS/IAM
setup (needs a real AWS account; not something this repo can provision for you).

## Deployment

Dockerfile is a multi-stage Maven build. See `docs/aws-setup.md` and the root `docs/deployment.md`
for the full Railway env var list (`SPRING_PROFILES_ACTIVE=prod`, Postgres `PG*` vars, `JWT_SECRET`,
`AWS_*`, `NEXTJS_REVALIDATE_*`, `ADMIN_BOOTSTRAP_*`).
