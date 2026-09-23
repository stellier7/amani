"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Full-bleed homepage hero with a soft parallax: the photo drifts slower
 * than the page, and the copy eases up/fades as you leave the fold.
 */
export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const onPreferenceChange = () => {
      reducedMotionRef.current = mediaQuery.matches;
      if (mediaQuery.matches) {
        if (mediaRef.current) mediaRef.current.style.transform = "";
        if (contentRef.current) {
          contentRef.current.style.transform = "";
          contentRef.current.style.opacity = "";
        }
      } else {
        update();
      }
    };

    let frame = 0;

    function update() {
      frame = 0;
      const section = sectionRef.current;
      const media = mediaRef.current;
      const content = contentRef.current;
      if (!section || !media || !content) return;

      if (reducedMotionRef.current) return;

      const rect = section.getBoundingClientRect();
      const height = section.offsetHeight || 1;
      // 0 at the top of the page, 1 once the hero has scrolled fully away.
      const progress = Math.min(Math.max(-rect.top / height, 0), 1);

      media.style.transform = `translate3d(0, ${progress * 14}%, 0)`;
      content.style.transform = `translate3d(0, ${progress * -48}px, 0)`;
      content.style.opacity = String(1 - progress * 0.85);
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    mediaQuery.addEventListener("change", onPreferenceChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mediaQuery.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[min(100svh,920px)] w-full overflow-hidden bg-[#0c0c0c]"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          ref={mediaRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/amani/hero-ella.jpg"
            alt="Modelo luciendo joyería de plata 925 Amani"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center] sm:object-right"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent sm:via-black/25 lg:from-black/70 lg:via-black/15 lg:to-transparent" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-[min(100svh,920px)] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 will-change-transform sm:justify-center sm:pb-24 sm:pt-20"
      >
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-white/70">
          Plata 925 · Honduras
        </p>
        <h1 className="mt-5 max-w-xl text-balance text-6xl font-medium leading-[0.9] tracking-[-0.055em] text-white sm:text-7xl xl:text-8xl">
          Hecha para brillar
        </h1>
        <p className="mt-7 max-w-md text-balance text-lg leading-relaxed text-white/65">
          Joyería fina para el día a día y para los momentos que importan.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Link
            href="/#collection"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#2a2520] transition-transform hover:-translate-y-0.5 hover:bg-white/90"
          >
            Descubrir la colección
          </Link>
          <p className="flex items-center gap-3 text-sm text-white/80">
            <Link
              href="/ella"
              className="underline decoration-white/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Para ella
            </Link>
            <span aria-hidden className="text-white/35">
              ·
            </span>
            <Link
              href="/el"
              className="underline decoration-white/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Para él
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
