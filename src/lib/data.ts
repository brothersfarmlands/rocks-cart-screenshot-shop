import vegBanner from "@/assets/banners/veg.webp";
import fruitBanner from "@/assets/banners/fruit.webp";
import dalBanner from "@/assets/banners/dal.webp";
import vegCat from "@/assets/categories/veg.webp";
import fruitCat from "@/assets/categories/fruit.webp";
import dalCat from "@/assets/categories/dal.webp";

const productImages = import.meta.glob("../assets/products/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const img = (key: string) => productImages[`../assets/products/${key}.webp`] ?? "";

export type CategorySlug = "vegetables" | "fruits" | "pulses";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
  banner: string;
  tone: "brand" | "sun" | "leaf";
}

export const categories: Category[] = [
  {
    slug: "vegetables",
    name: "Vegetables",
    tagline: "Farm-picked every morning",
    image: vegCat,
    banner: vegBanner,
    tone: "brand",
  },
  {
    slug: "fruits",
    name: "Fruits",
    tagline: "Sweet, juicy & seasonal",
    image: fruitCat,
    banner: fruitBanner,
    tone: "sun",
  },
  {
    slug: "pulses",
    name: "Pulses",
    tagline: "Unpolished, protein-rich dals",
    image: dalCat,
    banner: dalBanner,
    tone: "leaf",
  },
];

export interface Variant {
  label: string;
  price: number;
  mrp: number;
}

export interface Product {
  id: string;
  name: string;
  localName: string;
  category: CategorySlug;
  image: string;
  variants: Variant[];
  description: string;
  origin: string;
  shelfLife: string;
  inStock: boolean;
  tags: ("bestseller" | "fresh" | "offer" | "recommended")[];
  rating: number;
}

// Builds 250g / 500g / 1kg variants from a per-kg price and MRP.
const kgVariants = (perKg: number, mrpKg: number): Variant[] => [
  { label: "250 g", price: Math.round(perKg * 0.28), mrp: Math.round(mrpKg * 0.28) },
  { label: "500 g", price: Math.round(perKg * 0.53), mrp: Math.round(mrpKg * 0.53) },
  { label: "1 kg", price: perKg, mrp: mrpKg },
];

