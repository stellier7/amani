import {
  getSiteUrl,
  HERO_OG_IMAGE,
  PHONE_E164,
  SERVICE_CITIES,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/site";
import type { Product } from "@/lib/products";

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    image: `${siteUrl}${HERO_OG_IMAGE}`,
    telephone: PHONE_E164,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tegucigalpa",
      addressCountry: "HN",
    },
    areaServed: [
      ...SERVICE_CITIES.map((name) => ({
        "@type": "City",
        name,
      })),
      {
        "@type": "Country",
        name: "Honduras",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_E164,
      contactType: "customer service",
      areaServed: "HN",
      availableLanguage: ["Spanish"],
    },
  };
}

export function productJsonLd(product: Product) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [`${siteUrl}${product.image}`],
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    material: product.material,
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/producto/${product.id}`,
      priceCurrency: "HNL",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "HN",
        },
      },
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
