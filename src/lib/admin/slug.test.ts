import { describe, expect, it } from "vitest";
import { slugFromName } from "./slug";

describe("slugFromName", () => {
  it("slugifies a Spanish jewelry name", () => {
    expect(slugFromName("Cubana Italiana")).toBe("cubana-italiana");
  });

  it("strips accents", () => {
    expect(slugFromName("Brazalete Élite")).toBe("brazalete-elite");
  });

  it("collapses punctuation and extra spaces", () => {
    expect(slugFromName("  Figaro / Cartier  6mm ")).toBe("figaro-cartier-6mm");
  });
});
