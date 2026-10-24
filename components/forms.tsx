"use client";

import { useState } from "react";
import type { Business } from "@/lib/businesses";
import { categoryMeta, whatsappLink } from "@/lib/full";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-neutral-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputCls = "w-full rounded-xl border border-[#E8DDD0] bg-white px-4 py-3 text-base outline-none focus:border-[#C9A227]";

export function BookingForm({ b }: { b: Business }) {
  const meta = categoryMeta(b);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [interest, setInterest] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const interests = [...b.signatureItems, ...b.servicesOrMenu.map((s) => s.name)];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please add your name and phone number so they can confirm.");
      return;
    }
    setError("");
    const msg = `Hi ${b.name}! I'd like to ${meta.bookingLabel.toLowerCase()}.\nName: ${name}\nPhone: ${phone}\n${interest ? `Interested in: ${interest}\n` : ""}${date ? `Preferred date: ${date}\n` : ""}${time ? `Preferred time: ${time}\n` : ""}${notes ? `Notes: ${notes}` : ""}`;
    window.open(whatsappLink(b, msg), "_blank");
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-[#E8DDD0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-6">
      <p className="text-sm text-neutral-600">
        Fill this in and it opens WhatsApp with your request ready to send to {b.name} — no account, no payment, nothing stored here.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name *">
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya Sharma" />
        </Field>
        <Field label="Your phone *">
          <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 98XXX XXXXX" inputMode="tel" />
        </Field>
        <Field label="Preferred date">
          <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Preferred time">
          <input type="time" className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} />
        </Field>
      </div>
      <Field label={`What are you interested in? (${meta.offeringsLabel})`}>
        <select className={inputCls} value={interest} onChange={(e) => setInterest(e.target.value)}>
          <option value="">Anything — please advise me</option>
          {interests.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </Field>
      <Field label="Anything else?">
        <textarea className={inputCls} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Occasion, group size, questions…" />
      </Field>
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <button type="submit" className="min-h-[52px] w-full rounded-2xl bg-[#25D366] text-base font-bold text-black">
        💬 Send on WhatsApp — {meta.bookingLabel}
      </button>
      <p className="text-center text-sm text-neutral-500">
        Prefer to talk? <a href={`tel:${b.phone}`} className="font-bold text-neutral-800 underline">Call {b.phone}</a>
      </p>
    </form>
  );
}

export function ContactForm({ b }: { b: Business }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please add your name and a message.");
      return;
    }
    setError("");
    const msg = `Hi ${b.name}! I'm ${name}${phone ? ` (${phone})` : ""}.\n${message}`;
    window.open(whatsappLink(b, msg), "_blank");
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-3xl border border-[#E8DDD0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name *">
          <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </Field>
        <Field label="Your phone (optional)">
          <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98XXX XXXXX" inputMode="tel" />
        </Field>
      </div>
      <Field label="Message *">
        <textarea className={inputCls} rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Hi, I'd like to ask about…" />
      </Field>
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <button type="submit" className="min-h-[52px] w-full rounded-2xl bg-[#171310] text-base font-bold text-[#F5D98B]">💬 Send message on WhatsApp</button>
    </form>
  );
}
