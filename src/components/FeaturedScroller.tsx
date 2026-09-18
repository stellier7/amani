"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartContext";
import { formatPrice, tileBackground, type Product } from "@/lib/products";

/** Pixels per second, matching the pace of the previous CSS marquee. */
const AUTO_SCROLL_SPEED = 70;
/** How long the carousel stays still after someone interacts with it. */
const RESUME_DELAY = 2500;
/** Pointer travel that turns a press into a drag instead of a click. */
const DRAG_THRESHOLD = 6;
/**
 * The track renders three copies of the list and the scroll position is kept in
 * the middle one, so a rewind of exactly one copy is always available in either
 * direction and never lands on the opposite rewind's trigger.
 */
const TRACK_COPIES = 3;

function FeaturedTile({
  product,
  instance,
}: {
  product: Product;
  instance: number;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const isPackshot = product.shot === "packshot";

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article
      data-featured-tile
      className="featured-tile group flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl border border-black/5 bg-white sm:w-[300px]"
    >
      <div
        className="relative aspect-[5/4] w-full overflow-hidden"
        style={{ background: tileBackground(product) }}
      >
        <Image
          src={product.image}
          alt={`${product.name}: ${product.pieces} de plata 925`}
          fill
          draggable={false}
          sizes="300px"
          className={`transition-transform duration-700 group-hover:scale-[1.03] ${
            isPackshot ? "object-contain" : "object-cover"
          }`}
        />
        {!isPackshot && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
          {product.style}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#687075]">
            {product.category}
          </p>
          <h3 className="mt-1 text-base font-medium leading-snug">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-black/40">{product.pieces}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="text-base font-semibold tabular-nums">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            data-testid={`featured-add-${product.id}-${instance}`}
            className="rounded-full bg-[#2a2520] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black"
          >
            {added ? "Agregado ✓" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}

function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/60 transition-colors hover:border-black/30 hover:text-black"
    >
      {children}
    </button>
  );
}

export function FeaturedScroller({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Interaction state lives in refs so the animation frame can read it without
  // re-subscribing on every pointer move.
  const holdUntilRef = useRef(0);
  const hoveringRef = useRef(false);
  const focusedRef = useRef(false);
  const draggingRef = useRef(false);
  const draggedRef = useRef(false);
  const dragOriginRef = useRef({ x: 0, scrollLeft: 0 });

  const hold = useCallback(() => {
    holdUntilRef.current = performance.now() + RESUME_DELAY;
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const wrap = () => {
      const copy = scroller.scrollWidth / TRACK_COPIES;
      if (copy <= 0) return;
      if (scroller.scrollLeft < copy) {
        scroller.scrollLeft += copy;
      } else if (scroller.scrollLeft >= copy * 2) {
        scroller.scrollLeft -= copy;
      }
    };

    scroller.scrollLeft = scroller.scrollWidth / TRACK_COPIES;
    scroller.addEventListener("scroll", wrap, { passive: true });
    return () => scroller.removeEventListener("scroll", wrap);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !autoScroll || reduceMotion) return;

    let frame = 0;
    let previous = performance.now();

    const step = (now: number) => {
      const elapsed = Math.min(now - previous, 100);
      previous = now;

      const idle =
        !hoveringRef.current &&
        !focusedRef.current &&
        !draggingRef.current &&
        now >= holdUntilRef.current;

      if (idle) {
        scroller.scrollLeft += (AUTO_SCROLL_SPEED * elapsed) / 1000;
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [autoScroll, reduceMotion]);

  const step = useCallback(
    (direction: 1 | -1) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const tile = scroller.querySelector<HTMLElement>("[data-featured-tile]");
      const track = scroller.firstElementChild;
      const gap = track
        ? parseFloat(getComputedStyle(track).columnGap) || 0
        : 0;
      const distance = tile
        ? tile.offsetWidth + gap
        : scroller.clientWidth * 0.8;

      hold();
      scroller.scrollBy({ left: direction * distance, behavior: "smooth" });
    },
    [hold],
  );

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    hold();
    // Touch and pen already pan the scroll container natively.
    if (event.pointerType !== "mouse") return;

    const scroller = scrollerRef.current;
    if (!scroller) return;

    draggingRef.current = true;
    draggedRef.current = false;
    dragOriginRef.current = {
      x: event.clientX,
      scrollLeft: scroller.scrollLeft,
    };
    scroller.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const travel = event.clientX - dragOriginRef.current.x;
    if (Math.abs(travel) > DRAG_THRESHOLD) draggedRef.current = true;

    // Wrap the drag itself rather than letting the browser clamp at either
    // end, so the strip keeps going in both directions.
    const copy = scroller.scrollWidth / TRACK_COPIES;
    let target = dragOriginRef.current.scrollLeft - travel;
    while (copy > 0 && target < copy) {
      target += copy;
      dragOriginRef.current.scrollLeft += copy;
    }
    while (copy > 0 && target >= copy * 2) {
      target -= copy;
      dragOriginRef.current.scrollLeft -= copy;
    }
    scroller.scrollLeft = target;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    hold();
    if (!draggingRef.current) return;

    draggingRef.current = false;
    const scroller = scrollerRef.current;
    if (scroller?.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
  }

  // A drag that ends on top of a card must not also activate it.
  function handleClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (!draggedRef.current) return;
    draggedRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  }

  if (products.length === 0) return null;

  // Each copy has to stay wider than the viewport, otherwise a rewind would
  // expose a gap on wide screens.
  const tilesPerCopy = Math.max(12, products.length);
  const loop = Array.from(
    { length: tilesPerCopy * TRACK_COPIES },
    (_, index) => products[index % products.length],
  );
  const paused = !autoScroll || reduceMotion;

  return (
    <section
      id="destacados"
      aria-label="Recién llegados"
      className="overflow-hidden py-16 sm:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.36em] text-[#687075]">
            Destacados
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-medium sm:text-4xl">
            Recién llegados
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-black/55">
            Nuestras piezas más nuevas en plata 925: el set cubano italiano, el
            tennis ajustable y los anillos de zirconias.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ControlButton label="Ver anterior" onClick={() => step(-1)}>
            <span aria-hidden>←</span>
          </ControlButton>
          <ControlButton
            label={paused ? "Reanudar el carrusel" : "Pausar el carrusel"}
            onClick={() => setAutoScroll((value) => !value)}
          >
            <span aria-hidden>{paused ? "▶" : "❚❚"}</span>
          </ControlButton>
          <ControlButton label="Ver siguiente" onClick={() => step(1)}>
            <span aria-hidden>→</span>
          </ControlButton>
        </div>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#faf7f2] to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#faf7f2] to-transparent sm:w-16" />

        <div
          ref={scrollerRef}
          role="region"
          aria-label="Carrusel de piezas recién llegadas"
          tabIndex={0}
          data-testid="featured-scroller"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") hoveringRef.current = true;
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") hoveringRef.current = false;
          }}
          onFocus={(event) => {
            // Only keyboard focus should hold the carousel. A mouse press also
            // focuses the scroll container, which would otherwise stop it for
            // good instead of for the usual resume delay.
            focusedRef.current = event.target.matches(":focus-visible");
          }}
          onBlur={() => {
            focusedRef.current = false;
          }}
          onWheel={hold}
          onClickCapture={handleClickCapture}
          className="featured-scroller cursor-grab overflow-x-auto active:cursor-grabbing"
        >
          <div className="flex w-max gap-5 px-6 py-1">
            {loop.map((product, index) => (
              <FeaturedTile
                key={`${product.id}-${index}`}
                product={product}
                instance={index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl px-6">
        <a
          href="#collection"
          className="text-sm underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black"
        >
          Ver toda la colección
        </a>
      </div>
    </section>
  );
}
