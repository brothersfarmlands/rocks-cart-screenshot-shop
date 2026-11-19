import { useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BackButton({ fallback = "/home", className }: { fallback?: string; className?: string }) {
  const router = useRouter();
  const navigate = useNavigate();
  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
        else navigate({ to: fallback });
      }}
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface text-primary shadow-card transition active:scale-95",
        className,
      )}
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}

export function TopBar({
  title,
  subtitle,
  right,
  back = true,
  fallback,
  className,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  back?: boolean;
  fallback?: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 bg-background/90 px-4 py-3 backdrop-blur-md",
        className,
      )}
    >
      {back ? <BackButton fallback={fallback} /> : <span />}
      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold text-primary">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">{right}</div>
    </header>
  );
}
