import { describe, expect, it } from "vitest";
import { banners } from "./data";

describe("home banner slider", () => {
  it("has a Rice banner that opens the Rice category", () => {
    const rice = banners.find((b) => b.category === "rice");
    expect(rice).toBeDefined();
    expect(rice?.image).toContain("rice");
    expect(rice?.title).toMatch(/basmati/i);
  });

  it("keeps one banner per category with a unique id and an image", () => {
    const ids = banners.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const b of banners) {
      expect(b.image).toMatch(/^\/|^data:|^https?:/);
    }
    expect(banners.map((b) => b.category)).toEqual(["vegetables", "fruits", "pulses", "rice"]);
  });
});
