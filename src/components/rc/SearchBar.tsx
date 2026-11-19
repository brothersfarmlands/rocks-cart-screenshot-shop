import { Link } from "@tanstack/react-router";
import { Mic, Search, X } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const SEARCH_PLACEHOLDER = "Search vegetables, fruits, pulses...";

export function SearchLink({ className }: { className?: string }) {
  return (
    <Link
      to="/search"
      search={{ q: "" }}
      className={cn("flex h-12 items-center gap-3 rounded-2xl border border-border bg-surface px-4 text-sm text-muted-foreground shadow-card", className)}
    >
      <Search className="h-5 w-5 text-primary" />
      <span className="flex-1 truncate">{SEARCH_PLACEHOLDER}</span>
      <Mic className="h-5 w-5 text-leaf" />
    </Link>
  );
}

export const SearchInput = forwardRef<
  HTMLInputElement,
  { value: string; onChange: (v: string) => void; className?: string; autoFocus?: boolean }
>(({ value, onChange, className, autoFocus }, ref) => (
  <label className={cn("flex h-12 items-center gap-3 rounded-2xl border border-border bg-surface px-4 shadow-card focus-within:border-leaf", className)}>
    <Search className="h-5 w-5 shrink-0 text-primary" />
    <input
      ref={ref}
      autoFocus={autoFocus}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={SEARCH_PLACEHOLDER}
      aria-label="Search products"
      className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:font-normal placeholder:text-muted-foreground"
    />
    {value && (
      <button type="button" aria-label="Clear search" onClick={() => onChange("")} className="text-muted-foreground">
        <X className="h-4 w-4" />
      </button>
    )}
  </label>
));
SearchInput.displayName = "SearchInput";
