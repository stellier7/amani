"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/CartContext";
import {
  formatPrice,
  productPath,
  tileBackground,
  type Product,
} from "@/lib/products";

/** Cruising speed of the strip, in pixels per second. */
const AUTO_SPEED = 70;
/** Seconds the cruising speed takes to ease in or out, so it never jolts. */
const SPEED_EASE = 0.5;
/** Seconds a flick takes to shed most of its speed. */
const FLING_DECAY = 0.4;
/** Below this speed (px/s) a flick is spent. */
const FLING_FLOOR = 30;
/** Milliseconds the strip rests after a gesture before cruising again. */
const REST_AFTER_GESTURE = 1200;
/** Pointer travel that turns a press into a drag instead of a click. */
const DRAG_THRESHOLD = 6;
/** The track renders this many copies of the list end to end. */
const TRACK_COPIES = 2;
/** Gap kept between a keyboard-focused tile and the left edge. */
const FOCUS_INSET = 24;

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
    if (product.soldOut) return;
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article
      data-featured-tile
      className="group flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl border border-black/5 bg-white sm:w-[300px]"
    >
      <Link
        href={productPath(product)}
        draggable={false}
        className="flex flex-1 flex-col"
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
          {product.soldOut && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35">
              <span className="rounded-full bg-white/95 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#2a2520]">
                Vendido
              </span>
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/60 backdrop-blur">
            {product.style}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 pb-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#687075]">
            {product.category}
          </p>
          <h3 className="mt-1 text-base font-medium leading-snug decoration-black/30 underline-offset-4 group-hover:underline">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-black/40">{product.pieces}</p>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 p-4 pt-3">
        <span className="text-base font-semibold tabular-nums">
          {formatPrice(product.price)}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          disabled={product.soldOut || added}
          data-testid={`featured-add-${product.id}-${instance}`}
          className="rounded-full bg-[#2a2520] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-black/25"
        >
          {product.soldOut ? "Vendido" : added ? "Agregado ✓" : "Agregar"}
        </button>
      </div>
    </article>
  );
}

