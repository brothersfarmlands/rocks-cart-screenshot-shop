import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Bike, Check, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/rc/OrderStatusBadge";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { getProduct } from "@/lib/data";
import { formatINR } from "@/lib/pricing";
import { useStore, type OrderStatus } from "@/lib/store";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/track/$id")({
  head: () => pageHead("Track Order", "Follow your RocksCart delivery in real time."),
  component: Track,
});

const steps: { status: OrderStatus; label: string; text: string }[] = [
  { status: "placed", label: "Order placed", text: "We've received your order" },
  { status: "packed", label: "Packed", text: "Fresh items picked & packed" },
  { status: "out_for_delivery", label: "Out for delivery", text: "Ravi is on the way" },
  { status: "delivered", label: "Delivered", text: "Enjoy your fresh groceries!" },
];

function Track() {
  const { id } = Route.useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <Page nav={false} cartBar={false}>
        <TopBar title="Track Order" fallback="/orders" />
        <p className="px-4 py-16 text-center text-sm text-muted-foreground">We couldn't find this order. <Link to="/orders" className="font-bold text-leaf">See all orders</Link></p>
      </Page>
    );
  }
  const current = steps.findIndex((s) => s.status === order.status);

  return (
    <Page nav={false} cartBar={false}>
      <TopBar title={`Order #${order.id}`} subtitle={format(new Date(order.date), "d MMM yyyy, h:mm a")} fallback="/orders" />
      <div className="space-y-4 px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-5 text-primary-foreground">
          <span className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-leaf/25" />
          <OrderStatusBadge status={order.status} className="relative" />
          <p className="relative mt-3 font-display text-2xl font-extrabold">
            {order.status === "delivered" ? "Delivered" : order.status === "out_for_delivery" ? "Arriving in 8 mins" : "Arriving in 14 mins"}
          </p>
          <p className="relative mt-1 flex items-center gap-1 text-xs opacity-85"><MapPin className="h-3.5 w-3.5" /> {order.address}</p>
        </div>

        {order.status !== "delivered" && order.status !== "cancelled" && (
          <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sun-soft text-sun-foreground"><Bike className="h-6 w-6" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">Ravi Kumar</p>
              <p className="text-xs text-muted-foreground">Your delivery partner · ⭐ 4.9</p>
            </div>
            <Button variant="soft" size="icon" className="rounded-full" aria-label="Call delivery partner" onClick={() => toast("Calling Ravi… (demo)")}>
              <Phone />
            </Button>
          </div>
        )}

        <ol className="rounded-2xl bg-card p-5 shadow-card">
          {steps.map((s, i) => {
            const done = i <= current;
            return (
              <li key={s.status} className="relative flex gap-4 pb-6 last:pb-0">
                {i < steps.length - 1 && <span className={cn("absolute left-[13px] top-7 h-[calc(100%-1.5rem)] w-0.5", i < current ? "bg-leaf" : "bg-border")} />}
                <span className={cn("relative grid h-7 w-7 shrink-0 place-items-center rounded-full", done ? "bg-leaf text-leaf-foreground" : "border-2 border-border bg-surface")}>
                  {done && <Check className="h-4 w-4" strokeWidth={3} />}
                </span>
                <div>
                  <p className={cn("text-sm font-bold", done ? "text-primary" : "text-muted-foreground")}>{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <section className="rounded-2xl bg-card p-4 shadow-card">
          <h2 className="mb-3 text-sm font-extrabold text-primary">Items in this order</h2>
          <ul className="space-y-3">
            {order.items.map((it) => {
              const p = getProduct(it.productId);
              return (
                <li key={`${it.productId}-${it.variantIndex}`} className="flex items-center gap-3">
                  <img src={p?.image} alt="" className="h-11 w-11 rounded-lg bg-cream object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{p?.name}</p>
                    <p className="text-xs text-muted-foreground">{p?.variants[it.variantIndex]?.label} × {it.qty}</p>
                  </div>
                  <span className="text-sm font-bold">{formatINR(it.price * it.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 flex justify-between border-t border-dashed border-border pt-3 text-sm">
            <span className="font-bold text-primary">Total · {order.payment}</span>
            <span className="font-display font-extrabold text-primary">{formatINR(order.total)}</span>
          </div>
        </section>
      </div>
    </Page>
  );
}
