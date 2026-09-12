import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Nosotros — Amani Joyería",
  description:
    "Conoce la historia de Amani: deseos, paz y joyería fina hecha con cariño desde Honduras para Latinoamérica.",
};

export default function NosotrosPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-black/40">
            Nuestra historia
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Amani
          </h1>
          <p className="mt-2 text-lg text-black/50">
            <span className="italic">deseos</span> ·{" "}
            <span className="italic">paz</span>
          </p>
        </section>

        <section className="mx-auto max-w-3xl space-y-8 px-6 pb-16 text-base leading-relaxed text-black/70">
          <p>
            <strong className="font-medium text-[#2a2520]">Amani</strong> viene
            del árabe: significa deseos y aspiraciones, y también evoca paz. Es
            un nombre que guardamos con cariño — y el nombre de nuestra joyería.
          </p>

          <p>
            Detrás de cada pieza está Pascale, a quien quienes la quieren
            llaman <strong className="font-medium text-[#2a2520]">Paski</strong>
            . Es su apodo favorito, más íntimo que su nombre de pila, y refleja
            cómo pensamos la joyería: personal, cercana, hecha para quien la
            usa.
          </p>

          <p>
            Con raíces árabes y corazón en Honduras, Amani nace en Centroamérica
            con la mirada puesta en toda Latinoamérica. Diseñamos recuerdos
            modernos en oro, plata y piedra natural — piezas finas que invitan a
            descubrir la joyería sin intimidar, elegantes sin sentirse
            inalcanzables.
          </p>

          <p>
            Cada pieza se termina a mano en lotes pequeños, con materiales de
            origen ético. Queremos que las uses cada día, que las regales, que
            las guardes — joyas que acompañan los momentos que importan.
          </p>

          <blockquote className="border-l-2 border-[#e9c766] pl-6 text-lg italic text-black/60">
            Piezas con alma — como un apodo que te quieren.
          </blockquote>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
          <Link
            href="/#coleccion"
            className="inline-block rounded-full bg-[#2a2520] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
          >
            Explorar la colección
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
