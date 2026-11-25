import { describe, expect, it } from "vitest";
import { productsByCategory, searchProducts } from "./data";

const top = (q: string) => searchProducts(q).map((p) => p.name);

describe("bilingual product search", () => {
  const cases: [string, string][] = [
    ["Ash Gourd", "Ash Gourd (Safed Petha)"],
    ["Safed Petha", "Ash Gourd (Safed Petha)"],
    ["Petha", "Ash Gourd (Safed Petha)"],
    ["Beetroot", "Beetroot (Chukanadar)"],
    ["Chukanadar", "Beetroot (Chukanadar)"],
    ["Pudina", "Mint Leaves (Pudina)"],
    ["Mint", "Mint Leaves (Pudina)"],
    ["Karela", "Bitter Gourd (Karela)"],
    ["Bitter Gourd", "Bitter Gourd (Karela)"],
    ["Dhaniya", "Coriander Bunch (Dhaniya Patta)"],
    ["Shimla Mirch", "Green Capsicum (Shimla Mirch)"],
    ["Adrak", "Ginger (Adrak)"],
  ];
  for (const [q, name] of cases) {
    it(`"${q}" finds ${name}`, () => expect(top(q)).toContain(name));
  }
  it("is case-insensitive and partial", () => {
    expect(top("kAmAl")).toContain("Lotus Stem Cut (Kamal Kakdi)");
    expect(top("chuka")).toContain("Beetroot (Chukanadar)");
  });
});

it("vegetables category holds the 8 original + 49 new veg + 25 fruits products", () => {
  expect(productsByCategory("vegetables")).toHaveLength(82);
  expect(productsByCategory("vegetables").every((p) => p.image)).toBe(true);
});

describe("fruits in the vegetables section", () => {
  const cases: [string, string][] = [
    ["avocado", "Avocado"], ["Nariyal", "Tender Coconut (Nariyal)"], ["tender coconut", "Tender Coconut (Nariyal)"],
    ["Amrud", "Guava (Amrud)"], ["Singhara", "Water Chestnut (Singhara)"], ["Chikoo", "Sapota (Chikoo)"],
    ["Tarbooz", "Watermelon (Tarbooz)"], ["Mosambi", "Sweet Lime (Mosambi)"], ["Ananas", "Pineapple (Ananas)"],
    ["Sitaphal", "Custard Apple (Sitaphal)"], ["Kharbooja", "Muskmelon (Kharbooja)"], ["Kacha Aam", "Raw Mango (Kacha Aam)"],
    ["Anjeer", "Fig (Anjeer)"], ["STRAW", "Strawberry"],
  ];
  for (const [q, name] of cases) it(`"${q}" finds ${name}`, () => expect(top(q)).toContain(name));
  it("adds Persimmon and Brown Coconut only once", () => {
    const veg = productsByCategory("vegetables").map((p) => p.name);
    expect(veg.filter((n) => n.startsWith("Persimmon"))).toHaveLength(1);
    expect(veg.filter((n) => n.startsWith("Brown Coconut"))).toHaveLength(1);
  });
});
