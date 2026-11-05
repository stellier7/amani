import Image from "next/image";
import Link from "next/link";
import { isPubliclySoldOut } from "@/lib/admin/sold-out";
import { formatPrice } from "@/lib/products";
import { getSession } from "@/lib/auth/cookies";
import { listAdminProducts } from "@/lib/catalog/repository";
import { getReadyDb } from "@/lib/catalog/store";
import { redirect } from "next/navigation";

export const metadata = { title: "Productos" };

export default async function AdminProductsPage({
  searchParams,
}: PageProps<"/admin">) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const query = String(Array.isArray(params.q) ? params.q[0] : params.q ?? "")
    .trim()
    .toLowerCase();
  const estado = String(
    Array.isArray(params.estado) ? params.estado[0] : params.estado ?? "todas",
  );

  const products = await listAdminProducts(await getReadyDb());
  const filtered = products.filter((product) => {
    const soldOut = isPubliclySoldOut(product);
    if (query && !product.name.toLowerCase().includes(query)) return false;
    if (estado === "venta") return !soldOut;
    if (estado === "agotadas") return soldOut;
    return true;
  });

  return (
    <section className="px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">Productos</h1>
          <p className="mt-2 text-sm text-black/55">
            {filtered.length} pieza{filtered.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="rounded-full bg-[#2a2520] px-5 py-2.5 text-sm font-medium text-white hover:bg-black"
        >
          Nueva pieza
        </Link>
      </div>

      <form className="mt-8 flex flex-wrap gap-3" method="get">
        <input
          name="q"
          defaultValue={query}
          placeholder="Buscar por nombre"
          className="min-w-56 flex-1 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm"
        />
        <select
          name="estado"
          defaultValue={estado}
          className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm"
        >
          <option value="todas">Todas</option>
          <option value="venta">En venta</option>
          <option value="agotadas">Agotadas</option>
        </select>
        <button
          type="submit"
          className="rounded-full border border-black/10 px-4 py-2.5 text-sm hover:border-black/30"
        >
          Filtrar
        </button>
      </form>

      <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-black/8 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-black/8 text-xs uppercase tracking-[0.16em] text-black/45">
            <tr>
              <th className="px-4 py-3">Pieza</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Existencias</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Último cambio</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const soldOut = isPubliclySoldOut(product);
              return (
                <tr key={product.id} className="border-t border-black/6">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/productos/${product.id}`}
                      className="flex items-center gap-3 hover:underline"
                    >
                      <span className="relative h-12 w-10 overflow-hidden rounded-lg bg-[#f3eee6]">
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </span>
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 tabular-nums">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3 tabular-nums">{product.stock}</td>
                  <td className="px-4 py-3">
                    {soldOut ? "Agotada" : "En venta"}
                  </td>
                  <td className="px-4 py-3 text-black/55">
                    {product.updatedByEmail ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
