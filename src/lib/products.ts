export type ProductCategory =
  | "Para dos"
  | "Collar + brazalete"
  | "Collares"
  | "Brazaletes"
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
    id: "cubana-collares",
    name: "Dúo Cubana Esencia",
    category: "Collares",
    style: "Cubana",
    price: 3700,
    material: "Plata 925 · 5 y 8 mm",
    description:
      "Dos cadenas cubanas en anchos complementarios, pensadas para llevar el mismo brillo.",
    pieces: "2 collares",
    image: "/images/amani/cubana-collares.png",
    gradient: ["#f0efeb", "#b3b8ba"],
  },
  {
    id: "barbada-para-dos",
    name: "Barbada Dos Almas",
    category: "Para dos",
    style: "Barbada",
    price: 6100,
    material: "Plata 925 · Acabado espejo",
    description:
      "Cuatro piezas de eslabón plano que se sienten ligeras y se ven impecables juntas.",
    pieces: "2 collares · 2 brazaletes",
    image: "/images/amani/barbada-para-dos.png",
    gradient: ["#dfe1e1", "#959c9f"],
  },
  {
    id: "barbada-collares",
    name: "Dúo Barbada Encuentro",
    category: "Collares",
    style: "Barbada",
    price: 3450,
    material: "Plata 925 · 3 y 6 mm",
    description:
      "Un par de collares de perfil suave, uno sutil y otro con más presencia.",
    pieces: "2 collares",
    image: "/images/amani/barbada-collares.png",
    gradient: ["#ececea", "#a9afb1"],
  },
  {
    id: "barbada-brazaletes",
    name: "Dúo Barbada Cerca",
    category: "Brazaletes",
    style: "Barbada",
    price: 2350,
    material: "Plata 925 · Ajustables",
    description:
      "Dos brazaletes planos y cómodos creados para acompañarse todos los días.",
    pieces: "2 brazaletes",
    image: "/images/amani/barbada-brazaletes.png",
    gradient: ["#dfe1df", "#949b9e"],
  },
  {
    id: "cartier-para-dos",
    name: "Eslabón Éternité",
    category: "Para dos",
    style: "Figaro / Cartier",
    price: 7200,
    material: "Plata 925 · Acabado pulido",
    description:
      "Nuestra propuesta más refinada: eslabones definidos en cuatro piezas para compartir.",
    pieces: "2 collares · 2 brazaletes",
    image: "/images/amani/figaro-para-dos.png",
    gradient: ["#e9eae8", "#a1a7aa"],
  },
  {
    id: "cartier-collares",
    name: "Dúo Éternité",
    category: "Collares",
    style: "Figaro / Cartier",
    price: 3950,
    material: "Plata 925 · 4 y 7 mm",
    description:
      "Dos collares de eslabón alargado con acabados distintos y una misma intención.",
    pieces: "2 collares",
    image: "/images/amani/figaro-collares.png",
    gradient: ["#efefec", "#b1b6b8"],
  },
  {
    id: "cartier-brazaletes",
    name: "Dúo Éternité Cerca",
    category: "Brazaletes",
    style: "Figaro / Cartier",
    price: 2900,
    material: "Plata 925 · Ajustables",
    description:
      "Brazaletes de eslabón elegante para combinar entre sí o llevar por separado.",
    pieces: "2 brazaletes",
    image: "/images/amani/figaro-brazaletes.png",
    gradient: ["#e3e4e2", "#989fa2"],
  },
  {
    id: "cubana-italiana",
    name: "Cubana Italiana",
    category: "Collar + brazalete",
    style: "Cubana",
    price: 4250,
    material: "Plata 925 · Hecha en Italia · 9 mm",
    description:
      "Eslabón cubano ancho con cierre de mosquetón y sello italiano, en collar y brazalete a juego.",
    pieces: "1 collar · 1 brazalete",
    image: "/images/amani/cubana-italiana.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "tennis-brazalete",
    name: "Tennis Lluvia",
    category: "Brazaletes",
    style: "Zirconias",
    price: 3150,
    material: "Plata 925 · Cierre ajustable",
    description:
      "Zirconias redondas en línea continua con cierre deslizante que se ajusta a cualquier muñeca.",
    pieces: "1 brazalete",
    image: "/images/amani/tennis-brazalete.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "anillo-pave",
    name: "Anillo Pavé Destello",
    category: "Anillos",
    style: "Zirconias",
    price: 1850,
    material: "Plata 925 · Tres hileras de zirconias",
    description:
      "Una banda de perfil bajo con tres hileras engastadas al pavé para llevar sola o apilada.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-pave.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "anillo-domo",
    name: "Anillo Domo Constelación",
    category: "Anillos",
    style: "Zirconias",
    price: 2450,
    material: "Plata 925 · Zirconias al ras",
    description:
      "Un domo pulido salpicado de zirconias engastadas al ras, como un cielo despejado.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-domo.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "anillo-gota-aurora",
    name: "Anillo Gota Aurora",
    category: "Anillos",
    style: "Zirconias",
    price: 2250,
    material: "Plata 925 · Zirconia talla gota",
    description:
      "Una zirconia en talla gota rodeada por su halo, sostenida en una banda de pavé que la deja flotar.",
    pieces: "1 anillo · Talla 6",
    image: "/images/amani/anillo-gota-aurora.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "marina-brazalete",
    name: "Marina Puerto",
    category: "Brazaletes",
    style: "Marina",
    price: 3850,
    material: "Plata 925 · Eslabón hueco · 8 mm",
    description:
      "Eslabón marina de volumen hueco: se ve contundente en la muñeca y casi no se siente.",
    pieces: "1 brazalete",
    image: "/images/amani/marina-brazalete.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "aretes-cascada",
    name: "Aretes Cascada",
    category: "Aretes",
    style: "Zirconias",
    price: 2650,
    material: "Plata 925 · Zirconia talla cojín",
    description:
      "Tres zirconias en descenso hasta una talla cojín que cierra la caída con todo el brillo.",
    pieces: "1 par de aretes",
    image: "/images/amani/aretes-cascada.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "brazalete-devocion",
    name: "Brazalete Devoción",
    category: "Brazaletes",
    style: "Amuletos",
    price: 2950,
    material: "Plata 925 · Cinco dijes",
    description:
      "Tres cruces y dos medallas milagrosas sobre una cadena que mezcla eslabón marina y rolo.",
    pieces: "1 brazalete",
    image: "/images/amani/brazalete-devocion.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "aretes-cuernito",
    name: "Aretes Cuernito Fortuna",
    category: "Aretes",
    style: "Amuletos",
    price: 1750,
    material: "Plata 925 · Pavé de zirconias",
    description:
      "El cuernito italiano de la buena suerte, cubierto de pavé y colgado de un huggie que no estorba.",
    pieces: "1 par de aretes",
    image: "/images/amani/aretes-cuernito.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "aretes-ojo",
    name: "Aretes Ojo Protector",
    category: "Aretes",
    style: "Amuletos",
    price: 1650,
    material: "Plata 925 · Pavé de zirconias",
    description:
      "El ojo turco delineado en zirconias, en un huggie corto para llevar la protección puesta.",
    pieces: "1 par de aretes",
    image: "/images/amani/aretes-ojo.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "brazalete-marquesa",
    name: "Brazalete Marquesa Rocío",
    category: "Brazaletes",
    style: "Zirconias",
    price: 2850,
    material: "Plata 925 · Extensión ajustable",
    description:
      "Placas en talla marquesa cubiertas de pavé, unidas por tramos de zirconias redondas.",
    pieces: "1 brazalete",
    image: "/images/amani/brazalete-marquesa.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "cordon-cuatro-vientos",
    name: "Cordón Cuatro Vientos",
    category: "Brazaletes",
    style: "Cordón",
    price: 950,
    material: "Plata 925 · Cordón trenzado ajustable",
    description:
      "Cuatro esferas de corte diamantado sobre cordón negro que se ajusta de un tirón.",
    pieces: "1 brazalete",
    image: "/images/amani/cordon-cuatro-vientos.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "cordon-perla-barroca",
    name: "Cordón Perla Barroca",
    category: "Brazaletes",
    style: "Perlas",
    price: 1350,
    material: "Plata 925 · Perlas cultivadas barrocas",
    description:
      "Tres perlas barrocas, cada una con su propia forma, tejidas a mano sobre cordón negro.",
    pieces: "1 brazalete",
    image: "/images/amani/cordon-perla-barroca.jpg",
    shot: "packshot",
    featured: true,
  },
  {
    id: "cordon-tres-perlas",
    name: "Cordón Tres Perlas",
    category: "Brazaletes",
    style: "Perlas",
    price: 1150,
    material: "Plata 925 · Perlas nacaradas",
    description:
      "Tres perlas redondas separadas por esferas diamantadas, en un cordón negro ajustable.",
    pieces: "1 brazalete",
    image: "/images/amani/cordon-tres-perlas.jpg",
    shot: "packshot",
    featured: true,
  },
];

export function getProducts(): Product[] {
  return products;
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
