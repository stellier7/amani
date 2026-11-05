import { notFound, redirect } from "next/navigation";
import { canDeleteProduct } from "@/lib/admin/permissions";
import { getSession } from "@/lib/auth/cookies";
import { getAdminProduct } from "@/lib/catalog/repository";
import { getReadyDb } from "@/lib/catalog/store";
import { deleteProductAction } from "../actions";
import { ProductForm } from "../product-form";

export const metadata = { title: "Editar pieza" };

export default async function EditProductPage({
  params,
  searchParams,
}: PageProps<"/admin/productos/[id]">) {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { id } = await params;
  const query = await searchParams;
  const product = await getAdminProduct(await getReadyDb(), id);
  if (!product) notFound();
  const saved = String(query.saved ?? "") === "1";
  const deleteError = String(query.deleteError ?? "") === "1";

  return (
    <section className="px-6 py-10">
      <h1 className="font-serif text-4xl">{product.name}</h1>
      <p className="mt-2 text-sm text-black/55">
        /producto/{product.id}
        {product.updatedByEmail
          ? ` · último cambio: ${product.updatedByEmail}`
          : ""}
      </p>
      {saved ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Pieza guardada. Ya se refleja en la tienda.
        </p>
      ) : null}
      <div className="mt-8">
        <ProductForm product={product} role={session.role} />
      </div>
      {canDeleteProduct(session.role) ? (
        <form
          action={deleteProductAction}
          className="mt-10 rounded-[1.5rem] border border-red-200 bg-red-50 p-6"
        >
          <h2 className="font-medium text-red-950">Eliminar de la tienda</h2>
          <p className="mt-2 text-sm text-red-900/80">
            Escribe el nombre exacto de la pieza para confirmar. Los enlaces de
            WhatsApp a esta ficha dejarán de funcionar.
          </p>
          <input type="hidden" name="id" value={product.id} />
          <input
            name="confirmName"
            placeholder={product.name}
            className="mt-4 w-full rounded-2xl border border-red-200 bg-white px-4 py-3"
          />
          {deleteError ? (
            <p className="mt-2 text-sm text-red-800">
              El nombre no coincide. No se eliminó.
            </p>
          ) : null}
          <button
            type="submit"
            className="mt-4 rounded-full bg-red-800 px-5 py-2.5 text-sm text-white"
          >
            Eliminar pieza
          </button>
        </form>
      ) : null}
    </section>
  );
}
