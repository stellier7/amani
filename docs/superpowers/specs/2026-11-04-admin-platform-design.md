# Amani Joyería admin platform (v1)

Date: 2026-11-04  
Status: approved  
URL: `amanijoyeria.com/admin` (path on the existing Next.js app)

## Goal

Give the jewelry owner and the site operator a Spanish admin to add, edit, and delete catalog pieces (including photos) without a code deploy. WhatsApp stays the checkout. Stock, weight, cost, and notes stay private.

## Non-goals (v1)

- Subdomain (`admin.amanijoyeria.com`)
- Order management or WhatsApp Business API
- Homepage/hero CMS
- Multiple photos per piece
- Changing a piece’s URL after create
- Email invites (passwords are set in admin)
- Staff accounts in production on day one (the role exists)

## People

Two roles:

| Role | Who (v1) | Can |
| --- | --- | --- |
| `admin` | Owner and site operator | Product CRUD, photo upload, see cost/weight/stock/notes, invite users, delete products |
| `staff` | Future employee | Add/edit products; see stock, weight, notes; cannot see or edit cost; cannot delete products; cannot invite users |

Each person has their own email/password. Products record who last saved and when.

v1 seeds admin accounts from environment variables. Staff can be created in `/admin/usuarios` later.

## Product model

### Shop (public)

Same fields as today’s `Product`: `id`, `name`, `category`, `style`, `price`, `material`, `description`, `pieces`, `image`, `shot`, `featured`, `audience`, `soldOut`, `gradient`.

`soldOut` is **derived** and is the only stock signal the shop ever sees:

```
soldOut = stock === 0 || soldOutOverride
```

Shoppers never see stock, weight, cost, or notes. `GET /api/products` and every storefront page omit those fields.

### Admin only

- `stock` — integer ≥ 0. Never rendered on the shop.
- `weightGrams` — optional integer ≥ 0.
- `cost` — optional integer ≥ 0, HNL (same units as public price). Hidden from staff.
- `notes` — optional free text.
- `soldOutOverride` — if true, shop shows Agotado even when `stock > 0`.
- `updatedAt`, `updatedByEmail`.

### Identity

New pieces get `id` by slugifying the name (`Cubana Italiana` → `cubana-italiana`). If that slug exists, save is blocked until the name is unique. `id` is immutable after create so WhatsApp links keep working.

v1: one photo per piece.

Delete removes the piece from the shop. Old `/producto/[id]` URLs render not-found.

## Screens

Admin is Spanish, phone-usable, `noindex`, and does not use the store header, bag, or footer.

| Path | Who | Contents |
| --- | --- | --- |
| `/admin/login` | public | Email + password. Generic error on failure. After login, return to the intended `/admin` URL. |
| `/admin` | any signed-in role | Product table: photo, name, public price, stock, sold out, last editor. Search by name. Filter: all / on sale / sold out. New piece. Users link (admins). Sign out. |
| `/admin/productos/nuevo` | any signed-in role | Create form. |
| `/admin/productos/[id]` | any signed-in role | Edit form. Delete (admins only) with confirm-by-name. |
| `/admin/usuarios` | admin | Create user: name, email, role, initial password. List existing users. |

Create/edit form: public fields on top; a labeled private block (stock, weight g, cost L, notes). Staff do not see the cost field. Saving stock `0` forces shop Agotado even if the override switch is off.

## Architecture

Same Vercel/Next.js 16 App Router app.

- **Data:** Postgres-compatible DB via Drizzle. Local/dev/test uses PGlite (file under `data/`, gitignored). Production uses `DATABASE_URL` (Neon or any Postgres).
- **Auth:** Email/password, httpOnly JWT session cookie (`amani_session`), `src/proxy.ts` protecting `/admin` except `/admin/login`. Passwords hashed with bcrypt. `AUTH_SECRET` required.
- **Images:** `public/uploads/` in development. Vercel Blob when `BLOB_READ_WRITE_TOKEN` is set. Failed upload keeps the previous photo.
- **Shop data flow:** Catalog moves out of the hardcoded runtime source of truth. Current pieces are seeded once. Storefront helpers keep taking a `Product[]` and filter in memory. Cart resolves ids from `GET /api/products` so prices stay live.
- **Cache:** Product writes call `revalidatePath` for `/`, `/ella`, `/el`, `/producto/[id]`, and `/api/products`. Product pages are dynamic (no build-time `generateStaticParams` from a TS module).

## Errors

- Login: one generic message; do not reveal whether the email exists.
- Expired session: redirect to login with return path.
- Staff hitting Users, Delete, or cost: forbidden UI, not a crash.
- Validation: required name and public price ≥ 0; stock integer ≥ 0; weight/cost optional but if present ≥ 0; duplicate slug blocked. Field-level errors.
- Photo failure: previous photo remains; form reports the image did not save.
- Delete: confirm by typing the piece name.
- DB down: admin shows a load error. Shop does **not** fall back to the old hardcoded catalog (stale prices).

## Seed

Import the current ~29 pieces. `stock` is `0` when today’s `soldOut` is true, otherwise `1`. `soldOutOverride` is false. Weight, cost, and notes start empty.

Admin users from env (not committed):

- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — site operator
- `SEED_OWNER_EMAIL` / `SEED_OWNER_PASSWORD` — jewelry owner

## Verification

- Stock `0` → shop Agotado and bag blocked; override does the same when stock > 0.
- Public API and product pages omit private fields.
- Logged-out `/admin` redirects to login.
- Staff cannot see cost, delete, or invite users.
- Seeded catalog still appears on `/`, `/ella`, `/el`, `/producto/[id]`.
- WhatsApp checkout unchanged.
- Wrong password does not leak account existence.
- Duplicate slug refused; photo failure does not wipe the existing image.
