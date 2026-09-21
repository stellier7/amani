"use client";

import { useEffect, useRef, useState } from "react";
import { CollectionBrowser } from "@/components/CollectionBrowser";
import {
  type Product,
  type ProductCategory,
} from "@/lib/products";

export function ExploreCollection({
  products,
  initialCategory = "Todos",
  initialOpen = false,
}: {
  products: Product[];
  initialCategory?: "Todos" | ProductCategory;
  initialOpen?: boolean;
}) {
  const [open, setOpen] = useState(initialOpen);
  const collectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialOpen) setOpen(true);
  }, [initialOpen]);

  useEffect(() => {
    function openFromHash() {
      if (window.location.hash !== "#collection") return;
      setOpen(true);
    }

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    if (window.location.hash !== "#collection") return;
    collectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open]);

  function handleExplore() {
    setOpen(true);
    window.requestAnimationFrame(() => {
      collectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <>
      {!open && (
        <section className="mx-auto flex max-w-6xl justify-center px-6 py-16 sm:py-20">
          <button
            type="button"
            onClick={handleExplore}
            className="inline-flex rounded-full border border-black/15 px-7 py-3.5 text-sm font-medium transition-colors hover:border-black hover:bg-[#2a2520] hover:text-white"
          >
            Explorar todos los diseños
          </button>
        </section>
      )}

      {open && (
        <div ref={collectionRef} id="collection-panel">
          <section className="mx-auto max-w-6xl px-6 pb-2 pt-16 sm:pt-20">
            <p className="text-xs uppercase tracking-[0.36em] text-[#687075]">
              Toda la colección
            </p>
            <h2 className="mt-3 text-3xl font-medium sm:text-4xl">
              {products.length} diseños en plata 925
            </h2>
          </section>

          <CollectionBrowser
            key={initialCategory}
            products={products}
            initialCategory={initialCategory}
          />
        </div>
      )}
    </>
  );
}
