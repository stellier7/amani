"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  type LinkStyle,
  type Product,
  type ProductCategory,
} from "@/lib/products";

const categories: Array<"Todos" | ProductCategory> = [
  "Todos",
  "Para dos",
  "Solo collares",
  "Solo brazaletes",
  "Collar + brazalete",
];

const styles: Array<"Todos" | LinkStyle> = [
  "Todos",
  "Cubana",
  "Barbada",
  "Eslabón Cartier",
];

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? "border-[#2a2520] bg-[#2a2520] text-white"
          : "border-black/10 bg-white text-black/60 hover:border-black/30 hover:text-black"
      }`}
    >
      {children}
    </button>
  );
}

export function CollectionBrowser({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>(
    "Todos",
  );
  const [style, setStyle] = useState<(typeof styles)[number]>("Todos");

  const visibleProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "Todos" || product.category === category) &&
          (style === "Todos" || product.style === style),
      ),
    [category, products, style],
  );

  return (
    <section id="collection" className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.36em] text-[#687075]">
          Combínalos a tu manera
        </p>
        <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
          La colección Ella y Él
        </h2>
        <p className="mt-4 leading-relaxed text-black/55">
          Elige dos collares, dos brazaletes, el conjunto completo para ambos o
          tu propio collar con brazalete. Cada diseño comparte el mismo acabado
          y lenguaje de eslabones.
        </p>
      </div>

      <div className="mt-9 space-y-4 border-y border-black/8 py-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-1">
          <span className="w-16 shrink-0 text-xs uppercase tracking-widest text-black/40">
            Set
          </span>
          {categories.map((option) => (
            <FilterButton
              key={option}
              active={category === option}
              onClick={() => setCategory(option)}
            >
              {option}
            </FilterButton>
          ))}
        </div>
        <div className="flex items-center gap-4 overflow-x-auto pb-1">
          <span className="w-16 shrink-0 text-xs uppercase tracking-widest text-black/40">
            Tejido
          </span>
          {styles.map((option) => (
            <FilterButton
              key={option}
              active={style === option}
              onClick={() => setStyle(option)}
            >
              {option}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className="mb-7 mt-10 flex items-center justify-between">
        <p className="text-sm text-black/50" aria-live="polite">
          {visibleProducts.length}{" "}
          {visibleProducts.length === 1 ? "conjunto" : "conjuntos"}
        </p>
        {(category !== "Todos" || style !== "Todos") && (
          <button
            type="button"
            onClick={() => {
              setCategory("Todos");
              setStyle("Todos");
            }}
            className="text-sm underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
