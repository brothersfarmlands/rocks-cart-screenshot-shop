import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Settings, Sparkles, TicketPercent } from "lucide-react";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { cn } from "@/lib/utils";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/alerts")({
  head: () => pageHead("Notifications", "Your latest RocksCart order updates and offers."),
  component: Alerts,
});

const alerts = [
  { icon: Package, title: "Order #RC10482 is on the way", text: "Ravi will reach you in about 8 minutes.", time: "5 min ago", unread: true, to: "/track/RC10482" },
  { icon: TicketPercent, title: "Flat ₹50 off on fresh produce", text: "Use FRESH50 on orders above ₹299. Today only!", time: "2 hrs ago", unread: true, to: "/cart" },
  { icon: Sparkles, title: "Alphonso mangoes are here 🥭", text: "Carbide-free Ratnagiri Hapus, now in stock.", time: "Yesterday", unread: false, to: "/product/mango" },
  { icon: Package, title: "Order #RC10371 delivered", text: "Rate your experience and help us improve.", time: "4 days ago", unread: false, to: "/orders" },
];

function Alerts() {
  return (
    <Page nav={false}>
      <TopBar
        title="Notifications"
        right={
          <Link to="/notifications" aria-label="Notification preferences" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-primary shadow-card">
            <Settings className="h-5 w-5" />
          </Link>
        }
      />
      <ul className="space-y-2 px-4">
        {alerts.map((a) => (
          <li key={a.title}>
            <Link to={a.to} className={cn("flex gap-3 rounded-2xl p-4 shadow-card", a.unread ? "bg-card" : "bg-card/60")}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><a.icon className="h-5 w-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <span className="truncate">{a.title}</span>
                  {a.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-sun" />}
                </p>
                <p className="text-xs text-muted-foreground">{a.text}</p>
                <p className="mt-1 text-[11px] font-semibold text-muted-foreground/80">{a.time}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
