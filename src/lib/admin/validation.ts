import type { FieldErrors, ProductInput } from "@/lib/admin/types";

function isNonNegativeInteger(value: number): boolean {
  return Number.isInteger(value) && value >= 0;
}

export function validateProductInput(input: ProductInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  }
  if (!Number.isFinite(input.price) || input.price < 0) {
    errors.price = "El precio debe ser 0 o más.";
  }
  if (!input.material.trim()) {
    errors.material = "El material es obligatorio.";
  }
  if (!input.description.trim()) {
    errors.description = "La descripción es obligatoria.";
  }
  if (!input.pieces.trim()) {
    errors.pieces = "Las piezas incluidas son obligatorias.";
  }
  if (!input.image.trim()) {
    errors.image = "La foto es obligatoria.";
  }
  if (!isNonNegativeInteger(input.stock)) {
    errors.stock = "Las existencias deben ser un número entero de 0 o más.";
  }
  if (
    input.weightGrams != null &&
    (!Number.isFinite(input.weightGrams) || input.weightGrams < 0)
  ) {
    errors.weightGrams = "El peso debe ser 0 o más.";
  }
  if (input.cost != null && (!Number.isFinite(input.cost) || input.cost < 0)) {
    errors.cost = "El costo debe ser 0 o más.";
  }

  return errors;
}
