import { notFound } from "next/navigation";
import { getBusiness, categoryMeta } from "@/lib/full";
import { Eyebrow } from "@/components/site";
import { BookingForm } from "@/components/forms";

export default function BookPage({ params }: { params: { slug: string } }) {
  const b = getBusiness(params.slug);
  if (!b) notFound();
  const meta = categoryMeta(b);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Eyebrow>{meta.bookingLabel}</Eyebrow>
      <h1 className="font-display mt-2 text-3xl font-bold sm:text-5xl">{meta.bookingLabel} at {b.name}</h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-600">
        {b.tagline} Pick a date and what you&apos;re interested in — your request goes straight to {b.name} on WhatsApp ({b.phone}) for confirmation. No payment is taken here.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <BookingForm b={b} />
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#E8DDD0] bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Where</p>
            <p className="mt-1 font-semibold">{b.address}</p>
            <p className="mt-2 text-sm text-neutral-600">🕒 {b.hours}</p>
          </div>
          <div className="rounded-3xl bg-[#171310] p-5 text-white">
            <p className="font-display text-lg font-bold text-[#F5D98B]">Good to know</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#D8C9AE]">
              <li>Your booking is confirmed by the business on WhatsApp — watch for their reply.</li>
              <li>{b.priceInfo.split(";")[0]}</li>
              {b.rating !== null && b.reviewCount !== null && <li>★ {b.rating} from {b.reviewCount} reviews</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
