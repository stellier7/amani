"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";
import type { Product } from "@/lib/products";

export function AddToBagButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (product.soldOut) return;
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  if (product.soldOut) {
    return (
      <button
        type="button"
        disabled
        data-testid={`detail-add-${product.id}`}
        className="w-full cursor-not-allowed rounded-full bg-black/25 px-7 py-4 text-sm font-medium text-white sm:w-auto sm:px-12"
      >
        Vendido
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      data-testid={`detail-add-${product.id}`}
      className="w-full rounded-full bg-[#2a2520] px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-black sm:w-auto sm:px-12"
    >
      {added ? "Agregado a la bolsa ✓" : "Agregar a la bolsa"}
    </button>
  );
}
