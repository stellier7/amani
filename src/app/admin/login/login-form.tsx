"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    undefined,
  );

  return (
    <form action={action} className="mt-8 grid gap-4">
      <input type="hidden" name="next" value={nextPath} />
      <label className="grid gap-1.5 text-sm">
        <span className="text-xs uppercase tracking-[0.18em] text-black/45">
          Correo
        </span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/40"
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="text-xs uppercase tracking-[0.18em] text-black/45">
          Contraseña
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/40"
        />
      </label>
      {state?.error ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-[#2a2520] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
