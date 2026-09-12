"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
        }}
      >
        <Image
          src={product.image}
          alt={`${product.name}: ${product.pieces} de plata 925`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/5" />
        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/75 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
            {product.style}
          </span>
          <span className="rounded-full bg-[#2a2520]/75 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur">
            {product.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-widest text-black/40">
            {product.material}
          </p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-black/60">
          {product.description}
        </p>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#6f777b]">
          Incluye {product.pieces}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold tabular-nums">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            data-testid={`add-${product.id}`}
            className="rounded-full bg-[#2a2520] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-black disabled:opacity-70"
          >
            {added ? "Agregado ✓" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}