export const products: Product[] = [
  // Vegetables
  {
    id: "tomato", name: "Tomato (Hybrid)", localName: "Tamatar", category: "vegetables", image: img("tomato"),
    variants: kgVariants(38, 48), origin: "Nashik, Maharashtra", shelfLife: "4–5 days", inStock: true,
    tags: ["bestseller", "fresh"], rating: 4.6,
    description: "Firm, juicy hybrid tomatoes with a tangy-sweet balance. Perfect for curries, chutneys, salads and everyday tadka.",
  },
  {
    id: "potato", name: "Potato", localName: "Aloo", category: "vegetables", image: img("potato"),
    variants: kgVariants(32, 40), origin: "Agra, Uttar Pradesh", shelfLife: "10–12 days", inStock: true,
    tags: ["bestseller"], rating: 4.7,
    description: "Clean, medium-sized potatoes with a smooth skin. Great for aloo sabzi, parathas, fries and dum aloo.",
  },
  {
    id: "onion", name: "Onion", localName: "Pyaz", category: "vegetables", image: img("onion"),
    variants: kgVariants(42, 55), origin: "Lasalgaon, Maharashtra", shelfLife: "10–14 days", inStock: true,
    tags: ["bestseller", "offer"], rating: 4.5,
    description: "Crisp red onions with a pungent bite. The base of every Indian kitchen – from biryani to bhaji.",
  },
  {
    id: "ladyfinger", name: "Lady Finger", localName: "Bhindi", category: "vegetables", image: img("ladyfinger"),
    variants: kgVariants(64, 80), origin: "Pune, Maharashtra", shelfLife: "2–3 days", inStock: true,
    tags: ["fresh", "recommended"], rating: 4.4,
    description: "Tender, bright green okra harvested young. Snaps cleanly – ideal for bhindi masala and kurkuri bhindi.",
  },
  {
    id: "cauliflower", name: "Cauliflower", localName: "Phool Gobi", category: "vegetables", image: img("cauliflower"),
    variants: [
      { label: "1 pc (400–600 g)", price: 35, mrp: 45 },
      { label: "2 pcs", price: 66, mrp: 90 },
    ],
    origin: "Shimla, Himachal Pradesh", shelfLife: "3–4 days", inStock: true,
    tags: ["fresh", "offer"], rating: 4.3,
    description: "Compact, creamy-white florets with fresh green leaves. Make aloo gobi, gobi paratha or crispy gobi 65.",
  },
  {
    id: "greenchilli", name: "Green Chilli", localName: "Hari Mirch", category: "vegetables", image: img("greenchilli"),
    variants: [
      { label: "100 g", price: 12, mrp: 15 },
      { label: "250 g", price: 26, mrp: 35 },
    ],
    origin: "Guntur, Andhra Pradesh", shelfLife: "5–6 days", inStock: true,
    tags: ["recommended"], rating: 4.5,
    description: "Glossy, medium-hot green chillies that add a fresh kick to dals, sabzis and chutneys.",
  },
  {
    id: "cucumber", name: "Cucumber", localName: "Kheera", category: "vegetables", image: img("cucumber"),
    variants: kgVariants(40, 52), origin: "Bengaluru, Karnataka", shelfLife: "4–5 days", inStock: true,
    tags: ["fresh", "offer"], rating: 4.4,
    description: "Crunchy, cooling cucumbers with tender seeds. Best for raita, salads and summer snacking.",
  },
  {
    id: "spinach", name: "Spinach", localName: "Palak", category: "vegetables", image: img("spinach"),
    variants: [
      { label: "1 bunch (250 g)", price: 25, mrp: 30 },
      { label: "2 bunches", price: 46, mrp: 60 },
    ],
    origin: "Local farms", shelfLife: "1–2 days", inStock: false,
    tags: ["fresh"], rating: 4.2,
    description: "Leafy, iron-rich spinach washed and bunched at the farm. Perfect for palak paneer and dal palak.",
  },
  // Fruits
  {
    id: "apple", name: "Shimla Apple", localName: "Seb", category: "fruits", image: img("apple"),
    variants: [
      { label: "4 pcs (500–600 g)", price: 119, mrp: 149 },
      { label: "1 kg", price: 199, mrp: 260 },
    ],
    origin: "Shimla, Himachal Pradesh", shelfLife: "10–14 days", inStock: true,
    tags: ["bestseller", "recommended"], rating: 4.7,
    description: "Crisp, sweet Himachali apples with a natural red blush. A healthy everyday snack for the whole family.",
  },
  {
    id: "banana", name: "Banana (Robusta)", localName: "Kela", category: "fruits", image: img("banana"),
    variants: [
      { label: "6 pcs", price: 39, mrp: 48 },
      { label: "12 pcs", price: 72, mrp: 96 },
    ],
    origin: "Jalgaon, Maharashtra", shelfLife: "3–4 days", inStock: true,
    tags: ["bestseller", "offer"], rating: 4.6,
    description: "Naturally ripened robusta bananas – soft, sweet and full of energy. Great for breakfast and shakes.",
  },
  {
    id: "orange", name: "Nagpur Orange", localName: "Santra", category: "fruits", image: img("orange"),
    variants: kgVariants(89, 120), origin: "Nagpur, Maharashtra", shelfLife: "7–10 days", inStock: true,
    tags: ["fresh", "offer"], rating: 4.5,
    description: "Juicy, easy-peel Nagpur oranges bursting with tangy-sweet flavour and vitamin C.",
  },
  {
    id: "mango", name: "Alphonso Mango", localName: "Hapus Aam", category: "fruits", image: img("mango"),
    variants: [
      { label: "3 pcs", price: 249, mrp: 320 },
      { label: "6 pcs", price: 469, mrp: 640 },
    ],
    origin: "Ratnagiri, Maharashtra", shelfLife: "3–5 days", inStock: true,
    tags: ["fresh", "recommended", "offer"], rating: 4.9,
    description: "The king of mangoes – carbide-free Ratnagiri Alphonso with rich aroma and buttery, saffron-coloured pulp.",
  },
  {
    id: "papaya", name: "Papaya", localName: "Papita", category: "fruits", image: img("papaya"),
    variants: [
      { label: "1 pc (800 g–1.2 kg)", price: 59, mrp: 75 },
    ],
    origin: "Anand, Gujarat", shelfLife: "3–4 days", inStock: true,
    tags: ["recommended"], rating: 4.3,
    description: "Ripe, sweet papaya with soft orange flesh. Gentle on the stomach and great for digestion.",
  },
  {
    id: "grapes", name: "Green Grapes (Seedless)", localName: "Angoor", category: "fruits", image: img("grapes"),
    variants: [
      { label: "500 g", price: 69, mrp: 90 },
      { label: "1 kg", price: 129, mrp: 175 },
    ],
    origin: "Nashik, Maharashtra", shelfLife: "4–6 days", inStock: true,
    tags: ["fresh", "bestseller"], rating: 4.6,
    description: "Crunchy, seedless Thompson grapes from Nashik vineyards – sweet with a light tang.",
  },
  {
    id: "pomegranate", name: "Pomegranate (Bhagwa)", localName: "Anaar", category: "fruits", image: img("pomegranate"),
    variants: [
      { label: "2 pcs (450–550 g)", price: 109, mrp: 140 },
      { label: "1 kg", price: 199, mrp: 260 },
    ],
    origin: "Solapur, Maharashtra", shelfLife: "10–12 days", inStock: true,
    tags: ["recommended", "offer"], rating: 4.5,
    description: "Bhagwa pomegranates with deep ruby arils – sweet, juicy and packed with antioxidants.",
  },
  // Pulses
  {
    id: "toordal", name: "Toor Dal (Unpolished)", localName: "Arhar Dal", category: "pulses", image: img("toordal"),
    variants: kgVariants(165, 199), origin: "Latur, Maharashtra", shelfLife: "9 months", inStock: true,
    tags: ["bestseller", "offer"], rating: 4.7,
    description: "Unpolished, double-sorted toor dal that cooks soft and creamy. The heart of everyday dal-chawal and sambar.",
  },
  {
    id: "moongdal", name: "Moong Dal (Yellow)", localName: "Dhuli Moong", category: "pulses", image: img("moongdal"),
    variants: kgVariants(138, 165), origin: "Rajasthan", shelfLife: "9 months", inStock: true,
    tags: ["recommended"], rating: 4.6,
    description: "Light, easy-to-digest split yellow moong. Ideal for khichdi, moong dal tadka and halwa.",
  },
  {
    id: "masoordal", name: "Masoor Dal (Red)", localName: "Lal Masoor", category: "pulses", image: img("masoordal"),
    variants: kgVariants(118, 140), origin: "Madhya Pradesh", shelfLife: "9 months", inStock: true,
    tags: ["fresh", "offer"], rating: 4.5,
    description: "Quick-cooking red lentils with a mild, earthy taste. Ready in minutes for a comforting bowl of dal.",
  },
  {
    id: "chanadal", name: "Chana Dal", localName: "Chane ki Dal", category: "pulses", image: img("chanadal"),
    variants: kgVariants(98, 120), origin: "Madhya Pradesh", shelfLife: "9 months", inStock: true,
    tags: ["recommended"], rating: 4.5,
    description: "Nutty, golden split Bengal gram. Use for chana dal fry, dal pakwan and besan-style snacks.",
  },
  {
    id: "uraddal", name: "Urad Dal (Split)", localName: "Urad Chilka", category: "pulses", image: img("uraddal"),
    variants: kgVariants(142, 170), origin: "Andhra Pradesh", shelfLife: "9 months", inStock: true,
    tags: ["fresh"], rating: 4.4,
    description: "Split black gram for fluffy idlis, crisp dosas, medu vada and rich dal makhani.",
  },
  {
    id: "rajma", name: "Rajma (Red Kidney Beans)", localName: "Rajma", category: "pulses", image: img("rajma"),
    variants: kgVariants(156, 190), origin: "Jammu & Kashmir", shelfLife: "12 months", inStock: true,
    tags: ["bestseller", "recommended"], rating: 4.8,
    description: "Plump, deep-red kidney beans that cook soft and creamy – made for Sunday rajma-chawal.",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const productsByTag = (tag: Product["tags"][number]) => products.filter((p) => p.tags.includes(tag));

export const discountPercent = (v: Variant) => (v.mrp > v.price ? Math.round(((v.mrp - v.price) / v.mrp) * 100) : 0);

export const searchProducts = (q: string) => {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.localName.toLowerCase().includes(term) ||
      p.category.includes(term),
  );
};

export interface Banner {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  category: CategorySlug;
  tone: "brand" | "sun" | "leaf";
}

// Configurable promotional banners for the home carousel.
export const banners: Banner[] = [
  {
    id: "b1", label: "FLAT 20% OFF", title: "Fresh veggies,\npicked at dawn", subtitle: "Delivered in 15 minutes",
    cta: "Shop Now", image: vegBanner, category: "vegetables", tone: "brand",
  },
  {
    id: "b2", label: "MANGO MANIA", title: "Alphonso is\nback in season", subtitle: "Up to 27% off on fruits",
    cta: "Shop Now", image: fruitBanner, category: "fruits", tone: "sun",
  },
  {
    id: "b3", label: "BUY 2 SAVE ₹40", title: "Unpolished dals\nfor every kitchen", subtitle: "Protein-rich & double sorted",
    cta: "Shop Now", image: dalBanner, category: "pulses", tone: "leaf",
  },
];

export const popularSearches = ["Tomato", "Onion", "Mango", "Toor Dal", "Banana", "Rajma"];
