import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, type Product } from "@/lib/products";

async function loadProducts(): Promise<Product[]> {
  // Demonstrate the end-to-end data flow through the internal API route when a
  // base URL is available, falling back to the catalog module during build/SSG.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (baseUrl) {
    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as { products: Product[] };
        return data.products;
      }
    } catch {
      // Fall through to the local catalog.
    }
  }
  return getProducts();
}

export default async function Home() {
  const products = await loadProducts();

  return (
    <>
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-black/40">
            Handcrafted · Ethically sourced
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-5xl font-semibold leading-tight sm:text-6xl">
            Modern heirlooms, made to be worn every day.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-black/60">
            Paski designs fine jewelry in gold, silver, and natural stone —
            timeless pieces finished by hand in small batches.
          </p>
          <a
            href="#collection"
            className="mt-8 inline-block rounded-full bg-[#2a2520] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
          >
            Shop the collection
          </a>
        </section>

        <section id="collection" className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-medium">The collection</h2>
            <span className="text-sm text-black/40">
              {products.length} pieces
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-sm text-black/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Paski&rsquo;s Jewelry</span>
          <span>Free shipping & 30-day returns</span>
        </div>
      </footer>
    </>
  );
}
