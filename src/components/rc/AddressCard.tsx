import { Briefcase, Home, MapPin, Pencil, Trash2 } from "lucide-react";
import type { Address } from "@/lib/store";
import { cn } from "@/lib/utils";

const icons = { Home, Work: Briefcase, Other: MapPin };

export const formatAddress = (a: Address) =>
  [a.house, a.street, a.landmark, `${a.city}, ${a.state} – ${a.pincode}`].filter(Boolean).join(", ");

export function AddressCard({
  address,
  selected,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
}: {
  address: Address;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSetDefault?: () => void;
}) {
  const Icon = icons[address.label];
  return (
    <div
      role={onSelect ? "radio" : undefined}
      aria-checked={onSelect ? !!selected : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={(e) => onSelect && (e.key === "Enter" || e.key === " ") && onSelect()}
      className={cn(
        "rounded-2xl border-2 bg-card p-4 shadow-card transition",
        selected ? "border-leaf" : "border-transparent",
        onSelect && "cursor-pointer",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-sm font-extrabold text-primary">{address.label}</span>
            {address.isDefault && (
              <span className="rounded-full bg-leaf-soft px-2 py-0.5 text-[10px] font-extrabold uppercase text-primary">Default</span>
            )}
          </div>
          <p className="mt-1 text-sm font-semibold">{address.name} · {address.mobile}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{formatAddress(address)}</p>
        </div>
        {onSelect && (
          <span className={cn("mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2", selected ? "border-leaf" : "border-input")}>
            {selected && <span className="h-2.5 w-2.5 rounded-full bg-leaf" />}
          </span>
        )}
      </div>
      {(onEdit || onDelete || onSetDefault) && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-3">
          {onEdit && (
            <button type="button" onClick={(e) => { e.stopPropagation(); onEdit(); }} className="inline-flex items-center gap-1 rounded-lg bg-secondary px-3 py-1.5 text-xs font-bold text-primary">
              <Pencil className="h-3.5 w-3.5" /> Edit
            </button>
          )}
          {onDelete && (
            <button type="button" onClick={(e) => { e.stopPropagation(); onDelete(); }} className="inline-flex items-center gap-1 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          )}
          {onSetDefault && !address.isDefault && (
            <button type="button" onClick={(e) => { e.stopPropagation(); onSetDefault(); }} className="ml-auto text-xs font-bold text-leaf">
              Set as default
            </button>
          )}
        </div>
      )}
    </div>
  );
}
