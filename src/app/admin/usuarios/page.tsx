import { redirect } from "next/navigation";
import { canManageUsers } from "@/lib/admin/permissions";
import { getSession } from "@/lib/auth/cookies";
import { listUsers } from "@/lib/auth/users";
import { getReadyDb } from "@/lib/catalog/store";
import { UserForm } from "./user-form";

export const metadata = { title: "Usuarios" };

export default async function UsersPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (!canManageUsers(session.role)) {
    return (
      <section className="px-6 py-16">
        <h1 className="font-serif text-4xl">Sin acceso</h1>
        <p className="mt-3 text-sm text-black/55">
          Solo un administrador puede ver y crear cuentas.
        </p>
      </section>
    );
  }

  const users = await listUsers(await getReadyDb());

  return (
    <section className="px-6 py-10">
      <h1 className="font-serif text-4xl">Usuarios</h1>
      <p className="mt-2 text-sm text-black/55">
        Cada persona entra con su propio correo. Comparte la contraseña inicial
        por un canal privado.
      </p>

      <ul className="mt-8 divide-y divide-black/8 overflow-hidden rounded-[1.5rem] border border-black/8 bg-white">
        {users.map((user) => (
          <li key={user.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-black/55">{user.email}</p>
            </div>
            <span className="text-xs uppercase tracking-[0.16em] text-black/45">
              {user.role}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 max-w-lg rounded-[1.5rem] border border-black/8 bg-white p-6">
        <h2 className="text-lg font-medium">Nueva cuenta</h2>
        <UserForm />
      </div>
    </section>
  );
}
