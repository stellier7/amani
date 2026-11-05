import { eq } from "drizzle-orm";
import { toPublicProduct } from "@/lib/admin/public-product";
import { slugFromName } from "@/lib/admin/slug";
import type { AdminProduct, ProductInput } from "@/lib/admin/types";
import { rowToAdminProduct } from "@/lib/catalog/map-product";
import { products } from "@/lib/db/schema";
import type { AppDb } from "@/lib/db/types";
import type { Product } from "@/lib/products";

export class DuplicateProductIdError extends Error {
  readonly productId: string;

  constructor(productId: string) {
    super(`Ya existe una pieza con esa dirección (${productId}).`);
    this.name = "DuplicateProductIdError";
    this.productId = productId;
  }
}

function valuesFromInput(
  input: ProductInput,
  meta: { updatedAt: string; updatedByEmail: string | null },
) {
  return {
    name: input.name.trim(),
    category: input.category,
    style: input.style,
    price: input.price,
    material: input.material.trim(),
    description: input.description.trim(),
    pieces: input.pieces.trim(),
    image: input.image.trim(),
    shot: input.shot ?? null,
    featured: input.featured,
    audience: input.audience ?? null,
    soldOutOverride: input.soldOutOverride,
    stock: input.stock,
    weightGrams: input.weightGrams,
    cost: input.cost,
    notes: input.notes?.trim() ? input.notes.trim() : null,
    gradientFrom: input.gradient?.[0] ?? null,
    gradientTo: input.gradient?.[1] ?? null,
    updatedAt: meta.updatedAt,
    updatedByEmail: meta.updatedByEmail,
  };
}

export async function listAdminProducts(db: AppDb): Promise<AdminProduct[]> {
  const rows = await db.select().from(products);
  return rows
    .map(rowToAdminProduct)
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export async function listPublicProducts(db: AppDb): Promise<Product[]> {
  const adminProducts = await listAdminProducts(db);
  return adminProducts.map(toPublicProduct);
}

export async function getAdminProduct(
  db: AppDb,
  id: string,
): Promise<AdminProduct | undefined> {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  const row = rows[0];
  return row ? rowToAdminProduct(row) : undefined;
}

export async function getPublicProduct(
  db: AppDb,
  id: string,
): Promise<Product | undefined> {
  const product = await getAdminProduct(db, id);
  return product ? toPublicProduct(product) : undefined;
}

export async function createProduct(
  db: AppDb,
  input: ProductInput,
  actorEmail: string,
): Promise<AdminProduct> {
  const id = slugFromName(input.name);
  if (!id) {
    throw new Error("El nombre no produce una dirección válida.");
  }
  const existing = await getAdminProduct(db, id);
  if (existing) {
    throw new DuplicateProductIdError(id);
  }
  const now = new Date().toISOString();
  await db.insert(products).values({
    id,
    ...valuesFromInput(input, { updatedAt: now, updatedByEmail: actorEmail }),
  });
  const created = await getAdminProduct(db, id);
  if (!created) {
    throw new Error("No se pudo guardar la pieza.");
  }
  return created;
}

export async function updateProduct(
  db: AppDb,
  id: string,
  input: ProductInput,
  actorEmail: string,
): Promise<AdminProduct | undefined> {
  const existing = await getAdminProduct(db, id);
  if (!existing) return undefined;
  const now = new Date().toISOString();
  await db
    .update(products)
    .set(valuesFromInput(input, { updatedAt: now, updatedByEmail: actorEmail }))
    .where(eq(products.id, id));
  return getAdminProduct(db, id);
}

export async function deleteProduct(db: AppDb, id: string): Promise<boolean> {
  const existing = await getAdminProduct(db, id);
  if (!existing) return false;
  await db.delete(products).where(eq(products.id, id));
  return true;
}
