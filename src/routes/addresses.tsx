import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddressCard } from "@/components/rc/AddressCard";
import { AddressFormSheet } from "@/components/rc/AddressFormSheet";
import { EmptyState } from "@/components/rc/EmptyState";
import { Page } from "@/components/rc/Page";
import { TopBar } from "@/components/rc/TopBar";
import { useStore, type Address } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/addresses")({
  head: () => pageHead("Saved Addresses", "Add, edit and manage your RocksCart delivery addresses."),
  component: Addresses,
});

function Addresses() {
  const { addresses, deleteAddress, setDefaultAddress, selectAddress, selectedAddress } = useStore();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [toDelete, setToDelete] = useState<Address | null>(null);

  return (
    <Page nav={false} cartBar={false} className="pb-28">
      <TopBar title="Saved Addresses" subtitle="Tap an address to deliver there" fallback="/profile" />
      <div className="space-y-3 px-4">
        {addresses.length === 0 ? (
          <EmptyState icon={MapPin} title="No saved addresses" text="Add an address to get your groceries delivered." />
        ) : (
          addresses.map((a) => (
            <AddressCard
              key={a.id}
              address={a}
              selected={selectedAddress?.id === a.id}
              onSelect={() => { selectAddress(a.id); toast(`Delivering to ${a.label}`); }}
              onEdit={() => { setEditing(a); setFormOpen(true); }}
              onDelete={() => setToDelete(a)}
              onSetDefault={() => { setDefaultAddress(a.id); toast.success(`${a.label} set as default`); }}
            />
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur">
        <Button variant="brand" size="xl" className="w-full" onClick={() => { setEditing(null); setFormOpen(true); }}>
          <Plus className="h-5 w-5" /> Add New Address
        </Button>
      </div>

      <AddressFormSheet open={formOpen} onOpenChange={setFormOpen} address={editing} />

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent className="max-w-[360px] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Delete this address?</AlertDialogTitle>
            <AlertDialogDescription>{toDelete?.label} · {toDelete?.street}, {toDelete?.city}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { if (toDelete) { deleteAddress(toDelete.id); toast("Address deleted"); } setToDelete(null); }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Page>
  );
}
