import type { ReactNode } from "react";
import { CartProvider } from "@/components/CartContext";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { loadPublicCatalog } from "@/lib/catalog/store";

export const dynamic = "force-dynamic";

export default async function ShopLayout({
  children,
}: {
  children: ReactNode;
}) {
  const products = await loadPublicCatalog();

  return (
    <CartProvider products={products}>
      <div className="flex min-h-full flex-1 flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </CartProvider>
  );
}
