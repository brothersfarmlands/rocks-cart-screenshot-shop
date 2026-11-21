import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/order-success/$id")({
  head: () => pageHead("Order placed", "Your RocksCart order has been placed successfully."),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id } = Route.useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  return (
    <main className="flex min-h-dvh flex-1 flex-col">
      <section className="relative flex flex-col items-center overflow-hidden bg-gradient-brand px-6 pb-14 pt-16 text-center text-primary-foreground">
        <span className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-leaf/25" />
        <span className="absolute -right-8 bottom-4 h-24 w-24 rounded-full bg-sun/30" />
        <span className="animate-pop grid h-24 w-24 place-items-center rounded-full bg-sun text-sun-foreground shadow-float">
          <Check className="h-12 w-12" strokeWidth={3} />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold">Order placed!</h1>
        <p className="mt-1 text-sm opacity-85">Your fresh groceries are being packed with care.</p>
        <p className="mt-4 rounded-full bg-primary-foreground/15 px-4 py-1.5 font-display text-sm font-bold tracking-wider">Order #{id}</p>
      </section>

      <div className="-mt-6 flex flex-1 flex-col gap-4 rounded-t-[2rem] bg-background px-4 pb-8 pt-6">
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
          <Clock className="h-8 w-8 shrink-0 text-leaf" />
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Arriving in</p>
            <p className="font-display text-xl font-extrabold text-primary">12–15 minutes</p>
          </div>
        </div>
        {order && (
          <div className="space-y-2 rounded-2xl bg-card p-4 text-sm shadow-card">
            <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf" /> {order.address}</p>
            <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span className="font-bold">{order.items.reduce((s, i) => s + i.qty, 0)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span className="font-bold">{order.payment}</span></div>
            <div className="flex justify-between border-t border-dashed border-border pt-2"><span className="font-bold text-primary">Total paid</span><span className="font-display font-extrabold text-primary">{formatINR(order.total)}</span></div>
          </div>
        )}
        <div className="mt-auto space-y-3">
          <Button variant="brand" size="xl" className="w-full" asChild>
            <Link to="/track/$id" params={{ id }}>Track Order</Link>
          </Button>
          <Button variant="outlineBrand" size="xl" className="w-full" asChild>
            <Link to="/home">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
