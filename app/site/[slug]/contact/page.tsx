import { notFound } from "next/navigation";
import { getBusiness, mapsUrl, whatsappLink } from "@/lib/full";
import { Eyebrow } from "@/components/site";
import { ContactForm } from "@/components/forms";
import { waText } from "@/components/site";

export default function ContactPage({ params }: { params: { slug: string } }) {
  const b = getBusiness(params.slug);
  if (!b) notFound();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Eyebrow>Contact</Eyebrow>
      <h1 className="font-display mt-2 text-3xl font-bold sm:text-5xl">Talk to {b.name}</h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-600">
        Call, WhatsApp, or send a message below — it opens WhatsApp with your message ready to send.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-3xl border border-[#E8DDD0] bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Address</p>
            <p className="mt-1 font-semibold">{b.address}</p>
            <a href={mapsUrl(b)} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-[44px] items-center rounded-xl bg-[#171310] px-5 py-2.5 text-sm font-bold text-[#F5D98B]">📍 Open in Google Maps →</a>
          </div>
          <div className="rounded-3xl border border-[#E8DDD0] bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Hours</p>
            <p className="mt-1 font-semibold">{b.hours}</p>
          </div>
          <div className="rounded-3xl border border-[#E8DDD0] bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Phone &amp; WhatsApp</p>
            <p className="mt-1 font-semibold"><a href={`tel:${b.phone}`} className="underline">{b.phone}</a></p>
            {b.instagram && <p className="mt-1 text-sm text-neutral-600">Instagram: {b.instagram}</p>}
            <div className="mt-3 flex gap-2">
              <a href={`tel:${b.phone}`} className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl border-2 border-[#171310] text-sm font-bold">📞 Call</a>
              <a href={whatsappLink(b, waText(b))} target="_blank" rel="noreferrer" className="flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-[#25D366] text-sm font-bold text-black">💬 WhatsApp</a>
            </div>
          </div>
        </div>
        <ContactForm b={b} />
      </div>
    </div>
  );
}
