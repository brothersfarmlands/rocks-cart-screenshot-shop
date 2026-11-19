// Prototype pricing rules for the RocksCart cart and checkout.
export const DELIVERY_FEE = 25;
export const FREE_DELIVERY_MIN = 199;

export interface Coupon {
  code: string;
  title: string;
  description: string;
  minOrder: number;
  kind: "flat" | "percent";
  value: number;
  maxDiscount?: number;
}

export const coupons: Coupon[] = [
  { code: "FRESH50", title: "₹50 off", description: "On orders above ₹299", minOrder: 299, kind: "flat", value: 50 },
  { code: "ROCKS10", title: "10% off up to ₹75", description: "On orders above ₹149", minOrder: 149, kind: "percent", value: 10, maxDiscount: 75 },
  { code: "FIRST100", title: "₹100 off first order", description: "On orders above ₹499", minOrder: 499, kind: "flat", value: 100 },
];

export const findCoupon = (code: string) => coupons.find((c) => c.code === code.trim().toUpperCase());

export const deliveryFee = (subtotal: number) => (subtotal === 0 || subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE);

export const couponDiscount = (coupon: Coupon | undefined, subtotal: number) => {
  if (!coupon || subtotal < coupon.minOrder) return 0;
  if (coupon.kind === "flat") return Math.min(coupon.value, subtotal);
  const pct = Math.round((subtotal * coupon.value) / 100);
  return coupon.maxDiscount ? Math.min(pct, coupon.maxDiscount) : pct;
};

export interface BillLine {
  price: number;
  mrp: number;
  qty: number;
}

export const computeBill = (lines: BillLine[], coupon?: Coupon) => {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const mrpTotal = lines.reduce((s, l) => s + l.mrp * l.qty, 0);
  const delivery = deliveryFee(subtotal);
  const discount = couponDiscount(coupon, subtotal);
  return {
    subtotal,
    mrpTotal,
    productSavings: mrpTotal - subtotal,
    delivery,
    discount,
    total: Math.max(0, subtotal + delivery - discount),
    itemCount: lines.reduce((s, l) => s + l.qty, 0),
  };
};

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
