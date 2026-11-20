import { formatINR } from "@/lib/pricing";

export function BillSummary({
  bill,
  couponCode,
}: {
  bill: { subtotal: number; mrpTotal: number; productSavings: number; delivery: number; discount: number; total: number };
  couponCode?: string | null;
}) {
  const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "font-bold text-leaf" : "font-semibold"}>{value}</span>
    </div>
  );
  return (
    <section className="space-y-2.5 rounded-2xl bg-card p-4 shadow-card">
      <h2 className="mb-1 text-sm font-extrabold text-primary">Bill details</h2>
      <Row label="Item total (MRP)" value={formatINR(bill.mrpTotal)} />
      {bill.productSavings > 0 && <Row label="Product discount" value={`– ${formatINR(bill.productSavings)}`} accent />}
      <Row label="Delivery charges" value={bill.delivery === 0 ? "FREE" : formatINR(bill.delivery)} accent={bill.delivery === 0} />
      {bill.discount > 0 && <Row label={`Coupon (${couponCode})`} value={`– ${formatINR(bill.discount)}`} accent />}
      <div className="flex items-center justify-between border-t border-dashed border-border pt-3">
        <span className="font-display font-extrabold text-primary">To pay</span>
        <span className="font-display text-lg font-extrabold text-primary">{formatINR(bill.total)}</span>
      </div>
      {bill.productSavings + bill.discount > 0 && (
        <p className="rounded-xl bg-leaf-soft px-3 py-2 text-center text-xs font-bold text-primary">
          🎉 You're saving {formatINR(bill.productSavings + bill.discount)} on this order
        </p>
      )}
    </section>
  );
}
