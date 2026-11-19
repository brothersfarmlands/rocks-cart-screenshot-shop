import logo from "@/assets/rockscart-logo.png.asset.json";
import icon from "@/assets/rockscart-icon.png.asset.json";
import { cn } from "@/lib/utils";

export function Logo({ variant = "full", className }: { variant?: "full" | "icon"; className?: string }) {
  const src = variant === "full" ? logo.url : icon.url;
  return <img src={src} alt="RocksCart" className={cn("select-none object-contain", className)} draggable={false} />;
}
