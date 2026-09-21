import Image from "next/image";
import Link from "next/link";
import { shopCategories, shopCategoryHref } from "@/lib/shop-categories";

export function ShopByCategory() {
  return (
    <section
      id="categorias"
      aria-labelledby="categorias-heading"
      className="mx-auto max-w-6xl px-6 py-16 sm:py-24"
    >
      <h2
        id="categorias-heading"
        className="text-center font-serif text-3xl font-medium tracking-tight sm:text-4xl"
      >
        Compra por categoría
      </h2>

      <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-10 sm:gap-y-16">
        {shopCategories.map((category) => (
          <li key={category.slug}>
            <Link href={shopCategoryHref(category)} className="group block text-center">
              <div className="relative aspect-square overflow-hidden bg-[#e8e6e1]">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 30vw, 50vw"
                  className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${category.imageClass}`}
                />
              </div>
              <span className="mt-5 block font-serif text-xl font-medium tracking-tight text-[#2a2520] sm:text-2xl">
                {category.name}
              </span>
              <span className="mt-2 inline-block text-[11px] font-medium uppercase tracking-[0.22em] text-[#2a2520] underline decoration-black/35 underline-offset-[6px] transition-colors group-hover:decoration-black">
                Comprar
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
