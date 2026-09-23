"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Layer = {
  el: HTMLElement;
  /** How strongly this layer drifts up on scroll (0–1). */
  drift: number;
};

/**
 * Full-bleed homepage hero: staggered copy entrance, layered text parallax,
 * and a slower photo drift. Honors prefers-reduced-motion.
 */
export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const layers: Layer[] = [
      { el: eyebrowRef.current!, drift: 0.22 },
      { el: titleRef.current!, drift: 0.42 },
      { el: lineRef.current!, drift: 0.58 },
      { el: ctaRef.current!, drift: 0.78 },
    ].filter((layer) => layer.el);

    const entranceNodes = layers.map((layer) => layer.el);

    function clearMotionStyles() {
      if (mediaRef.current) mediaRef.current.style.transform = "";
      for (const node of entranceNodes) {
        node.style.transform = "";
        node.style.opacity = "";
        node.classList.remove("hero-copy-in");
      }
    }

    // Staggered entrance — skipped when reduced motion is on.
    if (!reducedMotionRef.current) {
      for (const node of entranceNodes) {
        node.classList.add("hero-copy");
      }
      window.requestAnimationFrame(() => {
        entranceNodes.forEach((node, index) => {
          window.setTimeout(() => {
            node.classList.add("hero-copy-in");
          }, 140 + index * 160);
        });
      });
    } else {
      for (const node of entranceNodes) {
        node.classList.add("hero-copy", "hero-copy-in");
      }
    }

    let frame = 0;
    let introDone = reducedMotionRef.current;

    if (!reducedMotionRef.current) {
      const introMs = 140 + (layers.length - 1) * 160 + 1000;
      window.setTimeout(() => {
        introDone = true;
      }, introMs);
    }

    function update() {
      frame = 0;
      const section = sectionRef.current;
      const media = mediaRef.current;
      if (!section || !media) return;
      if (reducedMotionRef.current) return;

      const rect = section.getBoundingClientRect();
      const height = section.offsetHeight || 1;
      const progress = Math.min(Math.max(-rect.top / height, 0), 1);

      // At rest, leave transforms to the CSS entrance so they don't fight.
      if (progress === 0 && !introDone) return;

      if (progress === 0) {
        media.style.transform = "";
        for (const layer of layers) {
          layer.el.style.transform = "";
          layer.el.style.opacity = "";
        }
        return;
      }

      media.style.transform = `translate3d(0, ${progress * 14}%, 0)`;

      for (const layer of layers) {
        const rise = progress * layer.drift * -72;
        const fade = 1 - progress * (0.55 + layer.drift * 0.4);
        layer.el.style.transform = `translate3d(0, ${rise}px, 0)`;
        layer.el.style.opacity = String(Math.max(fade, 0));
      }
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    function onPreferenceChange() {
      reducedMotionRef.current = mediaQuery.matches;
      if (mediaQuery.matches) {
        clearMotionStyles();
      } else {
        update();
      }
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

      <div className="relative z-10 mx-auto flex min-h-[min(100svh,920px)] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 sm:justify-center sm:pb-24 sm:pt-20">
        <p
          ref={eyebrowRef}
          className="will-change-transform text-xs font-medium uppercase tracking-[0.32em] text-white/70"
        >
          Plata 925 · Honduras
        </p>
        <h1
          ref={titleRef}
          className="mt-5 max-w-xl text-balance will-change-transform text-6xl font-medium leading-[0.9] tracking-[-0.055em] text-white sm:text-7xl xl:text-8xl"
        >
          Hecha para brillar
        </h1>
        <p
          ref={lineRef}
          className="mt-7 max-w-md text-balance will-change-transform text-lg leading-relaxed text-white/65"
        >
          Joyería fina para el día a día y para los momentos que importan.
        </p>
        <div ref={ctaRef} className="mt-9 will-change-transform">
          <Link
            href="/#collection"
            className="inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-medium text-[#2a2520] transition-transform hover:-translate-y-0.5 hover:bg-white/90"
          >
            Descubrir la colección
          </Link>
        </div>
      </div>
    </section>
  );
}
