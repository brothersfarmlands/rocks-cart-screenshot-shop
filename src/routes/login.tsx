import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/rc/Logo";
import { useStore } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => pageHead("Login or Sign up", "Log in to RocksCart with your mobile number to order fresh groceries."),
  component: Login,
});

export function GoogleIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
  );
}

function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [phone, setPhone] = useState("");
  const valid = /^[6-9]\d{9}$/.test(phone);

  return (
    <main className="flex min-h-dvh flex-1 flex-col">
      <section className="relative flex flex-col items-center overflow-hidden bg-gradient-header px-6 pb-10 pt-14">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-leaf/15" />
        <Logo className="relative w-52" />
      </section>

      <section className="-mt-6 flex flex-1 flex-col rounded-t-[2rem] bg-surface px-6 pb-8 pt-8 shadow-card">
        <h1 className="text-2xl font-extrabold text-primary">Login or Sign up</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter your mobile number to get started</p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!valid) return;
            navigate({ to: "/otp", search: { phone } });
          }}
        >
          <label className="flex h-14 items-center gap-3 rounded-2xl border-2 border-input bg-background px-4 focus-within:border-leaf">
            <Smartphone className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">+91</span>
            <span className="h-6 w-px bg-border" />
            <input
              inputMode="numeric"
              autoComplete="tel-national"
              aria-label="Mobile number"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="min-w-0 flex-1 bg-transparent text-base font-bold tracking-wider outline-none placeholder:font-normal placeholder:tracking-normal placeholder:text-muted-foreground"
            />
          </label>
          {phone.length === 10 && !valid && <p className="text-xs font-semibold text-destructive">Please enter a valid Indian mobile number.</p>}
          <Button type="submit" variant="brand" size="xl" className="w-full" disabled={!valid}>
            Continue
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs font-semibold text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={() => {
            login("98765 43210");
            toast.success("Signed in with Google");
            navigate({ to: "/home", replace: true });
          }}
          className="google-btn flex h-12 w-full items-center justify-center gap-[10px] rounded-2xl px-3 text-sm font-semibold transition active:scale-[0.98]"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="mt-auto pt-8">
          <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary">
            <ShieldCheck className="h-4 w-4 text-leaf" /> 100% safe & secure
          </p>
          <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link to="/privacy" hash="terms" className="font-bold text-primary underline underline-offset-2">Terms of Service</Link> and{" "}
            <Link to="/privacy" hash="policy" className="font-bold text-primary underline underline-offset-2">Privacy Policy</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
