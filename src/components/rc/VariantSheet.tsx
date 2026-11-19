import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import type { Product } from "@/lib/data";
import { discountPercent } from "@/lib/data";
import { AddToCartButton } from "./AddToCartButton";
import { PriceDisplay } from "./PriceDisplay";

export function VariantSheet({ product, open, onOpenChange }: { product: Product; open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-w-[430px] bg-background">
        <DrawerHeader className="flex items-center gap-3 text-left">
          <img src={product.image} alt="" className="h-14 w-14 shrink-0 rounded-xl bg-cream object-cover" />
          <div className="min-w-0">
            <DrawerTitle className="truncate font-display text-base text-primary">{product.name}</DrawerTitle>
            <DrawerDescription>Choose a pack size</DrawerDescription>
          </div>
        </DrawerHeader>
        <ul className="space-y-2 px-4 pb-6">
          {product.variants.map((v, i) => (
            <li key={v.label} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{v.label}</p>
                <PriceDisplay price={v.price} mrp={v.mrp} showOff />
              </div>
              {discountPercent(v) > 0 && <span className="sr-only">{discountPercent(v)}% off</span>}
              <AddToCartButton productId={product.id} variantIndex={i} />
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}
