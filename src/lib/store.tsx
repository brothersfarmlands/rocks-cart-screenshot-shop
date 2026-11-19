import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getProduct } from "./data";
import { computeBill, findCoupon, type Coupon } from "./pricing";

export interface CartItem {
  productId: string;
  variantIndex: number;
  qty: number;
}

export type AddressLabel = "Home" | "Work" | "Other";

export interface Address {
  id: string;
  label: AddressLabel;
  name: string;
  mobile: string;
  house: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export type OrderStatus = "placed" | "packed" | "out_for_delivery" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  variantIndex: number;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  status: OrderStatus;
  address: string;
  payment: string;
}

export interface PaymentMethod {
  id: string;
  type: "upi" | "card";
  label: string;
  detail: string;
  isDefault: boolean;
}

export interface NotificationPrefs {
  orders: boolean;
  offers: boolean;
  newProducts: boolean;
  promotions: boolean;
}

export interface User {
  name: string;
  phone: string;
  email?: string;
}

interface PersistedState {
  user: User | null;
  cart: CartItem[];
  wishlist: string[];
  couponCode: string | null;
  addresses: Address[];
  selectedAddressId: string | null;
  orders: Order[];
  payments: PaymentMethod[];
  prefs: NotificationPrefs;
}

const daysAgo = (d: number, h = 10) => {
  const date = new Date();
  date.setDate(date.getDate() - d);
  date.setHours(h, 24, 0, 0);
  return date.toISOString();
};

const initialState: PersistedState = {
  user: null,
  cart: [],
  wishlist: ["mango", "rajma", "pomegranate"],
  couponCode: null,
  addresses: [
    {
      id: "a1", label: "Home", name: "Rahul Aggarwal", mobile: "98765 43210", house: "B-204, Green Valley Apartments",
      street: "Sector 21, Dwarka", landmark: "Near Metro Station", city: "New Delhi", state: "Delhi", pincode: "110077", isDefault: true,
    },
    {
      id: "a2", label: "Work", name: "Rahul Aggarwal", mobile: "98765 43210", house: "4th Floor, Tower C, Cyber Park",
      street: "DLF Phase 2", landmark: "Opp. Ambience Mall", city: "Gurugram", state: "Haryana", pincode: "122002", isDefault: false,
    },
  ],
  selectedAddressId: null,
  orders: [
    {
      id: "RC10482", date: daysAgo(0, 9), status: "out_for_delivery", address: "Home · Sector 21, Dwarka", payment: "UPI · rahul@okaxis",
      items: [
        { productId: "tomato", variantIndex: 2, qty: 1, price: 38 },
        { productId: "onion", variantIndex: 2, qty: 1, price: 42 },
        { productId: "mango", variantIndex: 0, qty: 1, price: 249 },
      ],
      subtotal: 329, delivery: 0, discount: 0, total: 329,
    },
    {
      id: "RC10371", date: daysAgo(4, 18), status: "delivered", address: "Home · Sector 21, Dwarka", payment: "Card · •••• 4821",
      items: [
        { productId: "toordal", variantIndex: 2, qty: 1, price: 165 },
        { productId: "banana", variantIndex: 0, qty: 2, price: 39 },
        { productId: "greenchilli", variantIndex: 0, qty: 1, price: 12 },
      ],
      subtotal: 255, delivery: 0, discount: 25, total: 230,
    },
    {
      id: "RC10255", date: daysAgo(11, 8), status: "delivered", address: "Work · DLF Phase 2", payment: "Cash on Delivery",
      items: [
        { productId: "apple", variantIndex: 0, qty: 1, price: 119 },
        { productId: "grapes", variantIndex: 0, qty: 1, price: 69 },
      ],
      subtotal: 188, delivery: 25, discount: 0, total: 213,
    },
  ],
  payments: [
    { id: "p1", type: "upi", label: "Google Pay UPI", detail: "rahul@okaxis", isDefault: true },
    { id: "p2", type: "card", label: "HDFC Bank Debit Card", detail: "•••• 4821 · Exp 08/28", isDefault: false },
  ],
  prefs: { orders: true, offers: true, newProducts: false, promotions: false },
};

const STORAGE_KEY = "rockscart:v1";

const uid = (prefix: string) => `${prefix}${Math.random().toString(36).slice(2, 8)}`;

