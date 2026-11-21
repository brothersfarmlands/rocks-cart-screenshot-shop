import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/help")({
  head: () => pageHead("Help & Support", "Get help with RocksCart orders, deliveries, refunds and payments."),
  component: Help,
});

const faqs = [
  { q: "How fast is delivery?", a: "Most orders arrive within 15 minutes from your nearest RocksCart store." },
  { q: "Is there a minimum order value?", a: "No minimum! Delivery is free on orders above ₹199; below that a ₹25 fee applies." },
  { q: "What if an item is damaged or not fresh?", a: "Report it within 24 hours from My Orders and we'll refund or replace it – no questions asked." },
  { q: "Which payment methods are accepted?", a: "UPI, debit/credit cards and Cash on Delivery." },
  { q: "Can I change my delivery address after ordering?", a: "Contact support right away and we'll try to update it before your order is packed." },
];

function Help() {
  return (
    <Page nav={false} cartBar={false}>
      <TopBar title="Help & Support" fallback="/profile" />
      <div className="space-y-5 px-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: MessageCircle, label: "Chat" },
            { icon: Phone, label: "Call us" },
            { icon: Mail, label: "Email" },
          ].map((c) => (
            <button key={c.label} type="button" onClick={() => toast(`${c.label} support opens here (demo)`)} className="flex flex-col items-center gap-2 rounded-2xl bg-card py-4 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-leaf-soft text-primary"><c.icon className="h-5 w-5" /></span>
              <span className="text-xs font-bold">{c.label}</span>
            </button>
          ))}
        </div>
        <section>
          <h2 className="mb-2 text-base font-extrabold text-primary">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="overflow-hidden rounded-2xl bg-card px-4 shadow-card">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`} className={i === faqs.length - 1 ? "border-b-0" : ""}>
                <AccordionTrigger className="text-left text-sm font-bold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </Page>
  );
}
