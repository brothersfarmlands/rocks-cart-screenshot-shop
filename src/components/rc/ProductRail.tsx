import type { Product } from "@/lib/data";
import { ProductCard } from "./ProductCard";

export function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 pb-2">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} className="w-[150px] shrink-0 snap-start" />
      ))}
    </div>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
