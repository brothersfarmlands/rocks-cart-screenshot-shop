import { formatINR } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PriceDisplay({
  price,
  mrp,
  size = "sm",
  showOff = false,
  className,
}: {
  price: number;
  mrp?: number;
  size?: "sm" | "lg";
  showOff?: boolean;
  className?: string;
}) {
  const off = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-1.5", className)}>
      <span className={cn("font-display font-extrabold text-foreground", size === "lg" ? "text-2xl" : "text-sm")}>
        {formatINR(price)}
      </span>
      {off > 0 && (
        <span className={cn("text-muted-foreground line-through", size === "lg" ? "text-base" : "text-[11px]")}>
          {formatINR(mrp!)}
        </span>
      )}
      {showOff && off > 0 && (
        <span className={cn("font-extrabold text-leaf", size === "lg" ? "text-sm" : "text-[11px]")}>{off}% OFF</span>
      )}
    </div>
  );
}
