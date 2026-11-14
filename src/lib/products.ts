export type ProductCategory =
  | "Para dos"
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

/** Who a solo piece is merchandised for on /ella and /el. */
export type ProductAudience = "mujer" | "hombre" | "unisex";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  style: ProductStyle;
  /** Null until a price is set. The piece stays listed and cannot be added to the bag. */
  price: number | null;
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
    id: "anillo-sello-crucifijo",
    name: "Anillo Sello Crucifijo",
    category: "Anillos",
    style: "Amuletos",
    price: 1090,
    material: "Plata 925 · Crucifijo y pavé",
    description:
      "Sello ancho con un crucifijo al centro, columnas de pavé a los lados y una cruz en cada hombro.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-sello-crucifijo.jpg",
    shot: "lifestyle",
    gradient: ["#d9d5d2", "#b7b3b0"],
    featured: true,
    audience: "hombre",
  },
  {
    id: "anillo-corazon-nube",
    name: "Anillo Corazón Nube",
    category: "Anillos",
    style: "Zirconias",
    price: 570,
    material: "Plata 925 · Piedra central y pavé",
    description:
      "Corazón calado con una piedra en tono gris perla al centro y pavé en los hombros.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-corazon-nube.jpg",
    shot: "lifestyle",
    gradient: ["#ebe6e0", "#cfc8c0"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "anillo-zigzag",
    name: "Anillo Zigzag",
    category: "Anillos",
    style: "Zirconias",
    price: 580,
    material: "Plata 925 · Zirconias",
    description:
      "Banda de zirconias en zigzag: cada pico marca un destello seguido.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-zigzag.jpg",
    shot: "lifestyle",
    gradient: ["#f3ece8", "#e4d5cf"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "anillo-corazon-bolitas",
    name: "Anillo Corazón de Bolitas",
    category: "Anillos",
    style: "Amuletos",
    price: 570,
    material: "Plata 925 · Corazón liso",
    description:
      "Corazón pulido, sin piedras, montado sobre una banda de bolitas que sube al centro.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-corazon-bolitas.jpg",
    shot: "lifestyle",
    gradient: ["#f4efe9", "#e3dbd3"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "anillo-dos-mariposas",
    name: "Anillo Dos Mariposas",
    category: "Anillos",
    style: "Amuletos",
    price: 490,
    material: "Plata 925 · Pavé y negro",
    description:
      "Aro abierto con dos mariposas enfrentadas: una cubierta de pavé y otra en negro.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-dos-mariposas.jpg",
    shot: "lifestyle",
    gradient: ["#f3eee8", "#e6dfd6"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "anillo-corte-esmeralda",
    name: "Anillo Corte Esmeralda",
    category: "Anillos",
    style: "Zirconias",
    price: 590,
    material: "Plata 925 · Piedra verde y halo",
    description:
      "Piedra verde en corte esmeralda, halo cuadrado y banda de pavé a ambos lados.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-corte-esmeralda.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "anillo-princesa",
    name: "Anillo Princesa",
    category: "Anillos",
    style: "Zirconias",
    price: 590,
    material: "Plata 925 · Talla princesa y halo",
    description:
      "Zirconia cuadrada en talla princesa, halo de pavé y una hilera de piedras en cada hombro.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-princesa.jpg",
    shot: "lifestyle",
    gradient: ["#1a1a1a", "#3a3a3a"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "aretes-gota-roja",
    name: "Aretes Gota Roja",
    category: "Aretes",
    style: "Zirconias",
    price: 750,
    material: "Plata 925 · Piedras rojas y halo",
    description:
      "Un círculo rojo con halo abre la caída; debajo, una gota roja enmarcada en pavé.",
    pieces: "1 par de aretes",
    image: "/images/amani/aretes-gota-roja.jpg",
    shot: "lifestyle",
    gradient: ["#e6e7e6", "#c8cbcb"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "aretes-cuadrado-azul",
    name: "Aretes Cuadrado Azul",
    category: "Aretes",
    style: "Zirconias",
    price: 580,
    material: "Plata 925 · Huggie de pavé y piedra azul",
    description:
      "Aro corto de pavé del que cuelga una piedra azul en talla cuadrada.",
    pieces: "1 par de aretes",
    image: "/images/amani/aretes-cuadrado-azul.jpg",
    shot: "lifestyle",
    gradient: ["#e4e6e6", "#c5c8c8"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "aretes-ovalo-azul",
    name: "Aretes Óvalo Azul",
    category: "Aretes",
    style: "Zirconias",
    price: 580,
    material: "Plata 925 · Piedra azul oval y halo",
    description:
      "Piedra azul en talla oval, rodeada de un halo de zirconias, en un tope cerca del lóbulo.",
    pieces: "1 par de aretes",
    image: "/images/amani/aretes-ovalo-azul.jpg",
    shot: "lifestyle",
    gradient: ["#e7e8ea", "#c9ccd0"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "aretes-cruz-larga",
    name: "Aretes Cruz Larga",
    category: "Aretes",
    style: "Amuletos",
    price: 420,
    material: "Plata 925 · Barra con cruz",
    description:
      "Barra fina y larga con una cruz pequeña a media caída.",
    pieces: "1 par de aretes",
    image: "/images/amani/aretes-cruz-larga.jpg",
    shot: "lifestyle",
    gradient: ["#e6e7e8", "#c7c9cc"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "collar-lluvia-estrellas",
    name: "Collar Lluvia de Estrellas",
    category: "Collares",
    style: "Zirconias",
    price: 680,
    material: "Plata 925 · Disco de pavé y tres estrellas",
    description:
      "Cadena fina que baja a un disco de pavé y tres hilos con estrellas en descenso.",
    pieces: "1 collar",
    image: "/images/amani/collar-lluvia-estrellas.jpg",
    shot: "lifestyle",
    gradient: ["#f6f3ef", "#e7e2dc"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "set-tulipan",
    name: "Set Tulipán",
    category: "Collares",
    style: "Amuletos",
    price: 1480,
    material: "Plata 925 · Piedra roja y hojas verdes",
    description:
      "Tulipán de piedra roja con tallo y hojas verdes, en collar y en aretes a juego.",
    pieces: "1 collar · 1 par de aretes",
    image: "/images/amani/set-tulipan.jpg",
    shot: "lifestyle",
    gradient: ["#f7f4f1", "#e6e0dc"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "set-atrapasuenos",
    name: "Set Atrapasueños",
    category: "Collares",
    style: "Amuletos",
    price: 1280,
    material: "Plata 925 · Atrapasueños y plumas",
    description:
      "Atrapasueños calado con tres plumas, repetido en el collar y en los aretes.",
    pieces: "1 collar · 1 par de aretes",
    image: "/images/amani/set-atrapasuenos.jpg",
    shot: "lifestyle",
    gradient: ["#f3eee8", "#ddd6ce"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "set-corazon-rojo",
    name: "Set Corazón Rojo",
    category: "Collares",
    style: "Zirconias",
    price: 1280,
    material: "Plata 925 · Corazón rojo con halo",
    description:
      "Corazón con piedra roja y halo de zirconias, en el collar y en los aretes.",
    pieces: "1 collar · 1 par de aretes",
    image: "/images/amani/set-corazon-rojo.jpg",
    shot: "lifestyle",
    gradient: ["#f4efe9", "#e4dcd4"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "set-halo-oval",
    name: "Set Halo Oval",
    category: "Collares",
    style: "Zirconias",
    price: 1980,
    material: "Plata 925 · Piedra oval y halo",
    description:
      "La misma piedra oval con halo de zirconias, en aretes, anillo y collar.",
    pieces: "1 collar · 1 anillo · 1 par de aretes",
    image: "/images/amani/set-halo-oval.jpg",
    shot: "lifestyle",
    gradient: ["#f5f1ec", "#e5dfd8"],
    featured: true,
    audience: "mujer",
  },
  {
    id: "brazalete-mandala",
    name: "Brazalete Mandala",
    category: "Brazaletes",
    style: "Amuletos",
    price: 650,
    material: "Plata 925 · Medallón calado",
    description:
      "Cadena fina con un medallón circular: flor calada al centro y orilla de zirconias.",
    pieces: "1 brazalete",
    image: "/images/amani/brazalete-mandala.jpg",
    shot: "lifestyle",
    gradient: ["#f6f2ee", "#e8e2db"],
    featured: true,
    audience: "mujer",
  },
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
    soldOut: true,
  },
  {
    id: "cadena-cubana-6mm",
    name: "Cadena Cubana",
    category: "Collares",
    style: "Cubana",
    price: 5709,
    material: "Plata 925 · 6 mm de ancho",
    description:
      "Eslabón cubano plano y pulido que cae con peso y brillo uniforme, cerrado con langosta para el día a día o capas.",
    pieces: "1 collar · 55,5 cm",
    image: "/images/amani/cadena-cubana-6mm.jpg",
    shot: "packshot",
    featured: true,
    audience: "hombre",
  },
  {
    id: "cadena-tejido-gucci",
    name: "Cadena Tejido Gucci 3 mm",
    category: "Collares",
    style: "Marina",
    price: 1999,
    material: "Plata 925 · 3 mm de ancho",
    description:
      "Eslabón marina con barra central en tejido Gucci: fino, flexible y con brillo continuo de eslabón a eslabón.",
    pieces: "1 collar · 55 cm",
    image: "/images/amani/cadena-tejido-gucci.jpg",
    shot: "packshot",
    featured: true,
    audience: "unisex",
  },
  {
    id: "cadena-tejido-gucci-5mm",
    name: "Cadena Tejido Gucci 5 mm",
    category: "Collares",
    style: "Marina",
    price: 7490,
    material: "Plata 925 · 5 mm de ancho",
    description:
      "Tejido Gucci en escala media: eslabón marina con barra central, más presencia en el cuello sin perder caída.",
    pieces: "1 collar · 55 cm",
    image: "/images/amani/cadena-tejido-gucci-5mm.jpg",
    shot: "packshot",
    featured: true,
    audience: "hombre",
  },
  {
    id: "set-rolo-collar-brazalete",
    name: "Set Collar y Brazalete Rolo",
    category: "Para dos",
    style: "Barbada",
    price: 5725,
    material: "Plata 925 · 5 mm de ancho",
    description:
      "Mismo eslabón redondo pulido en cuello y muñeca, con cierre toggle en T que cierra el look con línea limpia.",
    pieces: "1 collar · 40 cm · 1 brazalete · 20 cm",
    image: "/images/amani/set-rolo-collar-brazalete.jpg",
    shot: "packshot",
    featured: true,
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
    id: "anillo-cupula-espejo",
    name: "Anillo Cúpula Espejo",
    category: "Anillos",
    style: "Zirconias",
    price: 1350,
    material: "Plata 925 · Acabado espejo",
    description:
      "Media esfera pulida en plata maciza, elevada sobre una shank partida que deja un arco de aire y volumen escultórico.",
    pieces: "1 anillo · Talla 8",
    image: "/images/amani/anillo-cupula-espejo.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "anillo-ribera-goteo",
    name: "Anillo Ribera Goteo",
    category: "Anillos",
    style: "Zirconias",
    price: 1050,
    material: "Plata 925 · Calado artesanal",
    description:
      "Banda ancha con dos rieles pulidos que enmarcan un calado vertical, como plata fundida que cae en gotas congeladas.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-ribera-goteo.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "anillo-llama-calado",
    name: "Anillo Llama Calada",
    category: "Anillos",
    style: "Zirconias",
    price: 990,
    material: "Plata 925 · Calado pulido",
    description:
      "Frente ancho con cinco lenguas de plata en calado ondulado: brillo espejo y silueta de llama congelada en la mano.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-llama-calado.jpg",
    shot: "packshot",
    featured: true,
    audience: "unisex",
  },
  {
    id: "anillo-bombe-espejo",
    name: "Anillo Bombé Espejo",
    category: "Anillos",
    style: "Zirconias",
    price: 1150,
    material: "Plata 925 · Diseño abombado",
    description:
      "Cúpula maciza de perfil redondo que crece sobre la banda: volumen suave, brillo espejo y presencia sin piedras.",
    pieces: "1 anillo",
    image: "/images/amani/anillo-bombe-espejo.jpg",
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
    category: "Brazaletes",
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
    category: "Brazaletes",
    style: "Perlas",
    price: 650,
    material: "Plata 925 · Perlas de río naturales",
    description:
      "Tres perlas de río naturales, cada una con su propia forma, tejidas a mano sobre cordón negro.",
    pieces: "1 brazalete",
    image: "/images/amani/cordon-perla-barroca.jpg",
    shot: "packshot",
    featured: true,
    audience: "mujer",
  },
  {
    id: "cordon-tres-perlas",
    name: "Trilogía Mediterránea 925",
    category: "Brazaletes",
    style: "Perlas",
    price: 550,
    material: "Plata 925 · Perlas Majorica naturales",
    description:
      "Tres perlas Majorica naturales redondas separadas por esferas diamantadas, en un cordón negro ajustable.",
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
    name: "Collar Tejido Cartier",
    category: "Collares",
    style: "Figaro / Cartier",
    price: 3750,
    material: "Plata 925 · 5 mm de ancho",
    description:
      "Tejido Cartier en ritmo 3+1 a cincuenta centímetros: eslabones planos pulidos y cierre de langosta para el día a día.",
    pieces: "1 collar · 50 cm",
    image: "/images/amani/figaro-collar.jpg",
    shot: "packshot",
    featured: true,
    audience: "hombre",
  },
  {
    id: "cadena-tejido-cartier-3mm",
    name: "Cadena Tejido Cartier",
    category: "Collares",
    style: "Figaro / Cartier",
    price: 1490,
    material: "Plata 925 · 3 mm de ancho",
    description:
      "Ochenta centímetros de ritmo 3+1 en perfil fino: cae largo sobre la camisa, lista para dije o capas.",
    pieces: "1 collar · 80 cm",
    image: "/images/amani/cadena-tejido-cartier-3mm.jpg",
    shot: "packshot",
    featured: true,
    audience: "unisex",
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
    price: 1620,
    material: "Plata 925 · Eslabón Figaro",
    description:
      "El ritmo 3+1 del Figaro en la muñeca, acabado pulido y cierre seguro.",
    pieces: "1 brazalete",
    image: "/images/amani/figaro-brazalete.jpg",
    shot: "lifestyle",
    gradient: ["#ececec", "#cfcfcf"],
    featured: true,
    audience: "hombre",
  },
  {
    id: "brazalete-tejido-cartier-6mm",
    name: "Brazalete Tejido Cartier",
    category: "Brazaletes",
    style: "Figaro / Cartier",
    price: 1800,
    material: "Plata 925 · 6 mm de ancho",
    description:
      "Tejido Cartier en ritmo 3+1: eslabones planos que alternan con brillo continuo y cierre de langosta 925.",
    pieces: "1 brazalete · 22,5 cm",
    image: "/images/amani/brazalete-tejido-cartier-6mm.jpg",
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

export const PRICE_PENDING_LABEL = "Por confirmar";

export function isPriced(
  product: Pick<Product, "price">,
): product is Pick<Product, "price"> & { price: number } {
  return product.price != null;
}

/** Price for the card, or a placeholder until one is set. */
export function formatProductPrice(product: Pick<Product, "price">): string {
  if (!isPriced(product)) return PRICE_PENDING_LABEL;
  return formatPrice(product.price);
}

export function canAddToBag(
  product: Pick<Product, "price" | "soldOut">,
): boolean {
  return product.price != null && !product.soldOut;
}
