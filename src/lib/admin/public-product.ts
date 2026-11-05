import { isPubliclySoldOut } from "@/lib/admin/sold-out";
import type { AdminProduct } from "@/lib/admin/types";
import type { Product } from "@/lib/products";

export function toPublicProduct(product: AdminProduct): Product {
  const soldOut = isPubliclySoldOut({
    stock: product.stock,
    soldOutOverride: product.soldOutOverride,
  });

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    style: product.style,
    price: product.price,
    material: product.material,
    description: product.description,
    pieces: product.pieces,
    image: product.image,
    ...(product.shot ? { shot: product.shot } : {}),
    ...(product.featured ? { featured: true } : {}),
    ...(product.audience ? { audience: product.audience } : {}),
    ...(soldOut ? { soldOut: true } : {}),
    ...(product.gradient ? { gradient: product.gradient } : {}),
  };
}
