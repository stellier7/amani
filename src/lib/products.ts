export type Product = {
  id: string;
  name: string;
  category: "Anillos" | "Collares" | "Aretes" | "Pulseras";
  price: number;
  material: string;
  description: string;
  /** Two CSS colors used to render the product's gradient tile. */
  gradient: [string, string];
};

export const products: Product[] = [
  {
    id: "aurora-solitaire",
    name: "Anillo Solitario Aurora",
    category: "Anillos",
    price: 1290,
    material: "Oro 18k · Diamante 0.5 ct",
    description:
      "Un diamante de corte brillante en una banda delicadísima. Discreto, para siempre.",
    gradient: ["#f6d9c9", "#e8b4a0"],
  },
  {
    id: "luna-pendant",
    name: "Collar con Dije Luna",
    category: "Collares",
    price: 640,
    material: "Plata esterlina · Piedra lunar",
    description:
      "Una piedra lunar de brillo suave suspendida en una cadena delicada de 45 cm.",
    gradient: ["#d8e3f0", "#b6c7e0"],
  },
  {
    id: "sol-hoops",
    name: "Aretes Aro Sol",
    category: "Aretes",
    price: 380,
    material: "Baño de oro 14k",
    description:
      "Aros para el día a día con un acabado cálido pulido a mano que captura la luz.",
    gradient: ["#f7e6b8", "#e9c766"],
  },
  {
    id: "marea-bracelet",
    name: "Pulsera Cadena Marea",
    category: "Pulseras",
    price: 520,
    material: "Oro 18k · Ajustable",
    description:
      "Una cadena fluida que cae con gracia y se combina con cualquier look.",
    gradient: ["#e9d5f0", "#c9a8e0"],
  },
  {
    id: "vera-studs",
    name: "Aretes de Perla Vera",
    category: "Aretes",
    price: 295,
    material: "Perla de agua dulce · Poste de oro",
    description:
      "Perlas clásicas reinterpretadas con una silueta moderna ligeramente irregular.",
    gradient: ["#f0e9e0", "#d6c7b8"],
  },
  {
    id: "esme-band",
    name: "Anillo Eternidad Esme",
    category: "Anillos",
    price: 980,
    material: "Platino · Diamantes pavé",
    description:
      "Una línea continua de diamantes pavé para los momentos que no terminan.",
    gradient: ["#dce7e3", "#a8c4bc"],
  },
];

export function getProducts(): Product[] {
  return products;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
