import { CheckCircle2, Clock, PackageCheck, Truck, XCircle } from "lucide-react";
import type { OrderStatus } from "@/lib/store";
import { cn } from "@/lib/utils";

export const statusMeta: Record<OrderStatus, { label: string; icon: typeof Clock; cls: string }> = {
  placed: { label: "Order placed", icon: Clock, cls: "bg-sun-soft text-sun-foreground" },
  packed: { label: "Packed", icon: PackageCheck, cls: "bg-sun-soft text-sun-foreground" },
  out_for_delivery: { label: "Out for delivery", icon: Truck, cls: "bg-leaf-soft text-primary" },
  delivered: { label: "Delivered", icon: CheckCircle2, cls: "bg-secondary text-primary" },
  cancelled: { label: "Cancelled", icon: XCircle, cls: "bg-destructive/10 text-destructive" },
};

export const isActiveOrder = (s: OrderStatus) => s === "placed" || s === "packed" || s === "out_for_delivery";

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  const m = statusMeta[status];
  const Icon = m.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold", m.cls, className)}>
      <Icon className="h-3.5 w-3.5" /> {m.label}
    </span>
  );
}
