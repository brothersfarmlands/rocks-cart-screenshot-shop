import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Eye, FileText, MapPinned, Phone, ShieldCheck, Trash2, UserCog } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { useStore } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("Account Privacy", "Manage your personal information, privacy settings and RocksCart account."),
  component: Privacy,
});

function Privacy() {
  const navigate = useNavigate();
  const { user, updateUser, deleteAccount } = useStore();
  const [settings, setSettings] = useState({ personalised: true, location: true, analytics: false });
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const toggles = [
    { key: "personalised" as const, label: "Personalised recommendations", text: "Use my order history to suggest products", icon: Eye },
    { key: "location" as const, label: "Location access", text: "Detect my delivery area automatically", icon: MapPinned },
    { key: "analytics" as const, label: "Share usage analytics", text: "Help us improve the app anonymously", icon: UserCog },
  ];

  return (
    <Page nav={false} cartBar={false}>
      <TopBar title="Account Privacy" fallback="/profile" />
      <div className="space-y-5 px-4">
        <section>
          <h2 className="mb-2 px-1 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Privacy settings</h2>
          <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-card">
            {toggles.map((t) => (
              <label key={t.key} className="flex cursor-pointer items-center gap-3 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><t.icon className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{t.label}</span>
                  <span className="block text-xs text-muted-foreground">{t.text}</span>
                </span>
                <Switch checked={settings[t.key]} onCheckedChange={(v) => setSettings((s) => ({ ...s, [t.key]: v }))} aria-label={t.label} className="data-[state=checked]:bg-leaf" />
              </label>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 px-1 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Personal information</h2>
          <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-card">
            <button type="button" onClick={() => navigate({ to: "/profile" })} className="flex w-full items-center gap-3 p-4 text-left">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><UserCog className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">Manage personal information</span>
                <span className="block truncate text-xs text-muted-foreground">{user ? `${user.name} · ${user.email ?? ""}` : "Not logged in"}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <button type="button" onClick={() => { setPhone(""); setPhoneOpen(true); }} disabled={!user} className="flex w-full items-center gap-3 p-4 text-left disabled:opacity-50">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Phone className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">Change mobile number</span>
                <span className="block text-xs text-muted-foreground">{user ? `+91 ${user.phone}` : "—"}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-2 px-1 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Legal</h2>
          <Accordion type="single" collapsible className="overflow-hidden rounded-2xl bg-card px-4 shadow-card">
            <AccordionItem value="policy" id="policy">
              <AccordionTrigger className="text-sm font-bold"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-leaf" /> Privacy Policy</span></AccordionTrigger>
              <AccordionContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                <p>RocksCart collects only the information needed to deliver your orders: your name, mobile number, delivery addresses and order history.</p>
                <p>We never sell your personal data. Payment details are processed by RBI-compliant partners and are never stored on our servers.</p>
                <p>You can request a copy or deletion of your data at any time from this screen.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="terms" id="terms" className="border-b-0">
              <AccordionTrigger className="text-sm font-bold"><span className="flex items-center gap-2"><FileText className="h-4 w-4 text-leaf" /> Terms & Conditions</span></AccordionTrigger>
              <AccordionContent className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                <p>Prices and availability may change based on daily market rates. Fresh produce weights may vary by ±10%.</p>
                <p>Damaged or unsatisfactory items can be reported within 24 hours of delivery for a full refund.</p>
                <p>Coupons cannot be combined and are subject to minimum order values.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <button type="button" onClick={() => setConfirmDelete(true)} className="flex w-full items-center gap-3 rounded-2xl border border-destructive/30 bg-card p-4 text-left">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive"><Trash2 className="h-5 w-5" /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-destructive">Delete account</span>
            <span className="block text-xs text-muted-foreground">Permanently remove your account and data</span>
          </span>
        </button>
      </div>

      <Dialog open={phoneOpen} onOpenChange={setPhoneOpen}>
        <DialogContent className="max-w-[360px] rounded-3xl bg-background">
          <DialogHeader>
            <DialogTitle className="font-display text-primary">Change mobile number</DialogTitle>
            <DialogDescription>We'll send an OTP to verify your new number.</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^[6-9]\d{9}$/.test(phone)) { toast.error("Enter a valid 10-digit mobile number"); return; }
              updateUser({ phone: `${phone.slice(0, 5)} ${phone.slice(5)}` });
              setPhoneOpen(false);
              toast.success("Mobile number updated");
            }}
          >
            <input inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="New mobile number" aria-label="New mobile number" className="h-11 w-full rounded-xl border-2 border-input bg-surface px-3 text-sm font-semibold outline-none focus:border-leaf" />
            <Button type="submit" variant="brand" size="xl" className="w-full">Verify & update</Button>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent className="max-w-[360px] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>This removes your orders, addresses, wishlist and saved payments. This can't be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Keep account</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { deleteAccount(); toast("Your account has been deleted"); navigate({ to: "/login", replace: true }); }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Page>
  );
}
