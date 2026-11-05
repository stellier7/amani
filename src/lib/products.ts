export const PRODUCT_CATEGORIES = [
  "Para dos",
  "Collares",
  "Brazaletes",
  "Aretes",
  "Anillos",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PRODUCT_STYLES = [
  "Cubana",
  "Barbada",
  "Figaro / Cartier",
  "Marina",
  "Zirconias",
  "Perlas",
  "Amuletos",
  "Cordón",
] as const;

export type ProductStyle = (typeof PRODUCT_STYLES)[number];

/** Studio shots sit on white, so they are letterboxed instead of cropped. */
export type ShotType = "lifestyle" | "packshot";

/** Who a solo piece is merchandised for on /ella and /el. */
export type ProductAudience = "mujer" | "hombre" | "unisex";

export type Product = {
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
  /** Highlighted in the "Destacados" marquee. */
  featured?: boolean;
  /** Solo-piece audience for /ella and /el. Omit on matching sets. */
  audience?: ProductAudience;
  /** When true, the piece stays listed but cannot be added to the bag. */
  soldOut?: boolean;
  /** Two CSS colors used to render the tile behind a lifestyle photo. */
  gradient?: [string, string];
};

/** The studio sweep the packshots were shot on. */
const PACKSHOT_BACKDROP = "#fefefe";

const DEFAULT_GRADIENT: [string, string] = ["#e8e9e8", "#9fa5a8"];

/** Background for a product's image tile, matched to the photo behind it. */
export function tileBackground(product: Product): string {
  if (product.shot === "packshot") return PACKSHOT_BACKDROP;
  const [from, to] = product.gradient ?? DEFAULT_GRADIENT;
  return `linear-gradient(135deg, ${from}, ${to})`;
}

/** Full store catalog shown on the homepage. */
export function getHomepageProducts(list: Product[]): Product[] {
  return list;
}

/** Solo pieces for /ella or /el. Unisex pieces appear in both. */
export function getAudienceProducts(
  audience: Exclude<ProductAudience, "unisex">,
  list: Product[],
): Product[] {
  return getHomepageProducts(list).filter(
    (product) =>
      product.audience === audience || product.audience === "unisex",
  );
}

export function getFeaturedProducts(list: Product[]): Product[] {
  return list.filter((product) => product.featured);
}

export function getProduct(
  id: string,
  list: Product[],
): Product | undefined {
  return list.find((product) => product.id === id);
}

export function productPath(product: Pick<Product, "id">): string {
  return `/producto/${product.id}`;
}

/** Other pieces to show alongside one product, closest in style first. */
export function getRelatedProducts(
  product: Product,
  list: Product[],
  limit = 3,
): Product[] {
  const others = list.filter((item) => item.id !== product.id);
  const score = (item: Product) =>
    (item.style === product.style ? 2 : 0) +
    (item.category === product.category ? 1 : 0);
  return [...others]
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
    maximumFractionDigits: 0,
  }).format(price);
}
