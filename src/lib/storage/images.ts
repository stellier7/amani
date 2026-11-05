import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export class InvalidImageError extends Error {
  constructor() {
    super("La foto debe ser JPG, PNG o WebP de hasta 4 MB.");
    this.name = "InvalidImageError";
  }
}

function extensionFor(type: string): string {
  switch (type) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/jpeg":
      return "jpg";
    default:
      throw new InvalidImageError();
  }
}

export async function saveProductImage(
  file: File,
  productId: string,
): Promise<string> {
  if (
    !ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number]) ||
    file.size === 0 ||
    file.size > MAX_BYTES
  ) {
    throw new InvalidImageError();
  }

  const filename = `${productId}-${Date.now()}.${extensionFor(file.type)}`;
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (token) {
    const blob = await put(`products/${filename}`, file, {
      access: "public",
      token,
    });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(dir, filename),
    Buffer.from(await file.arrayBuffer()),
  );
  return `/uploads/${filename}`;
}
