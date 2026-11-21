import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/rc/AddToCartButton";
import { EmptyState } from "@/components/rc/EmptyState";
import { Page } from "@/components/rc/Page";
import { PriceDisplay } from "@/components/rc/PriceDisplay";
import { defaultVariantIndex } from "@/components/rc/ProductCard";
import { TopBar } from "@/components/rc/TopBar";
import { getProduct } from "@/lib/data";
import { useStore } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/wishlist")({
  head: () => pageHead("My Wishlist", "Your saved vegetables, fruits and pulses on RocksCart."),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, toggleWishlist } = useStore();
  const items = wishlist.map(getProduct).filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <Page>
      <TopBar title="My Wishlist" subtitle={`${items.length} saved item${items.length === 1 ? "" : "s"}`} back={false} />
      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          text="Tap the heart on any product to save it for later."
          action={<Button variant="brand" size="xl" asChild><Link to="/home">Explore products</Link></Button>}
        />
      ) : (
        <ul className="space-y-3 px-4">
          {items.map((p) => {
            const vi = defaultVariantIndex(p);
            const v = p.variants[vi];
            return (
              <li key={p.id} className="flex gap-3 rounded-2xl bg-card p-3 shadow-card">
                <Link to="/product/$id" params={{ id: p.id }} className="shrink-0">
                  <img src={p.image} alt={p.name} className="h-24 w-24 rounded-xl bg-cream object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start gap-2">
                    <Link to="/product/$id" params={{ id: p.id }} className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-bold leading-tight">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{v.label}</p>
                    </Link>
                    <button
                      type="button"
                      aria-label={`Remove ${p.name} from wishlist`}
                      onClick={() => { toggleWishlist(p.id); toast("Removed from wishlist"); }}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-2">
                    <PriceDisplay price={v.price} mrp={v.mrp} showOff className="flex-col items-start gap-0" />
                    <AddToCartButton productId={p.id} variantIndex={vi} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Page>
  );
}
