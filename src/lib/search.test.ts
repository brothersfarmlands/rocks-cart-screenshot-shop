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

it("vegetables category holds the 8 original + 49 new products", () => {
  expect(productsByCategory("vegetables")).toHaveLength(57);
  expect(productsByCategory("vegetables").every((p) => p.image)).toBe(true);
});
