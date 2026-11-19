import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { CartBar } from "./CartBar";
import { cn } from "@/lib/utils";

/** Standard screen wrapper: content + optional bottom navigation and floating cart bar. */
export function Page({
  children,
  nav = true,
  cartBar = true,
  className,
}: {
  children: ReactNode;
  nav?: boolean;
  cartBar?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-dvh flex-1 flex-col", nav ? "pb-36" : cartBar ? "pb-24" : "pb-6", className)}>
      {children}
      {cartBar && <CartBar withNav={nav} />}
      {nav && <BottomNav />}
    </div>
  );
}
