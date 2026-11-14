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
    image: "/images/amani/anillo-cruz-pave.jpg",
    alt: "Anillo Cruz Pavé de plata 925",
    fit: "cover",
    href: "/ella",
  },
  {
    slug: "el",
    name: "Él",
    image: "/images/amani/brazalete-cubano.jpg",
    alt: "Brazalete Cubano de plata 925",
    fit: "cover",
    href: "/el",
  },
  {
    slug: "collares",
    name: "Collares",
    image: "/images/amani/cadena-clip.jpg",
    alt: "Cadena Clip de plata 925",
    fit: "cover",
    filter: "Collares",
  },
  {
    slug: "anillos",
    name: "Anillos",
    image: "/images/amani/anillo-cintillo.jpg",
    alt: "Anillo Cintillo de plata 925",
    fit: "cover",
    filter: "Anillos",
  },
  {
    slug: "pulseras",
    name: "Pulseras",
    image: "/images/amani/pulsera-tenis-morada.jpg",
    alt: "Pulsera Tipo Tenis Morada de plata 925",
    fit: "cover",
    filter: "Brazaletes",
  },
  {
    slug: "aretes",
    name: "Aretes",
    image: "/images/amani/aretes-ovalo-nudo.jpg",
    alt: "Aretes Óvalo Nudo de plata 925",
    fit: "cover",
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
