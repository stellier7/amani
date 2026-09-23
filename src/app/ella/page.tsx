import type { Metadata } from "next";
import { AudienceCatalog } from "@/components/AudienceCatalog";
import { categoryFromShopQuery } from "@/lib/shop-categories";
import { getAudienceProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ella",
  description:
    "Piezas de plata 925 pensadas para ella: anillos, aretes, brazaletes de zirconias y perlas.",
};

export default async function EllaPage({
  searchParams,
}: PageProps<"/ella">) {
  const { categoria } = await searchParams;
  const initialCategory = categoryFromShopQuery(categoria);
  const products = getAudienceProducts("mujer");

  return (
    <AudienceCatalog
      title="Ella"
      eyebrow="Colección para ella"
      description="Anillos, aretes y brazaletes con brillo suave — zirconias, perlas y amuletos en plata 925."
      image="/images/amani/tennis-brazalete.jpg"
      imageAlt="Brazalete Tennis Lluvia de plata 925 con zirconias"
      products={products}
      initialCategory={initialCategory}
    />
  );
}
