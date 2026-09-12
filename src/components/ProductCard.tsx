"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const isCouple = product.category === "Para dos";
  const isBraceletsOnly = product.category === "Solo brazaletes";

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.8),transparent_38%)]" />
        <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/75 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
            {product.style}
          </span>
          <span className="rounded-full bg-[#2a2520]/75 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur">
            {product.category}
          </span>
        </div>
        <div
          aria-hidden
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        >
          {!isBraceletsOnly && (
            <div className="absolute left-[16%] top-[24%] h-[52%] w-[52%] rotate-[-12deg] rounded-[50%] border-[5px] border-[#9f7135] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.28),0_18px_30px_rgba(92,56,21,0.18)]" />
          )}
          {isCouple && (
            <div className="absolute right-[8%] top-[29%] h-[47%] w-[44%] rotate-[15deg] rounded-[50%] border-[3px] border-[#c49a5a] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4),0_16px_25px_rgba(92,56,21,0.16)]" />
          )}
          {(isCouple ||
            isBraceletsOnly ||
            product.category === "Collar + brazalete") && (
            <div className="absolute bottom-[15%] right-[12%] h-[24%] w-[31%] rotate-[-9deg] rounded-[50%] border-[5px] border-[#ad7b38] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.3),0_12px_20px_rgba(92,56,21,0.2)]" />
          )}
          {(isCouple || isBraceletsOnly) && (
            <div className="absolute bottom-[9%] left-[14%] h-[20%] w-[27%] rotate-[18deg] rounded-[50%] border-[3px] border-[#d0aa6b] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4),0_10px_18px_rgba(92,56,21,0.14)]" />
          )}
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
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9b713e]">
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
