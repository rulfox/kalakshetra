# Kalakshetra Handpaintings — public site (Next.js)

The live website, replacing the legacy static `index.html`/Babel-in-browser pipeline at the
repo root. Fetches categories, items, lookbook slides, and site text from the `backend/` API
and renders real server-rendered HTML (fixing the previous site's core SEO problem — content
used to only appear after a client-side decompress+transpile step).

## Local development

```sh
cp .env.example .env.local   # point NEXT_PUBLIC_API_BASE_URL at your local backend
npm install
npm run dev                  # http://localhost:3000
```

Run the backend first (`cd ../backend && mvn spring-boot:run -Dspring-boot.run.profiles=dev`) —
this app falls back to today's hardcoded copy if the backend isn't reachable (see
`lib/api.ts`), so `npm run build`/`npm run dev` still work without it, but real content needs
the backend running.

## Structure

- `app/page.tsx` — the homepage (same single-page marketing flow as before: Hero → Philosophy
  → Shop → Lookbook → Story → How to Order → Footer).
- `app/shop/[category]/page.tsx`, `app/shop/[category]/[item]/page.tsx` — new, SEO-indexable
  routed pages per category/product (the homepage's product grid links out to these).
- `app/sitemap.ts`, `app/robots.ts` — generated from real content, not the old static files.
- `app/api/revalidate/route.ts` — the backend calls this after an admin edit so content updates
  without waiting out the ISR cache.
- `app/api/newsletter/route.ts` — server-side proxy to the backend's public newsletter endpoint.
- `components/ui/` — ported from the repo-root `components/**` design-system package (copied,
  not imported — that package stays untouched as its own product).
- `components/sections/` — the page sections, each a port of the corresponding function in
  `ui_kits/website/sections.jsx`.
- `styles/tokens/` — copied from the repo-root `tokens/*.css`.

## Deployment

Dockerfile is multi-stage (`output: 'standalone'`), reads `PORT` from the environment (Railway
injects it). Required env vars at build time: `NEXT_PUBLIC_API_BASE_URL`,
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_S3_PUBLIC_BASE_URL`. At runtime: `REVALIDATE_SECRET`
(shared with the backend's `NEXTJS_REVALIDATE_SECRET`).
