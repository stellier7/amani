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
| `/api/products`  | JSON catalog                                                         |

## Project structure

- `src/app/layout.tsx` — root layout with the header, footer, and cart provider
- `src/lib/products.ts` — product catalog and helpers
- `src/components/` — cart context, header, carousel, and product card UI

## API

`GET /api/products` returns the catalog:

```json
{ "count": 26, "products": [ { "id": "cubana-italiana", "name": "Cubana Italiana", ... } ] }
```

## Cloud Agent environment

`.cursor/environment.json` configures the [Cursor Cloud Agent](https://cursor.com/docs/cloud-agent/setup) environment:
`npm ci` installs dependencies and a `dev` terminal runs the Next.js server on port 3000.
