import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeader({
  title,
  subtitle,
  icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: { label: string; to: string; params?: Record<string, string> };
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3 px-4">
      <div className="min-w-0">
        <h2 className="flex items-center gap-2 truncate text-lg font-extrabold text-primary">
          {icon}
          {title}
        </h2>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action && (
        <Link
          to={action.to}
          params={(action.params ?? {}) as never}
          className="flex shrink-0 items-center text-sm font-bold text-leaf"
        >
          {action.label} <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
