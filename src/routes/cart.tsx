import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, ShoppingCart, TicketPercent, Trash2, Truck, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { BillSummary } from "@/components/rc/BillSummary";
import { EmptyState } from "@/components/rc/EmptyState";
import { Page } from "@/components/rc/Page";
import { PriceDisplay } from "@/components/rc/PriceDisplay";
import { ProductRail } from "@/components/rc/ProductRail";
import { QuantityStepper } from "@/components/rc/QuantityStepper";
import { SectionHeader } from "@/components/rc/SectionHeader";
import { TopBar } from "@/components/rc/TopBar";
import { productsByTag } from "@/lib/data";
import { couponDiscount, coupons, findCoupon, FREE_DELIVERY_MIN, formatINR } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cart")({
  head: () => pageHead("My Cart", "Review the fresh groceries in your RocksCart cart and proceed to checkout."),
  component: Cart,
});

function Cart() {
  const navigate = useNavigate();
  const { cartLines, bill, setQty, couponCode, coupon, applyCoupon, clearCart } = useStore();
  const [couponOpen, setCouponOpen] = useState(false);
  const [code, setCode] = useState("");

  const tryApply = (c: string) => {
    const found = findCoupon(c);
    if (!found) { toast.error("Invalid coupon code"); return; }
    if (bill.subtotal < found.minOrder) { toast.error(`Add ${formatINR(found.minOrder - bill.subtotal)} more to use ${found.code}`); return; }
    applyCoupon(found.code);
    setCouponOpen(false);
    setCode("");
    toast.success(`${found.code} applied! You saved ${formatINR(couponDiscount(found, bill.subtotal))}`);
  };

  if (cartLines.length === 0) {
    return (
      <Page nav={false} cartBar={false}>
        <TopBar title="My Cart" />
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          text="Fresh veggies, juicy fruits and wholesome dals are just a tap away."
          action={<Button variant="brand" size="xl" asChild><Link to="/home">Start shopping</Link></Button>}
        />
      </Page>
    );
  }

  const toFree = FREE_DELIVERY_MIN - bill.subtotal;

  return (
    <Page nav={false} cartBar={false} className="pb-32">
      <TopBar
        title="My Cart"
        subtitle={`${bill.itemCount} item${bill.itemCount > 1 ? "s" : ""}`}
        right={
          <button type="button" onClick={() => { clearCart(); toast("Cart cleared"); }} className="text-xs font-bold text-destructive">
            Clear
          </button>
        }
      />
      <div className="space-y-4 px-4">
        <div className="rounded-2xl bg-secondary px-4 py-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Truck className="h-5 w-5 shrink-0" />
            {toFree > 0 ? <span>Add <b>{formatINR(toFree)}</b> more for FREE delivery</span> : <span><b>Yay!</b> You've unlocked FREE delivery</span>}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
            <div className="h-full rounded-full bg-leaf transition-all" style={{ width: `${Math.min(100, (bill.subtotal / FREE_DELIVERY_MIN) * 100)}%` }} />
          </div>
        </div>

        <section className="divide-y divide-border rounded-2xl bg-card shadow-card">
          {cartLines.map((l) => (
            <div key={`${l.productId}-${l.variantIndex}`} className="flex gap-3 p-3">
              <Link to="/product/$id" params={{ id: l.productId }} className="shrink-0">
                <img src={l.product.image} alt={l.product.name} className="h-20 w-20 rounded-xl bg-cream object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-bold leading-tight">{l.product.name}</p>
                    <p className="text-xs text-muted-foreground">{l.variant.label}</p>
                  </div>
                  <button type="button" aria-label={`Remove ${l.product.name}`} onClick={() => setQty(l.productId, l.variantIndex, 0)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-end justify-between pt-2">
                  <div>
                    <PriceDisplay price={l.variant.price * l.qty} mrp={l.variant.mrp * l.qty} />
                    <p className="text-[11px] text-muted-foreground">{formatINR(l.variant.price)} each</p>
                  </div>
                  <QuantityStepper value={l.qty} onChange={(v) => setQty(l.productId, l.variantIndex, v)} className="w-[88px]" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {coupon && bill.discount === 0 && (
          <p className="rounded-xl bg-sun-soft px-3 py-2 text-xs font-semibold text-sun-foreground">
            {coupon.code} needs a minimum order of {formatINR(coupon.minOrder)}. Add more items to use it.
          </p>
        )}
        <button
          type="button"
          onClick={() => setCouponOpen(true)}
          className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-leaf/50 bg-card p-4 text-left shadow-card"
        >
          <TicketPercent className="h-6 w-6 shrink-0 text-leaf" />
          <span className="min-w-0 flex-1">
            {couponCode ? (
              <>
                <span className="block text-sm font-extrabold text-primary">{couponCode} applied</span>
                <span className="block text-xs text-leaf">You save {formatINR(bill.discount)}</span>
              </>
            ) : (
              <>
                <span className="block text-sm font-extrabold text-primary">Apply coupon</span>
                <span className="block text-xs text-muted-foreground">Save more with offers</span>
              </>
            )}
          </span>
          {couponCode ? (
            <span role="button" aria-label="Remove coupon" onClick={(e) => { e.stopPropagation(); applyCoupon(null); }} className="text-muted-foreground">
              <X className="h-5 w-5" />
            </span>
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </button>

        <BillSummary bill={bill} couponCode={couponCode} />
      </div>

      <section className="mt-6">
        <SectionHeader title="Don't forget these" />
        <ProductRail products={productsByTag("bestseller").filter((p) => !cartLines.some((l) => l.productId === p.id))} />
      </section>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur">
        <Button variant="brand" size="xl" className="w-full justify-between" onClick={() => navigate({ to: "/checkout" })}>
          <span className="text-left leading-tight">
            <span className="block text-base">{formatINR(bill.total)}</span>
            <span className="block text-[10px] font-semibold opacity-75">TOTAL</span>
          </span>
          <span className="flex items-center gap-1">Proceed to Checkout <ChevronRight className="h-5 w-5" /></span>
        </Button>
      </div>

      <Drawer open={couponOpen} onOpenChange={setCouponOpen}>
        <DrawerContent className="mx-auto max-w-[430px] bg-background">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-display text-primary">Apply coupon</DrawerTitle>
            <DrawerDescription>Cart value: {formatINR(bill.subtotal)}</DrawerDescription>
          </DrawerHeader>
          <div className="space-y-3 px-4 pb-6">
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); tryApply(code); }}>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon code"
                aria-label="Coupon code"
                className="h-12 min-w-0 flex-1 rounded-xl border-2 border-input bg-surface px-3 font-display font-bold tracking-widest outline-none placeholder:font-sans placeholder:font-normal placeholder:tracking-normal focus:border-leaf"
              />
              <Button type="submit" variant="leaf" className="h-12 rounded-xl px-5" disabled={!code}>Apply</Button>
            </form>
            {coupons.map((c) => {
              const eligible = bill.subtotal >= c.minOrder;
              return (
                <div key={c.code} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sun-soft text-sun-foreground">
                    <TicketPercent className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-extrabold tracking-wider">{c.code}</p>
                    <p className="text-xs text-muted-foreground">{c.title} · {c.description}</p>
                    {!eligible && <p className="text-[11px] font-semibold text-destructive">Add {formatINR(c.minOrder - bill.subtotal)} more</p>}
                  </div>
                  <Button variant="add" size="pill" disabled={!eligible} onClick={() => tryApply(c.code)}>Apply</Button>
                </div>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </Page>
  );
}
