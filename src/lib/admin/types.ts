import type {
  Product,
  ProductAudience,
  ProductCategory,
  ProductStyle,
  ShotType,
} from "@/lib/products";

export type Role = "admin" | "staff";

export type AdminProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  style: ProductStyle;
  price: number;
  material: string;
  description: string;
  pieces: string;
  image: string;
  shot?: ShotType;
  featured: boolean;
  audience?: ProductAudience;
  soldOutOverride: boolean;
  stock: number;
  weightGrams: number | null;
  cost: number | null;
  notes: string | null;
  gradient?: [string, string];
  updatedAt: string;
  updatedByEmail: string | null;
};

export type ProductInput = {
  name: string;
  category: ProductCategory;
  style: ProductStyle;
  price: number;
  material: string;
  description: string;
  pieces: string;
  image: string;
  shot?: ShotType;
  featured: boolean;
  audience?: ProductAudience;
  soldOutOverride: boolean;
  stock: number;
  weightGrams: number | null;
  cost: number | null;
  notes: string | null;
  gradient?: [string, string];
};

export type FieldErrors = Partial<
  Record<keyof ProductInput | "id", string>
>;

export type PublicProduct = Product;
