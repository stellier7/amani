import { beforeEach, describe, expect, it } from "vitest";
import { createPgliteDb } from "@/lib/db/pglite";
import { ensureSchema, seedIfEmpty } from "@/lib/db/ensure";
import type { AppDb } from "@/lib/db/types";
import type { ProductInput } from "@/lib/admin/types";
import {
  createProduct,
  deleteProduct,
  DuplicateProductIdError,
  getPublicProduct,
  listPublicProducts,
  updateProduct,
} from "./repository";

function input(overrides: Partial<ProductInput> = {}): ProductInput {
  return {
    name: "Collar Nuevo",
    category: "Collares",
    style: "Cubana",
    price: 1200,
    material: "Plata 925",
    description: "Pieza de prueba",
    pieces: "1 collar",
    image: "/uploads/collar-nuevo.jpg",
    featured: false,
    soldOutOverride: false,
    stock: 2,
    weightGrams: 12,
    cost: 400,
    notes: "Caja A",
    ...overrides,
  };
}

describe("catalog repository", () => {
  let db: AppDb;

  beforeEach(async () => {
    db = createPgliteDb();
    await ensureSchema(db);
    await seedIfEmpty(db);
  });

  it("seeds the current catalog and hides private fields on the public list", async () => {
    const publicProducts = await listPublicProducts(db);
    expect(publicProducts.length).toBeGreaterThan(20);
    const cubana = publicProducts.find((item) => item.id === "cubana-italiana");
    expect(cubana?.soldOut).toBe(true);
    expect(cubana).not.toHaveProperty("stock");
    expect(cubana).not.toHaveProperty("cost");
    expect(cubana).not.toHaveProperty("weightGrams");
    expect(cubana).not.toHaveProperty("notes");
  });

  it("creates a piece and exposes sold out when stock hits 0", async () => {
    const created = await createProduct(db, input(), "owner@amanijoyeria.com");
    expect(created.id).toBe("collar-nuevo");
    expect(created.cost).toBe(400);
    expect(created.updatedByEmail).toBe("owner@amanijoyeria.com");

    await updateProduct(
      db,
      created.id,
      input({ stock: 0 }),
      "owner@amanijoyeria.com",
    );
    const publicProduct = await getPublicProduct(db, created.id);
    expect(publicProduct?.soldOut).toBe(true);
    expect(publicProduct).not.toHaveProperty("stock");
  });

  it("rejects a duplicate slug", async () => {
    await createProduct(db, input(), "a@b.com");
    await expect(createProduct(db, input(), "a@b.com")).rejects.toBeInstanceOf(
      DuplicateProductIdError,
    );
  });

  it("deletes a piece from the shop", async () => {
    const created = await createProduct(db, input(), "a@b.com");
    expect(await deleteProduct(db, created.id)).toBe(true);
    expect(await getPublicProduct(db, created.id)).toBeUndefined();
  });
});
