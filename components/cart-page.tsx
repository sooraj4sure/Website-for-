"use client";

import { useState } from "react";
import Link from "next/link";
import type { Business } from "@/lib/businesses";
import { categoryMeta } from "@/lib/full";
import { useCart, billWhatsAppLink } from "./cart";

export function CartPageBody({ b }: { b: Business }) {
  const { items, total, setQty, remove, clear } = useCart();
  const meta = categoryMeta(b);
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const unpriced = items.filter((i) => i.price === null);
  const inputCls = "w-full rounded-xl border border-[#E8DDD0] bg-white px-4 py-3 text-base outline-none focus:border-[#C9A227]";

  function order(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !table.trim() || !mobile.trim()) {
      setError("Please fill in your name, table number and mobile number.");
      return;
    }
    setError("");
    window.open(billWhatsAppLink(b, items, { name, table, mobile }), "_blank");
    setSent(true);
    clear();
  }

  if (sent) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="font-display text-4xl font-bold">Bill sent! 🧾</p>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-neutral-600">
          Your temp bill opened in WhatsApp to {b.name}. Once they confirm, your
          table order is on its way. Your table is now empty — start a new one
          whenever you like.
        </p>
        <Link href={`/site/${b.slug}/${meta.offeringsSlug}`} className="mt-8 inline-flex min-h-[52px] items-center rounded-2xl bg-[#171310] px-6 py-3 font-bold text-[#F5D98B]">
          Back to the {meta.offeringsLabel.toLowerCase()} →
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="font-display text-4xl font-bold">Your table is empty.</p>
        <p className="mt-4 text-neutral-600">Add dishes from the menu and they will collect here.</p>
        <Link href={`/site/${b.slug}/${meta.offeringsSlug}`} className="mt-8 inline-flex min-h-[52px] items-center rounded-2xl bg-[#171310] px-6 py-3 font-bold text-[#F5D98B]">
          Browse the {meta.offeringsLabel.toLowerCase()} →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A6D3B]">My Table</p>
      <h1 className="font-display mt-2 text-4xl font-bold sm:text-5xl">Your table at {b.name}</h1>
      <p className="mt-3 text-neutral-600">Everything you added, one by one. Change quantities, remove anything, then order the whole table at once.</p>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div key={item.name} className="menu-card flex items-center justify-between gap-4 rounded-3xl border border-[#E8DDD0] bg-white p-5">
            <div className="min-w-0">
              <p className="font-doodle text-[28px] leading-none">{item.name}</p>
              <p className="mt-1 text-sm font-bold text-[#8A6D3B]">
                {item.price !== null ? `₹${(item.price * item.qty).toLocaleString("en-IN")}` : "Price on confirmation"}
                {item.sample ? " · Sample" : ""}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={() => setQty(item.name, item.qty - 1)} className="btn-press flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#171310] text-lg font-bold">−</button>
              <span className="w-8 text-center text-lg font-bold">{item.qty}</span>
              <button type="button" onClick={() => setQty(item.name, item.qty + 1)} className="btn-press flex h-11 w-11 items-center justify-center rounded-full bg-[#171310] text-lg font-bold text-[#F5D98B]">＋</button>
              <button type="button" onClick={() => remove(item.name)} className="ml-1 text-sm font-bold text-red-700 underline">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-[#171310] p-6 text-white sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-bold">Total (priced items)</span>
          <span className="font-display text-3xl font-bold text-[#F5D98B]">₹{total.toLocaleString("en-IN")}</span>
        </div>
        {unpriced.length > 0 && (
          <p className="mt-2 text-sm text-[#D8C9AE]">{unpriced.length} item{unpriced.length > 1 ? "s" : ""} will be priced on confirmation by the business.</p>
        )}
        <button type="button" onClick={() => clear()} className="mt-4 text-sm font-bold text-[#D8C9AE] underline">Clear table</button>
      </div>

      <form onSubmit={order} className="mt-8 space-y-4 rounded-3xl border border-[#E8DDD0] bg-white p-5 sm:p-6">
        <h2 className="font-display text-2xl font-bold">Order this table</h2>
        <p className="text-sm text-neutral-600">
          Instead of a checkout, this generates a temp bill and sends it straight
          to {b.name} on WhatsApp ({b.phone}) for confirmation. No payment is taken here.
        </p>
        <label className="block">
          <span className="text-sm font-bold text-neutral-700">Your name *</span>
          <input className={`${inputCls} mt-1`} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya Sharma" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold text-neutral-700">Table number *</span>
            <input className={`${inputCls} mt-1`} value={table} onChange={(e) => setTable(e.target.value)} placeholder="e.g. 12" />
          </label>
          <label className="block">
            <span className="text-sm font-bold text-neutral-700">Mobile number *</span>
            <input className={`${inputCls} mt-1`} value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="e.g. 98XXX XXXXX" inputMode="tel" />
          </label>
        </div>
        {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
        <button type="submit" className="btn-press min-h-[56px] w-full rounded-2xl bg-[#25D366] text-base font-bold text-black">
          🧾 Generate Bill &amp; Send on WhatsApp
        </button>
      </form>
    </div>
  );
}
