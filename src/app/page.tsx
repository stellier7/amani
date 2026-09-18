import Image from "next/image";
import Link from "next/link";
import { FeaturedScroller } from "@/components/FeaturedScroller";
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

export default async function Home() {
  const products = await loadProducts();

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-3 pt-3 sm:px-6 sm:pt-6">
        <div className="grid min-h-[650px] overflow-hidden rounded-[2rem] bg-[#e4e3df] lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative z-10 flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-black">
              Amani Joyería — Honduras
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#687075]">
              Nueva colección · Para compartir
            </p>
            <h1 className="mt-5 text-balance text-6xl font-medium leading-[0.9] tracking-[-0.055em] sm:text-7xl xl:text-8xl">
              Ella
              <span className="block font-light italic text-[#767e82]">
                y Él
              </span>
            </h1>
            <p className="mt-7 max-w-md text-balance text-lg leading-relaxed text-black/60">
              Tres estilos, un mismo vínculo. Collares y brazaletes a juego
              para llevar juntos, separados o completamente a su manera.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/ella-y-el"
                className="rounded-full bg-[#2a2520] px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-black"
              >
                Ver la colección Ella y Él
              </Link>
              <a
                href="#como-combinar"
                className="text-sm underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black"
              >
                Ver combinaciones
              </a>
            </div>
          </div>

          <div className="relative min-h-[380px] lg:min-h-full">
            <Image
              src="/images/amani/ella-y-el-hero.png"
              alt="Pareja hondureña luciendo collares y brazaletes Figaro de plata a juego"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-right"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
            <p className="absolute bottom-7 right-7 rounded-full border border-white/30 bg-black/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white backdrop-blur-md">
              Figaro · 4 piezas
            </p>
          </div>
        </div>
      </section>

      <FeaturedScroller products={getFeaturedProducts(products)} />

      <section
        id="como-combinar"
        className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-3"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[#687075]">
            01 · Para dos
          </p>
          <h2 className="mt-3 text-2xl font-medium">El set completo</h2>
          <p className="mt-3 text-sm leading-relaxed text-black/55">
            Dos collares y dos brazaletes en proporciones complementarias.
          </p>
        </div>
        <div className="border-t border-black/10 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <p className="text-xs uppercase tracking-[0.32em] text-[#687075]">
            02 · Solo ustedes
          </p>
          <h2 className="mt-3 text-2xl font-medium">Dúos a juego</h2>
          <p className="mt-3 text-sm leading-relaxed text-black/55">
            Elige solo collares o solo brazaletes para compartir el diseño.
          </p>
        </div>
        <div className="border-t border-black/10 pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <p className="text-xs uppercase tracking-[0.32em] text-[#687075]">
            03 · Para ti
          </p>
          <h2 className="mt-3 text-2xl font-medium">Tu combinación</h2>
          <p className="mt-3 text-sm leading-relaxed text-black/55">
            Un collar y un brazalete coordinados para llevar como firma.
          </p>
        </div>
        <div className="md:col-span-3">
          <Link
            href="/ella-y-el"
            className="inline-flex rounded-full border border-black/15 px-7 py-3.5 text-sm font-medium transition-colors hover:border-black hover:bg-[#2a2520] hover:text-white"
          >
            Explorar los {products.length} diseños
          </Link>
        </div>
      </section>
    </>
  );
}
