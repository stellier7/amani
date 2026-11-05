import { sql } from "drizzle-orm";
import { hashPassword } from "@/lib/auth/password";
import { seedCatalog } from "@/lib/catalog-seed";
import type { AppDb } from "@/lib/db/types";
import { products, users } from "@/lib/db/schema";

export async function ensureSchema(db: AppDb): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS users (
      id text PRIMARY KEY,
      email text NOT NULL UNIQUE,
      name text NOT NULL,
      password_hash text NOT NULL,
      role text NOT NULL,
      created_at text NOT NULL
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS products (
      id text PRIMARY KEY,
      name text NOT NULL,
      category text NOT NULL,
      style text NOT NULL,
      price integer NOT NULL,
      material text NOT NULL,
      description text NOT NULL,
      pieces text NOT NULL,
      image text NOT NULL,
      shot text,
      featured boolean NOT NULL DEFAULT false,
      audience text,
      sold_out_override boolean NOT NULL DEFAULT false,
      stock integer NOT NULL DEFAULT 0,
      weight_grams integer,
      cost integer,
      notes text,
      gradient_from text,
      gradient_to text,
      updated_at text NOT NULL,
      updated_by_email text
    )
  `);
}

export async function seedIfEmpty(db: AppDb): Promise<void> {
  const existingProducts = await db.select({ id: products.id }).from(products).limit(1);
  if (existingProducts.length === 0) {
    const now = new Date().toISOString();
    await db.insert(products).values(
      seedCatalog.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category,
        style: product.style,
        price: product.price,
        material: product.material,
        description: product.description,
        pieces: product.pieces,
        image: product.image,
        shot: product.shot ?? null,
        featured: Boolean(product.featured),
        audience: product.audience ?? null,
        soldOutOverride: false,
        stock: product.soldOut ? 0 : 1,
        weightGrams: null,
        cost: null,
        notes: null,
        gradientFrom: product.gradient?.[0] ?? null,
        gradientTo: product.gradient?.[1] ?? null,
        updatedAt: now,
        updatedByEmail: null,
      })),
    );
  }

  const existingUsers = await db.select({ id: users.id }).from(users).limit(1);
  if (existingUsers.length > 0) return;

  const seeds = [
    {
      email: process.env.SEED_ADMIN_EMAIL,
      password: process.env.SEED_ADMIN_PASSWORD,
      name: process.env.SEED_ADMIN_NAME ?? "Operador",
      role: "admin" as const,
    },
    {
      email: process.env.SEED_OWNER_EMAIL,
      password: process.env.SEED_OWNER_PASSWORD,
      name: process.env.SEED_OWNER_NAME ?? "Dueño",
      role: "admin" as const,
    },
  ];

  const now = new Date().toISOString();
  for (const seed of seeds) {
    const email = seed.email?.trim().toLowerCase();
    const password = seed.password;
    if (!email || !password) continue;
    await db.insert(users).values({
      id: crypto.randomUUID(),
      email,
      name: seed.name,
      passwordHash: await hashPassword(password),
      role: seed.role,
      createdAt: now,
    });
  }
}

export async function ensureDb(db: AppDb): Promise<AppDb> {
  await ensureSchema(db);
  await seedIfEmpty(db);
  return db;
}
