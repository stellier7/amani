import type { Metadata } from "next";
import Link from "next/link";
import { BagView } from "@/components/BagView";

export const metadata: Metadata = {
  title: "Tu bolsa",
  description:
    "Revisa las piezas que quieres llevar antes de completar tu pedido.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BagPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
      <nav
        aria-label="Ruta de navegación"
        className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/40"
      >
        <Link href="/" className="transition-colors hover:text-black">
          Inicio
        </Link>
        <span aria-hidden>·</span>
        <span className="text-black/70">Bolsa</span>
      </nav>

      <h1 className="mt-6 text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
        Tu bolsa
      </h1>

      <div className="mt-10">
        <BagView />
      </div>
    </section>
  );
}
