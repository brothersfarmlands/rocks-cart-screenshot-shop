import { createFileRoute } from "@tanstack/react-router";
import { CategoryWideCard } from "@/components/rc/CategoryCard";
import { Page } from "@/components/rc/Page";
import { SearchLink } from "@/components/rc/SearchBar";
import { TopBar } from "@/components/rc/TopBar";
import { categories } from "@/lib/data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/categories")({
  head: () => pageHead("Categories", "Browse RocksCart categories: fresh vegetables, fresh fruits, pulses and rice."),
  component: Categories,
});

function Categories() {
  return (
    <Page>
      <TopBar title="Categories" subtitle="Everything fresh, in four aisles" back={false} />
      <div className="space-y-4 px-4">
        <SearchLink />
        {categories.map((c) => (
          <CategoryWideCard key={c.slug} category={c} />
        ))}
      </div>
    </Page>
  );
}
