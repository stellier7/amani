"use client";

import { useActionState } from "react";
import type { AdminProduct, Role } from "@/lib/admin/types";
import { canViewCost } from "@/lib/admin/permissions";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STYLES,
} from "@/lib/products";
import {
  saveProductAction,
  type ProductFormState,
} from "./actions";

const fieldClass =
  "rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black/40";

export function ProductForm({
  product,
  role,
}: {
  product?: AdminProduct;
  role: Role;
}) {
  const [state, action, pending] = useActionState<ProductFormState, FormData>(
    saveProductAction,
    {},
  );
  const showCost = canViewCost(role);

  return (
    <form action={action} className="grid gap-8 pb-16">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <section className="grid gap-4 rounded-[1.5rem] border border-black/8 bg-white p-6">
        <h2 className="text-lg font-medium">Tienda</h2>
        <label className="grid gap-1.5 text-sm">
          Nombre
          <input
            name="name"
            required
            defaultValue={product?.name ?? ""}
            className={fieldClass}
          />
          {state?.fieldErrors?.name ? (
            <span className="text-red-700">{state.fieldErrors.name}</span>
          ) : null}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm">
            Categoría
            <select
              name="category"
              defaultValue={product?.category ?? "Collares"}
              className={fieldClass}
            >
              {PRODUCT_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm">
            Estilo
            <select
              name="style"
              defaultValue={product?.style ?? "Cubana"}
              className={fieldClass}
            >
              {PRODUCT_STYLES.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="grid gap-1.5 text-sm">
          Precio público (L)
          <input
            name="price"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={product?.price ?? ""}
            className={fieldClass}
          />
          {state?.fieldErrors?.price ? (
            <span className="text-red-700">{state.fieldErrors.price}</span>
          ) : null}
        </label>
        <label className="grid gap-1.5 text-sm">
          Material
          <input
            name="material"
            required
            defaultValue={product?.material ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          Descripción
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={product?.description ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          Incluye
          <input
            name="pieces"
            required
            defaultValue={product?.pieces ?? ""}
            className={fieldClass}
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm">
            Foto
            <input name="photo" type="file" accept="image/jpeg,image/png,image/webp" />
            {product?.image ? (
              <span className="text-xs text-black/50">{product.image}</span>
            ) : null}
            {state?.fieldErrors?.image ? (
              <span className="text-red-700">{state.fieldErrors.image}</span>
            ) : null}
          </label>
          <label className="grid gap-1.5 text-sm">
            Tipo de foto
            <select
              name="shot"
              defaultValue={product?.shot ?? "packshot"}
              className={fieldClass}
            >
              <option value="packshot">Packshot</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
          </label>
        </div>
        <label className="grid gap-1.5 text-sm">
          Audiencia
          <select
            name="audience"
            defaultValue={product?.audience ?? ""}
            className={fieldClass}
          >
            <option value="">Set / para dos</option>
            <option value="mujer">Ella</option>
            <option value="hombre">Él</option>
            <option value="unisex">Unisex</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={product?.featured}
          />
          Destacada en inicio
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            name="soldOutOverride"
            type="checkbox"
            defaultChecked={product?.soldOutOverride}
          />
          Marcar agotada aunque haya existencias
        </label>
      </section>

      <section className="grid gap-4 rounded-[1.5rem] border border-dashed border-black/20 bg-[#f3eee6] p-6">
        <div>
          <h2 className="text-lg font-medium">Solo administración</h2>
          <p className="mt-1 text-sm text-black/55">
            El sitio público nunca muestra estos datos. Si las existencias llegan
            a 0, la tienda muestra Agotado.
          </p>
        </div>
        <label className="grid gap-1.5 text-sm">
          Existencias
          <input
            name="stock"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={product?.stock ?? 1}
            className={fieldClass}
          />
          {state?.fieldErrors?.stock ? (
            <span className="text-red-700">{state.fieldErrors.stock}</span>
          ) : null}
        </label>
        <label className="grid gap-1.5 text-sm">
          Peso (gramos)
          <input
            name="weightGrams"
            type="number"
            min={0}
            step={1}
            defaultValue={product?.weightGrams ?? ""}
            className={fieldClass}
          />
        </label>
        {showCost ? (
          <label className="grid gap-1.5 text-sm">
            Costo (L)
            <input
              name="cost"
              type="number"
              min={0}
              step={1}
              defaultValue={product?.cost ?? ""}
              className={fieldClass}
            />
          </label>
        ) : null}
        <label className="grid gap-1.5 text-sm">
          Notas
          <textarea
            name="notes"
            rows={3}
            defaultValue={product?.notes ?? ""}
            className={fieldClass}
          />
        </label>
      </section>

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
        {pending ? "Guardando…" : "Guardar pieza"}
      </button>
    </form>
  );
}
