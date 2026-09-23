import { ExploreCollection } from "@/components/ExploreCollection";
import { FeaturedScroller } from "@/components/FeaturedScroller";
import { HomeHero } from "@/components/HomeHero";
import { ShopByCategory } from "@/components/ShopByCategory";
import { categoryFromShopQuery } from "@/lib/shop-categories";
import {
  getFeaturedProducts,
  getHomepageProducts,
  getProducts,
  type Product,
} from "@/lib/products";

async function loadProducts(): Promise<Product[]> {
  // Demonstrate the end-to-end data flow through the internal API route when a
  // base URL is available, falling back to the catalog module during build/SSG.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as { products: Product[] };
        return data.products;
      }
    } catch {
      // Fall through to the local catalog.
    }
  }
  return getProducts();
}

export default async function Home({ searchParams }: PageProps<"/">) {
  const { categoria } = await searchParams;
  const initialCategory = categoryFromShopQuery(categoria);
  const allProducts = await loadProducts();
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
