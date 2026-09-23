export type ProductCategory =
  | "Para dos"
  | "Collares"
  | "Brazaletes"
  | "Pulseras de hilo 925"
  | "Aretes"
  | "Anillos";

export type ProductStyle =
  | "Cubana"
  | "Barbada"
  | "Figaro / Cartier"
  | "Marina"
  | "Zirconias"
  | "Perlas"
  | "Amuletos"
  | "Cordón";

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

export const products: Product[] = [
  {
    id: "cubana-italiana",
    name: "Cubana Italiana",
    category: "Collares",
    style: "Cubana",
    price: 7500,
    material: "Plata 925 · Hecha en Italia",
    description:
      "Cadena de eslabón cubano ancho con cierre de mosquetón y sello italiano.",
    pieces: "1 collar",
    image: "/images/amani/cubana-italiana.jpg",
    shot: "packshot",
    featured: true,
    audience: "hombre",
  },
  {
    id: "tennis-brazalete",
    name: "Pulsera Tenis Ajustable",
    category: "Brazaletes",
    style: "Zirconias",
    price: 1499,
    material: "Plata 925 · Cierre ajustable",
    description:
      "Zirconias redondas en línea continua con cierre deslizante que se ajusta a cualquier muñeca.",
    pieces: "1 brazalete",
    image: "/images/amani/tennis-brazalete.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "anillo-pave",
    name: "Anillo Pavé Destello",
    category: "Anillos",
    style: "Zirconias",
    price: 750,
    material: "Plata 925 · Tres hileras de zirconias",
    description:
      "Una banda de perfil bajo con tres hileras engastadas al pavé para llevar sola o apilada.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-pave.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "anillo-domo",
    name: "Anillo de Lunares de Zirconia",
    category: "Anillos",
    style: "Zirconias",
    price: 995,
    material: "Plata 925 · Zirconias al ras",
    description:
      "Un domo pulido salpicado de zirconias engastadas al ras, como un cielo despejado.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-domo.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "anillo-gota-aurora",
    name: "Anillo Gota Aurora",
    category: "Anillos",
    style: "Zirconias",
    price: 795,
    material: "Plata 925 · Zirconia talla gota",
    description:
      "Una zirconia en talla gota rodeada por su halo, sostenida en una banda de pavé que la deja flotar.",
    pieces: "1 anillo · Talla 6",
    image: "/images/amani/anillo-gota-aurora.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "marina-brazalete",
    name: "Pulsera Gucci Inflada",
    category: "Brazaletes",
    style: "Marina",
    price: 2295,
    material: "Plata 925 · Eslabón hueco",
    description:
      "Eslabón marina de volumen hueco: se ve contundente en la muñeca y casi no se siente.",
    pieces: "1 brazalete",
    image: "/images/amani/marina-brazalete.jpg",
    shot: "packshot",
    featured: true,
    audience: "hombre",
  },
  {
    id: "aretes-cascada",
    name: "Aretes Cascada",
    category: "Aretes",
    style: "Zirconias",
    price: 1398,
    material: "Plata 925 · Zirconia talla cojín",
    description:
      "Tres zirconias en descenso hasta una talla cojín que cierra la caída con todo el brillo.",
    pieces: "1 par de aretes",
    image: "/images/amani/aretes-cascada.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
    soldOut: true,
  },
  {
    id: "brazalete-devocion",
    name: "Brazalete con Charms Religiosos",
    category: "Brazaletes",
    style: "Amuletos",
    price: 1150,
    material: "Plata 925 · Cinco dijes",
    description:
      "Tejido Gucci con cinco dijes: tres cruces y dos medallas milagrosas.",
    pieces: "1 brazalete",
    image: "/images/amani/brazalete-devocion.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "aretes-cuernito",
    name: "Aretes Cuernito Fortuna",
    category: "Aretes",
    style: "Amuletos",
    price: 650,
    material: "Plata 925 · Pavé de zirconias",
    description:
      "El cuernito italiano de la buena suerte, cubierto de pavé y colgado de un huggie que no estorba.",
    pieces: "1 par de aretes",
    image: "/images/amani/aretes-cuernito.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "aretes-ojo",
    name: "Aretes Ojo Protector",
    category: "Aretes",
    style: "Amuletos",
    price: 650,
    material: "Plata 925 · Pavé de zirconias",
    description:
      "El ojo turco delineado en zirconias, en un huggie corto para llevar la protección puesta.",
    pieces: "1 par de aretes",
    image: "/images/amani/aretes-ojo.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "brazalete-marquesa",
    name: "Brazalete Marquesa Rocío",
    category: "Brazaletes",
    style: "Zirconias",
    price: 1150,
    material: "Plata 925 · Extensión ajustable",
    description:
      "Placas en talla marquesa cubiertas de pavé, unidas por tramos de zirconias redondas.",
    pieces: "1 brazalete",
    image: "/images/amani/brazalete-marquesa.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "cordon-cuatro-vientos",
    name: "Cuarto Vientos",
    category: "Pulseras de hilo 925",
    style: "Cordón",
    price: 450,
    material: "Plata 925 · Macramé 925",
    description:
      "Cuatro esferas de corte diamantado sobre cordón negro que se ajusta de un tirón.",
    pieces: "1 brazalete",
    image: "/images/amani/cordon-cuatro-vientos.jpg",
    shot: "packshot",
    featured: true,
    audience: "unisex",
  },
  {
    id: "cordon-perla-barroca",
    name: "Trilogía Fluvial 925",
    category: "Pulseras de hilo 925",
    style: "Perlas",
    price: 650,
    material: "Plata 925 · Perlas cultivadas barrocas",
    description:
      "Tres perlas barrocas, cada una con su propia forma, tejidas a mano sobre cordón negro.",
    pieces: "1 brazalete",
    image: "/images/amani/cordon-perla-barroca.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "cordon-tres-perlas",
    name: "Cordón Tres Perlas",
    category: "Pulseras de hilo 925",
    style: "Perlas",
    price: 1150,
    material: "Plata 925 · Perlas nacaradas",
    description:
      "Tres perlas redondas separadas por esferas diamantadas, en un cordón negro ajustable.",
    pieces: "1 brazalete",
    image: "/images/amani/cordon-tres-perlas.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "brazalete-grano-pave",
    name: "Brazalete Gucci de Zirconias",
    category: "Brazaletes",
    style: "Zirconias",
    price: 1795,
    material: "Plata 925 · Pavé de zirconias",
    description:
      "Eslabones ovalados tipo grano de café cubiertos de pavé, unidos por zirconias en bisel.",
    pieces: "1 brazalete",
    image: "/images/amani/brazalete-grano-pave.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "figaro-collar",
    name: "Collar Figaro Esencia",
    category: "Collares",
    style: "Figaro / Cartier",
    price: 3750,
    material: "Plata 925 · Eslabón Figaro",
    description:
      "Cadena Figaro en plata 925 con ritmo 3+1 y acabado pulido para el día a día.",
    pieces: "1 collar",
    image: "/images/amani/figaro-collar.jpg",
    shot: "packshot",
    featured: true,
    audience: "hombre",
  },
  {
    id: "cubana-collar",
    name: "Cadena Barbada Magna",
    category: "Collares",
    style: "Cubana",
    price: 18595,
    material: "Plata 925 · Eslabón cubano",
    description:
      "Cadena de eslabón cubano en plata 925, sólida, plana y de alto brillo.",
    pieces: "1 collar",
    image: "/images/amani/cubana-collar.jpg",
    shot: "packshot",
    featured: true,
    audience: "hombre",
  },
  {
    id: "figaro-placa",
    name: "Brazalete Fígaro con Placa",
    category: "Brazaletes",
    style: "Figaro / Cartier",
    price: 3795,
    material: "Plata 925 · Placa para grabar",
    description:
      "Figaro con placa lisa lista para grabar, remates 925 y cierre de langosta.",
    pieces: "1 brazalete",
    image: "/images/amani/figaro-placa.jpg",
    shot: "packshot",
    featured: true,
    audience: "hombre",
  },
  {
    id: "figaro-brazalete",
    name: "Brazalete Figaro Ritmo",
    category: "Brazaletes",
    style: "Figaro / Cartier",
    price: 1395,
    material: "Plata 925 · Eslabón Figaro",
    description:
      "El ritmo 3+1 del Figaro en la muñeca, acabado pulido y cierre seguro.",
    pieces: "1 brazalete",
    image: "/images/amani/figaro-brazalete.jpg",
    shot: "packshot",
    featured: true,
    audience: "hombre",
  },
];

export function getProducts(): Product[] {
  return products;
}

/** Full store catalog shown on the homepage. */
export function getHomepageProducts(list: Product[] = products): Product[] {
  return list;
}

/** Solo pieces for /ella or /el. Unisex pieces appear in both. */
export function getAudienceProducts(
  audience: Exclude<ProductAudience, "unisex">,
  list: Product[] = products,
): Product[] {
  return getHomepageProducts(list).filter(
    (product) =>
      product.audience === audience || product.audience === "unisex",
  );
}

export function getFeaturedProducts(list: Product[] = products): Product[] {
  return list.filter((product) => product.featured);
}

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function productPath(product: Pick<Product, "id">): string {
  return `/producto/${product.id}`;
}

/** Other pieces to show alongside one product, closest in style first. */
export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const others = products.filter((item) => item.id !== product.id);
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
