/** Shared site identity for metadata, sitemap, and JSON-LD. */

export const SITE_NAME = "Amani Joyería";

export const SITE_TAGLINE = "Plata 925 en Honduras";

export const SITE_DESCRIPTION =
  "Joyería de plata 925 en Honduras: collares y brazaletes a juego para ella y él, envíos a Tegucigalpa, San Pedro Sula, Comayagua y todo el país.";

/** Cities we ship to and highlight for local search / areaServed. */
export const SERVICE_CITIES = [
  "Tegucigalpa",
  "San Pedro Sula",
  "Comayagua",
] as const;

export const PHONE_E164 = "+50496784674";
export const PHONE_DISPLAY = "+504 9678-4674";

export const WHATSAPP_URL = `https://wa.me/${PHONE_E164.replace(/\D/g, "")}`;

export const HERO_OG_IMAGE = "/images/amani/hero-barbada-collares.png";

/** Canonical production domain for SEO (sitemap, Open Graph, JSON-LD). */
export const PRODUCTION_SITE_URL = "https://amanijoyeria.com";

export function getSiteUrl(): string {
  // Prefer an explicit env override (e.g. local/preview); otherwise use the
  // custom domain so canonicals never fall back to *.vercel.app.
  return process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL;
}
