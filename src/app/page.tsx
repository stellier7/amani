import Image from "next/image";
import Link from "next/link";
import { CollectionBrowser } from "@/components/CollectionBrowser";
import { FeaturedScroller } from "@/components/FeaturedScroller";
import { ShopByCategory } from "@/components/ShopByCategory";
import { categoryFromShopQuery } from "@/lib/shop-categories";
import {
  getFeaturedProducts,
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
  const products = await loadProducts();

  return (
    <>
      <section className="relative isolate min-h-[min(100svh,920px)] w-full overflow-hidden bg-[#e4e3df]">
        <Image
          src="/images/amani/ella-y-el-hero.png"
          alt="Pareja hondureña luciendo collares y brazaletes Figaro de plata a juego"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] sm:object-[68%_center] lg:object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf7f2]/95 via-[#faf7f2]/55 to-transparent sm:via-[#faf7f2]/40 lg:from-[#faf7f2]/90 lg:via-[#faf7f2]/25 lg:to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[min(100svh,920px)] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-20">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-black">
            Amani Joyería — Honduras
          </p>
          <h1 className="mt-5 max-w-xl text-balance text-6xl font-medium leading-[0.9] tracking-[-0.055em] sm:text-7xl xl:text-8xl">
            Ella
            <span className="block font-light italic text-[#5c6569]">
              y Él
            </span>
          </h1>
          <p className="mt-7 max-w-md text-balance text-lg leading-relaxed text-black/60">
            Tres estilos, un mismo vínculo. Collares y brazaletes a juego para
            llevar juntos, separados o completamente a su manera.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#collection"
              className="rounded-full bg-[#2a2520] px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-black"
            >
              Ver la colección Ella y Él
            </a>
            <a
              href="#categorias"
              className="text-sm underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black"
            >
              Compra por categoría
            </a>
          </div>
        </div>
      </section>

      <FeaturedScroller products={getFeaturedProducts(products)} />

      <ShopByCategory />

      <section className="mx-auto flex max-w-6xl justify-center px-6 py-16 sm:py-20">
        <a
          href="#collection"
          className="inline-flex rounded-full border border-black/15 px-7 py-3.5 text-sm font-medium transition-colors hover:border-black hover:bg-[#2a2520] hover:text-white"
        >
          Explorar los {products.length} diseños
        </a>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-2 pt-4">
        <p className="text-xs uppercase tracking-[0.36em] text-[#687075]">
          Toda la colección
        </p>
        <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
          {products.length} diseños en plata 925
        </h2>
      </section>

      <CollectionBrowser
        key={initialCategory}
        products={products}
        initialCategory={initialCategory}
      />
    </>
  );
}
