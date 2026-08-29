FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Railway injects PORT; Next's standalone server.js reads it. BACKEND_API_BASE_URL is read at
# runtime (server-only), not baked in at build time.
ENV PORT=3100
EXPOSE 3100
CMD ["node", "server.js"]
