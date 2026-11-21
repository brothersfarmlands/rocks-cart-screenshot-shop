import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import type { Address, AddressLabel } from "@/lib/store";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Form = Omit<Address, "id" | "isDefault"> & { isDefault: boolean };

const empty: Form = {
  label: "Home", name: "", mobile: "", house: "", street: "", landmark: "", city: "", state: "", pincode: "", isDefault: false,
};

const fields: { key: keyof Form; label: string; placeholder: string; half?: boolean; inputMode?: "numeric" | "tel" }[] = [
  { key: "name", label: "Full name", placeholder: "e.g. Priya Sharma" },
  { key: "mobile", label: "Mobile number", placeholder: "10-digit number", inputMode: "tel" },
  { key: "house", label: "House / Flat no.", placeholder: "e.g. B-204, Green Valley" },
  { key: "street", label: "Street / Area", placeholder: "e.g. Sector 21, Dwarka" },
  { key: "landmark", label: "Landmark (optional)", placeholder: "e.g. Near Metro Station" },
  { key: "city", label: "City", placeholder: "City", half: true },
  { key: "state", label: "State", placeholder: "State", half: true },
  { key: "pincode", label: "Pincode", placeholder: "6-digit pincode", inputMode: "numeric" },
];

export function AddressFormSheet({
  open,
  onOpenChange,
  address,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  address?: Address | null;
  onSaved?: () => void;
}) {
  const { saveAddress } = useStore();
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  useEffect(() => {
    if (open) {
      setForm(address ? { ...address } : empty);
      setErrors({});
    }
  }, [open, address]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Enter a name";
    if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\D/g, ""))) e.mobile = "Enter a valid 10-digit mobile number";
    if (!form.house.trim()) e.house = "Required";
    if (!form.street.trim()) e.street = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a 6-digit pincode";
    setErrors(e);
    if (Object.keys(e).length) return;
    saveAddress({ ...form, id: address?.id });
    toast.success(address ? "Address updated" : "Address added");
    onOpenChange(false);
    onSaved?.();
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-h-[92dvh] max-w-[430px] bg-background">
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-display text-primary">{address ? "Edit address" : "Add new address"}</DrawerTitle>
          <DrawerDescription>Where should we deliver your groceries?</DrawerDescription>
        </DrawerHeader>
        <form
          className="overflow-y-auto px-4 pb-6"
          onSubmit={(ev) => {
            ev.preventDefault();
            submit();
          }}
        >
          <p className="mb-2 text-xs font-bold text-muted-foreground">Save as</p>
          <div className="mb-4 flex gap-2">
            {(["Home", "Work", "Other"] as AddressLabel[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => set("label", l)}
                aria-pressed={form.label === l}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-bold",
                  form.label === l ? "border-leaf bg-leaf-soft text-primary" : "border-border bg-surface text-muted-foreground",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {fields.map((f) => (
              <label key={f.key} className={cn("block", f.half ? "col-span-1" : "col-span-2")}>
                <span className="mb-1 block text-xs font-bold text-muted-foreground">{f.label}</span>
                <input
                  value={String(form[f.key] ?? "")}
                  inputMode={f.inputMode}
                  placeholder={f.placeholder}
                  onChange={(e) =>
                    set(f.key, (f.key === "pincode" ? e.target.value.replace(/\D/g, "").slice(0, 6) : e.target.value) as never)
                  }
                  className={cn(
                    "h-11 w-full rounded-xl border-2 bg-surface px-3 text-sm font-semibold outline-none focus:border-leaf",
                    errors[f.key] ? "border-destructive" : "border-input",
                  )}
                />
                {errors[f.key] && <span className="mt-1 block text-[11px] font-semibold text-destructive">{errors[f.key]}</span>}
              </label>
            ))}
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={form.isDefault} onChange={(e) => set("isDefault", e.target.checked)} className="h-4 w-4 accent-[var(--leaf)]" />
            Set as default address
          </label>
          <Button type="submit" variant="brand" size="xl" className="mt-5 w-full">
            Save address
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
