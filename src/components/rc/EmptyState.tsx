import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text: string; action?: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
      <span className="grid h-24 w-24 place-items-center rounded-full bg-secondary text-primary">
        <Icon className="h-10 w-10" />
      </span>
      <h2 className="mt-5 text-lg font-extrabold text-primary">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
