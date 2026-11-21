import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bell, CreditCard, Heart, HelpCircle, Info, LogOut, MapPin, Package, Pencil, Share2, ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MenuGroup, ProfileMenuItem } from "@/components/rc/ProfileMenuItem";
import { Page } from "@/components/rc/Page";
import { useStore } from "@/lib/store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/profile")({
  head: () => pageHead("My Profile", "Manage your RocksCart account, addresses, payments and preferences."),
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();
  const { user, orders, wishlist, addresses, payments, logout, updateUser } = useStore();
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const initials = (user?.name ?? "Guest").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <Page>
      <section className="relative overflow-hidden bg-gradient-brand px-4 pb-16 pt-8 text-primary-foreground">
        <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-leaf/25" />
        <span className="absolute bottom-2 left-24 h-16 w-16 rounded-full bg-sun/25" />
        <div className="relative flex items-center gap-4">
          <span className="grid h-18 w-18 shrink-0 place-items-center rounded-full border-4 border-primary-foreground/25 bg-sun font-display text-2xl font-extrabold text-sun-foreground" style={{ height: 72, width: 72 }}>
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-extrabold">{user?.name ?? "Guest user"}</h1>
            <p className="text-sm opacity-85">{user ? `+91 ${user.phone}` : "Log in to sync your orders"}</p>
            {user?.email && <p className="truncate text-xs opacity-70">{user.email}</p>}
          </div>
          {user ? (
            <button
              type="button"
              aria-label="Edit profile"
              onClick={() => { setName(user.name); setEmail(user.email ?? ""); setEditOpen(true); }}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-foreground/15"
            >
              <Pencil className="h-4 w-4" />
            </button>
          ) : (
            <Button variant="sun" size="sm" className="rounded-xl" asChild><Link to="/login">Log in</Link></Button>
          )}
        </div>
      </section>

      <div className="relative -mt-10 grid grid-cols-3 gap-3 px-4">
        {[
          { label: "Orders", value: orders.length, to: "/orders", icon: Package },
          { label: "Wishlist", value: wishlist.length, to: "/wishlist", icon: Heart },
          { label: "Addresses", value: addresses.length, to: "/addresses", icon: MapPin },
        ].map((s) => (
          <Link key={s.label} to={s.to} className="flex flex-col items-center rounded-2xl bg-card py-3 shadow-card">
            <s.icon className="h-5 w-5 text-leaf" />
            <span className="mt-1 font-display text-lg font-extrabold text-primary">{s.value}</span>
            <span className="text-[11px] font-semibold text-muted-foreground">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-6 space-y-5">
        <MenuGroup title="Shopping">
          <ProfileMenuItem icon={Package} label="My Orders" description="Track, reorder & view history" to="/orders" />
          <ProfileMenuItem icon={Heart} label="My Wishlist" description={`${wishlist.length} saved items`} to="/wishlist" />
          <ProfileMenuItem icon={MapPin} label="Saved Addresses" description={`${addresses.length} addresses`} to="/addresses" />
          <ProfileMenuItem icon={CreditCard} label="Payment Settings" description={`${payments.length} saved methods`} to="/payments" />
        </MenuGroup>
        <MenuGroup title="Settings">
          <ProfileMenuItem icon={Bell} label="Notification Preferences" to="/notifications" />
          <ProfileMenuItem icon={ShieldCheck} label="Account Privacy" to="/privacy" />
        </MenuGroup>
        <MenuGroup title="More">
          <ProfileMenuItem icon={Share2} label="Share App" description="Invite friends, earn ₹100" to="/share" badge="₹100" />
          <ProfileMenuItem icon={Info} label="About Us" to="/about" />
          <ProfileMenuItem icon={HelpCircle} label="Help & Support" to="/help" />
        </MenuGroup>
        {user && (
          <MenuGroup>
            <ProfileMenuItem
              icon={LogOut}
              label="Logout"
              danger
              onClick={() => {
                logout();
                toast("You've been logged out");
                navigate({ to: "/login", replace: true });
              }}
            />
          </MenuGroup>
        )}
        <p className="pb-2 text-center text-xs text-muted-foreground">RocksCart v1.0.0 · Freshness at your doorstep</p>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-[360px] rounded-3xl bg-background">
          <DialogHeader>
            <DialogTitle className="font-display text-primary">Edit profile</DialogTitle>
            <DialogDescription>Update how we greet you.</DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name.trim()) return;
              updateUser({ name: name.trim(), email: email.trim() });
              setEditOpen(false);
              toast.success("Profile updated");
            }}
          >
            <label className="block">
              <span className="mb-1 block text-xs font-bold text-muted-foreground">Full name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="h-11 w-full rounded-xl border-2 border-input bg-surface px-3 text-sm font-semibold outline-none focus:border-leaf" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold text-muted-foreground">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-xl border-2 border-input bg-surface px-3 text-sm font-semibold outline-none focus:border-leaf" />
            </label>
            <Button type="submit" variant="brand" size="xl" className="w-full">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </Page>
  );
}
