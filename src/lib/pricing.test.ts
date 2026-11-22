import { describe, expect, it } from "vitest";
import { computeBill, couponDiscount, deliveryFee, findCoupon } from "./pricing";

describe("RocksCart pricing", () => {
  it("charges ₹25 delivery below ₹199 and free delivery from ₹199", () => {
    expect(deliveryFee(198)).toBe(25);
    expect(deliveryFee(199)).toBe(0);
  });

  it("applies FRESH50 only on orders of ₹299 or more", () => {
    const c = findCoupon("fresh50");
    expect(couponDiscount(c, 298)).toBe(0);
    expect(couponDiscount(c, 299)).toBe(50);
  });

  it("caps ROCKS10 at ₹75", () => {
    expect(couponDiscount(findCoupon("ROCKS10"), 2000)).toBe(75);
  });

  it("totals subtotal + delivery − coupon", () => {
    const bill = computeBill([{ price: 160, mrp: 200, qty: 1 }], findCoupon("ROCKS10"));
    expect(bill.total).toBe(160 + 25 - 16);
    expect(bill.productSavings).toBe(40);
  });
});
