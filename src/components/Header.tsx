"use client";

import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/products";

export function Header() {
  const { count, total } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-[#faf7f2]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-[0.2em]">
            PASKI&rsquo;S
          </span>
          <span className="hidden text-xs uppercase tracking-[0.3em] text-black/40 sm:inline">
            Fine Jewelry
          </span>
        </a>

        <nav className="hidden gap-8 text-sm text-black/60 md:flex">
          <a className="transition-colors hover:text-black" href="#rings">
            Rings
          </a>
          <a className="transition-colors hover:text-black" href="#necklaces">
            Necklaces
          </a>
          <a className="transition-colors hover:text-black" href="#earrings">
            Earrings
          </a>
          <a className="transition-colors hover:text-black" href="#bracelets">
            Bracelets
          </a>
        </nav>

        <div
          className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm"
          data-testid="cart-summary"
        >
          <span aria-hidden>🛍️</span>
          <span data-testid="cart-count" className="font-medium">
            {count}
          </span>
          <span className="text-black/40">·</span>
          <span data-testid="cart-total" className="tabular-nums text-black/70">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </header>
  );
}
