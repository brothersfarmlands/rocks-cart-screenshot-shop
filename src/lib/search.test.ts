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

it("vegetables holds the 8 original + 49 new veg; the 25 new fruits sit under Fruits", () => {
  expect(productsByCategory("vegetables")).toHaveLength(57);
  expect(productsByCategory("fruits")).toHaveLength(32);
  expect(productsByCategory("vegetables").every((p) => p.image)).toBe(true);
  expect(productsByCategory("fruits").every((p) => p.image)).toBe(true);
});

describe("new fruits in the Fruits category", () => {
  const cases: [string, string][] = [
    ["avocado", "Avocado"], ["Nariyal", "Tender Coconut (Nariyal)"], ["tender coconut", "Tender Coconut (Nariyal)"],
    ["Amrud", "Guava (Amrud)"], ["Singhara", "Water Chestnut (Singhara)"], ["Chikoo", "Sapota (Chikoo)"],
    ["Tarbooz", "Watermelon (Tarbooz)"], ["Mosambi", "Sweet Lime (Mosambi)"], ["Ananas", "Pineapple (Ananas)"],
    ["Sitaphal", "Custard Apple (Sitaphal)"], ["Kharbooja", "Muskmelon (Kharbooja)"], ["Kacha Aam", "Raw Mango (Kacha Aam)"],
    ["Anjeer", "Fig (Anjeer)"], ["STRAW", "Strawberry"],
  ];
  for (const [q, name] of cases) it(`"${q}" finds ${name}`, () => expect(top(q)).toContain(name));
  it("adds Persimmon and Brown Coconut only once, under Fruits", () => {
    const fruitList = productsByCategory("fruits").map((p) => p.name);
    expect(fruitList.filter((n) => n.startsWith("Persimmon"))).toHaveLength(1);
    expect(fruitList.filter((n) => n.startsWith("Brown Coconut"))).toHaveLength(1);
    const vegList = productsByCategory("vegetables").map((p) => p.name);
    expect(vegList.some((n) => n.startsWith("Persimmon"))).toBe(false);
    expect(vegList.some((n) => n.startsWith("Brown Coconut"))).toBe(false);
  });
});
