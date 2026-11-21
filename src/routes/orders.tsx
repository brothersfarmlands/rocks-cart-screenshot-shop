import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { Package, RotateCcw, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/rc/EmptyState";
import { isActiveOrder, OrderStatusBadge } from "@/components/rc/OrderStatusBadge";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { getProduct } from "@/lib/data";
import { formatINR } from "@/lib/pricing";
import { useStore, type Order } from "@/lib/store";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/orders")({
  head: () => pageHead("My Orders", "Track current RocksCart orders and reorder from your past purchases."),
  component: Orders,
});

function OrderCard({ order }: { order: Order }) {
  const { reorder } = useStore();
  const navigate = useNavigate();
  const active = isActiveOrder(order.status);
  const names = order.items.map((i) => getProduct(i.productId)?.name).filter(Boolean);
  return (
    <article className="rounded-2xl bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-sm font-extrabold text-primary">#{order.id}</p>
          <p className="text-xs text-muted-foreground">{format(new Date(order.date), "d MMM yyyy, h:mm a")}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex -space-x-2">
          {order.items.slice(0, 4).map((i) => (
            <img key={`${i.productId}-${i.variantIndex}`} src={getProduct(i.productId)?.image} alt="" className="h-11 w-11 rounded-xl border-2 border-card bg-cream object-cover" />
          ))}
        </div>
        <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{names.join(", ")}</p>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <div>
          <p className="text-[11px] text-muted-foreground">{order.items.reduce((s, i) => s + i.qty, 0)} items · Total</p>
          <p className="font-display text-base font-extrabold">{formatINR(order.total)}</p>
        </div>
        <div className="flex gap-2">
          {active && (
            <Button variant="brand" size="sm" className="rounded-xl" asChild>
              <Link to="/track/$id" params={{ id: order.id }}><Truck /> Track Order</Link>
            </Button>
          )}
          <Button
            variant={active ? "outlineBrand" : "leaf"}
            size="sm"
            className="rounded-xl"
            onClick={() => {
              reorder(order);
              toast.success("Items added to your cart", { action: { label: "View", onClick: () => navigate({ to: "/cart" }) } });
            }}
          >
            <RotateCcw /> Reorder
          </Button>
        </div>
      </div>
    </article>
  );
}

function Orders() {
  const { orders } = useStore();
  const [tab, setTab] = useState<"current" | "past">("current");
  const current = orders.filter((o) => isActiveOrder(o.status));
  const past = orders.filter((o) => !isActiveOrder(o.status));
  const list = tab === "current" ? current : past;

  return (
    <Page>
      <TopBar title="My Orders" back={false} />
      <div className="px-4">
        <div role="tablist" className="mb-4 grid grid-cols-2 rounded-2xl bg-muted p-1">
          {(["current", "past"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn("rounded-xl py-2 text-sm font-bold capitalize transition", tab === t ? "bg-surface text-primary shadow-card" : "text-muted-foreground")}
            >
              {t} ({t === "current" ? current.length : past.length})
            </button>
          ))}
        </div>
        {list.length ? (
          <div className="space-y-3">{list.map((o) => <OrderCard key={o.id} order={o} />)}</div>
        ) : (
          <EmptyState
            icon={Package}
            title={tab === "current" ? "No active orders" : "No past orders yet"}
            text="Your orders will show up here."
            action={<Button variant="brand" size="xl" asChild><Link to="/home">Shop now</Link></Button>}
          />
        )}
      </div>
    </Page>
  );
}
