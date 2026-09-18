"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import {
  formatPrice,
  productPath,
  tileBackground,
  type Product,
} from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const isPackshot = product.shot === "packshot";

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={productPath(product)}
        draggable={false}
        className="flex flex-1 flex-col"
      >
        <div
          className="relative aspect-[4/5] w-full overflow-hidden"
          style={{ background: tileBackground(product) }}
        >
          <Image
            src={product.image}
            alt={`${product.name}: ${product.pieces} de plata 925`}
            fill
            draggable={false}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={`transition-transform duration-700 group-hover:scale-[1.03] ${
              isPackshot ? "object-contain" : "object-cover"
            }`}
          />
          {!isPackshot && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/5" />
          )}
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/75 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
              {product.style}
            </span>
            <span className="rounded-full bg-[#2a2520]/75 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur">
              {product.category}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 pb-0">
          <div>
            <h3 className="text-lg font-medium decoration-black/30 underline-offset-4 group-hover:underline">
              {product.name}
            </h3>
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
        </div>
      </Link>

      <div className="flex items-center justify-between p-5 pt-3">
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
    </article>
  );
}
