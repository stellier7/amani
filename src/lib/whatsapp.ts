import { productPath, type Product } from "@/lib/products";

export type WhatsAppOrderItem = {
  product: Product;
  quantity: number;
};

/** Digits only, with country code. Set in Vercel as NEXT_PUBLIC_WHATSAPP_NUMBER. */
export function getWhatsAppNumber(): string {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
}

export function buildWhatsAppOrderMessage(
  items: WhatsAppOrderItem[],
  origin: string,
): string {
  const lines = items.map(({ product, quantity }) => {
    const url = `${origin.replace(/\/$/, "")}${productPath(product)}`;
    const label =
      quantity > 1 ? `${product.name} × ${quantity}` : product.name;
    return `${label} = ${url}`;
  });

  return ["Hola! Quiero comprar", ...lines].join("\n");
}

export function buildWhatsAppOrderUrl(
  items: WhatsAppOrderItem[],
  origin: string,
): string {
  const text = buildWhatsAppOrderMessage(items, origin);
  const phone = getWhatsAppNumber();
  const base = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}
