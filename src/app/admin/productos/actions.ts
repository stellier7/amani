"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canDeleteProduct, canViewCost } from "@/lib/admin/permissions";
import { parseProductForm } from "@/lib/admin/parse-form";
import { slugFromName } from "@/lib/admin/slug";
import { validateProductInput } from "@/lib/admin/validation";
import { getSession } from "@/lib/auth/cookies";
import {
  createProduct,
  deleteProduct,
  DuplicateProductIdError,
  getAdminProduct,
  updateProduct,
} from "@/lib/catalog/repository";
import { getReadyDb } from "@/lib/catalog/store";
import { InvalidImageError, saveProductImage } from "@/lib/storage/images";

export type ProductFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function revalidateCatalog(id?: string) {
  revalidatePath("/");
  revalidatePath("/ella");
  revalidatePath("/el");
  revalidatePath("/bolsa");
  revalidatePath("/api/products");
  revalidatePath("/admin");
  if (id) {
    revalidatePath(`/producto/${id}`);
    revalidatePath(`/admin/productos/${id}`);
  }
}

export async function saveProductAction(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const existingId = String(formData.get("id") ?? "").trim();
  const db = await getReadyDb();
  const existing = existingId ? await getAdminProduct(db, existingId) : undefined;

  let image = existing?.image ?? "";
  const file = formData.get("photo");
  let imageError: string | undefined;
  if (file instanceof File && file.size > 0) {
    const productId = existingId || slugFromName(String(formData.get("name") ?? ""));
    try {
      image = await saveProductImage(file, productId || "pieza");
    } catch (error) {
      imageError =
        error instanceof InvalidImageError
          ? error.message
          : "No se pudo guardar la foto.";
      if (!image) {
        return { error: imageError };
      }
    }
  }

  const costForStaff = canViewCost(session.role)
    ? null
    : (existing?.cost ?? null);
  const input = parseProductForm(formData, {
    image,
    cost: canViewCost(session.role) ? null : costForStaff,
  });
  if (!canViewCost(session.role)) {
    input.cost = existing?.cost ?? null;
  }

  const fieldErrors = validateProductInput(input);
  if (imageError) {
    fieldErrors.image = imageError;
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    if (existing) {
      await updateProduct(db, existing.id, input, session.email);
      revalidateCatalog(existing.id);
      redirect(`/admin/productos/${existing.id}?saved=1`);
    }
    const created = await createProduct(db, input, session.email);
    revalidateCatalog(created.id);
    redirect(`/admin/productos/${created.id}?saved=1`);
  } catch (error) {
    if (error instanceof DuplicateProductIdError) {
      return {
        fieldErrors: {
          name: "Ya existe una pieza con ese nombre. Usa un nombre distinto.",
        },
      };
    }
    throw error;
  }
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  if (!canDeleteProduct(session.role)) {
    redirect("/admin");
  }
  const id = String(formData.get("id") ?? "");
  const confirmName = String(formData.get("confirmName") ?? "").trim();
  const db = await getReadyDb();
  const existing = await getAdminProduct(db, id);
  if (!existing || confirmName !== existing.name) {
    redirect(`/admin/productos/${id}?deleteError=1`);
  }
  await deleteProduct(db, id);
  revalidateCatalog(id);
  redirect("/admin");
}
