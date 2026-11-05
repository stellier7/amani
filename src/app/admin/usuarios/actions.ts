"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canManageUsers } from "@/lib/admin/permissions";
import type { Role } from "@/lib/admin/types";
import { getSession } from "@/lib/auth/cookies";
import { createUser, DuplicateUserEmailError } from "@/lib/auth/users";
import { getReadyDb } from "@/lib/catalog/store";

export type UserFormState = { error?: string };

function asRole(value: string): Role | null {
  if (value === "admin" || value === "staff") return value;
  return null;
}

export async function createUserAction(
  _prev: UserFormState,
  formData: FormData,
): Promise<UserFormState> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (!canManageUsers(session.role)) {
    return { error: "No tienes permiso para crear cuentas." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = asRole(String(formData.get("role") ?? ""));

  if (!name || !email || !role) {
    return { error: "Nombre, correo y rol son obligatorios." };
  }
  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }

  try {
    await createUser(await getReadyDb(), { name, email, password, role });
  } catch (error) {
    if (error instanceof DuplicateUserEmailError) {
      return { error: error.message };
    }
    throw error;
  }
  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}
