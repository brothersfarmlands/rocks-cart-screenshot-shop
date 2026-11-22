import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Banknote, CreditCard, Plus, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AddressCard } from "@/components/rc/AddressCard";
import { AddressFormSheet } from "@/components/rc/AddressFormSheet";
import { BillSummary } from "@/components/rc/BillSummary";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { formatINR } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/checkout")({
  head: () => pageHead("Checkout", "Choose a delivery address and payment method to place your RocksCart order."),
  component: Checkout,
});

function Checkout() {
  const navigate = useNavigate();
  const { cartLines, bill, couponCode, addresses, selectedAddress, selectAddress, payments, placeOrder } = useStore();
  const [addOpen, setAddOpen] = useState(false);
  const [placing, setPlacing] = useState(false);

  const options = [
    ...payments.map((p) => ({ id: p.id, label: p.label, detail: p.detail, icon: p.type === "upi" ? Smartphone : CreditCard })),
    { id: "newupi", label: "Pay via any UPI app", detail: "PhonePe, Paytm, BHIM & more", icon: Wallet },
    { id: "cod", label: "Cash on Delivery", detail: "Pay with cash or UPI at your door", icon: Banknote },
  ];
  const [payment, setPayment] = useState(options[0]?.id ?? "cod");

  useEffect(() => {
    if (cartLines.length === 0 && !placing) navigate({ to: "/cart", replace: true });
  }, [cartLines.length, placing, navigate]);

  const place = () => {
    if (!selectedAddress) return setAddOpen(true);
    setPlacing(true);
    const opt = options.find((o) => o.id === payment)!;
    const label = opt.id === "cod" ? "Cash on Delivery" : `${opt.label}${opt.detail && opt.id !== "newupi" ? ` · ${opt.detail}` : ""}`;
    window.setTimeout(() => {
      const id = placeOrder(label);
      navigate({ to: "/order-success/$id", params: { id }, replace: true });
    }, 900);
  };

  return (
    <Page nav={false} cartBar={false} className="pb-32">
      <TopBar title="Checkout" subtitle={`${bill.itemCount} items · ${formatINR(bill.total)}`} fallback="/cart" />
      <div className="space-y-6 px-4">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-primary">Delivery address</h2>
            <button type="button" onClick={() => setAddOpen(true)} className="flex items-center gap-1 text-sm font-bold text-leaf">
              <Plus className="h-4 w-4" /> Add new
            </button>
          </div>
          <div role="radiogroup" aria-label="Delivery address" className="space-y-3">
            {addresses.map((a) => (
              <AddressCard key={a.id} address={a} selected={selectedAddress?.id === a.id} onSelect={() => selectAddress(a.id)} />
            ))}
            {addresses.length === 0 && (
              <button type="button" onClick={() => setAddOpen(true)} className="w-full rounded-2xl border-2 border-dashed border-leaf/50 p-6 text-sm font-bold text-leaf">
                + Add a delivery address
              </button>
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-card p-4 shadow-card">
          <h2 className="mb-3 text-base font-extrabold text-primary">Order summary</h2>
          <ul className="space-y-3">
            {cartLines.map((l) => (
              <li key={`${l.productId}-${l.variantIndex}`} className="flex items-center gap-3">
                <img src={l.product.image} alt="" className="h-12 w-12 shrink-0 rounded-lg bg-cream object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{l.product.name}</p>
                  <p className="text-xs text-muted-foreground">{l.variant.label} × {l.qty}</p>
                </div>
                <span className="text-sm font-bold">{formatINR(l.variant.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <Link to="/cart" className="mt-3 block text-xs font-bold text-leaf">Edit cart</Link>
        </section>

        <section>
          <h2 className="mb-3 text-base font-extrabold text-primary">Payment method</h2>
          <div role="radiogroup" aria-label="Payment method" className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-card">
            {options.map((o) => {
              const Icon = o.icon;
              const on = payment === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setPayment(o.id)}
                  className={cn("flex w-full items-center gap-3 p-4 text-left transition", on && "bg-leaf-soft/60")}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{o.label}</span>
                    <span className="block truncate text-xs text-muted-foreground">{o.detail}</span>
                  </span>
                  <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full border-2", on ? "border-leaf" : "border-input")}>
                    {on && <span className="h-2.5 w-2.5 rounded-full bg-leaf" />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <BillSummary bill={bill} couponCode={couponCode} />
        <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-leaf" /> Payments are 100% secure & encrypted
        </p>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur">
        <Button variant="brand" size="xl" className="w-full justify-between" onClick={place} disabled={placing}>
          <span className="text-left leading-tight">
            <span className="block text-base">{formatINR(bill.total)}</span>
            <span className="block text-[10px] font-semibold opacity-75">PAYABLE</span>
          </span>
          <span>{placing ? "Placing order…" : "Place Order"}</span>
        </Button>
      </div>

      <AddressFormSheet open={addOpen} onOpenChange={setAddOpen} />
    </Page>
  );
}
