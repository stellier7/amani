import type { ProductCategory } from "@/lib/products";

export type ShopCategory = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  /** How the image fills the tile — packshots letterbox, lifestyle crops cover. */
  fit: "contain" | "cover";
  /** Catalog filter this tile opens on the homepage collection. */
  filter?: ProductCategory;
  /** When set, the tile links here instead of the homepage collection. */
  href?: string;
};

export const shopCategories: ShopCategory[] = [
  {
    slug: "ella",
    name: "Ella",
    image: "/images/amani/tennis-brazalete.jpg",
    alt: "Pulsera Tenis Ajustable de plata 925 con zirconias",
    fit: "contain",
    href: "/ella",
  },
  {
    slug: "el",
    name: "Él",
    image: "/images/amani/cubana-collar.jpg",
    alt: "Cadena Barbada Magna de plata 925",
    fit: "contain",
    href: "/el",
  },
  {
    slug: "collares",
    name: "Collares",
    image: "/images/amani/cubana-italiana.jpg",
    alt: "Collar cubano italiano de plata 925",
    fit: "contain",
    filter: "Collares",
  },
  {
    slug: "anillos",
    name: "Anillos",
    image: "/images/amani/anillo-pave.jpg",
    alt: "Anillo de plata 925 con pavé de zirconias",
    fit: "contain",
    filter: "Anillos",
  },
  {
    slug: "pulseras",
    name: "Pulseras",
    image: "/images/amani/tennis-brazalete.jpg",
    alt: "Pulsera Tenis Ajustable de plata 925 con zirconias",
    fit: "contain",
    filter: "Brazaletes",
  },
  {
    slug: "hilo-925",
    name: "Pulseras de hilo 925",
    image: "/images/amani/cordon-cuatro-vientos.jpg",
    alt: "Pulsera de hilo con plata 925 — Cuarto Vientos",
    fit: "contain",
    filter: "Pulseras de hilo 925",
  },
  {
    slug: "aretes",
    name: "Aretes",
    image: "/images/amani/aretes-cascada.jpg",
    alt: "Aretes de plata 925 con zirconias en cascada",
    fit: "contain",
    filter: "Aretes",
  },
];

export function shopCategoryHref(category: ShopCategory): string {
  if (category.href) return category.href;
  if (!category.filter) return "/#collection";
  return `/?categoria=${category.slug}#collection`;
}

export function categoryFromShopQuery(
  value: string | string[] | undefined,
): "Todos" | ProductCategory {
  const slug = Array.isArray(value) ? value[0] : value;
  const match = shopCategories.find((category) => category.slug === slug);
  return match?.filter ?? "Todos";
}
