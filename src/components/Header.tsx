"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/products";

const SCROLL_TOP_THRESHOLD = 10;
const SCROLL_DELTA_THRESHOLD = 5;

export function Header() {
  const { count, total } = useCart();
  const [visible, setVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    function updateHeight() {
      const el = headerRef.current;
      if (el) setHeaderHeight(el.offsetHeight);
    }

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    let frame: number | null = null;

    function update() {
      frame = null;
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= SCROLL_TOP_THRESHOLD) {
        setVisible(true);
      } else if (Math.abs(delta) >= SCROLL_DELTA_THRESHOLD) {
        setVisible(delta < 0);
      }

      lastScrollYRef.current = currentScrollY;
    }

    function onScroll() {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const headerClassName = [
    "fixed top-0 inset-x-0 z-20 border-b border-black/5 bg-[#faf7f2]/80 backdrop-blur",
    "transition-transform duration-300 ease-in-out motion-reduce:transition-none",
    !visible && "-translate-y-full",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div aria-hidden style={{ height: headerHeight }} />
      <header ref={headerRef} className={headerClassName}>
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
            <span
              data-testid="cart-total"
              className="tabular-nums text-black/70"
            >
              {formatPrice(total)}
            </span>
          </Link>
        </div>
      </header>
    </>
  );
}
