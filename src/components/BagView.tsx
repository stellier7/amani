"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatPrice, productPath, tileBackground } from "@/lib/products";

function QuantityButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-black/60 transition-colors hover:border-black/40 hover:text-black disabled:opacity-30 disabled:hover:border-black/10 disabled:hover:text-black/60"
    >
      {children}
    </button>
  );
}

export function BagView() {
  const { items, count, total, setQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-black/8 bg-white px-8 py-16 text-center">
        <p className="text-lg font-medium">Tu bolsa está vacía</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-black/55">
          Explora la colección y agrega las piezas que quieras llevar. Tu bolsa
          se guarda en este dispositivo.
        </p>
        <Link
          href="/ella-y-el"
          className="mt-8 inline-flex rounded-full bg-[#2a2520] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-black"
        >
          Ver la colección
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
      <ul className="divide-y divide-black/8 border-y border-black/8">
        {items.map(({ product, quantity }) => (
          <li
            key={product.id}
            data-testid={`bag-row-${product.id}`}
            className="flex gap-5 py-6"
          >
            <Link
              href={productPath(product)}
              className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-xl border border-black/5 sm:w-28"
              style={{ background: tileBackground(product) }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="112px"
                className={
                  product.shot === "packshot"
                    ? "object-contain"
                    : "object-cover"
                }
              />
            </Link>

            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={productPath(product)}
                    className="text-base font-medium decoration-black/30 underline-offset-4 hover:underline"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-black/40">
                    {product.style} · {product.pieces}
                  </p>
                  {product.soldOut && (
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8a4b3a]">
                      Vendido
                    </p>
                  )}
                </div>
                <p
                  data-testid={`bag-line-${product.id}`}
                  className="shrink-0 text-base font-semibold tabular-nums"
                >
                  {formatPrice(product.price * quantity)}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <QuantityButton
                    label={`Quitar una unidad de ${product.name}`}
                    onClick={() => setQuantity(product.id, quantity - 1)}
                  >
                    <span aria-hidden>−</span>
                  </QuantityButton>
                  <span
                    data-testid={`bag-qty-${product.id}`}
                    className="w-6 text-center text-sm tabular-nums"
                  >
                    {quantity}
                  </span>
                  <QuantityButton
                    label={`Agregar una unidad de ${product.name}`}
                    onClick={() => setQuantity(product.id, quantity + 1)}
                    disabled={product.soldOut || quantity >= 99}
                  >
                    <span aria-hidden>+</span>
                  </QuantityButton>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  data-testid={`bag-remove-${product.id}`}
                  className="text-xs uppercase tracking-[0.18em] text-black/40 underline underline-offset-4 transition-colors hover:text-black"
                >
                  Quitar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-[1.75rem] border border-black/8 bg-white p-7">
        <h2 className="text-lg font-medium">Resumen</h2>

        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-black/55">
              Subtotal · {count} {count === 1 ? "pieza" : "piezas"}
            </dt>
            <dd data-testid="bag-subtotal" className="tabular-nums">
              {formatPrice(total)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-black/55">Envío</dt>
            <dd className="uppercase tracking-[0.18em] text-black/40">
              Gratis
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-black/8 pt-4 text-base font-semibold">
            <dt>Total</dt>
            <dd data-testid="bag-total" className="tabular-nums">
              {formatPrice(total)}
            </dd>
          </div>
        </dl>

        <button
          type="button"
          disabled
          data-testid="bag-checkout"
          className="mt-7 w-full cursor-not-allowed rounded-full bg-[#2a2520] px-7 py-4 text-sm font-medium text-white opacity-40"
        >
          Finalizar compra
        </button>
        <p className="mt-3 text-center text-xs leading-relaxed text-black/45">
          El pago en línea aún no está disponible. Escríbenos para completar tu
          pedido.
        </p>

        <Link
          href="/ella-y-el"
          className="mt-6 block text-center text-sm underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black"
        >
          Seguir comprando
        </Link>
      </aside>
    </div>
  );
}
