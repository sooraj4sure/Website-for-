import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusiness, categoryMeta, sampleOfferings, heroPhoto } from "@/lib/full";
import { itemImage } from "@/lib/menu-images";
import { Reveal } from "@/components/reveal";

/**
 * Home page — modern, minimal, European luxury.
 * Lots of white space, one idea per section, very little text:
 * a huge serif name, a thin gold line, and let the photos do the talking.
 */
export default function SiteHome({ params }: { params: { slug: string } }) {
  const b = getBusiness(params.slug);
  if (!b) notFound();
  const meta = categoryMeta(b);
  const firstSentence = b.ambience.split(". ")[0] + ".";
  const preview = sampleOfferings(b).flatMap((s) => s.items).slice(0, 3);
  const quote = b.reviewThemes[0] ?? "";

  return (
    <>
      {/* Hero — minimal */}
      <section className="relative overflow-hidden text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroPhoto(b)} alt={`${b.name} — ${b.area}`} className="hero-zoom absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
        <div className="relative mx-auto flex min-h-[92svh] w-full max-w-6xl flex-col justify-end px-6 pb-14 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F5D98B]">{b.category} — {b.area}</p>
          <h1 className="font-display mt-4 text-5xl font-bold leading-[1.02] sm:text-7xl">{b.name}</h1>
          <div className="mt-5 h-px w-16 bg-[#C9A227]" />
          <p className="mt-5 max-w-md text-lg font-light leading-relaxed text-white/90">{b.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/site/${b.slug}/book`} className="btn-press inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#C9A227] px-8 py-3 text-base font-bold text-black">
              {meta.bookingLabel}
            </Link>
            <Link href={`/site/${b.slug}/${meta.offeringsSlug}`} className="btn-press inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/60 px-8 py-3 text-base font-bold backdrop-blur">
              {meta.offeringsLabel}
            </Link>
          </div>
          {b.rating !== null && b.reviewCount !== null && (
            <p className="mt-6 text-sm tracking-wide text-white/80">★ {b.rating} · {b.reviewCount} reviews</p>
          )}
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-6">
        {/* The experience — one line, lots of air */}
        <Reveal>
          <section className="py-20 sm:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8A6D3B]">The Experience</p>
            <h2 className="font-display mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">{firstSentence}</h2>
            <Link href={`/site/${b.slug}/about`} className="mt-6 inline-block border-b border-[#C9A227] pb-1 text-sm font-bold text-[#8A6D3B]">Read the full story →</Link>
          </section>
        </Reveal>

        {/* Signature — numbered, editorial */}
        <Reveal>
          <section className="border-t border-[#E8DDD0] py-20 sm:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8A6D3B]">Signature</p>
            <div className="mt-8">
              {b.signatureItems.slice(0, 3).map((item, i) => (
                <div key={item} className="flex items-baseline gap-6 border-b border-[#E8DDD0] py-6">
                  <span className="font-display text-lg text-[#C9A227]">0{i + 1}</span>
                  <span className="font-doodle text-[34px] leading-none sm:text-[40px]">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Menu preview — three quiet images */}
        <Reveal>
          <section className="border-t border-[#E8DDD0] py-20 sm:py-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8A6D3B]">{meta.offeringsLabel}</p>
                <h2 className="font-display mt-4 text-3xl font-bold sm:text-4xl">A first taste</h2>
              </div>
              <Link href={`/site/${b.slug}/${meta.offeringsSlug}`} className="shrink-0 text-sm font-bold text-[#8A6D3B] underline">View all →</Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {preview.map((item, i) => (
                <Link key={item.name} href={`/site/${b.slug}/${meta.offeringsSlug}`} className="menu-card group overflow-hidden rounded-[24px] border border-[#E8DDD0] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={itemImage(item.name, b.category, i)} alt={item.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <div className="flex items-center justify-between gap-3 p-5">
                    <span className="font-doodle text-[28px] leading-none">{item.name}</span>
                    <span className="shrink-0 font-bold text-[#8A6D3B]">₹{item.price.toLocaleString("en-IN")}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        {/* One voice — a single large quote */}
        {quote && (
          <Reveal>
            <section className="border-t border-[#E8DDD0] py-20 text-center sm:py-24">
              <p className="text-[#C9A227]">★★★★★</p>
              <blockquote className="font-display mx-auto mt-6 max-w-2xl text-2xl font-bold leading-snug sm:text-3xl">
                “{quote.replace(/^"|"$/g, "")}”
              </blockquote>
              {b.rating !== null && b.reviewCount !== null && (
                <p className="mt-6 text-sm tracking-wide text-neutral-500">★ {b.rating} from {b.reviewCount} reviews</p>
              )}
            </section>
          </Reveal>
        )}

        {/* Visit — minimal, centred */}
        <Reveal>
          <section className="border-t border-[#E8DDD0] py-20 text-center sm:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8A6D3B]">Visit Us</p>
            <p className="font-display mx-auto mt-6 max-w-xl text-2xl font-bold leading-snug sm:text-3xl">{b.address}</p>
            <p className="mt-4 text-neutral-600">{b.hours}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={`/site/${b.slug}/book`} className="btn-press inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#171310] px-8 py-3 font-bold text-[#F5D98B]">{meta.bookingLabel}</Link>
              <a href={`tel:${b.phone}`} className="btn-press inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-[#171310] px-8 py-3 font-bold">Call {b.phone}</a>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
