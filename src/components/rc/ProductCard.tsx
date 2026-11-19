import { Link } from "@tanstack/react-router";
import { ChevronDown, Star } from "lucide-react";
import { useState } from "react";
import { discountPercent, type Product } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";
import { PriceDisplay } from "./PriceDisplay";
import { VariantSheet } from "./VariantSheet";
import { WishlistButton } from "./WishlistButton";

export const defaultVariantIndex = (p: Product) => (p.variants.length === 3 ? 1 : 0);

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const [sheet, setSheet] = useState(false);
  const vi = defaultVariantIndex(product);
  const v = product.variants[vi];
  const off = discountPercent(v);
  const multi = product.variants.length > 1;

  return (
    <>
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className={cn("group flex flex-col rounded-2xl bg-card p-2.5 shadow-card transition active:scale-[0.99]", className)}
      >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-cream">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={cn("h-full w-full object-cover transition duration-300 group-hover:scale-105", !product.inStock && "opacity-50 grayscale")}
          />
          {off > 0 && (
            <span className="absolute left-0 top-2 rounded-r-md bg-sun px-1.5 py-0.5 text-[10px] font-extrabold text-sun-foreground">
              {off}% OFF
            </span>
          )}
          <WishlistButton productId={product.id} className="absolute right-1.5 top-1.5" />
          {!product.inStock && (
            <span className="absolute inset-x-2 bottom-2 rounded-lg bg-foreground/80 py-1 text-center text-[11px] font-bold text-background">
              Out of stock
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
          <Star className="h-3 w-3 fill-sun text-sun" /> {product.rating}
          <span className="ml-auto rounded bg-leaf-soft px-1.5 py-0.5 text-[10px] font-bold text-primary">15 MINS</span>
        </div>
        <h3 className="mt-1 line-clamp-2 min-h-[2.4em] font-sans text-[13px] font-bold leading-tight text-foreground">{product.name}</h3>
        {multi ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSheet(true);
            }}
            className="mt-1 inline-flex w-fit items-center gap-0.5 rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground"
          >
            {v.label} <ChevronDown className="h-3 w-3" />
          </button>
        ) : (
          <p className="mt-1 text-[11px] font-semibold text-muted-foreground">{v.label}</p>
        )}
        <div className="mt-auto flex items-end justify-between gap-1 pt-2">
          <PriceDisplay price={v.price} mrp={v.mrp} className="flex-col items-start gap-0" />
          <AddToCartButton productId={product.id} variantIndex={vi} />
        </div>
      </Link>
      {multi && <VariantSheet product={product} open={sheet} onOpenChange={setSheet} />}
    </>
  );
}
