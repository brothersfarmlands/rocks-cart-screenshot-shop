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
  keywords?: string[];
}

// Builds 250g / 500g / 1kg variants from a per-kg price and MRP.
const kgVariants = (perKg: number, mrpKg: number): Variant[] => [
  { label: "250 g", price: Math.round(perKg * 0.28), mrp: Math.round(mrpKg * 0.28) },
  { label: "500 g", price: Math.round(perKg * 0.53), mrp: Math.round(mrpKg * 0.53) },
  { label: "1 kg", price: perKg, mrp: mrpKg },
];

// Fresh Vegetables catalogue extension. `name` shows English with the Hindi/local
// name in brackets; `localName` + `keywords` power bilingual search.
const pcs = (label: string, price: number, mrp: number): Variant => ({ label, price, mrp });
const veg = (
  id: string, name: string, localName: string, variants: Variant[], keywords: string[],
  origin: string, shelfLife: string, description: string, rating = 4.4,
): Product => ({
  id, name, localName, category: "vegetables", image: img(id), variants, keywords,
  origin, shelfLife, inStock: true, tags: [], rating, description,
});

const newVegetables: Product[] = [
  veg("beetroot", "Beetroot (Chukanadar)", "Chukanadar", kgVariants(48, 60), ["chukandar", "beet"], "Ooty, Tamil Nadu", "7–10 days", "Deep-red, earthy-sweet beetroot. Great for salads, juices, halwa and poriyal."),
  veg("mint", "Mint Leaves (Pudina)", "Pudina", [pcs("1 bunch (100 g)", 15, 20), pcs("2 bunches", 28, 40)], ["podina", "mint"], "Local farms", "2–3 days", "Fragrant, freshly bunched mint for chutney, raita, chaas and biryani."),
  veg("yellowbellpepper", "Yellow Bell Pepper", "Peeli Shimla Mirch", [pcs("1 pc (200–250 g)", 59, 75), pcs("2 pcs", 112, 150)], ["capsicum", "shimla mirch", "yellow capsicum"], "Pune, Maharashtra", "5–7 days", "Sweet, crunchy yellow bell pepper for salads, stir-fries and pasta."),
  veg("amla", "Amla", "Indian Gooseberry", kgVariants(90, 115), ["aamla", "gooseberry", "awla"], "Pratapgarh, Uttar Pradesh", "7–10 days", "Tangy, vitamin C-rich amla for murabba, pickle, juice and chutney."),
  veg("sweetpotato", "Sweet Potato", "Shakarkandi", kgVariants(56, 70), ["shakarkand", "shakarkandi"], "Odisha", "10–14 days", "Naturally sweet, starchy sweet potatoes – roast them, make chaat or tikki."),
  veg("parwal", "Pointed Gourd (Parmal)", "Parmal", kgVariants(70, 90), ["parwal", "parval", "potol"], "Bihar", "3–4 days", "Tender striped parwal for parwal ki sabzi, bharwa parwal and curries."),
  veg("capsicummix", "Assorted Capsicum (Red, Yellow, Green)", "Shimla Mirch", [pcs("3 pcs (500–600 g)", 129, 165)], ["bell pepper", "shimla mirch", "capsicum mix"], "Pune, Maharashtra", "5–7 days", "A colourful trio of red, yellow and green capsicums for salads and stir-fries."),
  veg("lettuce", "Green Lettuce", "Salad Patta", [pcs("1 pc (150–200 g)", 45, 60)], ["salad", "lettuce"], "Nilgiris, Tamil Nadu", "3–4 days", "Crisp, ruffled green lettuce – perfect for salads, wraps and burgers."),
  veg("karela", "Bitter Gourd (Karela)", "Karela", kgVariants(60, 78), ["karela", "bitter melon"], "Local farms", "4–5 days", "Fresh, bumpy karela for bharwa karela, chips and healthy sabzi."),
  veg("brinjalsmall", "Small Purple Brinjal (Baingan)", "Baingan", kgVariants(48, 60), ["brinjal", "eggplant", "chhote baingan", "bharwa baingan"], "Nashik, Maharashtra", "4–5 days", "Small round brinjals, ideal for bharwa baingan and baingan masala."),
  veg("brinjallong", "Long Purple Brinjal (Baingan)", "Baingan", kgVariants(44, 56), ["brinjal", "eggplant", "lamba baingan"], "Karnataka", "4–5 days", "Slender long brinjals with soft seeds for fries, curries and stir-fries."),
  veg("sarsosaag", "Mustard Leaves (Sarso Saag)", "Sarso Saag", [pcs("1 bunch (500 g)", 35, 45), pcs("1 kg", 65, 90)], ["sarson", "sarson ka saag", "mustard greens"], "Punjab", "2–3 days", "Fresh mustard greens for the winter classic sarson ka saag with makki roti."),
  veg("coriander", "Coriander Bunch (Dhaniya Patta)", "Dhaniya Patta", [pcs("1 bunch (100 g)", 15, 20), pcs("2 bunches", 28, 40)], ["dhania", "dhaniya", "cilantro", "kothmir"], "Local farms", "2–3 days", "Aromatic fresh coriander to garnish dals, curries and chaats."),
  veg("ginger", "Ginger (Adrak)", "Adrak", [pcs("100 g", 18, 24), pcs("250 g", 42, 55)], ["adrak", "adrakh"], "Kerala", "10–14 days", "Juicy, pungent ginger for chai, tadka and ginger-garlic paste."),
  veg("lemon", "Lemon", "Nimbu", [pcs("4 pcs", 20, 28), pcs("8 pcs", 38, 56)], ["nimbu", "lime", "neembu"], "Andhra Pradesh", "7–10 days", "Juicy lemons for nimbu pani, dal, salads and pickles."),
  veg("englishcucumber", "English Cucumber", "Kheera", [pcs("1 pc (300–350 g)", 35, 45), pcs("2 pcs", 66, 90)], ["kheera", "khira", "cucumber"], "Pune, Maharashtra", "5–6 days", "Long, seedless English cucumber with thin skin – crisp for salads and sandwiches."),
  veg("greencapsicum", "Green Capsicum (Shimla Mirch)", "Shimla Mirch", kgVariants(70, 90), ["capsicum", "bell pepper"], "Himachal Pradesh", "5–6 days", "Glossy green capsicum for aloo shimla mirch, pizzas and Chinese dishes."),
  veg("orangecarrot", "Orange Carrot (Gajar)", "Gajar", kgVariants(56, 70), ["gajar", "carrot", "ooty carrot"], "Ooty, Tamil Nadu", "7–10 days", "Sweet, crunchy orange carrots for salads, juices and sabzi."),
  veg("hybridtomato", "Hybrid Tomato", "Tamatar", kgVariants(36, 46), ["tamatar", "tomato"], "Kolar, Karnataka", "4–5 days", "Firm, uniform hybrid tomatoes with longer shelf life – great for gravies."),
  veg("mushroom", "Button Mushroom", "Khumbi", [pcs("1 pack (200 g)", 45, 60), pcs("2 packs", 86, 120)], ["khumb", "khumbi", "mushroom"], "Sonipat, Haryana", "2–3 days", "Fresh white button mushrooms for mushroom masala, pizzas and soups."),
  veg("frenchbeans", "French Beans", "Beans", kgVariants(80, 100), ["fansi", "beans", "green beans"], "Bengaluru, Karnataka", "3–4 days", "Tender stringless French beans for poriyal, pulao and mixed veg."),
  veg("lauki", "Bottle Gourd (Lauki)", "Lauki", [pcs("1 pc (700 g–1 kg)", 35, 45)], ["lauki", "doodhi", "ghiya"], "Local farms", "4–5 days", "Light, tender lauki for lauki chana dal, kofta and halwa."),
  veg("redcarrot", "Red Carrot (Gajar)", "Gajar", kgVariants(50, 64), ["gajar", "delhi carrot", "lal gajar"], "Haryana", "7–10 days", "Juicy red winter carrots – made for gajar ka halwa and kanji."),
  veg("broccoli", "Broccoli", "Hari Gobhi", [pcs("1 pc (250–300 g)", 59, 80)], ["hari gobi", "broccoli"], "Nilgiris, Tamil Nadu", "3–4 days", "Fresh, tight-floret broccoli for stir-fries, soups and salads."),
  veg("garlic", "Garlic (Lehsun)", "Lehsun", [pcs("100 g", 22, 30), pcs("250 g", 52, 70)], ["lahsun", "lasun", "lehsan"], "Mandsaur, Madhya Pradesh", "20–30 days", "Bold, aromatic garlic bulbs for tadka, chutneys and pickles."),
  veg("methi", "Fenugreek (Methi)", "Methi", [pcs("1 bunch (250 g)", 20, 25), pcs("2 bunches", 38, 50)], ["methi", "fenugreek leaves"], "Local farms", "1–2 days", "Fresh methi leaves for methi paratha, aloo methi and thepla."),
  veg("mooli", "Radish (Mooli)", "Mooli", kgVariants(36, 46), ["muli", "mooli", "radish"], "Local farms", "4–5 days", "Crisp white radish with leaves for mooli paratha and salads."),
  veg("bhartabrinjal", "Brinjal Bharta (Baingan)", "Baingan", kgVariants(50, 64), ["bharta", "bharta baingan", "brinjal", "eggplant"], "Local farms", "4–5 days", "Large round brinjals with few seeds – ideal for smoky baingan bharta."),
  veg("redbellpepper", "Red Bell Pepper", "Lal Shimla Mirch", [pcs("1 pc (200–250 g)", 59, 75), pcs("2 pcs", 112, 150)], ["capsicum", "shimla mirch", "red capsicum"], "Pune, Maharashtra", "5–7 days", "Sweet, juicy red bell pepper for salads, pasta and grilling."),
  veg("greenpeas", "Green Peas (Matar)", "Matar", kgVariants(80, 100), ["matar", "mutter", "peas"], "Jabalpur, Madhya Pradesh", "3–4 days", "Sweet green pea pods for matar paneer, pulao and aloo matar."),
  veg("cabbage", "Cabbage (Patta Gobhi)", "Patta Gobhi", [pcs("1 pc (500–800 g)", 30, 40)], ["patta gobi", "band gobhi", "cabbage"], "Karnataka", "7–10 days", "Firm green cabbage for sabzi, coleslaw and momos."),
  veg("curryleaves", "Curry Leaves (Kadi Patta)", "Kadi Patta", [pcs("1 bunch (50 g)", 10, 15)], ["kadi patta", "kari patta", "curry patta", "meetha neem"], "Local farms", "4–5 days", "Glossy, aromatic curry leaves for tadka, sambar and poha."),
  veg("springonion", "Spring Onion (Hari Pyaaz)", "Hari Pyaaz", [pcs("1 bunch (200 g)", 25, 32)], ["hara pyaz", "hari pyaz", "scallion"], "Local farms", "3–4 days", "Fresh spring onions for Chinese dishes, parathas and garnish."),
  veg("sweetcorn", "Sweet Corn (Packet)", "Makka", [pcs("1 packet (200 g)", 45, 55), pcs("2 packets", 86, 110)], ["makka", "makai", "bhutta", "corn"], "Karnataka", "3–4 days", "Ready-to-cook sweet corn kernels for chaat, soups and salads."),
  veg("broadbeans", "Broad Beans (Sem Phali)", "Sem Phali", kgVariants(70, 90), ["sem", "sem phali", "papdi"], "Local farms", "3–4 days", "Flat, tender sem phali for aloo sem and mixed veg sabzi."),
  veg("arvi", "Arvi", "Colocasia", kgVariants(60, 76), ["arbi", "taro", "colocasia", "arvi"], "Uttar Pradesh", "7–10 days", "Fresh arvi (taro root) for crispy arbi fry and arbi masala."),
  veg("babypotato", "Baby Potato (Aloo)", "Aloo", kgVariants(50, 64), ["aloo", "chhote aloo", "potato"], "Agra, Uttar Pradesh", "10–12 days", "Small, smooth baby potatoes for dum aloo and roasted aloo."),
  veg("babycorn", "Baby Corn", "Baby Makka", [pcs("1 pack (200 g)", 40, 50)], ["corn", "makka", "baby corn"], "Karnataka", "3–4 days", "Tender, crunchy baby corn for chilli baby corn and stir-fries."),
  veg("drumstick", "Drumstick (Sahjan)", "Sahjan", [pcs("250 g", 30, 40), pcs("500 g", 56, 76)], ["sahjan", "moringa", "saijan", "murungakkai"], "Tamil Nadu", "4–5 days", "Fresh, fleshy drumsticks for sambar and drumstick curry."),
  veg("tinda", "Round Gourd (Tinda)", "Tinda", kgVariants(60, 78), ["tinda", "tinde", "apple gourd"], "Rajasthan", "4–5 days", "Tender tinda for tinda masala and bharwa tinde."),
  veg("kundru", "Ivy Gourd (Kundru)", "Kundru", kgVariants(56, 72), ["kundru", "tindora", "tondli"], "Local farms", "3–4 days", "Crunchy kundru for kundru fry and simple sabzi."),
  veg("spongegourd", "Sponge Gourd", "Gilki", kgVariants(50, 64), ["gilki", "nenua", "torai", "turai", "tori"], "Local farms", "3–4 days", "Soft, mild sponge gourd for light sabzi and dal."),
  veg("gwarphali", "Cluster Beans (Gwar Phali)", "Gwar Phali", kgVariants(70, 90), ["gawar", "guar", "gwar"], "Rajasthan", "3–4 days", "Tender gwar phali for Rajasthani gwar ki sabzi."),
  veg("rawpapaya", "Raw Papaya (Kacha Papita)", "Kacha Papita", [pcs("1 pc (800 g–1.2 kg)", 40, 52)], ["papita", "kachcha papita", "green papaya"], "Andhra Pradesh", "5–7 days", "Firm raw papaya for sabzi, salads and papaya chutney."),
  veg("jackfruit", "Jack Fruit (Kathal)", "Kathal", [pcs("500 g (cut)", 45, 60), pcs("1 kg (cut)", 85, 115)], ["kathal", "jackfruit", "kathhal"], "Kerala", "2–3 days", "Raw jackfruit, cut and cleaned – ideal for kathal masala and biryani."),
  veg("gollauki", "Round Bottle Gourd (Gol Lauki)", "Gol Lauki", [pcs("1 pc (700 g–1 kg)", 38, 48)], ["gol lauki", "lauki", "round lauki"], "Local farms", "4–5 days", "Round, tender lauki for kofta, raita and sabzi."),
  veg("lotusstem", "Lotus Stem Cut (Kamal Kakdi)", "Kamal Kakdi", [pcs("250 g", 60, 78), pcs("500 g", 115, 155)], ["kamal kakri", "bhen", "nadru", "lotus root"], "Kashmir", "4–5 days", "Cleaned lotus stem pieces for nadru yakhni, kofta and chips."),
  veg("rawbanana", "Raw Banana (Kacha Kela)", "Kacha Kela", [pcs("4 pcs", 30, 40), pcs("8 pcs", 56, 80)], ["kela", "kachcha kela", "plantain"], "Kerala", "4–6 days", "Firm green bananas for kele ki sabzi, chips and kofta."),
  veg("ashgourd", "Ash Gourd (Safed Petha)", "Safed Petha", [pcs("1 kg (cut)", 40, 52)], ["petha", "kumhra", "winter melon", "white pumpkin"], "Local farms", "7–10 days", "Mild ash gourd for petha sweet, sambar and healthy juices."),
];

