import { Link, useLocation } from "@tanstack/react-router";
import { Heart, Home, LayoutGrid, Package, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/categories", label: "Categories", icon: LayoutGrid },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/orders", label: "Orders", icon: Package },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  const { wishlist } = useStore();
  return (
    <nav
      aria-label="Main"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to === "/categories" && pathname.startsWith("/category"));
          return (
            <li key={to}>
              <Link
                to={to}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {active && <span className="absolute top-0 h-1 w-8 rounded-b-full bg-leaf" />}
                <span className="relative">
                  <Icon className={cn("h-[22px] w-[22px]", active && "fill-leaf-soft")} strokeWidth={active ? 2.4 : 2} />
                  {to === "/wishlist" && wishlist.length > 0 && (
                    <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-sun px-1 text-[9px] font-extrabold text-sun-foreground">
                      {wishlist.length}
                    </span>
                  )}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
