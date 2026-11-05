import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password hashing", () => {
  it("verifies the original password and rejects a wrong one", async () => {
    const hash = await hashPassword("clave-secreta-1");
    expect(hash).not.toBe("clave-secreta-1");
    expect(await verifyPassword("clave-secreta-1", hash)).toBe(true);
    expect(await verifyPassword("otra-clave", hash)).toBe(false);
  });
});
