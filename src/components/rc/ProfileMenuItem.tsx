import { Link } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  icon: LucideIcon;
  label: string;
  description?: string;
  to?: string;
  onClick?: () => void;
  danger?: boolean;
  badge?: string;
}

export function ProfileMenuItem({ icon: Icon, label, description, to, onClick, danger, badge }: Props) {
  const inner = (
    <>
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
          danger ? "bg-destructive/10 text-destructive" : "bg-secondary text-primary",
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn("block truncate text-sm font-bold", danger ? "text-destructive" : "text-foreground")}>{label}</span>
        {description && <span className="block truncate text-xs text-muted-foreground">{description}</span>}
      </span>
      {badge && <span className="rounded-full bg-sun px-2 py-0.5 text-[10px] font-extrabold text-sun-foreground">{badge}</span>}
      {!danger && <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />}
    </>
  );
  const cls = "flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-muted/60 active:bg-muted";
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export function MenuGroup({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="px-4">
      {title && <h2 className="mb-2 px-1 text-xs font-extrabold uppercase tracking-widest text-muted-foreground">{title}</h2>}
      <div className="divide-y divide-border overflow-hidden rounded-2xl bg-card shadow-card">{children}</div>
    </section>
  );
}
