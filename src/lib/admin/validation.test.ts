import { describe, expect, it } from "vitest";
import { validateProductInput } from "./validation";
import type { ProductInput } from "./types";

function validInput(overrides: Partial<ProductInput> = {}): ProductInput {
  return {
    name: "Cubana Italiana",
    category: "Collares",
    style: "Cubana",
    price: 7500,
    material: "Plata 925",
    description: "Cadena cubana",
    pieces: "1 collar",
    image: "/images/amani/cubana-italiana.jpg",
    featured: false,
    soldOutOverride: false,
    stock: 1,
    weightGrams: 48,
    cost: 3200,
    notes: "Nota privada",
    ...overrides,
  };
}

describe("validateProductInput", () => {
  it("accepts a complete piece", () => {
    expect(validateProductInput(validInput())).toEqual({});
  });

  it("requires a name", () => {
    const errors = validateProductInput(validInput({ name: "   " }));
    expect(errors.name).toBe("El nombre es obligatorio.");
  });

  it("rejects a negative public price", () => {
    const errors = validateProductInput(validInput({ price: -1 }));
    expect(errors.price).toBe("El precio debe ser 0 o más.");
  });

  it("rejects a non-integer stock below 0", () => {
    expect(validateProductInput(validInput({ stock: -1 })).stock).toBe(
      "Las existencias deben ser un número entero de 0 o más.",
    );
    expect(validateProductInput(validInput({ stock: 1.5 })).stock).toBe(
      "Las existencias deben ser un número entero de 0 o más.",
    );
  });

  it("allows empty weight and cost", () => {
    expect(
      validateProductInput(validInput({ weightGrams: null, cost: null })),
    ).toEqual({});
  });

  it("rejects negative weight or cost when provided", () => {
    expect(validateProductInput(validInput({ weightGrams: -2 })).weightGrams).toBe(
      "El peso debe ser 0 o más.",
    );
    expect(validateProductInput(validInput({ cost: -10 })).cost).toBe(
      "El costo debe ser 0 o más.",
    );
  });
});
