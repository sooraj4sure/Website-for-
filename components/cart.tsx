"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import type { Business } from "@/lib/businesses";
import { whatsappLink } from "@/lib/full";

/**
 * "Add To Table" cart — yes, this is fully possible without any backend.
 * The table order lives in the customer's own browser (localStorage, one
 * cart per business), and the final bill is sent as a WhatsApp message to
 * the business's own number. No server, no payment, nothing stored by us.
 */

export interface CartItem {
  name: string;
  price: number | null; // null = price to be confirmed by the business
  sample: boolean;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (name: string) => void;
  setQty: (name: string, qty: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartProvider({ slug, children }: { slug: string; children: ReactNode }) {
  const key = `table-cart-${slug}`;
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setItems(JSON.parse(raw));
    } catch { /* empty cart */ }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (loaded) {
      try { localStorage.setItem(key, JSON.stringify(items)); } catch { /* ignore */ }
    }
  }, [items, key, loaded]);

  const value = useMemo<CartCtx>(() => ({
    items,
    count: items.reduce((s, i) => s + i.qty, 0),
    total: items.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0),
    add: (item) =>
      setItems((prev) => {
        const found = prev.find((x) => x.name === item.name);
        if (found) return prev.map((x) => (x.name === item.name ? { ...x, qty: x.qty + 1 } : x));
        return [...prev, { ...item, qty: 1 }];
      }),
    remove: (name) => setItems((prev) => prev.filter((x) => x.name !== name)),
    setQty: (name, qty) =>
      setItems((prev) => (qty <= 0 ? prev.filter((x) => x.name !== name) : prev.map((x) => (x.name === name ? { ...x, qty } : x)))),
    clear: () => setItems([]),
  }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function AddToTableButton({ b, name, price, sample }: { b: Business; name: string; price: number | null; sample: boolean }) {
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const qty = items.find((x) => x.name === name)?.qty ?? 0;
  return (
    <button
      type="button"
      onClick={() => {
        add({ name, price, sample });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
      }}
      className="btn-press flex min-h-[52px] flex-1 items-center justify-center rounded-2xl bg-[#171310] px-5 py-3 text-base font-bold text-[#F5D98B]"
    >
      {added ? "✓ Added to table" : qty > 0 ? `＋ Add again · in table (${qty})` : "＋ Add To Table"}
    </button>
  );
}

/** Floating table button — appears once something is in the table. */
export function CartFab({ b }: { b: Business }) {
  const { count, total } = useCart();
  if (count === 0) return null;
  return (
    <Link
      href={`/site/${b.slug}/cart`}
      className="fixed bottom-[76px] right-4 z-50 flex min-h-[52px] items-center gap-2 rounded-full bg-[#C9A227] px-5 py-3 text-sm font-bold text-black shadow-[0_12px_32px_rgba(0,0,0,0.25)] sm:bottom-6 sm:right-6"
    >
      🧾 My Table · {count} item{count > 1 ? "s" : ""} · ₹{total.toLocaleString("en-IN")} →
    </Link>
  );
}

/** Build the temp bill text that goes to the business on WhatsApp. */
export function buildBill(b: Business, items: CartItem[], details: { name: string; table: string; mobile: string }): string {
  const lines = items.map((i, idx) => {
    const pricePart = i.price !== null ? `₹${(i.price * i.qty).toLocaleString("en-IN")}` : "price to confirm";
    return `${idx + 1}. ${i.name} × ${i.qty} — ${pricePart}${i.sample ? " (sample price)" : ""}`;
  });
  const priced = items.filter((i) => i.price !== null);
  const total = priced.reduce((s, i) => s + (i.price ?? 0) * i.qty, 0);
  const hasSample = items.some((i) => i.sample);
  const hasUnpriced = items.some((i) => i.price === null);
  return [
    `🧾 TEMP BILL — ${b.name}`,
    `Name: ${details.name} | Table: ${details.table} | Mobile: ${details.mobile}`,
    ``,
    ...lines,
    ``,
    `Total (priced items): ₹${total.toLocaleString("en-IN")}`,
    hasUnpriced ? `Note: some items are priced on confirmation by the restaurant.` : ``,
    hasSample ? `Note: prices marked sample are illustrative — please confirm before serving.` : ``,
    ``,
    `Please confirm this table order. Thank you!`,
  ].filter((l) => l !== "").join("\n");
}

export function billWhatsAppLink(b: Business, items: CartItem[], details: { name: string; table: string; mobile: string }): string {
  return whatsappLink(b, buildBill(b, items, details));
}
