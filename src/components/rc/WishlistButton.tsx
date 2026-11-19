import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function WishlistButton({ productId, className, size = "sm" }: { productId: string; className?: string; size?: "sm" | "lg" }) {
  const { isWishlisted, toggleWishlist } = useStore();
  const on = isWishlisted(productId);
  return (
    <button
      type="button"
      aria-label={on ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={on}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
        toast(on ? "Removed from wishlist" : "Saved to wishlist", { duration: 1200 });
      }}
      className={cn(
        "grid place-items-center rounded-full bg-surface/90 shadow-card backdrop-blur transition active:scale-90",
        size === "lg" ? "h-11 w-11" : "h-8 w-8",
        className,
      )}
    >
      <Heart className={cn(size === "lg" ? "h-5 w-5" : "h-4 w-4", on ? "fill-destructive text-destructive" : "text-muted-foreground")} />
    </button>
  );
}