function useStoreState() {
  const [state, setState] = useState<PersistedState>(initialState);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const update = useCallback((fn: (s: PersistedState) => PersistedState) => setState(fn), []);

  // Cart
  const getQty = useCallback(
    (productId: string, variantIndex: number) =>
      state.cart.find((c) => c.productId === productId && c.variantIndex === variantIndex)?.qty ?? 0,
    [state.cart],
  );
  const setQty = useCallback(
    (productId: string, variantIndex: number, qty: number) =>
      update((s) => {
        const rest = s.cart.filter((c) => !(c.productId === productId && c.variantIndex === variantIndex));
        if (qty <= 0) return { ...s, cart: rest };
        const exists = s.cart.some((c) => c.productId === productId && c.variantIndex === variantIndex);
        const cart = exists
          ? s.cart.map((c) => (c.productId === productId && c.variantIndex === variantIndex ? { ...c, qty } : c))
          : [...s.cart, { productId, variantIndex, qty }];
        return { ...s, cart };
      }),
    [update],
  );

  const cartLines = useMemo(
    () =>
      state.cart
        .map((c) => {
          const product = getProduct(c.productId);
          const variant = product?.variants[c.variantIndex];
          return product && variant ? { ...c, product, variant } : null;
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [state.cart],
  );

  const coupon: Coupon | undefined = state.couponCode ? findCoupon(state.couponCode) : undefined;
  const bill = useMemo(
    () => computeBill(cartLines.map((l) => ({ price: l.variant.price, mrp: l.variant.mrp, qty: l.qty })), coupon),
    [cartLines, coupon],
  );

  const defaultAddress = state.addresses.find((a) => a.isDefault) ?? state.addresses[0];
  const selectedAddress = state.addresses.find((a) => a.id === state.selectedAddressId) ?? defaultAddress;

  return {
    ...state,
    hydrated: hydrated.current,
    cartLines,
    bill,
    coupon,
    defaultAddress,
    selectedAddress,
    getQty,
    setQty,
    addToCart: (productId: string, variantIndex: number) => setQty(productId, variantIndex, getQty(productId, variantIndex) + 1),
    clearCart: () => update((s) => ({ ...s, cart: [], couponCode: null })),
    applyCoupon: (code: string | null) => update((s) => ({ ...s, couponCode: code })),

    // Wishlist
    isWishlisted: (id: string) => state.wishlist.includes(id),
    toggleWishlist: (id: string) =>
      update((s) => ({
        ...s,
        wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [id, ...s.wishlist],
      })),

    // Addresses
    saveAddress: (address: Omit<Address, "id" | "isDefault"> & { id?: string; isDefault?: boolean }) =>
      update((s) => {
        const id = address.id ?? uid("a");
        const makeDefault = address.isDefault || s.addresses.length === 0;
        let addresses = s.addresses.some((a) => a.id === id)
          ? s.addresses.map((a) => (a.id === id ? { ...a, ...address, id, isDefault: a.isDefault || !!makeDefault } : a))
          : [...s.addresses, { ...address, id, isDefault: !!makeDefault }];
        if (makeDefault) addresses = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
        return { ...s, addresses };
      }),
    deleteAddress: (id: string) =>
      update((s) => {
        let addresses = s.addresses.filter((a) => a.id !== id);
        if (addresses.length && !addresses.some((a) => a.isDefault)) addresses = addresses.map((a, i) => ({ ...a, isDefault: i === 0 }));
        return { ...s, addresses, selectedAddressId: s.selectedAddressId === id ? null : s.selectedAddressId };
      }),
    setDefaultAddress: (id: string) =>
      update((s) => ({ ...s, addresses: s.addresses.map((a) => ({ ...a, isDefault: a.id === id })) })),
    selectAddress: (id: string) => update((s) => ({ ...s, selectedAddressId: id })),

    // Orders
    placeOrder: (payment: string) => {
      const id = `RC${Math.floor(10500 + Math.random() * 8999)}`;
      const addr = selectedAddress;
      const order: Order = {
        id,
        date: new Date().toISOString(),
        items: cartLines.map((l) => ({ productId: l.productId, variantIndex: l.variantIndex, qty: l.qty, price: l.variant.price })),
        subtotal: bill.subtotal,
        delivery: bill.delivery,
        discount: bill.discount,
        total: bill.total,
        status: "placed",
        address: addr ? `${addr.label} · ${addr.street}` : "—",
        payment,
      };
      update((s) => ({ ...s, orders: [order, ...s.orders], cart: [], couponCode: null }));
      return id;
    },
    reorder: (order: Order) =>
      update((s) => {
        const cart = [...s.cart];
        for (const it of order.items) {
          const i = cart.findIndex((c) => c.productId === it.productId && c.variantIndex === it.variantIndex);
          if (i >= 0) cart[i] = { ...cart[i], qty: cart[i].qty + it.qty };
          else cart.push({ productId: it.productId, variantIndex: it.variantIndex, qty: it.qty });
        }
        return { ...s, cart };
      }),

    // Payments
    addPayment: (p: Omit<PaymentMethod, "id" | "isDefault">) =>
      update((s) => ({ ...s, payments: [...s.payments, { ...p, id: uid("p"), isDefault: s.payments.length === 0 }] })),
    removePayment: (id: string) =>
      update((s) => {
        let payments = s.payments.filter((p) => p.id !== id);
        if (payments.length && !payments.some((p) => p.isDefault)) payments = payments.map((p, i) => ({ ...p, isDefault: i === 0 }));
        return { ...s, payments };
      }),
    setDefaultPayment: (id: string) =>
      update((s) => ({ ...s, payments: s.payments.map((p) => ({ ...p, isDefault: p.id === id })) })),

    // Preferences & account
    setPref: (key: keyof NotificationPrefs, value: boolean) => update((s) => ({ ...s, prefs: { ...s.prefs, [key]: value } })),
    login: (phone: string) =>
      update((s) => ({ ...s, user: { name: s.user?.name ?? "Rahul Aggarwal", phone, email: s.user?.email ?? "rahul@example.com" } })),
    updateUser: (patch: Partial<User>) => update((s) => (s.user ? { ...s, user: { ...s.user, ...patch } } : s)),
    logout: () => update((s) => ({ ...s, user: null })),
    deleteAccount: () => {
      setState({ ...initialState, user: null, orders: [], addresses: [], payments: [], wishlist: [] });
    },
  };
}

type Store = ReturnType<typeof useStoreState>;
const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const store = useStoreState();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
