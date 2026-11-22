import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, CheckCircle2, Clock, MapPin, ShoppingBag, Star, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Page } from "@/components/rc/Page";
import { PriceDisplay } from "@/components/rc/PriceDisplay";
import { defaultVariantIndex } from "@/components/rc/ProductCard";
import { ProductRail } from "@/components/rc/ProductRail";
import { QuantityStepper } from "@/components/rc/QuantityStepper";
import { SectionHeader } from "@/components/rc/SectionHeader";
import { BackButton } from "@/components/rc/TopBar";
import { WishlistButton } from "@/components/rc/WishlistButton";
import { discountPercent, getCategory, getProduct, productsByCategory } from "@/lib/data";
import { formatINR } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} – Buy online | RocksCart` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} | RocksCart` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Product | RocksCart" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { getQty, setQty } = useStore();
  const [vi, setVi] = useState(defaultVariantIndex(product));
  const [qty, setLocalQty] = useState(1);
  const v = product.variants[vi]!;
  const inCart = getQty(product.id, vi);
  const category = getCategory(product.category)!;
  const related = productsByCategory(product.category).filter((p) => p.id !== product.id);

  const add = () => {
    setQty(product.id, vi, inCart + qty);
    toast.success(`${qty} × ${product.name} (${v.label}) added`, {
      action: { label: "View cart", onClick: () => navigate({ to: "/cart" }) },
    });
  };

  return (
    <Page nav={false} cartBar={false} className="pb-28">
      <div className="relative bg-cream">
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
          <BackButton fallback={`/category/${product.category}`} />
          <WishlistButton productId={product.id} size="lg" />
        </div>
        <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        {discountPercent(v) > 0 && (
          <span className="absolute bottom-6 left-4 rounded-lg bg-sun px-2.5 py-1 font-display text-xs font-extrabold text-sun-foreground">
            {discountPercent(v)}% OFF
          </span>
        )}
      </div>

      <div className="-mt-4 relative space-y-5 rounded-t-[2rem] bg-background px-4 pt-6">
        <div>
          <Link to="/category/$slug" params={{ slug: category.slug }} className="text-xs font-extrabold uppercase tracking-widest text-leaf">
            {category.name}
          </Link>
          <h1 className="mt-1 text-2xl font-extrabold text-primary">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.localName} · {v.label}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1 rounded-full bg-sun-soft px-2 py-1 text-sun-foreground">
              <Star className="h-3.5 w-3.5 fill-sun text-sun" /> {product.rating} rating
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-primary">
              <Clock className="h-3.5 w-3.5" /> 15 min delivery
            </span>
            {product.inStock ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-leaf-soft px-2 py-1 text-primary">
                <CheckCircle2 className="h-3.5 w-3.5 text-leaf" /> In stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-1 text-destructive">
                <XCircle className="h-3.5 w-3.5" /> Out of stock
              </span>
            )}
          </div>
          <PriceDisplay price={v.price} mrp={v.mrp} size="lg" showOff className="mt-3" />
          <p className="text-[11px] text-muted-foreground">Inclusive of all taxes</p>
        </div>

        <section>
          <h2 className="mb-2 text-sm font-extrabold text-primary">Select quantity</h2>
          <div className="grid grid-cols-3 gap-2">
            {product.variants.map((variant, i) => (
              <button
                key={variant.label}
                type="button"
                onClick={() => setVi(i)}
                aria-pressed={vi === i}
                className={cn(
                  "relative rounded-2xl border-2 bg-surface px-2 py-2.5 text-left transition",
                  vi === i ? "border-leaf bg-leaf-soft" : "border-border",
                )}
              >
                {discountPercent(variant) > 0 && (
                  <span className="absolute -top-2 right-2 rounded bg-sun px-1 text-[9px] font-extrabold text-sun-foreground">
                    {discountPercent(variant)}% OFF
                  </span>
                )}
                <p className="truncate text-xs font-bold">{variant.label}</p>
                <p className="font-display text-sm font-extrabold">{formatINR(variant.price)}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-card p-4 shadow-card">
          <h2 className="text-sm font-extrabold text-primary">About this product</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
              <div><dt className="text-muted-foreground">Sourced from</dt><dd className="font-bold">{product.origin}</dd></div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
              <div><dt className="text-muted-foreground">Shelf life</dt><dd className="font-bold">{product.shelfLife}</dd></div>
            </div>
          </dl>
          <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-secondary px-3 py-2 text-xs font-semibold text-primary">
            <BadgeCheck className="h-4 w-4 text-leaf" /> Quality checked & hygienically packed
          </p>
        </section>

        {related.length > 0 && (
          <section className="-mx-4">
            <SectionHeader title="You may also like" action={{ label: "See all", to: "/category/$slug", params: { slug: category.slug } }} />
            <ProductRail products={related} />
          </section>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur">
        {product.inStock ? (
          <div className="flex items-center gap-3">
            <QuantityStepper value={qty} onChange={(n) => setLocalQty(Math.max(1, n))} size="lg" className="w-32 shrink-0" />
            <Button variant="brand" size="xl" className="flex-1" onClick={add}>
              <ShoppingBag className="h-5 w-5" /> Add · {formatINR(v.price * qty)}
            </Button>
          </div>
        ) : (
          <Button variant="soft" size="xl" className="w-full" disabled>
            Currently out of stock
          </Button>
        )}
        {inCart > 0 && (
          <Link to="/cart" className="mt-2 block text-center text-xs font-bold text-leaf">
            {inCart} of this pack already in cart · View cart →
          </Link>
        )}
      </div>
    </Page>
  );
}
