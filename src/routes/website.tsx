import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Heart,
  Languages,
  Leaf,
  PackageCheck,
  Search,
  ShoppingBasket,
  Sparkles,
} from "lucide-react";

import homeScreen from "@/assets/website/home-screen.webp";
import categoriesScreen from "@/assets/website/categories-screen.webp";
import productScreen from "@/assets/website/product-screen.webp";
import { Logo } from "@/components/rc/Logo";
import { categories } from "@/lib/data";

// Replace these with the app's live listing URLs when they are available.
const GOOGLE_PLAY_URL = "https://play.google.com/store";
const APP_STORE_URL = "https://www.apple.com/app-store/";

export const Route = createFileRoute("/website")({
  head: () => ({
    meta: [
      { title: "RocksCart – Fresh groceries, right at your doorstep" },
      {
        name: "description",
        content:
          "Discover the RocksCart grocery app for fresh vegetables, fruits, pulses and rice. Explore the app and download RocksCart for Android or iOS.",
      },
      { property: "og:title", content: "RocksCart – Fresh groceries, right at your doorstep" },
      {
        property: "og:description",
        content:
          "Meet the simple, colourful grocery app made for everyday Indian kitchens. Download RocksCart for Android or iOS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Website,
});

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 shrink-0" fill="none">
      <path d="M3.3 2.6 14.1 12 3.3 21.4c-.5-.4-.8-1-.8-1.8V4.4c0-.8.3-1.4.8-1.8Z" fill="currentColor" opacity="0.9" />
      <path d="m14.1 12 3.1-2.8 3.4 1.9c1.1.6 1.1 1.5 0 2.1l-3.4 1.9-3.1-3.1Z" fill="currentColor" opacity="0.65" />
      <path d="m6.3 2 10.9 7.2-3.1 2.8L3.3 2.6C4.2 1.8 5 1.6 6.3 2Z" fill="currentColor" opacity="0.45" />
      <path d="m3.3 21.4 10.8-9.4 3.1 3.1L6.3 22c-1.3.4-2.1.2-3-.6Z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 shrink-0" fill="currentColor">
      <path d="M17.05 12.54c-.03-2.89 2.36-4.28 2.47-4.35a5.31 5.31 0 0 0-4.18-2.26c-1.76-.18-3.47 1.05-4.37 1.05-.92 0-2.3-1.03-3.8-1-1.93.03-3.73 1.13-4.73 2.85-2.05 3.5-.52 8.67 1.44 11.51.98 1.39 2.12 2.95 3.62 2.89 1.47-.06 2.02-.93 3.79-.93 1.75 0 2.27.93 3.8.89 1.58-.03 2.57-1.4 3.52-2.8a11.46 11.46 0 0 0 1.61-3.25 5.03 5.03 0 0 1-3.17-4.6ZM14.15 3.8A5.12 5.12 0 0 0 15.32.1a5.22 5.22 0 0 0-3.36 1.73 4.88 4.88 0 0 0-1.2 3.6 4.32 4.32 0 0 0 3.39-1.63Z" />
    </svg>
  );
}

function StoreButtons({ onDark = false }: { onDark?: boolean }) {
  const className = onDark
    ? "bg-primary-foreground text-primary hover:bg-sun-soft"
    : "bg-primary text-primary-foreground hover:bg-primary-deep";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Get RocksCart on Google Play"
        className={`inline-flex min-w-48 items-center justify-center gap-3 rounded-2xl px-5 py-3 text-left shadow-card transition-all hover:-translate-y-0.5 ${className}`}
      >
        <GooglePlayIcon />
        <span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] opacity-75">Get it on</span>
          <span className="block font-display text-lg font-extrabold leading-tight">Google Play</span>
        </span>
      </a>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Download RocksCart on the App Store"
        className={`inline-flex min-w-48 items-center justify-center gap-3 rounded-2xl px-5 py-3 text-left shadow-card transition-all hover:-translate-y-0.5 ${className}`}
      >
        <AppleIcon />
        <span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] opacity-75">Download on the</span>
          <span className="block font-display text-lg font-extrabold leading-tight">App Store</span>
        </span>
      </a>
    </div>
  );
}

const features = [
  {
    icon: Search,
    title: "Find it your way",
    text: "Search in English or Hindi, even with a partial name. Everyday groceries are easy to discover.",
  },
  {
    icon: PackageCheck,
    title: "Clear pack choices",
    text: "Compare practical pack sizes and prices at a glance, so choosing feels quick and straightforward.",
  },
  {
    icon: Heart,
    title: "Save your favourites",
    text: "Keep regular picks close at hand with a wishlist made for repeat grocery runs.",
  },
  {
    icon: Languages,
    title: "Made for Indian kitchens",
    text: "From adrak and dhaniya to dals and basmati, the catalogue speaks your kitchen's language.",
  },
];

const screens = [
  { image: homeScreen, label: "A fresh start", detail: "Offers, categories and everyday picks" },
  { image: categoriesScreen, label: "Easy discovery", detail: "Four clearly organised aisles" },
  { image: productScreen, label: "Confident choices", detail: "Useful details and simple pack selection" },
];

