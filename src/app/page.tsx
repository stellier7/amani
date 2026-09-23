import Image from "next/image";
import Link from "next/link";
import { ExploreCollection } from "@/components/ExploreCollection";
import { FeaturedScroller } from "@/components/FeaturedScroller";
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
      <section className="relative isolate min-h-[min(100svh,920px)] w-full overflow-hidden bg-[#0c0c0c]">
        <Image
          src="/images/amani/hero-ella.jpg"
          alt="Modelo luciendo joyería de plata 925 Amani"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent sm:via-black/25 lg:from-black/70 lg:via-black/15 lg:to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[min(100svh,920px)] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-white/70">
            Plata 925 · Honduras
          </p>
          <h1 className="mt-5 max-w-xl text-balance text-6xl font-medium leading-[0.9] tracking-[-0.055em] text-white sm:text-7xl xl:text-8xl">
            Amani
          </h1>
          <p className="mt-7 max-w-md text-balance text-lg leading-relaxed text-white/65">
            Joyería en plata 925 para ella y para él — collares, brazaletes,
            anillos y aretes con el mismo cuidado en cada pieza.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/#collection"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#2a2520] transition-transform hover:-translate-y-0.5 hover:bg-white/90"
            >
              Explorar la colección
            </Link>
            <a
              href="#categorias"
              className="text-sm text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Compra por categoría
            </a>
          </div>
        </div>
      </section>

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
