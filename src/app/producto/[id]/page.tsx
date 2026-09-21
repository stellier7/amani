import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToBagButton } from "@/components/AddToBagButton";
import { ProductCard } from "@/components/ProductCard";
import {
  formatPrice,
  getProduct,
  getProducts,
  getRelatedProducts,
  tileBackground,
} from "@/lib/products";

export function generateStaticParams() {
  return getProducts().map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/producto/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Pieza no encontrada" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — Amani Joyería`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/producto/[id]">) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const isPackshot = product.shot === "packshot";
  const specs = [
    { label: "Tipo", value: product.category },
    { label: "Estilo", value: product.style },
    { label: "Material", value: product.material },
    { label: "Incluye", value: product.pieces },
  ];

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-8">
        <nav
          aria-label="Ruta de navegación"
          className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/40"
        >
          <Link href="/" className="transition-colors hover:text-black">
            Inicio
          </Link>
          <span aria-hidden>·</span>
          <Link
            href="/ella-y-el"
            className="transition-colors hover:text-black"
          >
            Ella y Él
          </Link>
          <span aria-hidden>·</span>
          <span className="text-black/70">{product.name}</span>
        </nav>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-black/5"
          style={{ background: tileBackground(product) }}
        >
          <Image
            src={product.image}
            alt={`${product.name}: ${product.pieces} de plata 925`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={isPackshot ? "object-contain" : "object-cover"}
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/60">
              {product.style}
            </span>
            <span className="rounded-full bg-[#2a2520] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
              {product.category}
            </span>
          </div>

          <h1 className="mt-5 text-balance text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold tabular-nums">
            {formatPrice(product.price)}
          </p>
          <p className="mt-5 max-w-md text-balance leading-relaxed text-black/60">
            {product.description}
          </p>

          <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-black/8 bg-black/8 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label} className="bg-[#faf7f2] px-5 py-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-black/40">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-sm text-black/75">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <AddToBagButton product={product} />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-black/40">
            Envío gratis · Devoluciones en 30 días
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-black/8 pt-12">
            <div>
              <p className="text-xs uppercase tracking-[0.36em] text-[#687075]">
                También te puede gustar
              </p>
              <h2 className="mt-3 text-2xl font-medium sm:text-3xl">
                Combina con estas piezas
              </h2>
            </div>
            <Link
              href="/ella-y-el"
              className="text-sm underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black"
            >
              Ver toda la colección
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
