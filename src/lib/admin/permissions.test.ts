import { describe, expect, it } from "vitest";
import {
  canDeleteProduct,
  canManageUsers,
  canViewCost,
} from "./permissions";

describe("permissions", () => {
  it("lets admins see cost, delete pieces, and manage users", () => {
    expect(canViewCost("admin")).toBe(true);
    expect(canDeleteProduct("admin")).toBe(true);
    expect(canManageUsers("admin")).toBe(true);
  });

  it("hides cost, delete, and user management from staff", () => {
    expect(canViewCost("staff")).toBe(false);
    expect(canDeleteProduct("staff")).toBe(false);
    expect(canManageUsers("staff")).toBe(false);
  });
});
