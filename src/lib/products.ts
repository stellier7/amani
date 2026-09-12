export type ProductCategory =
  | "Para dos"
  | "Solo collares"
  | "Solo brazaletes"
  | "Collar + brazalete";

export type LinkStyle = "Cubana" | "Barbada" | "Eslabón Cartier";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  style: LinkStyle;
  price: number;
  material: string;
  description: string;
  pieces: string;
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
    material: "Baño de oro 18k · Acero 316L",
    description:
      "El set completo para compartir: una versión firme para él y una más delicada para ella.",
    pieces: "2 collares · 2 brazaletes",
    gradient: ["#ead8b8", "#bf9558"],
  },
  {
    id: "cubana-collares",
    name: "Dúo Cubana Esencia",
    category: "Solo collares",
    style: "Cubana",
    price: 138,
    material: "Baño de oro 18k · 5 y 8 mm",
    description:
      "Dos cadenas cubanas en anchos complementarios, pensadas para llevar el mismo brillo.",
    pieces: "2 collares",
    gradient: ["#efe2cb", "#c9a36b"],
  },
  {
    id: "cubana-brazaletes",
    name: "Dúo Cubana Unión",
    category: "Solo brazaletes",
    style: "Cubana",
    price: 98,
    material: "Baño de oro 18k · Ajustables",
    description:
      "Brazaletes a juego con dos proporciones y un acabado pulido de alto brillo.",
    pieces: "2 brazaletes",
    gradient: ["#e8d4af", "#b98b47"],
  },
  {
    id: "cubana-personal",
    name: "Cubana Firma",
    category: "Collar + brazalete",
    style: "Cubana",
    price: 128,
    material: "Baño de oro 18k · 8 mm",
    description:
      "Cadena y brazalete del mismo calibre para un conjunto limpio y contundente.",
    pieces: "1 collar · 1 brazalete",
    gradient: ["#ead7b3", "#ad7c39"],
  },
  {
    id: "barbada-para-dos",
    name: "Barbada Dos Almas",
    category: "Para dos",
    style: "Barbada",
    price: 228,
    material: "Oro laminado 18k · Acero 316L",
    description:
      "Cuatro piezas de eslabón plano que se sienten ligeras y se ven impecables juntas.",
    pieces: "2 collares · 2 brazaletes",
    gradient: ["#d9cfbd", "#aa9272"],
  },
  {
    id: "barbada-collares",
    name: "Dúo Barbada Encuentro",
    category: "Solo collares",
    style: "Barbada",
    price: 128,
    material: "Oro laminado 18k · 3 y 6 mm",
    description:
      "Un par de collares de perfil suave, uno sutil y otro con más presencia.",
    pieces: "2 collares",
    gradient: ["#e8dfd0", "#b9a187"],
  },
  {
    id: "barbada-brazaletes",
    name: "Dúo Barbada Cerca",
    category: "Solo brazaletes",
    style: "Barbada",
    price: 88,
    material: "Oro laminado 18k · Ajustables",
    description:
      "Dos brazaletes planos y cómodos creados para acompañarse todos los días.",
    pieces: "2 brazaletes",
    gradient: ["#ddd2c0", "#aa9274"],
  },
  {
    id: "barbada-personal",
    name: "Barbada Línea",
    category: "Collar + brazalete",
    style: "Barbada",
    price: 118,
    material: "Oro laminado 18k · 6 mm",
    description:
      "Collar y brazalete barbados con una caída fluida y proporción perfectamente coordinada.",
    pieces: "1 collar · 1 brazalete",
    gradient: ["#dfd4c2", "#9f8564"],
  },
  {
    id: "cartier-para-dos",
    name: "Eslabón Éternité",
    category: "Para dos",
    style: "Eslabón Cartier",
    price: 268,
    material: "Baño de oro 18k · Acero 316L",
    description:
      "Nuestra propuesta más refinada: eslabones definidos en cuatro piezas para compartir.",
    pieces: "2 collares · 2 brazaletes",
    gradient: ["#efe0c4", "#c49a5b"],
  },
  {
    id: "cartier-collares",
    name: "Dúo Éternité",
    category: "Solo collares",
    style: "Eslabón Cartier",
    price: 148,
    material: "Baño de oro 18k · 4 y 7 mm",
    description:
      "Dos collares de eslabón alargado con acabados distintos y una misma intención.",
    pieces: "2 collares",
    gradient: ["#eee2cf", "#c5a576"],
  },
  {
    id: "cartier-brazaletes",
    name: "Dúo Éternité Cerca",
    category: "Solo brazaletes",
    style: "Eslabón Cartier",
    price: 108,
    material: "Baño de oro 18k · Ajustables",
    description:
      "Brazaletes de eslabón elegante para combinar entre sí o llevar por separado.",
    pieces: "2 brazaletes",
    gradient: ["#e6d9c5", "#b99564"],
  },
  {
    id: "cartier-personal",
    name: "Éternité Firma",
    category: "Collar + brazalete",
    style: "Eslabón Cartier",
    price: 138,
    material: "Baño de oro 18k · 7 mm",
    description:
      "Un collar y un brazalete coordinados por el ritmo de sus eslabones geométricos.",
    pieces: "1 collar · 1 brazalete",
    gradient: ["#e9dcc8", "#aa8555"],
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
