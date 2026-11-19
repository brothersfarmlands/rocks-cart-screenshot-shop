import type { ReactNode } from "react";

/** Centers the app in a phone-width column so desktop reviewers see the true mobile layout. */
export function AppFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-backdrop leaf-pattern">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background shadow-frame">
        {children}
      </div>
    </div>
  );
}