// Fruits the client asked to list inside the Fresh Vegetables category.
const vfruit = (
  id: string, name: string, localName: string, variants: Variant[], keywords: string[],
  origin: string, shelfLife: string, description: string, rating = 4.5,
): Product => veg(id, name, localName, variants, [...keywords, "fruit", "phal"], origin, shelfLife, description, rating);

const vegSectionFruits: Product[] = [
  vfruit("avocado", "Avocado", "Makhanphal", [pcs("1 pc (180–220 g)", 99, 129), pcs("2 pcs", 189, 258)], ["butter fruit", "makhan phal"], "Coorg, Karnataka", "3–5 days", "Creamy, buttery avocado for toast, salads and guacamole."),
  vfruit("dragonfruit", "Dragon Fruit", "Kamalam", [pcs("1 pc (300–400 g)", 79, 99), pcs("2 pcs", 150, 198)], ["kamalam", "pitaya"], "Gujarat", "5–7 days", "Vibrant pink dragon fruit with mildly sweet, seed-speckled flesh."),
  vfruit("kiwi", "Kiwi", "Kiwi", [pcs("3 pcs", 75, 95), pcs("6 pcs", 145, 190)], ["kiwifruit", "chinese gooseberry"], "Imported", "7–10 days", "Tangy-sweet green kiwis packed with vitamin C."),
  vfruit("tendercoconut", "Tender Coconut (Nariyal)", "Nariyal", [pcs("1 coconut", 55, 70), pcs("3 coconuts", 159, 210)], ["nariyal pani", "coconut water", "daab", "hara nariyal", "coconut"], "Kerala", "5–7 days", "Fresh green tender coconut full of sweet, refreshing coconut water."),
  vfruit("browncoconut", "Brown Coconut (Nariyal)", "Nariyal", [pcs("1 coconut", 40, 50), pcs("2 coconuts", 78, 100)], ["sukha nariyal", "coconut", "mature coconut", "gola"], "Kerala", "15–20 days", "Mature brown coconut for chutneys, curries and puja."),
  vfruit("guava", "Guava (Amrud)", "Amrud", kgVariants(80, 100), ["amrood", "peru", "jamfal"], "Allahabad, Uttar Pradesh", "4–5 days", "Crunchy, fragrant guavas – enjoy with a pinch of chaat masala."),
  vfruit("redgrapes", "Red Grapes", "Lal Angoor", [pcs("500 g", 79, 99), pcs("1 kg", 150, 198)], ["angoor", "grapes", "red globe"], "Nashik, Maharashtra", "4–6 days", "Juicy, crisp red grapes – sweet and snackable."),
  vfruit("singhara", "Water Chestnut (Singhara)", "Singhara", kgVariants(70, 90), ["singada", "paniphal", "water chestnut"], "Bihar", "5–7 days", "Fresh water chestnuts with crisp, sweet white kernels – a fasting favourite."),
  vfruit("dailyapple", "Daily Apple", "Seb", kgVariants(140, 175), ["seb", "saib", "apple"], "Himachal Pradesh", "10–14 days", "Everyday crunchy red apples at a great value."),
  vfruit("chikoo", "Sapota (Chikoo)", "Chikoo", kgVariants(80, 100), ["chiku", "sapota", "sapodilla"], "Dahanu, Maharashtra", "3–4 days", "Malty-sweet, soft chikoo – great for shakes and snacking."),
  vfruit("persimmon", "Persimmon (Ramphal)", "Ramphal", [pcs("2 pcs", 90, 115), pcs("4 pcs", 175, 230)], ["ramphal", "japani phal", "persimon", "perimmon"], "Himachal Pradesh", "4–6 days", "Honey-sweet orange persimmons with a soft, jammy bite."),
  vfruit("watermelon", "Watermelon (Tarbooz)", "Tarbooz", [pcs("1 pc (2–3 kg)", 69, 90)], ["tarbuj", "tarbooj", "kalingad"], "Andhra Pradesh", "7–10 days", "Juicy, red and sweet watermelon – the ultimate summer cooler."),
  vfruit("pear", "Pear (Nashpati)", "Nashpati", kgVariants(160, 200), ["nashpati", "naspati", "babugosha"], "Himachal Pradesh", "5–7 days", "Sweet, juicy pears with a soft, buttery texture."),
  vfruit("pineapple", "Pineapple (Ananas)", "Ananas", [pcs("1 pc (1–1.3 kg)", 79, 99)], ["ananas", "annanas"], "Kerala", "4–5 days", "Golden, tangy-sweet pineapple for juices, salads and desserts."),
  vfruit("mosambi", "Sweet Lime (Mosambi)", "Mosambi", kgVariants(70, 90), ["mausambi", "musambi", "sweet lime"], "Andhra Pradesh", "7–10 days", "Juicy sweet lime – perfect for fresh mosambi juice."),
  vfruit("plum", "Plum (Aloo Bukhara)", "Aloo Bukhara", [pcs("250 g", 60, 78), pcs("500 g", 115, 155)], ["aloo bukhara", "alubukhara", "plum"], "Himachal Pradesh", "4–5 days", "Juicy, tangy-sweet red plums."),
  vfruit("papayafruit", "Papaya (Papita)", "Papita", [pcs("1 pc (1–1.5 kg)", 55, 70)], ["papita", "papaya"], "Andhra Pradesh", "3–4 days", "Ripe, sweet papaya with soft orange flesh – great for breakfast."),
  vfruit("sitaphal", "Custard Apple (Sitaphal)", "Sitaphal", [pcs("500 g", 79, 99), pcs("1 kg", 150, 198)], ["sitafal", "sharifa", "shareefa", "custard apple"], "Maharashtra", "2–3 days", "Creamy, sweet custard apple – a seasonal delight."),
  vfruit("kharbooja", "Muskmelon (Kharbooja)", "Kharbooja", [pcs("1 pc (1–1.5 kg)", 59, 75)], ["kharbuja", "kharbooj", "cantaloupe", "musk melon"], "Uttar Pradesh", "4–5 days", "Fragrant, sweet muskmelon with juicy orange flesh."),
  vfruit("rawmango", "Raw Mango (Kacha Aam)", "Kacha Aam", kgVariants(80, 100), ["kairi", "keri", "kaccha aam", "aam", "mango"], "Andhra Pradesh", "5–7 days", "Sour raw mangoes for aam panna, pickle and chutney."),
  vfruit("cherry", "Jumbo Cherry", "Cherry", [pcs("250 g", 199, 249), pcs("500 g", 389, 498)], ["cherries", "cheri"], "Kashmir", "3–4 days", "Big, glossy, juicy cherries – sweet and seasonal."),
  vfruit("sunmelon", "Sun Melon", "Sun Melon", [pcs("1 pc (1–1.5 kg)", 89, 110)], ["melon", "yellow melon", "kharbooja"], "Karnataka", "5–7 days", "Sunny yellow melon with crisp, mildly sweet flesh."),
  vfruit("litchi", "Lychee (Litchi)", "Litchi", [pcs("500 g", 120, 150), pcs("1 kg", 230, 300)], ["lichi", "lychee", "leechi"], "Muzaffarpur, Bihar", "2–3 days", "Juicy, floral Shahi litchis from Muzaffarpur."),
  vfruit("anjeer", "Fig (Anjeer)", "Anjeer", [pcs("250 g", 120, 150)], ["anjir", "fig"], "Pune, Maharashtra", "2–3 days", "Fresh, honey-sweet figs with jammy pink centres."),
  vfruit("strawberry", "Strawberry", "Strawberry", [pcs("1 box (200 g)", 99, 125), pcs("2 boxes", 189, 250)], ["strawberries", "stroberi"], "Mahabaleshwar, Maharashtra", "2–3 days", "Sweet, juicy Mahabaleshwar strawberries."),
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
  ...newVegetables,
  ...vegSectionFruits,
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

const normalize = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

// Bilingual search: matches English name, Hindi/local name or keywords – full,
// partial and case-insensitive. Every word typed must appear somewhere.
export const searchProducts = (q: string) => {
  const term = normalize(q);
  if (!term) return [];
  const words = term.split(" ");
  const scored: { p: Product; score: number }[] = [];
  for (const p of products) {
    const fields = [p.name, p.localName, ...(p.keywords ?? [])].map(normalize);
    const hay = [...fields, p.category].join(" | ");
    if (!words.every((w) => hay.includes(w))) continue;
    let score = 3;
    if (fields.some((f) => f === term)) score = 0;
    else if (fields.some((f) => f.startsWith(term) || f.includes(" " + term))) score = 1;
    else if (fields.some((f) => f.includes(term))) score = 2;
    scored.push({ p, score });
  }
  return scored.sort((a, b) => a.score - b.score).map((s) => s.p);
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
