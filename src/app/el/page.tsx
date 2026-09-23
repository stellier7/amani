import type { Metadata } from "next";
import { AudienceCatalog } from "@/components/AudienceCatalog";
import { categoryFromShopQuery } from "@/lib/shop-categories";
import { getAudienceProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Él",
  description:
    "Piezas de plata 925 pensadas para él: cadenas cubanas, Figaro y brazaletes de eslabón.",
};

export default async function ElPage({ searchParams }: PageProps<"/el">) {
  const { categoria } = await searchParams;
  const initialCategory = categoryFromShopQuery(categoria);
  const products = getAudienceProducts("hombre");

  return (
    <AudienceCatalog
      title="Él"
      eyebrow="Colección para él"
      description="Cadenas y brazaletes de presencia — cubana, Figaro y marina en plata 925."
      image="/images/amani/cubana-collar.jpg"
      imageAlt="Collar Cubana Clásica de plata 925"
      products={products}
      initialCategory={initialCategory}
    />
  );
}
