export type ProductCategory =
  | "Para dos"
  | "Solo collares"
  | "Solo brazaletes"
  | "Collar + brazalete";

export type LinkStyle = "Cubana" | "Barbada" | "Figaro / Cartier";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  style: LinkStyle;
  price: number;
  material: string;
  description: string;
  pieces: string;
  image: string;
  /** Two CSS colors used to render the product's gradient tile. */
  gradient: [string, string];
};

export const products: Product[] = [
  {
    id: "cubana-para-dos",
    name: "Cubana Nuestro Lazo",
    category: "Para dos",
    style: "Cubana",
    price: 248,
    material: "Plata 925 · Acabado pulido",
    description:
      "El set completo para compartir: una versión firme para él y una más delicada para ella.",
    pieces: "2 collares · 2 brazaletes",
    image: "/images/amani/cubana-para-dos.png",
    gradient: ["#e8e9e8", "#9fa5a8"],
  },
  {
    id: "cubana-collares",
    name: "Dúo Cubana Esencia",
    category: "Solo collares",
    style: "Cubana",
    price: 138,
    material: "Plata 925 · 5 y 8 mm",
    description:
      "Dos cadenas cubanas en anchos complementarios, pensadas para llevar el mismo brillo.",
    pieces: "2 collares",
    image: "/images/amani/cubana-collares.png",
    gradient: ["#f0efeb", "#b3b8ba"],
  },
  {
    id: "cubana-brazaletes",
    name: "Dúo Cubana Unión",
    category: "Solo brazaletes",
    style: "Cubana",
    price: 98,
    material: "Plata 925 · Ajustables",
    description:
      "Brazaletes a juego con dos proporciones y un acabado pulido de alto brillo.",
    pieces: "2 brazaletes",
    image: "/images/amani/cubana-brazaletes.png",
    gradient: ["#e3e5e4", "#979da0"],
  },
  {
    id: "cubana-personal",
    name: "Cubana Firma",
    category: "Collar + brazalete",
    style: "Cubana",
    price: 128,
    material: "Plata 925 · 8 mm",
    description:
      "Cadena y brazalete del mismo calibre para un conjunto limpio y contundente.",
    pieces: "1 collar · 1 brazalete",
    image: "/images/amani/cubana-personal.png",
    gradient: ["#e5e6e5", "#8d9498"],
  },
  {
    id: "barbada-para-dos",
    name: "Barbada Dos Almas",
    category: "Para dos",
    style: "Barbada",
    price: 228,
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
    category: "Solo collares",
    style: "Barbada",
    price: 128,
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
    category: "Solo brazaletes",
    style: "Barbada",
    price: 88,
    material: "Plata 925 · Ajustables",
    description:
      "Dos brazaletes planos y cómodos creados para acompañarse todos los días.",
    pieces: "2 brazaletes",
    image: "/images/amani/barbada-brazaletes.png",
    gradient: ["#dfe1df", "#949b9e"],
  },
  {
    id: "barbada-personal",
    name: "Barbada Línea",
    category: "Collar + brazalete",
    style: "Barbada",
    price: 118,
    material: "Plata 925 · 6 mm",
    description:
      "Collar y brazalete barbados con una caída fluida y proporción perfectamente coordinada.",
    pieces: "1 collar · 1 brazalete",
    image: "/images/amani/barbada-personal.png",
    gradient: ["#e0e2e1", "#858d91"],
  },
  {
    id: "cartier-para-dos",
    name: "Eslabón Éternité",
    category: "Para dos",
    style: "Figaro / Cartier",
    price: 268,
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
    category: "Solo collares",
    style: "Figaro / Cartier",
    price: 148,
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
    category: "Solo brazaletes",
    style: "Figaro / Cartier",
    price: 108,
    material: "Plata 925 · Ajustables",
    description:
      "Brazaletes de eslabón elegante para combinar entre sí o llevar por separado.",
    pieces: "2 brazaletes",
    image: "/images/amani/figaro-brazaletes.png",
    gradient: ["#e3e4e2", "#989fa2"],
  },
  {
    id: "cartier-personal",
    name: "Éternité Firma",
    category: "Collar + brazalete",
    style: "Figaro / Cartier",
    price: 138,
    material: "Plata 925 · 7 mm",
    description:
      "Un collar y un brazalete coordinados por el ritmo de sus eslabones geométricos.",
    pieces: "1 collar · 1 brazalete",
    image: "/images/amani/figaro-personal.png",
    gradient: ["#e4e5e3", "#8c9497"],
  },
];

export function getProducts(): Product[] {
  return products;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
