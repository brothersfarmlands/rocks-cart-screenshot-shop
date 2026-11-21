import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Lock, Plus, ShieldCheck, Smartphone, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/payments")({
  head: () => pageHead("Payment Settings", "Manage saved UPI IDs and cards for faster RocksCart checkout."),
  component: Payments,
});

const inputCls = "h-11 w-full rounded-xl border-2 border-input bg-surface px-3 text-sm font-semibold outline-none focus:border-leaf";

function Payments() {
  const { payments, addPayment, removePayment, setDefaultPayment } = useStore();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"upi" | "card">("upi");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "" });

  const save = () => {
    if (type === "upi") {
      if (!/^[\w.-]{2,}@[a-z]{2,}$/i.test(upi)) return toast.error("Enter a valid UPI ID, e.g. name@okaxis");
      addPayment({ type: "upi", label: "UPI ID", detail: upi });
    } else {
      const digits = card.number.replace(/\D/g, "");
      if (digits.length < 16 || !card.name.trim() || !/^\d{2}\/\d{2}$/.test(card.expiry)) return toast.error("Please complete all card details");
      addPayment({ type: "card", label: `${card.name.trim()}'s Card`, detail: `•••• ${digits.slice(-4)} · Exp ${card.expiry}` });
    }
    toast.success("Payment method saved");
    setOpen(false);
    setUpi("");
    setCard({ number: "", name: "", expiry: "" });
  };

  const section = (t: "upi" | "card", title: string) => {
    const list = payments.filter((p) => p.type === t);
    return (
      <section>
        <h2 className="mb-2 px-1 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">{title}</h2>
        <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-card">
          {list.length === 0 && <p className="p-4 text-sm text-muted-foreground">No {title.toLowerCase()} saved yet.</p>}
          {list.map((p) => {
            const Icon = p.type === "upi" ? Smartphone : CreditCard;
            return (
              <div key={p.id} className="flex items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 truncate text-sm font-bold">
                    {p.label}
                    {p.isDefault && <span className="rounded-full bg-leaf-soft px-2 py-0.5 text-[10px] font-extrabold uppercase text-primary">Default</span>}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{p.detail}</p>
                  {!p.isDefault && (
                    <button type="button" onClick={() => setDefaultPayment(p.id)} className="mt-1 text-xs font-bold text-leaf">Set as default</button>
                  )}
                </div>
                <button type="button" aria-label={`Remove ${p.label}`} onClick={() => { removePayment(p.id); toast("Payment method removed"); }} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <Page nav={false} cartBar={false} className="pb-28">
      <TopBar title="Payment Settings" fallback="/profile" />
      <div className="space-y-5 px-4">
        {section("upi", "UPI")}
        {section("card", "Cards")}
        <div className="flex gap-3 rounded-2xl bg-secondary p-4">
          <ShieldCheck className="h-6 w-6 shrink-0 text-leaf" />
          <div>
            <p className="text-sm font-extrabold text-primary">Your payment info is secure</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              Card details are tokenised as per RBI guidelines. We never store your CVV, and every transaction is protected with 256-bit encryption.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur">
        <Button variant="brand" size="xl" className="w-full" onClick={() => setOpen(true)}>
          <Plus className="h-5 w-5" /> Add Payment Method
        </Button>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="mx-auto max-w-[430px] bg-background">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-display text-primary">Add payment method</DrawerTitle>
            <DrawerDescription className="flex items-center gap-1"><Lock className="h-3 w-3" /> Secured & encrypted</DrawerDescription>
          </DrawerHeader>
          <form className="space-y-3 px-4 pb-6" onSubmit={(e) => { e.preventDefault(); save(); }}>
            <div className="grid grid-cols-2 rounded-2xl bg-muted p-1">
              {(["upi", "card"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setType(t)} className={cn("rounded-xl py-2 text-sm font-bold", type === t ? "bg-surface text-primary shadow-card" : "text-muted-foreground")}>
                  {t === "upi" ? "UPI ID" : "Debit / Credit card"}
                </button>
              ))}
            </div>
            {type === "upi" ? (
              <input value={upi} onChange={(e) => setUpi(e.target.value.trim())} placeholder="yourname@okaxis" aria-label="UPI ID" className={inputCls} />
            ) : (
              <>
                <input
                  value={card.number}
                  inputMode="numeric"
                  onChange={(e) => setCard({ ...card, number: e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ") })}
                  placeholder="Card number"
                  aria-label="Card number"
                  className={inputCls}
                />
                <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="Name on card" aria-label="Name on card" className={inputCls} />
                <input
                  value={card.expiry}
                  inputMode="numeric"
                  onChange={(e) => {
                    const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                    setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                  }}
                  placeholder="Expiry (MM/YY)"
                  aria-label="Expiry date"
                  className={inputCls}
                />
              </>
            )}
            <Button type="submit" variant="brand" size="xl" className="w-full">Save</Button>
          </form>
        </DrawerContent>
      </Drawer>
    </Page>
  );
}