export function FeaturedScroller({ products }: { products: Product[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // The strip is positioned by transform rather than by scrolling, so it has no
  // start or end for the browser to clamp against and momentum is never cut off
  // at the seam.
  const offsetRef = useRef(0);
  const cruiseRef = useRef(0);
  const flingRef = useRef(0);
  const restUntilRef = useRef(0);
  const hoveringRef = useRef(false);
  const focusHeldRef = useRef(false);
  const draggingRef = useRef(false);
  const draggedRef = useRef(false);
  const dragRef = useRef({ startX: 0, startOffset: 0, lastX: 0, lastAt: 0 });
  const velocityRef = useRef(0);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotionRef.current = query.matches;
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const copyWidth = () => track.scrollWidth / TRACK_COPIES || 1;

    const paint = () => {
      const copy = copyWidth();
      const wrapped = ((offsetRef.current % copy) + copy) % copy;
      offsetRef.current = wrapped;
      track.style.transform = `translate3d(${-wrapped}px, 0, 0)`;
    };

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 100) / 1000;
      previous = now;

      if (!draggingRef.current) {
        if (flingRef.current !== 0) {
          offsetRef.current += flingRef.current * elapsed;
          flingRef.current *= Math.exp(-elapsed / FLING_DECAY);
          if (Math.abs(flingRef.current) < FLING_FLOOR) {
            flingRef.current = 0;
            restUntilRef.current = now + REST_AFTER_GESTURE;
          }
        }

        const resting =
          reduceMotionRef.current ||
          hoveringRef.current ||
          focusHeldRef.current ||
          flingRef.current !== 0 ||
          now < restUntilRef.current;

        const target = resting ? 0 : AUTO_SPEED;
        cruiseRef.current +=
          (target - cruiseRef.current) * (1 - Math.exp(-elapsed / SPEED_EASE));
        offsetRef.current += cruiseRef.current * elapsed;

        paint();
      }

      frame = requestAnimationFrame(tick);
    };

    paint();
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [products]);

  // Horizontal trackpad and wheel gestures nudge the strip directly.
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      flingRef.current = 0;
      offsetRef.current += event.deltaX;
      restUntilRef.current = performance.now() + REST_AFTER_GESTURE;
      const copy = track.scrollWidth / TRACK_COPIES || 1;
      const wrapped = ((offsetRef.current % copy) + copy) % copy;
      offsetRef.current = wrapped;
      track.style.transform = `translate3d(${-wrapped}px, 0, 0)`;
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, []);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (!viewport) return;

    draggingRef.current = true;
    draggedRef.current = false;
    flingRef.current = 0;
    cruiseRef.current = 0;
    velocityRef.current = 0;
    dragRef.current = {
      startX: event.clientX,
      startOffset: offsetRef.current,
      lastX: event.clientX,
      lastAt: event.timeStamp,
    };
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    const travel = event.clientX - dragRef.current.startX;
    if (Math.abs(travel) > DRAG_THRESHOLD && !draggedRef.current) {
      draggedRef.current = true;
      // Capturing only once the press turns into a drag keeps a plain click on
      // the card reaching its link: a captured pointer retargets the click to
      // this container instead.
      viewportRef.current?.setPointerCapture(event.pointerId);
    }

    const sinceLast = event.timeStamp - dragRef.current.lastAt;
    if (sinceLast > 0) {
      const instant = ((event.clientX - dragRef.current.lastX) / sinceLast) * 1000;
      velocityRef.current = velocityRef.current * 0.7 + instant * 0.3;
      dragRef.current.lastX = event.clientX;
      dragRef.current.lastAt = event.timeStamp;
    }

    const copy = track.scrollWidth / TRACK_COPIES || 1;
    const next = dragRef.current.startOffset - travel;
    const wrapped = ((next % copy) + copy) % copy;
    offsetRef.current = wrapped;
    track.style.transform = `translate3d(${-wrapped}px, 0, 0)`;
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const viewport = viewportRef.current;
    if (viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    // Dragging right (positive velocity) walks the strip backwards.
    const fling = -velocityRef.current;
    flingRef.current = Math.abs(fling) > FLING_FLOOR ? fling : 0;
    restUntilRef.current = performance.now() + REST_AFTER_GESTURE;
  }

  // A drag that ends on top of a card must not also activate it.
  function handleClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (!draggedRef.current) return;
    draggedRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  }

  // Tabbing through the cards brings the focused one into view, since there is
  // no scrollbar to follow focus on its own.
  function handleFocusCapture(event: React.FocusEvent<HTMLDivElement>) {
    if (!event.target.matches(":focus-visible")) return;
    const tile = event.target.closest<HTMLElement>("[data-featured-tile]");
    if (!tile) return;
    focusHeldRef.current = true;
    offsetRef.current = tile.offsetLeft - FOCUS_INSET;
  }

  if (products.length === 0) return null;

  // Each copy has to stay wider than the viewport, otherwise wrapping it would
  // expose a gap on wide screens.
  const tilesPerCopy = Math.max(12, products.length);
  const loop = Array.from(
    { length: tilesPerCopy * TRACK_COPIES },
    (_, index) => products[index % products.length],
  );

  return (
    <section
      id="destacados"
      aria-label="Recién llegados"
      className="overflow-hidden py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.36em] text-[#687075]">
          Destacados
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-medium sm:text-4xl">
          Recién llegados
        </h2>
        <p className="mt-4 max-w-lg leading-relaxed text-black/55">
          Nuestras piezas más nuevas en plata 925: aretes de amuletos, anillos
          de zirconias, brazaletes de perlas y cordón, y el set cubano italiano.
        </p>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#faf7f2] to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#faf7f2] to-transparent sm:w-16" />

        <div
          ref={viewportRef}
          role="region"
          aria-label="Carrusel de piezas recién llegadas"
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
          onFocusCapture={handleFocusCapture}
          onBlurCapture={() => {
            focusHeldRef.current = false;
          }}
          onClickCapture={handleClickCapture}
          className="featured-viewport cursor-grab overflow-hidden active:cursor-grabbing"
        >
          <div
            ref={trackRef}
            data-featured-track
            className="flex w-max gap-5 px-6 py-1 will-change-transform"
          >
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
