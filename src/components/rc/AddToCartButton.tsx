import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/data";
import { QuantityStepper } from "./QuantityStepper";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  productId,
  variantIndex,
  className,
}: {
  productId: string;
  variantIndex: number;
  className?: string;
}) {
  const { getQty, setQty } = useStore();
  const qty = getQty(productId, variantIndex);
  const product = getProduct(productId);
  if (product && !product.inStock) {
    return (
      <Button variant="soft" size="pill" disabled className={cn("w-[76px] text-[11px]", className)}>
        Sold out
      </Button>
    );
  }
  if (qty === 0) {
    return (
      <Button
        variant="add"
        size="pill"
        className={cn("w-[76px]", className)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setQty(productId, variantIndex, 1);
          toast.success(`${product?.name ?? "Item"} added to cart`, { duration: 1400 });
        }}
      >
        Add
      </Button>
    );
  }
  return (
    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className={className}>
      <QuantityStepper value={qty} onChange={(v) => setQty(productId, variantIndex, v)} className="w-[76px]" />
    </div>
  );
}
