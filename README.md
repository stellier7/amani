# paski-jewelry

A modern fine-jewelry storefront built with [Next.js](https://nextjs.org) (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm ci        # install dependencies (or: npm install)
npm run dev   # start the dev server at http://localhost:3000
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the development server (port 3000) |
| `npm run build` | Create a production build                |
| `npm start`     | Serve the production build               |
| `npm run lint`  | Run ESLint                               |
| `npm test`      | Run Vitest unit tests                    |

## Routes

| Route                     | Contents                                                                 |
| ------------------------- | ------------------------------------------------------------------------ |
| `/`                       | Hero, destacados, shop-by-category, and the collection                   |
| `/ella` `/el`             | Audience catalogs                                                        |
| `/producto/[id]`          | Product page (from the database catalog)                                 |
| `/bolsa`                  | The bag: quantities, subtotal, and WhatsApp checkout                     |
| `/admin`                  | Catalog admin (login required)                                           |
| `/api/products`           | Public JSON catalog (no stock, weight, cost, or notes)                   |

## Project structure

- `src/app/layout.tsx` — root html/fonts
- `src/app/(shop)/layout.tsx` — store header, footer, and cart
- `src/lib/products.ts` — public product type and helpers
- `src/lib/catalog/` — database-backed catalog
- `src/app/admin/` — Spanish product admin
- `src/components/` — cart context, header, carousel, bag, and product card UI

Copy `.env.example` to `.env.local` and set `AUTH_SECRET` plus seed admin emails/passwords. Production also needs `DATABASE_URL` (Neon or any Postgres). WhatsApp checkout is unchanged.

The bag is kept in `localStorage` under `amani-bolsa` (product ids and quantities only, so
prices always come from the catalog) and read through `useSyncExternalStore`, which keeps the
first client render in step with the empty server render.

## API

`GET /api/products` returns the catalog:

```json
{ "count": 29, "products": [ { "id": "cubana-italiana", "name": "Cubana Italiana", ... } ] }
```

## Cloud Agent environment

`.cursor/environment.json` configures the [Cursor Cloud Agent](https://cursor.com/docs/cloud-agent/setup) environment:
`npm ci` installs dependencies and a `dev` terminal runs the Next.js server on port 3000.
