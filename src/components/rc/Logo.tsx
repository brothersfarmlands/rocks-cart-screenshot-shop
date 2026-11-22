import logo from "@/assets/rockscart-logo.png";
import icon from "@/assets/rockscart-icon.png";
import { cn } from "@/lib/utils";

export function Logo({ variant = "full", className }: { variant?: "full" | "icon"; className?: string }) {
  const src = variant === "full" ? logo : icon;
  return <img src={src} alt="RocksCart" className={cn("select-none object-contain", className)} draggable={false} />;
}
