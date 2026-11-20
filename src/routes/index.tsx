import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/rc/Logo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RocksCart – Fresh vegetables, fruits & pulses delivered" },
      { name: "description", content: "RocksCart brings farm-fresh vegetables, fruits and pulses to your doorstep in minutes." },
      { property: "og:title", content: "RocksCart – Freshness at your doorstep" },
      { property: "og:description", content: "Farm-fresh vegetables, fruits and pulses delivered in minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const { user } = useStore();
  const userRef = useRef(user);
  userRef.current = user;

  useEffect(() => {
    const t = window.setTimeout(() => navigate({ to: userRef.current ? "/home" : "/login", replace: true }), 2200);
    return () => window.clearTimeout(t);
  }, [navigate]);

  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-leaf-soft" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-primary" />
      <div className="absolute -bottom-10 right-40 h-24 w-24 rounded-full bg-sun/80" />
      <div className="relative z-10 flex flex-col items-center px-10">
        <Logo className="animate-pop w-64" />
        <span className="sr-only">Freshness at your doorstep</span>
      </div>
      <div className="absolute bottom-10 z-10 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-bounce rounded-full bg-primary-foreground"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </main>
  );
}
