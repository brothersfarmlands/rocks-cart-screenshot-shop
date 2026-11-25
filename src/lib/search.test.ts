import { describe, expect, it } from "vitest";
import { categories, getProduct, productsByCategory, searchProducts } from "./data";

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

describe("new pulses and the separate Rice category", () => {
  const cases: [string, string][] = [
    ["Masoor", "Masoor (Red Lentils)"],
    ["Red Lentils", "Masoor (Red Lentils)"],
    ["Arhar", "Arhar (Toor Dal)"],
    ["Toor Dal", "Arhar (Toor Dal)"],
    ["Moong Chilka", "Moong Chilka (Split Green Gram with Skin)"],
    ["Kala Chana", "Kala Chana (Black Chickpeas)"],
    ["Black Chickpeas", "Kala Chana (Black Chickpeas)"],
    ["Moong Sabut", "Moong Sabut (Whole Green Gram)"],
    ["Whole Green Gram", "Moong Sabut (Whole Green Gram)"],
    ["Everyday Basmati Rice", "Everyday Basmati Rice"],
    ["Super Basmati Rice", "Super Basmati Rice"],
    ["Premium Basmati Rice", "Premium Basmati Rice"],
  ];
  for (const [q, name] of cases) it(`"${q}" finds ${name}`, () => expect(top(q)).toContain(name));

  it("supports partial and case-insensitive names", () => {
    expect(top("everyday bas")).toContain("Everyday Basmati Rice");
    expect(top("kAlA cHa")).toContain("Kala Chana (Black Chickpeas)");
    expect(top("sabut")).toContain("Moong Sabut (Whole Green Gram)");
  });

  it("adds five pulses only to Pulses and three rice products only to Rice", () => {
    expect(categories.map((c) => c.slug)).toContain("rice");
    expect(productsByCategory("pulses")).toHaveLength(11);
    expect(productsByCategory("rice")).toHaveLength(3);
    expect(productsByCategory("pulses").every((p) => p.image)).toBe(true);
    expect(productsByCategory("rice").every((p) => p.image)).toBe(true);
    expect(productsByCategory("rice").map((p) => p.id)).toEqual([
      "everydaybasmati", "superbasmati", "premiumbasmati",
    ]);
  });

  it("uses the requested pulse and rice pack sizes", () => {
    for (const id of ["masoorredlentils", "arhartoordal", "moongchilka", "kalachana", "moongsabut"]) {
      expect(getProduct(id)?.variants.map((v) => v.label)).toEqual(["500 g", "1 kg"]);
    }
    for (const id of ["everydaybasmati", "superbasmati", "premiumbasmati"]) {
      expect(getProduct(id)?.variants.map((v) => v.label)).toEqual(["1 kg", "5 kg", "10 kg"]);
    }
  });
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
