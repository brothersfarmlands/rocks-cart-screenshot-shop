import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SearchX, TrendingUp } from "lucide-react";
import { z } from "zod";
import { Page } from "@/components/rc/Page";
import { ProductGrid } from "@/components/rc/ProductRail";
import { SearchInput } from "@/components/rc/SearchBar";
import { BackButton } from "@/components/rc/TopBar";
import { CategoryTile } from "@/components/rc/CategoryCard";
import { categories, popularSearches, searchProducts } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({ q: z.string().catch("") }),
  head: () => pageHead("Search", "Search fresh vegetables, fruits and pulses on RocksCart."),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const setQ = (v: string) => navigate({ search: { q: v }, replace: true });
  const results = searchProducts(q);

  return (
    <Page nav={false}>
      <div className="sticky top-0 z-30 flex items-center gap-3 bg-background/95 px-4 py-3 backdrop-blur">
        <BackButton />
        <SearchInput value={q} onChange={setQ} autoFocus className="flex-1" />
      </div>

      {!q.trim() ? (
        <div className="space-y-6 px-4 pt-2">
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-primary">
              <TrendingUp className="h-4 w-4 text-leaf" /> Popular searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((s) => (
                <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-semibold">
                  {s}
                </button>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-3 text-sm font-extrabold text-primary">Browse categories</h2>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((c) => <CategoryTile key={c.slug} category={c} />)}
            </div>
          </section>
        </div>
      ) : results.length ? (
        <>
          <p className="px-4 pb-3 text-sm text-muted-foreground">
            {results.length} result{results.length > 1 && "s"} for <span className="font-bold text-foreground">"{q}"</span>
          </p>
          <ProductGrid products={results} />
        </>
      ) : (
        <div className="flex flex-col items-center px-8 py-16 text-center">
          <SearchX className="h-14 w-14 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-extrabold text-primary">No results for "{q}"</h2>
          <p className="mt-1 text-sm text-muted-foreground">We currently stock vegetables, fruits and pulses. Try "tomato" or "dal".</p>
        </div>
      )}
    </Page>
  );
}