function Website() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#top" className="flex items-center gap-2.5" aria-label="RocksCart home">
            <Logo variant="icon" className="h-11 w-11" />
            <span className="font-display text-2xl font-extrabold tracking-tight text-primary">
              Rocks<span className="text-leaf">Cart</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-bold text-muted-foreground md:flex" aria-label="Website navigation">
            <a className="transition-colors hover:text-primary" href="#fresh">What you'll find</a>
            <a className="transition-colors hover:text-primary" href="#why">Why RocksCart</a>
            <a className="transition-colors hover:text-primary" href="#app">App preview</a>
          </nav>
          <a
            href="#download"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-extrabold text-primary-foreground shadow-card transition-all hover:bg-primary-deep sm:px-5"
          >
            Get the app <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </header>

      <section id="top" className="relative isolate overflow-hidden bg-gradient-brand">
        <div className="absolute -left-28 top-16 h-80 w-80 rounded-full border-[56px] border-leaf/10" />
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-sun/10" />
        <div className="absolute bottom-0 left-1/2 h-48 w-48 rounded-full bg-leaf/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-12 lg:py-24">
          <div className="max-w-2xl text-primary-foreground">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em]">
              <Leaf className="h-4 w-4 text-sun" /> Your everyday fresh market
            </div>
            <h1 className="font-display text-[clamp(2.8rem,6vw,5.4rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
              Good food starts with a <span className="text-sun">fresher basket.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80 sm:text-xl">
              Vegetables, fruits, pulses and rice—all thoughtfully organised in one simple app, made for the rhythm of your kitchen.
            </p>
            <div className="mt-8">
              <StoreButtons onDark />
            </div>
            <a href="#fresh" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-primary-foreground/85 transition-colors hover:text-sun">
              Take a look around <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-[410px] lg:mx-0 lg:justify-self-end">
            <div className="absolute left-1/2 top-1/2 h-[80%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf/20 blur-3xl" />
            <div className="relative mx-auto w-[270px] rotate-2 rounded-[2.8rem] border-[7px] border-primary-deep bg-primary-deep p-1 shadow-frame sm:w-[310px]">
              <div className="overflow-hidden rounded-[2.25rem] bg-background">
                <img src={homeScreen} alt="RocksCart app home screen showing fresh groceries" className="aspect-[430/932] w-full object-cover" />
              </div>
            </div>
            <div className="absolute -left-2 top-16 hidden items-center gap-3 rounded-2xl bg-surface p-3.5 shadow-float sm:flex lg:-left-12">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-sun-soft text-sun-foreground">
                <ShoppingBasket className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-sm font-extrabold">Four fresh aisles</span>
                <span className="block text-xs text-muted-foreground">One everyday app</span>
              </span>
            </div>
            <div className="absolute -right-2 bottom-20 hidden items-center gap-2 rounded-2xl bg-surface px-4 py-3 shadow-float sm:flex lg:-right-8">
              <Sparkles className="h-5 w-5 text-leaf" />
              <span className="font-display text-sm font-extrabold text-primary">Freshness at your doorstep</span>
            </div>
          </div>
        </div>
      </section>

      <section id="fresh" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.65fr]">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-leaf">Inside your basket</p>
              <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl">
                Daily staples to seasonal favourites.
              </h2>
            </div>
            <p className="max-w-lg text-base leading-7 text-muted-foreground lg:justify-self-end">
              A colourful, easy-to-browse catalogue that brings your everyday grocery list together without the clutter.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {categories.map((category, index) => (
              <article key={category.slug} className="group overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-transform duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={`${category.name} available in the RocksCart app`}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-surface/90 font-display text-xs font-extrabold text-primary shadow-card">
                    0{index + 1}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-display text-lg font-extrabold text-primary sm:text-xl">{category.name}</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">{category.tagline}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-24 border-y border-border bg-surface px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-leaf">Simple by design</p>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl">
              Less time searching. More time cooking.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Every screen is designed to make the familiar grocery run feel lighter, clearer and more intuitive.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-3xl bg-background p-6 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="app" className="scroll-mt-24 bg-secondary/45 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-leaf">Meet the app</p>
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl">
                Fresh shopping that feels familiar.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                Bright photography, clear information and friendly navigation make every visit feel effortless—from the first search to your saved favourites.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Easy browsing", "Bilingual search", "Useful product details"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-2 text-xs font-bold text-primary shadow-card">
                    <Check className="h-3.5 w-3.5 text-leaf" /> {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-2 sm:gap-5">
              {screens.map((screen, index) => (
                <figure key={screen.label} className={index === 1 ? "sm:-translate-y-5" : ""}>
                  <div className="overflow-hidden rounded-[1.4rem] border-4 border-primary bg-primary shadow-frame sm:rounded-[2rem] sm:border-[6px]">
                    <img src={screen.image} alt={`${screen.label} in the RocksCart app`} className="aspect-[430/932] w-full object-cover" loading="lazy" />
                  </div>
                  <figcaption className="mt-4 hidden text-center sm:block">
                    <span className="block font-display text-sm font-extrabold text-primary">{screen.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{screen.detail}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="download" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-brand px-6 py-12 text-primary-foreground shadow-frame sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[42px] border-sun/15" />
          <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-leaf/20 blur-2xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <Logo variant="icon" className="mb-5 h-16 w-16 rounded-2xl bg-primary-foreground p-1.5" />
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-sun">Freshness at your doorstep</p>
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Your next fresh basket starts here.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-primary-foreground/75">
                Download RocksCart and keep your everyday fresh market within easy reach.
              </p>
            </div>
            <div>
              <StoreButtons onDark />
              <p className="mt-4 text-center text-xs text-primary-foreground/60 lg:text-left">
                This website is a showcase. Shopping happens in the app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <a href="#top" className="flex items-center gap-2" aria-label="Back to the top">
            <Logo variant="icon" className="h-9 w-9" />
            <span className="font-display text-xl font-extrabold text-primary">RocksCart</span>
          </a>
          <p className="text-xs leading-5 text-muted-foreground">© 2026 RocksCart. Made for everyday Indian kitchens.</p>
          <a href="#top" className="inline-flex items-center gap-1.5 text-sm font-extrabold text-primary transition-colors hover:text-leaf">
            Back to top <ArrowRight className="h-4 w-4 -rotate-90" />
          </a>
        </div>
      </footer>
    </main>
  );
}
