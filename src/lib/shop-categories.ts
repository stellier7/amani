import type { ProductCategory } from "@/lib/products";

export type ShopCategory = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  /** Crop classes so each tile reads as that category. */
  imageClass: string;
  /** Catalog filter this tile opens. Ella and Él open the full collection. */
  filter?: ProductCategory;
};

export const shopCategories: ShopCategory[] = [
  {
    slug: "ella",
    name: "Ella",
    image: "/images/amani/cubana-para-dos.png",
    alt: "Ella con collar y brazalete cubanos de plata 925",
    imageClass: "origin-[100%_28%] scale-[2.35]",
  },
  {
    slug: "el",
    name: "Él",
    image: "/images/amani/figaro-para-dos.png",
    alt: "Él con collar y brazalete Figaro de plata 925",
    imageClass: "origin-[8%_16%] scale-[1.85]",
  },
  {
    slug: "collares",
    name: "Collares",
    image: "/images/amani/figaro-collares.png",
    alt: "Collares de eslabón Figaro en plata 925",
    imageClass: "object-[50%_28%]",
    filter: "Collares",
  },
  {
    slug: "anillos",
    name: "Anillos",
    image: "/images/amani/anillo-gota-aurora.jpg",
    alt: "Anillo de plata 925 con zirconia talla gota",
    imageClass: "object-center",
    filter: "Anillos",
  },
  {
    slug: "pulseras",
    name: "Pulseras",
    image: "/images/amani/figaro-brazaletes.png",
    alt: "Pulseras de eslabón Figaro en plata 925",
    imageClass: "origin-[50%_78%] scale-[1.7]",
    filter: "Brazaletes",
  },
  {
    slug: "aretes",
    name: "Aretes",
    image: "/images/amani/aretes-cascada.jpg",
    alt: "Aretes de plata 925 con zirconias en cascada",
    imageClass: "object-center",
    filter: "Aretes",
  },
];

export function shopCategoryHref(category: ShopCategory): string {
  if (!category.filter) return "/ella-y-el#collection";
  return `/ella-y-el?categoria=${category.slug}#collection`;
}

export function categoryFromShopQuery(
  value: string | string[] | undefined,
): "Todos" | ProductCategory {
  const slug = Array.isArray(value) ? value[0] : value;
  const match = shopCategories.find((category) => category.slug === slug);
  return match?.filter ?? "Todos";
}
