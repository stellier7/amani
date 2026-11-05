import { describe, expect, it } from "vitest";
import { isPubliclySoldOut } from "./sold-out";

describe("isPubliclySoldOut", () => {
  it("marks a piece sold out when stock is 0", () => {
    expect(isPubliclySoldOut({ stock: 0, soldOutOverride: false })).toBe(true);
  });

  it("marks a piece sold out when the override is on", () => {
    expect(isPubliclySoldOut({ stock: 4, soldOutOverride: true })).toBe(true);
  });

  it("keeps a piece available when stock is above 0 and override is off", () => {
    expect(isPubliclySoldOut({ stock: 1, soldOutOverride: false })).toBe(false);
  });
});
