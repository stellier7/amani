import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/cookies";
import { safeAdminPath } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const session = await getSession();
  const { next: nextParam } = await searchParams;
  const nextPath = safeAdminPath(
    Array.isArray(nextParam) ? nextParam[0] : nextParam,
  );
  if (session) {
    redirect(nextPath === "/admin/login" ? "/admin" : nextPath);
  }

  return (
    <div className="mx-auto w-full max-w-md px-6 py-16">
      <p className="text-xs uppercase tracking-[0.36em] text-[#687075]">
        Amani Joyería
      </p>
      <h1 className="mt-3 font-serif text-4xl">Administración</h1>
      <p className="mt-3 text-sm leading-relaxed text-black/55">
        Entra con tu correo para gestionar el catálogo.
      </p>
      <LoginForm nextPath={nextPath} />
    </div>
  );
}
