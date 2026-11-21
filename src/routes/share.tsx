import { createFileRoute } from "@tanstack/react-router";
import { Copy, Gift, Share2, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/rc/Logo";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/share")({
  head: () => pageHead("Share App", "Invite friends to RocksCart and you both get ₹100 off fresh groceries."),
  component: Share,
});

const LINK = "https://rockscart.in/invite/RAHUL100";
const MESSAGE = "I get my fresh veggies, fruits & dals from RocksCart in 15 minutes! 🥬🍎 Use my link to get ₹100 off your first order:";

function Share() {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINK);
      toast.success("Referral link copied");
    } catch {
      toast.error("Couldn't copy – please copy it manually");
    }
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "RocksCart", text: MESSAGE, url: LINK });
      } catch {
        /* user cancelled */
      }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${MESSAGE} ${LINK}`)}`, "_blank", "noopener");
    }
  };

  return (
    <Page nav={false} cartBar={false}>
      <TopBar title="Share App" fallback="/profile" />
      <div className="space-y-5 px-4">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-brand px-6 pb-8 pt-6 text-center text-primary-foreground">
          <span className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-leaf/25" />
          <span className="absolute -bottom-10 -right-6 h-32 w-32 rounded-full bg-sun/30" />
          <div className="relative mx-auto w-fit rounded-2xl bg-cream px-5 py-3">
            <Logo className="w-36" />
          </div>
          <Gift className="relative mx-auto mt-5 h-10 w-10 text-sun" />
          <h1 className="relative mt-2 text-2xl font-extrabold">Give ₹100, Get ₹100</h1>
          <p className="relative mt-1 text-sm opacity-85">Share the freshness! Your friend gets ₹100 off their first order, and you get ₹100 when they order.</p>
        </section>

        <section className="rounded-2xl bg-card p-4 shadow-card">
          <p className="text-xs font-bold text-muted-foreground">Your referral link</p>
          <div className="mt-2 flex items-center gap-2 rounded-xl border-2 border-dashed border-leaf/50 bg-leaf-soft/50 p-2 pl-3">
            <span className="min-w-0 flex-1 truncate font-display text-sm font-bold text-primary">{LINK.replace("https://", "")}</span>
            <Button variant="leaf" size="sm" className="rounded-lg" onClick={copy}><Copy /> Copy</Button>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3 text-center">
          {[
            { icon: Share2, text: "Share your link" },
            { icon: Users, text: "Friend places first order" },
            { icon: Gift, text: "You both get ₹100" },
          ].map((s, i) => (
            <div key={s.text} className="rounded-2xl bg-card p-3 shadow-card">
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-sun-soft text-sun-foreground"><s.icon className="h-5 w-5" /></span>
              <p className="mt-2 text-[11px] font-bold leading-tight"><span className="text-leaf">{i + 1}.</span> {s.text}</p>
            </div>
          ))}
        </section>

        <Button variant="brand" size="xl" className="w-full" onClick={share}>
          <Share2 className="h-5 w-5" /> Share App
        </Button>
      </div>
    </Page>
  );
}
