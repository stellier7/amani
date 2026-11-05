export function isPubliclySoldOut(input: {
  stock: number;
  soldOutOverride: boolean;
}): boolean {
  return input.stock === 0 || input.soldOutOverride;
}
