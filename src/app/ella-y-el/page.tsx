import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CollectionBrowser } from "@/components/CollectionBrowser";
import { categoryFromShopQuery } from "@/lib/shop-categories";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ella y Él",
  description:
    "La colección completa: collares y brazaletes de plata 925 a juego en tejido cubano, barbado y Figaro, más aretes, anillos y brazaletes de zirconias, perlas y amuletos.",
};

export default async function CollectionPage({
  searchParams,
}: PageProps<"/ella-y-el">) {
  const { categoria } = await searchParams;
  const initialCategory = categoryFromShopQuery(categoria);
  const products = getProducts();

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-3 pt-3 sm:px-6 sm:pt-6">
        <div className="grid min-h-[360px] overflow-hidden rounded-[2rem] bg-[#e4e3df] lg:grid-cols-[1fr_1fr]">
          <div className="relative z-10 flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-16">
            <nav
              aria-label="Ruta de navegación"
              className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/40"
            >
              <Link href="/" className="transition-colors hover:text-black">
                Inicio
              </Link>
              <span aria-hidden>·</span>
              <span className="text-black/70">Ella y Él</span>
            </nav>

            <h1 className="mt-6 text-balance text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-6xl">
              Ella
              <span className="font-light italic text-[#767e82]"> y Él</span>
            </h1>
            <p className="mt-5 max-w-md text-balance leading-relaxed text-black/60">
              Elige dos collares, dos brazaletes, el conjunto completo para
              ambos, tu propio collar con brazalete, o una pieza suelta entre
              nuestros aretes, anillos y brazaletes de amuletos, perlas y
              cordón. Cada diseño comparte el mismo acabado en plata 925.
            </p>
          </div>

          <div className="relative min-h-[240px] lg:min-h-full">
            <Image
              src="/images/amani/ella-y-el-hero.png"
              alt="Pareja hondureña luciendo collares y brazaletes Figaro de plata a juego"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-right"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-2 pt-14">
        <p className="text-xs uppercase tracking-[0.36em] text-[#687075]">
          Combínalos a tu manera
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
