import Image from "next/image";
import { tileBackground, type Product } from "@/lib/products";

export function ProductGallery({ product }: { product: Product }) {
  const photos = [product.image, ...(product.gallery ?? [])];
  const isPackshot = product.shot === "packshot";

  return (
    <div className="flex flex-col gap-3">
      {photos.map((src, index) => (
        <div
          key={src}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-black/5"
          style={{ background: tileBackground(product) }}
        >
          <Image
            src={src}
            alt={
              photos.length > 1
                ? `${product.name}, foto ${index + 1}: ${product.pieces} de plata 925`
                : `${product.name}: ${product.pieces} de plata 925`
            }
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={isPackshot ? "object-contain" : "object-cover"}
          />
          {index === 0 && product.soldOut && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/35">
              <span className="rounded-full bg-white/95 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-[#2a2520]">
                Agotado
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
