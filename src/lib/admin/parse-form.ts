import type { ProductInput } from "@/lib/admin/types";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STYLES,
  type ProductAudience,
  type ProductCategory,
  type ProductStyle,
  type ShotType,
} from "@/lib/products";

function asCategory(value: string): ProductCategory {
  if ((PRODUCT_CATEGORIES as readonly string[]).includes(value)) {
    return value as ProductCategory;
  }
  return "Collares";
}

function asStyle(value: string): ProductStyle {
  if ((PRODUCT_STYLES as readonly string[]).includes(value)) {
    return value as ProductStyle;
  }
  return "Cubana";
}

function asAudience(value: string): ProductAudience | undefined {
  if (value === "mujer" || value === "hombre" || value === "unisex") {
    return value;
  }
  return undefined;
}

function asShot(value: string): ShotType | undefined {
  if (value === "lifestyle" || value === "packshot") return value;
  return undefined;
}

function optionalNumber(value: FormDataEntryValue | null): number | null {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  return Number(raw);
}

function requiredNumber(value: FormDataEntryValue | null, fallback = 0): number {
  const parsed = optionalNumber(value);
  return parsed == null ? fallback : parsed;
}

export function parseProductForm(
  formData: FormData,
  options: { image: string; cost: number | null },
): ProductInput {
  const gradientFrom = String(formData.get("gradientFrom") ?? "").trim();
  const gradientTo = String(formData.get("gradientTo") ?? "").trim();

  return {
    name: String(formData.get("name") ?? ""),
    category: asCategory(String(formData.get("category") ?? "")),
    style: asStyle(String(formData.get("style") ?? "")),
    price: requiredNumber(formData.get("price")),
    material: String(formData.get("material") ?? ""),
    description: String(formData.get("description") ?? ""),
    pieces: String(formData.get("pieces") ?? ""),
    image: options.image,
    shot: asShot(String(formData.get("shot") ?? "")),
    featured: formData.get("featured") === "on",
    audience: asAudience(String(formData.get("audience") ?? "")),
    soldOutOverride: formData.get("soldOutOverride") === "on",
    stock: requiredNumber(formData.get("stock")),
    weightGrams: optionalNumber(formData.get("weightGrams")),
    cost: optionalNumber(formData.get("cost")) ?? options.cost,
    notes: String(formData.get("notes") ?? "").trim() || null,
    gradient:
      gradientFrom && gradientTo ? [gradientFrom, gradientTo] : undefined,
  };
}
