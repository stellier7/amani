"use client";

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
        className="relative aspect-[4/5] w-full"
        style={{
          backgroundImage: `linear-gradient(135deg, ${product.gradient[0]}, ${product.gradient[1]})`,
        }}
      >
        <span className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs uppercase tracking-widest text-black/60">
          {product.category}
        </span>
        <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-70 transition-transform duration-500 group-hover:scale-110">
          💎
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-xs uppercase tracking-widest text-black/40">
            {product.material}
          </p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-black/60">
          {product.description}
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
