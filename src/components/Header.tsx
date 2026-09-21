"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/products";

export function Header() {
  const { count, total } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-[#faf7f2]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 sm:py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3"
          aria-label="Amani Joyería — inicio"
        >
          <Image
            src="/images/amani/logo.png"
            alt="Amani Joyería"
            width={160}
            height={70}
            priority
            className="h-9 w-auto sm:h-11"
          />
          <span className="hidden text-xs uppercase tracking-[0.3em] text-black/40 sm:inline">
            · Honduras
          </span>
        </Link>

        <Link
          href="/bolsa"
          aria-label={`Ver tu bolsa: ${count} ${
            count === 1 ? "pieza" : "piezas"
          }`}
          className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm transition-colors hover:border-black/30"
          data-testid="cart-summary"
        >
          <span aria-hidden>Bolsa</span>
          <span data-testid="cart-count" className="font-medium">
            {count}
          </span>
          <span className="text-black/40">·</span>
          <span data-testid="cart-total" className="tabular-nums text-black/70">
            {formatPrice(total)}
          </span>
        </Link>
      </div>
    </header>
  );
}
