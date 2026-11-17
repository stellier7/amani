import { productPath, type Product } from "@/lib/products";

export type WhatsAppOrderItem = {
  product: Product;
  quantity: number;
};

const DEFAULT_SITE_ORIGIN = "https://amanijoyeria.com";

/** Digits only, with country code (+504 8744-1656). Override with NEXT_PUBLIC_WHATSAPP_NUMBER. */
const DEFAULT_WHATSAPP_NUMBER = "50487441656";

export function getWhatsAppNumber(): string {
  const raw =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP_NUMBER;
  return raw.replace(/\D/g, "");
}

/** Direct chat link (optional prefilled greeting). */
export function buildWhatsAppChatUrl(
  text = "Hola! Me gustaría más información.",
): string {
  const phone = getWhatsAppNumber();
  const base = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}

/** Always use the public store domain for order links (not a Vercel preview). */
export function getStoreOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return DEFAULT_SITE_ORIGIN;
}

export function buildWhatsAppOrderMessage(
  items: WhatsAppOrderItem[],
  origin: string = getStoreOrigin(),
): string {
  const base = origin.replace(/\/$/, "");
  const blocks = items.map(({ product, quantity }) => {
    const label =
      quantity > 1 ? `${product.name} × ${quantity}` : product.name;
    const url = `${base}${productPath(product)}`;
    // WhatsApp can't hide URLs behind custom anchor text in a prefilled
    // message, so we put the product name first and the clickable link under it.
    return `*${label}*\n${url}`;
  });

  return ["Hola! Quiero comprar", ...blocks].join("\n\n");
}

export function buildWhatsAppOrderUrl(
  items: WhatsAppOrderItem[],
  origin: string = getStoreOrigin(),
): string {
  const text = buildWhatsAppOrderMessage(items, origin);
  const phone = getWhatsAppNumber();
  const base = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}
