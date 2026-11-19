import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Banner } from "@/lib/data";
import { cn } from "@/lib/utils";

const tone: Record<Banner["tone"], { wrap: string; label: string; cta: string; text: string }> = {
  brand: { wrap: "bg-primary", label: "bg-sun text-sun-foreground", cta: "bg-sun text-sun-foreground", text: "text-primary-foreground" },
  sun: { wrap: "bg-sun", label: "bg-primary text-primary-foreground", cta: "bg-primary text-primary-foreground", text: "text-sun-foreground" },
  leaf: { wrap: "bg-leaf-soft", label: "bg-primary text-primary-foreground", cta: "bg-primary text-primary-foreground", text: "text-primary" },
};

export function PromoBanner({ banner }: { banner: Banner }) {
  const t = tone[banner.tone];
  return (
    <Link
      to="/category/$slug"
      params={{ slug: banner.category }}
      className={cn("relative block h-44 overflow-hidden rounded-3xl", t.wrap)}
    >
      <img src={banner.image} alt="" className="absolute inset-0 h-full w-full object-cover object-right" />
      <div className={cn("relative z-10 flex h-full w-[62%] flex-col justify-center gap-2 p-5", t.text)}>
        <span className={cn("w-fit rounded-md px-2 py-0.5 text-[10px] font-extrabold tracking-wider", t.label)}>{banner.label}</span>
        <h3 className="whitespace-pre-line text-xl font-extrabold leading-tight">{banner.title}</h3>
        <p className="text-xs font-semibold opacity-85">{banner.subtitle}</p>
        <span className={cn("mt-1 inline-flex w-fit items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-extrabold", t.cta)}>
          {banner.cta} <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function BannerCarousel({ banners, interval = 4500 }: { banners: Banner[]; interval?: number }) {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "center" });
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => api && setIndex(api.selectedScrollSnap()), [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    const t = window.setInterval(() => api.scrollNext(), interval);
    return () => {
      window.clearInterval(t);
      api.off("select", onSelect);
    };
  }, [api, interval, onSelect]);

  return (
    <div>
      <div ref={ref} className="overflow-hidden px-4">
        <div className="flex gap-3">
          {banners.map((b) => (
            <div key={b.id} className="min-w-0 flex-[0_0_100%]">
              <PromoBanner banner={b} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {banners.map((b, i) => (
          <button
            key={b.id}
            type="button"
            aria-label={`Show banner ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/25")}
          />
        ))}
      </div>
    </div>
  );
}
