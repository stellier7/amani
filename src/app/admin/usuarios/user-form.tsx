"use client";

import { useActionState } from "react";
import { createUserAction, type UserFormState } from "./actions";

const fieldClass =
  "rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/40";

export function UserForm() {
  const [state, action, pending] = useActionState<UserFormState, FormData>(
    createUserAction,
    {},
  );

  return (
    <form action={action} className="mt-6 grid gap-4">
      <label className="grid gap-1.5 text-sm">
        Nombre
        <input name="name" required className={fieldClass} />
      </label>
      <label className="grid gap-1.5 text-sm">
        Correo
        <input name="email" type="email" required className={fieldClass} />
      </label>
      <label className="grid gap-1.5 text-sm">
        Contraseña inicial
        <input
          name="password"
          type="password"
          minLength={8}
          required
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        Rol
        <select name="role" defaultValue="staff" className={fieldClass}>
          <option value="admin">Admin — acceso completo</option>
          <option value="staff">Staff — sin costo, sin borrar, sin usuarios</option>
        </select>
      </label>
      {state?.error ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[#2a2520] px-7 py-3.5 text-sm font-medium text-white hover:bg-black disabled:opacity-60"
      >
        {pending ? "Creando…" : "Crear cuenta"}
      </button>
    </form>
  );
}
