import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CollectionBrowser } from "@/components/CollectionBrowser";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { categoryFromShopQuery } from "@/lib/shop-categories";
import { getEllaYElProducts } from "@/lib/products";
import { HERO_OG_IMAGE } from "@/lib/site";

const collectionDescription =
  "Colección Ella y Él: collares y brazaletes de plata 925 a juego en tejido cubano, barbado y Figaro, más aretes, anillos y amuletos. Envíos en Honduras.";

export const metadata: Metadata = {
  title: "Ella y Él — Colección plata 925",
  description: collectionDescription,
  alternates: { canonical: "/ella-y-el" },
  openGraph: {
    title: "Ella y Él — Colección plata 925 | Amani Joyería",
    description: collectionDescription,
    url: "/ella-y-el",
    images: [{ url: HERO_OG_IMAGE }],
  },
};

export default async function CollectionPage({
  searchParams,
}: PageProps<"/ella-y-el">) {
  const { categoria } = await searchParams;
  const initialCategory = categoryFromShopQuery(categoria);
  const products = getEllaYElProducts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Ella y Él", path: "/ella-y-el" },
        ])}
      />
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
              Sets de plata 925 a juego para ella y él: dos collares, dos
              brazaletes, el conjunto completo, o una pieza suelta entre aretes,
              anillos y amuletos. Envíos a Tegucigalpa, San Pedro Sula,
              Comayagua y todo Honduras.
            </p>
          </div>

          <div className="relative min-h-[240px] lg:min-h-full">
            <Image
              src="/images/amani/hero-barbada-collares.png"
              alt="Pareja luciendo collares barbados de plata 925 a juego"
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
