import type { AdminProduct } from "@/lib/admin/types";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STYLES,
  type ProductAudience,
  type ProductCategory,
  type ProductStyle,
  type ShotType,
} from "@/lib/products";
import { products } from "@/lib/db/schema";

type ProductRow = typeof products.$inferSelect;

function asCategory(value: string): ProductCategory {
  if ((PRODUCT_CATEGORIES as readonly string[]).includes(value)) {
    return value as ProductCategory;
  }
  throw new Error(`Unknown category: ${value}`);
}

function asStyle(value: string): ProductStyle {
  if ((PRODUCT_STYLES as readonly string[]).includes(value)) {
    return value as ProductStyle;
  }
  throw new Error(`Unknown style: ${value}`);
}

function asAudience(value: string | null): ProductAudience | undefined {
  if (value === "mujer" || value === "hombre" || value === "unisex") {
    return value;
  }
  return undefined;
}

function asShot(value: string | null): ShotType | undefined {
  if (value === "lifestyle" || value === "packshot") return value;
  return undefined;
}

export function rowToAdminProduct(row: ProductRow): AdminProduct {
  return {
    id: row.id,
    name: row.name,
    category: asCategory(row.category),
    style: asStyle(row.style),
    price: row.price,
    material: row.material,
    description: row.description,
    pieces: row.pieces,
    image: row.image,
    shot: asShot(row.shot),
    featured: row.featured,
    audience: asAudience(row.audience),
    soldOutOverride: row.soldOutOverride,
    stock: row.stock,
    weightGrams: row.weightGrams,
    cost: row.cost,
    notes: row.notes,
    gradient:
      row.gradientFrom && row.gradientTo
        ? [row.gradientFrom, row.gradientTo]
        : undefined,
    updatedAt: row.updatedAt,
    updatedByEmail: row.updatedByEmail,
  };
}
