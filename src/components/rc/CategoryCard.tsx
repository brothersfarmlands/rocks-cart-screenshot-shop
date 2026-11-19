import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/data";
import { productsByCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

const toneBg: Record<Category["tone"], string> = {
  brand: "bg-secondary",
  sun: "bg-sun-soft",
  leaf: "bg-leaf-soft",
};

export function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className={cn("group flex flex-col items-center gap-2 rounded-2xl p-2 pb-3 transition active:scale-95", toneBg[category.tone])}
    >
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-surface">
        <img src={category.image} alt={category.name} className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <span className="font-display text-sm font-bold text-primary">{category.name}</span>
    </Link>
  );
}

export function CategoryWideCard({ category }: { category: Category }) {
  const count = productsByCategory(category.slug).length;
  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className="group relative flex h-36 overflow-hidden rounded-3xl bg-card shadow-card transition active:scale-[0.99]"
    >
      <img src={category.banner} alt="" className="absolute inset-0 h-full w-full object-cover object-right" />
      <div
        className={cn(
          "relative z-10 flex w-3/5 flex-col justify-center gap-1 p-5",
          category.tone === "sun" ? "text-sun-foreground" : "text-primary-foreground",
          category.tone === "leaf" && "text-primary",
        )}
      >
        <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">{count} products</span>
        <h3 className="text-2xl font-extrabold">{category.name}</h3>
        <p className="text-xs opacity-85">{category.tagline}</p>
        <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-bold text-primary">
          Explore <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
