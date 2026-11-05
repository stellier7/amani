import { ExploreCollection } from "@/components/ExploreCollection";
import { FeaturedScroller } from "@/components/FeaturedScroller";
import { HomeHero } from "@/components/HomeHero";
import { ShopByCategory } from "@/components/ShopByCategory";
import { loadPublicCatalog } from "@/lib/catalog/store";
import { categoryFromShopQuery } from "@/lib/shop-categories";
import {
  getFeaturedProducts,
  getHomepageProducts,
} from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { categoria } = await searchParams;
  const initialCategory = categoryFromShopQuery(categoria);
  const allProducts = await loadPublicCatalog();
  const products = getHomepageProducts(allProducts);
  const openFromQuery = Boolean(
    Array.isArray(categoria) ? categoria[0] : categoria,
  );

  return (
    <>
      <HomeHero />

      <FeaturedScroller products={getFeaturedProducts(products)} />

      <ShopByCategory />

      <ExploreCollection
        products={products}
        initialCategory={initialCategory}
        initialOpen={openFromQuery}
      />
    </>
  );
}
