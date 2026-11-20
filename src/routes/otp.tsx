import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { BackButton } from "@/components/rc/TopBar";
import { useStore } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/otp")({
  validateSearch: z.object({ phone: z.string().catch("") }),
  head: () => pageHead("Verify OTP", "Enter the one-time password sent to your mobile number."),
  component: Otp,
});

function Otp() {
  const { phone } = Route.useSearch();
  const navigate = useNavigate();
  const { login } = useStore();
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [seconds]);

  const verify = () => {
    if (code.length !== 4) return;
    login(phone ? `${phone.slice(0, 5)} ${phone.slice(5)}` : "98765 43210");
    toast.success("Welcome to RocksCart!");
    navigate({ to: "/home", replace: true });
  };

  return (
    <main className="flex min-h-dvh flex-1 flex-col px-6 pb-8 pt-4">
      <BackButton fallback="/login" />
      <span className="mt-8 grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-primary">
        <MessageSquareText className="h-8 w-8" />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold text-primary">Verify your number</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        We've sent a 4-digit code to <span className="font-bold text-foreground">+91 {phone || "XXXXXXXXXX"}</span>
      </p>

      <div className="mt-8 flex justify-center">
        <InputOTP maxLength={4} value={code} onChange={setCode} onComplete={verify} autoFocus aria-label="One-time password">
          <InputOTPGroup className="gap-3">
            {[0, 1, 2, 3].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="h-16 w-16 rounded-2xl border-2 border-input bg-surface font-display text-2xl font-extrabold first:rounded-2xl last:rounded-2xl data-[active=true]:border-leaf"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">Demo: enter any 4 digits</p>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Didn't receive the code?{" "}
        {seconds > 0 ? (
          <span className="font-bold text-foreground">Resend in 0:{String(seconds).padStart(2, "0")}</span>
        ) : (
          <button
            type="button"
            className="font-bold text-leaf"
            onClick={() => {
              setSeconds(30);
              toast("A new code has been sent");
            }}
          >
            Resend OTP
          </button>
        )}
      </p>

      <Button variant="brand" size="xl" className="mt-auto w-full" disabled={code.length !== 4} onClick={verify}>
        Verify & Continue
      </Button>
    </main>
  );
}
