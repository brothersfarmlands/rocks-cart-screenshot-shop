import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Leaf, Linkedin, Mail, MapPin, Phone, Sprout, Timer, Twitter } from "lucide-react";
import { Logo } from "@/components/rc/Logo";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("About Us", "RocksCart delivers farm-fresh vegetables, fruits and pulses to Indian homes in minutes."),
  component: About,
});

const promises = [
  { icon: Sprout, title: "Farm to doorstep", text: "Sourced directly from 500+ farmers across India." },
  { icon: Leaf, title: "Quality checked", text: "Every item passes a 3-step freshness check." },
  { icon: Timer, title: "Delivered in minutes", text: "Neighbourhood stores for 15-minute delivery." },
];

function About() {
  return (
    <Page nav={false} cartBar={false}>
      <TopBar title="About Us" fallback="/profile" />
      <div className="space-y-5 px-4">
        <section className="flex flex-col items-center rounded-3xl bg-card px-6 py-8 text-center shadow-card">
          <Logo className="w-48" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            RocksCart is a quick-commerce grocery brand on a mission to make fresh, honest food effortless for every Indian kitchen –
            from the morning sabzi run to the Sunday rajma-chawal.
          </p>
        </section>

        <section className="rounded-3xl bg-gradient-brand p-5 text-primary-foreground">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-sun">Our mission</p>
          <p className="mt-2 font-display text-lg font-bold leading-snug">
            To bring the freshness of the farm to your doorstep – fairly priced, responsibly sourced, and always on time.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-extrabold text-primary">Our freshness commitment</h2>
          <div className="space-y-3">
            {promises.map((p) => (
              <div key={p.title} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-leaf-soft text-primary"><p.icon className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm font-bold">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-2xl bg-card p-4 text-sm shadow-card">
          <h2 className="text-base font-extrabold text-primary">Contact us</h2>
          <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-leaf" /> hello@rockscart.in</p>
          <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-leaf" /> +91 1800 000 0000</p>
          <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf" /> RocksCart HQ, address to be announced</p>
        </section>

        <section className="pb-4 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Follow us</p>
          <div className="flex justify-center gap-3">
            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label={["Instagram", "Facebook", "X", "LinkedIn"][i]} className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition active:scale-95">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}
