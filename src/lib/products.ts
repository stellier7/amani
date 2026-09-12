export type Product = {
  id: string;
  name: string;
  category: "Rings" | "Necklaces" | "Earrings" | "Bracelets";
  price: number;
  material: string;
  description: string;
  /** Two CSS colors used to render the product's gradient tile. */
  gradient: [string, string];
};

export const products: Product[] = [
  {
    id: "aurora-solitaire",
    name: "Aurora Solitaire Ring",
    category: "Rings",
    price: 1290,
    material: "18k Gold · 0.5ct Diamond",
    description:
      "A single brilliant-cut diamond held in a whisper-thin band. Understated, forever.",
    gradient: ["#f6d9c9", "#e8b4a0"],
  },
  {
    id: "luna-pendant",
    name: "Luna Pendant Necklace",
    category: "Necklaces",
    price: 640,
    material: "Sterling Silver · Moonstone",
    description:
      "A softly glowing moonstone suspended on a delicate 45cm chain.",
    gradient: ["#d8e3f0", "#b6c7e0"],
  },
  {
    id: "sol-hoops",
    name: "Sol Huggie Hoops",
    category: "Earrings",
    price: 380,
    material: "14k Gold Vermeil",
    description:
      "Everyday hoops with a warm, hand-polished finish that catches the light.",
    gradient: ["#f7e6b8", "#e9c766"],
  },
  {
    id: "marea-bracelet",
    name: "Marea Chain Bracelet",
    category: "Bracelets",
    price: 520,
    material: "18k Gold · Adjustable",
    description:
      "A fluid curb chain that drapes beautifully and layers with anything.",
    gradient: ["#e9d5f0", "#c9a8e0"],
  },
  {
    id: "vera-studs",
    name: "Vera Pearl Studs",
    category: "Earrings",
    price: 295,
    material: "Freshwater Pearl · Gold Posts",
    description:
      "Classic pearls reimagined with a modern, off-round silhouette.",
    gradient: ["#f0e9e0", "#d6c7b8"],
  },
  {
    id: "esme-band",
    name: "Esme Eternity Band",
    category: "Rings",
    price: 980,
    material: "Platinum · Pavé Diamonds",
    description:
      "A continuous line of pavé diamonds for the moments that never end.",
    gradient: ["#dce7e3", "#a8c4bc"],
  },
];

export function getProducts(): Product[] {
  return products;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
