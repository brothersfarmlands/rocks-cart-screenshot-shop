import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Package, Sparkles, TicketPercent } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { useStore, type NotificationPrefs } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/notifications")({
  head: () => pageHead("Notification Preferences", "Choose which RocksCart updates you'd like to receive."),
  component: Notifications,
});

const rows: { key: keyof NotificationPrefs; label: string; text: string; icon: typeof Package }[] = [
  { key: "orders", label: "Order updates", text: "Packing, delivery and refund status", icon: Package },
  { key: "offers", label: "Offers & discounts", text: "Coupons and price drops on your favourites", icon: TicketPercent },
  { key: "newProducts", label: "New products", text: "Seasonal arrivals and fresh launches", icon: Sparkles },
  { key: "promotions", label: "Promotional notifications", text: "Festive sales and campaigns", icon: Megaphone },
];

function Notifications() {
  const { prefs, setPref } = useStore();
  return (
    <Page nav={false} cartBar={false}>
      <TopBar title="Notifications" subtitle="Preferences" fallback="/profile" />
      <div className="px-4">
        <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-card">
          {rows.map((r) => (
            <label key={r.key} className="flex cursor-pointer items-center gap-3 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><r.icon className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">{r.label}</span>
                <span className="block text-xs text-muted-foreground">{r.text}</span>
              </span>
              <Switch checked={prefs[r.key]} onCheckedChange={(v) => setPref(r.key, v)} aria-label={r.label} className="data-[state=checked]:bg-leaf" />
            </label>
          ))}
        </div>
        <p className="mt-4 px-1 text-xs leading-relaxed text-muted-foreground">
          We recommend keeping order updates on so you never miss a delivery.
        </p>
      </div>
    </Page>
  );
}
