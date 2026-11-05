"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { canManageUsers } from "@/lib/admin/permissions";
import type { SessionUser } from "@/lib/auth/session";
import { logoutAction } from "./login/actions";

export function AdminChrome({
  session,
  children,
}: {
  session: SessionUser | null;
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (!session || pathname === "/admin/login") {
    return (
      <div className="min-h-full bg-[#faf7f2] text-[#2a2520]">{children}</div>
    );
  }

  const usersVisible = canManageUsers(session.role);

  return (
    <div className="min-h-full bg-[#faf7f2] text-[#2a2520]">
      <header className="border-b border-black/8 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-black/40">
              Amani Joyería
            </p>
            <p className="text-sm font-medium">{session.name}</p>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              href="/admin"
              className="rounded-full border border-black/10 bg-white px-4 py-2 hover:border-black/30"
            >
              Productos
            </Link>
            {usersVisible ? (
              <Link
                href="/admin/usuarios"
                className="rounded-full border border-black/10 bg-white px-4 py-2 hover:border-black/30"
              >
                Usuarios
              </Link>
            ) : null}
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full px-4 py-2 text-black/60 hover:text-black"
              >
                Cerrar sesión
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}
