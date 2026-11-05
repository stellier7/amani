import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/cookies";
import { ProductForm } from "../product-form";

export const metadata = { title: "Nueva pieza" };

export default async function NewProductPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <section className="px-6 py-10">
      <h1 className="font-serif text-4xl">Nueva pieza</h1>
      <p className="mt-2 text-sm text-black/55">
        La dirección de la ficha se crea a partir del nombre y no cambia después.
      </p>
      <div className="mt-8">
        <ProductForm role={session.role} />
      </div>
    </section>
  );
}
