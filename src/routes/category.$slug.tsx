import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowDownUp, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Page } from "@/components/rc/Page";
import { defaultVariantIndex } from "@/components/rc/ProductCard";
import { ProductGrid } from "@/components/rc/ProductRail";
import { TopBar } from "@/components/rc/TopBar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories, discountPercent, getCategory, productsByCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Fresh ${loaderData.category.name} | RocksCart` },
          { name: "description", content: `Buy fresh ${loaderData.category.name.toLowerCase()} online at the best prices. ${loaderData.category.tagline}.` },
          { property: "og:title", content: `Fresh ${loaderData.category.name} | RocksCart` },
          { property: "og:description", content: loaderData.category.tagline },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Category | RocksCart" }, { name: "robots", content: "noindex" }],
  }),
  component: CategoryPage,
});

type Sort = "relevance" | "low" | "high" | "discount";
type Filter = "all" | "offer" | "instock";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "offer", label: "On offer" },
  { id: "instock", label: "In stock" },
];

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const [sort, setSort] = useState<Sort>("relevance");
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(() => {
    let items = productsByCategory(category.slug);
    if (filter === "offer") items = items.filter((p) => p.tags.includes("offer"));
    if (filter === "instock") items = items.filter((p) => p.inStock);
    const price = (p: (typeof items)[number]) => p.variants[defaultVariantIndex(p)].price;
    const off = (p: (typeof items)[number]) => discountPercent(p.variants[defaultVariantIndex(p)]);
    if (sort === "low") items = [...items].sort((a, b) => price(a) - price(b));
    if (sort === "high") items = [...items].sort((a, b) => price(b) - price(a));
    if (sort === "discount") items = [...items].sort((a, b) => off(b) - off(a));
    return items;
  }, [category.slug, sort, filter]);

  return (
    <Page>
      <TopBar
        title={category.name}
        subtitle={`${productsByCategory(category.slug).length} products`}
        fallback="/categories"
        right={
          <Link to="/search" search={{ q: "" }} aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-primary shadow-card">
            <Search className="h-5 w-5" />
          </Link>
        }
      />

      <div className="relative mx-4 h-32 overflow-hidden rounded-3xl bg-primary">
        <img src={category.banner} alt="" className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className={cn("relative z-10 flex h-full w-3/5 flex-col justify-center p-5", category.tone === "brand" ? "text-primary-foreground" : category.tone === "sun" ? "text-sun-foreground" : "text-primary")}>
          <p className="text-[11px] font-extrabold uppercase tracking-widest opacity-80">RocksCart Fresh</p>
          <h2 className="text-2xl font-extrabold">{category.name}</h2>
          <p className="text-xs opacity-85">{category.tagline}</p>
        </div>
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/category/$slug"
            params={{ slug: c.slug }}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm font-bold transition",
              c.slug === category.slug ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-foreground",
            )}
          >
            <img src={c.image} alt="" className="h-7 w-7 rounded-full object-cover" />
            {c.name}
          </Link>
        ))}
      </div>

      <div className="sticky top-16 z-20 mt-3 flex items-center gap-2 bg-background/95 px-4 py-2 backdrop-blur">
        <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={cn(
                "shrink-0 rounded-lg border px-3 py-1.5 text-xs font-bold transition",
                filter === f.id ? "border-leaf bg-leaf-soft text-primary" : "border-border bg-surface text-muted-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
          <SelectTrigger aria-label="Sort products" className="h-8 w-auto shrink-0 gap-1 rounded-lg border-border bg-surface px-2.5 text-xs font-bold">
            <ArrowDownUp className="h-3.5 w-3.5 text-primary" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="low">Price: Low to High</SelectItem>
            <SelectItem value="high">Price: High to Low</SelectItem>
            <SelectItem value="discount">Discount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-2">
        {list.length ? (
          <ProductGrid products={list} />
        ) : (
          <p className="px-4 py-16 text-center text-sm text-muted-foreground">No products match this filter.</p>
        )}
      </div>
    </Page>
  );
}
