import { NextResponse } from "next/server";
import { loadPublicCatalog } from "@/lib/catalog/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await loadPublicCatalog();
  return NextResponse.json({
    count: products.length,
    products,
  });
}
