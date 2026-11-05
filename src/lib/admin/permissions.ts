import type { Role } from "@/lib/admin/types";

function assertNever(value: never): never {
  throw new Error(`Unhandled role: ${String(value)}`);
}

export function canViewCost(role: Role): boolean {
  switch (role) {
    case "admin":
      return true;
    case "staff":
      return false;
    default:
      return assertNever(role);
  }
}

export function canDeleteProduct(role: Role): boolean {
  switch (role) {
    case "admin":
      return true;
    case "staff":
      return false;
    default:
      return assertNever(role);
  }
}

export function canManageUsers(role: Role): boolean {
  switch (role) {
    case "admin":
      return true;
    case "staff":
      return false;
    default:
      return assertNever(role);
  }
}
