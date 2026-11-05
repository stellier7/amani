import { describe, expect, it } from "vitest";
import { decryptSession, encryptSession, safeAdminPath } from "./session";

describe("session", () => {
  it("round-trips a user and rejects a tampered token", async () => {
    const token = await encryptSession({
      id: "user-1",
      email: "owner@amanijoyeria.com",
      name: "Dueño",
      role: "admin",
    });
    await expect(decryptSession(token)).resolves.toEqual({
      id: "user-1",
      email: "owner@amanijoyeria.com",
      name: "Dueño",
      role: "admin",
    });
    await expect(decryptSession(`${token}x`)).resolves.toBeNull();
  });
});

describe("safeAdminPath", () => {
  it("only allows local /admin paths", () => {
    expect(safeAdminPath("/admin/productos/nuevo")).toBe(
      "/admin/productos/nuevo",
    );
    expect(safeAdminPath("https://evil.example/admin")).toBe("/admin");
    expect(safeAdminPath("//evil.example")).toBe("/admin");
    expect(safeAdminPath("/bolsa")).toBe("/admin");
  });
});
