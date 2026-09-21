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

## Routes

| Route            | Contents                                                            |
| ---------------- | ------------------------------------------------------------------- |
| `/`              | Hero, the "Recién llegados" carousel, and the combination guide      |
| `/ella-y-el`     | The full collection with set and style filters                       |
| `/producto/[id]` | One prerendered page per product, built from `generateStaticParams`  |
| `/bolsa`         | The bag: quantities, subtotal, and checkout hand-off                 |
| `/api/products`  | JSON catalog                                                         |

## Project structure

- `src/app/layout.tsx` — root layout with the header, footer, and cart provider
- `src/lib/products.ts` — product catalog and helpers
- `src/components/` — cart context, header, carousel, bag, and product card UI

The bag is kept in `localStorage` under `amani-bolsa` (product ids and quantities only, so
prices always come from the catalog) and read through `useSyncExternalStore`, which keeps the
first client render in step with the empty server render.

## API

`GET /api/products` returns the catalog:

```json
{ "count": 26, "products": [ { "id": "cubana-italiana", "name": "Cubana Italiana", ... } ] }
```

## Cloud Agent environment

`.cursor/environment.json` configures the [Cursor Cloud Agent](https://cursor.com/docs/cloud-agent/setup) environment:
`npm ci` installs dependencies and a `dev` terminal runs the Next.js server on port 3000.
