# Admin platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `amanijoyeria.com/admin` so the owner and operator can manage the jewelry catalog (including private stock/weight/cost/notes and photos) without a deploy, while the shop and WhatsApp checkout stay the same.

**Architecture:** Same Next.js 16 app. Domain rules (sold-out, public DTO, roles, validation, slugs) are pure functions with Vitest. Drizzle + PGlite locally / Postgres in production. JWT session cookie + `src/proxy.ts`. Shop reads public products from the DB; admin mutations are server actions.

**Tech Stack:** Next.js 16 App Router, Drizzle ORM, PGlite, `@neondatabase/serverless`, jose, bcryptjs, Vitest, `@vercel/blob` (optional).

## Global Constraints

- Admin URL is `/admin` (not a subdomain).
- UI language is Spanish.
- Shoppers never see `stock`, `weightGrams`, `cost`, or `notes`.
- `soldOut = stock === 0 || soldOutOverride`.
- WhatsApp checkout is unchanged.
- Roles: `admin` | `staff` with exhaustive `switch` + `never` default.
- Imports stay at the top of the file.
- Product `id` is immutable after create.
- Do not fall back to the hardcoded catalog after the DB is the source of truth.
- Seeded catalog must still render on `/`, `/ella`, `/el`, `/producto/[id]`.

## File structure

- `src/lib/products.ts` — public `Product` type and presentational helpers only (keep catalog array as seed export moved to `src/lib/catalog-seed.ts`).
- `src/lib/admin/sold-out.ts` — `isPubliclySoldOut`
- `src/lib/admin/public-product.ts` — `toPublicProduct`
- `src/lib/admin/slug.ts` — `slugFromName`
- `src/lib/admin/validation.ts` — product form validation
- `src/lib/admin/permissions.ts` — role checks
- `src/lib/admin/types.ts` — `AdminProduct`, `Role`, form input
- `src/lib/db/schema.ts`, `src/lib/db/index.ts`, `src/lib/db/ensure.ts`
- `src/lib/catalog/repository.ts` — product CRUD
- `src/lib/auth/password.ts`, `session.ts`, `users.ts`
- `src/proxy.ts` — protect `/admin`
- `src/app/(shop)/layout.tsx` — store chrome
- `src/app/admin/**` — login, products, users
- `src/app/api/products/route.ts` — public DTO only
- Tests under `src/lib/admin/*.test.ts` and `src/lib/auth/*.test.ts`

---

### Task 1: Domain rules (TDD)

**Files:**
- Create: `src/lib/admin/sold-out.ts`, `public-product.ts`, `slug.ts`, `validation.ts`, `permissions.ts`, `types.ts`
- Create: `src/lib/admin/*.test.ts`
- Create: `vitest.config.mts`
- Modify: `package.json` (add `test` script)

**Interfaces:**
- Produces: `isPubliclySoldOut({ stock, soldOutOverride })`, `toPublicProduct(admin)`, `slugFromName(name)`, `validateProductInput(input)`, `canViewCost(role)`, `canDeleteProduct(role)`, `canManageUsers(role)`

- [ ] Add Vitest and failing tests for sold-out, stripping, slug, validation, permissions
- [ ] Implement pure functions until tests pass
- [ ] Commit domain rules

### Task 2: Database + seed + repository

**Files:**
- Create: `src/lib/db/schema.ts`, `index.ts`, `ensure.ts`
- Create: `src/lib/catalog/repository.ts`
- Create: `src/lib/catalog-seed.ts` (move array from `products.ts`)
- Modify: `src/lib/products.ts` (helpers only; `getProducts` becomes async DB-backed later in Task 4)
- Create: `.env.example`, gitignore `data/`

- [ ] Schema for `users` and `products`
- [ ] `ensureDb()` creates tables and seeds catalog + admin users from env
- [ ] Repository: list/get/create/update/delete; public list uses `toPublicProduct`
- [ ] Tests for repository against PGlite
- [ ] Commit

### Task 3: Auth

**Files:**
- Create: `src/lib/auth/password.ts`, `session.ts`, `users.ts`
- Create: `src/proxy.ts`
- Create: `src/app/admin/login/page.tsx`, `login-form.tsx`, `actions.ts`
- Tests: password hash/verify, permission gates, session payload

- [ ] Hash/verify passwords
- [ ] JWT cookie session
- [ ] Login action with generic error
- [ ] Proxy redirects anonymous `/admin` to login
- [ ] Commit

### Task 4: Admin UI + storefront wiring

**Files:**
- Create: admin layouts, product list/new/edit, users page, image storage helper
- Modify: `src/app/layout.tsx` (fonts only), add `(shop)/layout.tsx` with header/footer/cart
- Move shop routes under `(shop)/` if needed (or keep routes and only split layouts)
- Modify: `src/app/api/products/route.ts` to async public list
- Modify: homepage, `/ella`, `/el`, `/producto/[id]` to await DB products
- Modify: `CartContext` to resolve catalog from `/api/products`
- Modify: `next.config.ts` remote image patterns
- Modify: `robots.ts` disallow `/admin`

- [ ] Product list/search/filter, create/edit/delete, photo upload
- [ ] Users page (admin only)
- [ ] Shop omits private fields; sold-out derived
- [ ] Commit

### Task 5: Verify

- [ ] `npx vitest run`
- [ ] `npx tsc --noEmit`
- [ ] `npm run lint`
- [ ] `npm run build` (or `next build` with PGlite)
- [ ] Manual/browser: login, edit sold-out/stock, confirm shop, WhatsApp bag still works
