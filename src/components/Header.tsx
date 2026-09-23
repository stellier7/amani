"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/products";

const navLinks = [
  { href: "/ella", label: "Ella" },
  { href: "/el", label: "Él" },
  { href: "/#collection", label: "Colección" },
] as const;

export function Header() {
  const { count, total } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-[#faf7f2]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3 sm:py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 sm:gap-3"
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

        <nav
          aria-label="Principal"
          className="flex flex-1 items-center justify-end gap-4 sm:gap-7"
        >
          <ul className="flex items-center gap-3 sm:gap-6">
            {navLinks.map((link) => {
              const active =
                link.href !== "/#collection" && pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-xs font-medium uppercase tracking-[0.18em] transition-colors sm:text-[13px] sm:tracking-[0.2em] ${
                      active
                        ? "text-[#2a2520]"
                        : "text-black/45 hover:text-[#2a2520]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/bolsa"
            aria-label={`Ver tu bolsa: ${count} ${
              count === 1 ? "pieza" : "piezas"
            }`}
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm shadow-sm transition-colors hover:border-black/30 sm:px-4"
            data-testid="cart-summary"
          >
            <span aria-hidden className="hidden sm:inline">
              Bolsa
            </span>
            <span data-testid="cart-count" className="font-medium">
              {count}
            </span>
            <span className="hidden text-black/40 sm:inline">·</span>
            <span
              data-testid="cart-total"
              className="hidden tabular-nums text-black/70 sm:inline"
            >
              {formatPrice(total)}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
