"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { formatPrice, tileBackground, type Product } from "@/lib/products";

function FeaturedTile({
  product,
  instance,
}: {
  product: Product;
  instance: number;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const isPackshot = product.shot === "packshot";

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="featured-tile group flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl border border-black/5 bg-white sm:w-[300px]">
      <div
        className="relative aspect-[5/4] w-full overflow-hidden"
        style={{ background: tileBackground(product) }}
      >
        <Image
          src={product.image}
          alt={`${product.name}: ${product.pieces} de plata 925`}
          fill
          sizes="300px"
          className={`transition-transform duration-700 group-hover:scale-[1.03] ${
            isPackshot ? "object-contain" : "object-cover"
          }`}
        />
        {!isPackshot && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
          {product.style}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#687075]">
            {product.category}
          </p>
          <h3 className="mt-1 text-base font-medium leading-snug">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-black/40">{product.pieces}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="text-base font-semibold tabular-nums">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            data-testid={`featured-add-${product.id}-${instance}`}
            className="rounded-full bg-[#2a2520] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black"
          >
            {added ? "Agregado ✓" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}

export function FeaturedScroller({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  // The CSS loop translates by -50%, so each half has to stay wider than the
  // viewport. Repeat short lists until a half covers an ultra-wide screen.
  const tilesPerHalf = Math.max(12, products.length);
  const half = Array.from(
    { length: tilesPerHalf },
    (_, index) => products[index % products.length],
  );
  const loop = [...half, ...half];

  return (
    <section
      id="destacados"
      aria-label="Recién llegados"
      className="overflow-hidden py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.36em] text-[#687075]">
          Destacados
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-medium sm:text-4xl">
          Recién llegados
        </h2>
        <p className="mt-4 max-w-lg leading-relaxed text-black/55">
          Nuestras piezas más nuevas en plata 925: el set cubano italiano, el
          tennis ajustable y los anillos de zirconias.
        </p>
      </div>

      <div className="featured-marquee relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#faf7f2] to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#faf7f2] to-transparent sm:w-16" />

        <div className="featured-marquee-track flex w-max gap-5 px-6">
          {loop.map((product, index) => (
            <FeaturedTile
              key={`${product.id}-${index}`}
              product={product}
              instance={index}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl px-6">
        <a
          href="#collection"
          className="text-sm underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black"
        >
          Ver toda la colección
        </a>
      </div>
    </section>
  );
}
