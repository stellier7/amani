# amani-jewelry

A Spanish-first fine-jewelry storefront for **Amani Joyería**, built with [Next.js](https://nextjs.org) (App Router), React 19, TypeScript, and Tailwind CSS v4.

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

## Project structure

- `src/app/page.tsx` — storefront landing page and product grid
- `src/app/api/products/route.ts` — JSON API that serves the product catalog
- `src/lib/products.ts` — product catalog and helpers
- `src/components/` — cart context, header, and product card UI

## API

`GET /api/products` returns the catalog:

```json
{ "count": 6, "products": [ { "id": "aurora-solitaire", "name": "Aurora Solitaire Ring", ... } ] }
```

## Cloud Agent environment

`.cursor/environment.json` configures the [Cursor Cloud Agent](https://cursor.com/docs/cloud-agent/setup) environment:
`npm ci` installs dependencies and a `dev` terminal runs the Next.js server on port 3000.
