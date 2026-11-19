import { Link } from "@tanstack/react-router";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatINR } from "@/lib/pricing";

/** Floating "View cart" bar shown above the bottom navigation when the cart has items. */
export function CartBar({ withNav = true }: { withNav?: boolean }) {
  const { cartLines, bill } = useStore();
  if (bill.itemCount === 0) return null;
  return (
    <div
      className="fixed left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 px-3"
      style={{ bottom: withNav ? "calc(4.25rem + env(safe-area-inset-bottom))" : "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <Link
        to="/cart"
        className="animate-rise flex items-center gap-3 rounded-2xl bg-primary px-3 py-2.5 text-primary-foreground shadow-float"
      >
        <div className="flex -space-x-3">
          {cartLines.slice(0, 3).map((l) => (
            <img
              key={`${l.productId}-${l.variantIndex}`}
              src={l.product.image}
              alt=""
              className="h-9 w-9 rounded-full border-2 border-primary bg-cream object-cover"
            />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold">
            {bill.itemCount} {bill.itemCount === 1 ? "item" : "items"} · {formatINR(bill.subtotal)}
          </p>
          {bill.productSavings > 0 && <p className="text-[11px] text-primary-foreground/75">You save {formatINR(bill.productSavings)}</p>}
        </div>
        <span className="flex items-center gap-1 rounded-xl bg-sun px-3 py-2 text-sm font-extrabold text-sun-foreground">
          <ShoppingBag className="h-4 w-4" /> View cart <ChevronRight className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}
