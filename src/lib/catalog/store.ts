import { getDb } from "@/lib/db";
import { ensureDb } from "@/lib/db/ensure";
import type { AppDb } from "@/lib/db/types";
import { listPublicProducts } from "@/lib/catalog/repository";
import type { Product } from "@/lib/products";

export async function getReadyDb(): Promise<AppDb> {
  return ensureDb(await getDb());
}

export async function loadPublicCatalog(): Promise<Product[]> {
  return listPublicProducts(await getReadyDb());
}
