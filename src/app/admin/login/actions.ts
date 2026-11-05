"use server";

import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  createSessionCookie,
} from "@/lib/auth/cookies";
import { verifyPassword } from "@/lib/auth/password";
import { safeAdminPath } from "@/lib/auth/session";
import { findUserByEmail } from "@/lib/auth/users";
import { getReadyDb } from "@/lib/catalog/store";

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const nextPath = safeAdminPath(String(formData.get("next") ?? "/admin"));

  if (!email || !password) {
    return { error: "Correo o contraseña incorrectos." };
  }

  const db = await getReadyDb();
  const user = await findUserByEmail(db, email);
  const valid = user
    ? await verifyPassword(password, user.passwordHash)
    : false;
  if (!user || !valid) {
    return { error: "Correo o contraseña incorrectos." };
  }

  await createSessionCookie({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
  redirect(nextPath);
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/admin/login");
}
