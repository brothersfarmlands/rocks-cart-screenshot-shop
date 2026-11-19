import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  size = "sm",
  max = 20,
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "lg";
  max?: number;
  className?: string;
}) {
  const btn = size === "lg" ? "h-12 w-12" : "h-8 w-8";
  return (
    <div
      className={cn(
        "inline-flex items-center justify-between rounded-lg bg-leaf font-extrabold text-leaf-foreground shadow-sm",
        size === "lg" ? "h-12 rounded-2xl text-base" : "h-8 text-sm",
        className,
      )}
    >
      <button type="button" aria-label="Decrease quantity" className={cn("grid place-items-center", btn)} onClick={() => onChange(value - 1)}>
        <Minus className="h-4 w-4" strokeWidth={3} />
      </button>
      <span className="min-w-6 text-center tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        className={cn("grid place-items-center disabled:opacity-50", btn)}
        onClick={() => onChange(value + 1)}
      >
        <Plus className="h-4 w-4" strokeWidth={3} />
      </button>
    </div>
  );
}
