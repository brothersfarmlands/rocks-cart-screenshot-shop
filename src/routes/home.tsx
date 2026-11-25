import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronDown, Flame, Leaf, Search, Sparkles, Tag, Truck, Zap } from "lucide-react";
import { BannerCarousel } from "@/components/rc/BannerCarousel";
import { CategoryTile } from "@/components/rc/CategoryCard";
import { Logo } from "@/components/rc/Logo";
import { Page } from "@/components/rc/Page";
import { ProductGrid, ProductRail } from "@/components/rc/ProductRail";
import { SearchLink } from "@/components/rc/SearchBar";
import { SectionHeader } from "@/components/rc/SectionHeader";
import { banners, categories, productsByTag } from "@/lib/data";
import { coupons, FREE_DELIVERY_MIN, formatINR } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/home")({
  head: () => pageHead("Home", "Shop fresh vegetables, fruits, pulses and rice with RocksCart – best sellers, fresh arrivals and daily offers."),
  component: Home,
});

function Home() {
  const { selectedAddress, user } = useStore();
  return (
    <Page>
      <header className="sticky top-0 z-30 bg-gradient-header px-4 pb-3 pt-3">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
          <Logo variant="icon" className="h-11 w-11" />
          <Link to="/addresses" className="min-w-0">
            <p className="flex items-center gap-1 font-display text-[15px] font-extrabold text-primary">
              <Zap className="h-4 w-4 fill-sun text-sun" /> Delivery in 15 mins
            </p>
            <p className="flex items-center gap-0.5 truncate text-xs text-muted-foreground">
              <span className="font-bold text-foreground">{selectedAddress?.label ?? "Add address"}</span>
              {selectedAddress && <span className="truncate">&nbsp;· {selectedAddress.street}, {selectedAddress.city}</span>}
              <ChevronDown className="h-3.5 w-3.5 shrink-0" />
            </p>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/search" search={{ q: "" }} aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-primary shadow-card">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/alerts" aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-full bg-surface text-primary shadow-card">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-sun ring-2 ring-surface" />
            </Link>
          </div>
        </div>
        <SearchLink className="mt-3" />
      </header>

      <div className="space-y-7 pt-2">
        {user && (
          <p className="px-4 text-sm text-muted-foreground">
            Namaste, <span className="font-bold text-primary">{user.name.split(" ")[0]}</span> 👋 What's on the menu today?
          </p>
        )}

        <BannerCarousel banners={banners} />

        <section>
          <SectionHeader title="Shop by Category" action={{ label: "All", to: "/categories" }} />
          <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 pb-1">
            {categories.map((c) => (
              <div key={c.slug} className="w-[calc((100%-1.5rem)/3)] shrink-0 snap-start">
                <CategoryTile category={c} />
              </div>
            ))}
          </div>
        </section>

        <div className="mx-4 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
          <Truck className="h-6 w-6 shrink-0 text-primary" />
          <p className="text-sm text-primary">
            <span className="font-extrabold">FREE delivery</span> on orders above {formatINR(FREE_DELIVERY_MIN)}
          </p>
        </div>

        <section>
          <SectionHeader title="Best Sellers" subtitle="Most loved by your neighbours" icon={<Flame className="h-5 w-5 text-sun" />} />
          <ProductRail products={productsByTag("bestseller")} />
        </section>

        <section>
          <SectionHeader title="Fresh Arrivals" subtitle="Harvested in the last 24 hours" icon={<Leaf className="h-5 w-5 text-leaf" />} />
          <ProductRail products={productsByTag("fresh")} />
        </section>

        <section>
          <SectionHeader title="Special Offers" subtitle="Grab them before they're gone" icon={<Tag className="h-5 w-5 text-sun" />} />
          <div className="no-scrollbar mb-4 flex gap-3 overflow-x-auto px-4">
            {coupons.map((c) => (
              <div key={c.code} className="relative w-56 shrink-0 overflow-hidden rounded-2xl bg-gradient-sun p-4">
                <span className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-surface/25" />
                <p className="font-display text-lg font-extrabold text-sun-foreground">{c.title}</p>
                <p className="text-xs font-semibold text-sun-foreground/80">{c.description}</p>
                <p className="mt-3 inline-block rounded-lg border border-dashed border-sun-foreground/40 bg-surface/50 px-2 py-1 font-display text-xs font-extrabold tracking-widest text-sun-foreground">
                  {c.code}
                </p>
              </div>
            ))}
          </div>
          <ProductRail products={productsByTag("offer")} />
        </section>

        <section>
          <SectionHeader title="Recommended for You" icon={<Sparkles className="h-5 w-5 text-leaf" />} />
          <ProductGrid products={productsByTag("recommended")} />
        </section>

        <footer className="px-4 pb-4 pt-2 text-center">
          <p className="font-display text-2xl font-extrabold text-primary/20">Freshness at your doorstep</p>
          <p className="mt-1 text-xs text-muted-foreground">Made with 💚 for Indian kitchens</p>
        </footer>
      </div>
    </Page>
  );
}
