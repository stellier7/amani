import { describe, expect, it } from "vitest";
import { toPublicProduct } from "./public-product";
import type { AdminProduct } from "./types";

function sample(overrides: Partial<AdminProduct> = {}): AdminProduct {
  return {
    id: "cubana-italiana",
    name: "Cubana Italiana",
    category: "Collares",
    style: "Cubana",
    price: 7500,
    material: "Plata 925",
    description: "Cadena cubana",
    pieces: "1 collar",
    image: "/images/amani/cubana-italiana.jpg",
    shot: "packshot",
    featured: true,
    audience: "hombre",
    soldOutOverride: false,
    stock: 2,
    weightGrams: 48,
    cost: 3200,
    notes: "Caja del proveedor 4",
    gradient: ["#e8e9e8", "#9fa5a8"],
    updatedAt: "2026-11-04T18:00:00.000Z",
    updatedByEmail: "owner@amanijoyeria.com",
    ...overrides,
  };
}

describe("toPublicProduct", () => {
  it("omits private admin fields from the shop payload", () => {
    const publicProduct = toPublicProduct(sample());
    expect(publicProduct).not.toHaveProperty("stock");
    expect(publicProduct).not.toHaveProperty("weightGrams");
    expect(publicProduct).not.toHaveProperty("cost");
    expect(publicProduct).not.toHaveProperty("notes");
    expect(publicProduct).not.toHaveProperty("soldOutOverride");
    expect(publicProduct).not.toHaveProperty("updatedAt");
    expect(publicProduct).not.toHaveProperty("updatedByEmail");
    expect(publicProduct.price).toBe(7500);
    expect(publicProduct.soldOut).toBeUndefined();
  });

  it("sets soldOut on the public product when stock is 0", () => {
    const publicProduct = toPublicProduct(sample({ stock: 0 }));
    expect(publicProduct.soldOut).toBe(true);
  });

  it("sets soldOut when the override is on even with stock remaining", () => {
    const publicProduct = toPublicProduct(
      sample({ stock: 3, soldOutOverride: true }),
    );
    expect(publicProduct.soldOut).toBe(true);
  });
});
