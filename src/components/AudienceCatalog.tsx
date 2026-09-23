import Image from "next/image";
import Link from "next/link";
import { CollectionBrowser } from "@/components/CollectionBrowser";
import type { Product } from "@/lib/products";

export function AudienceCatalog({
  title,
  eyebrow,
  description,
  image,
  imageAlt,
  products,
  initialCategory = "Todos",
}: {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
  products: Product[];
  initialCategory?: "Todos" | Product["category"];
}) {
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
              <span className="text-black/70">{title}</span>
            </nav>

            <p className="mt-6 text-xs uppercase tracking-[0.36em] text-[#687075]">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-balance text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-md text-balance leading-relaxed text-black/60">
              {description}
            </p>
          </div>

          <div className="relative min-h-[240px] bg-white lg:min-h-full">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-10 sm:p-14"
            />
          </div>
        </div>
      </section>

      <CollectionBrowser
        key={initialCategory}
        products={products}
        initialCategory={initialCategory}
        showFilters={false}
      />
    </>
  );
}
