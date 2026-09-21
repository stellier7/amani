import Image from "next/image";
import Link from "next/link";
import { shopCategories, shopCategoryHref } from "@/lib/shop-categories";

export function ShopByCategory() {
  return (
    <section
      id="categorias"
      aria-labelledby="categorias-heading"
      className="mx-auto max-w-6xl px-6 py-16 sm:py-20"
    >
      <h2
        id="categorias-heading"
        className="text-center text-3xl font-medium sm:text-4xl"
      >
        Compra por categoría
      </h2>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-6 lg:gap-x-5">
        {shopCategories.map((category) => (
          <li key={category.slug}>
            <Link href={shopCategoryHref(category)} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 bg-white">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, 50vw"
                  className={`object-cover ${category.imageClass}`}
                />
              </div>
              <span className="mt-3 block text-center text-sm font-medium decoration-black/30 underline-offset-4 group-hover:underline">
                {category.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
