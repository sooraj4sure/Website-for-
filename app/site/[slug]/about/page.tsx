import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusiness, categoryMeta, heroPhoto } from "@/lib/full";
import { Eyebrow, GalleryGrid, VisitCard } from "@/components/site";

export default function AboutPage({ params }: { params: { slug: string } }) {
  const b = getBusiness(params.slug);
  if (!b) notFound();
  const meta = categoryMeta(b);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Eyebrow>About</Eyebrow>
      <h1 className="font-display mt-2 text-3xl font-bold sm:text-5xl">The story of {b.name}</h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-600">
        Draft story for the owner to approve — written from their public listings, not invented history. Every line below traces back to what customers already say about them.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroPhoto(b)} alt={b.name} className="h-72 w-full rounded-3xl object-cover sm:h-full" />
        <div className="space-y-4 text-base leading-relaxed text-neutral-700">
          <p><strong className="text-neutral-900">{b.tagline}.</strong></p>
          <p>{b.ambience}</p>
          <p>
            In {b.area}, {b.name} has built its name the slow way — one visit at a
            time. {b.rating !== null && b.reviewCount !== null ? `With a ${b.rating}-star rating across ${b.reviewCount} reviews, ` : ""}it is
            the kind of place people recommend to friends, return to with family, and
            choose again for the occasions that matter.
          </p>
          <p>
            This website exists for one reason: to make that first visit easier.
            See the {meta.offeringsLabel.toLowerCase()}, check the hours, and{" "}
            <Link href={`/site/${b.slug}/book`} className="font-bold text-[#8A6D3B] underline">{meta.bookingLabel.toLowerCase()}</Link> — straight from your phone.
          </p>
        </div>
      </div>

      <section className="py-12">
        <Eyebrow>Why people keep coming back</Eyebrow>
        <h2 className="font-display mt-2 text-2xl font-bold sm:text-3xl">In their customers&apos; words</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {b.reviewThemes.map((theme, i) => (
            <li key={i} className="rounded-3xl border border-[#E8DDD0] bg-white p-5 text-sm leading-relaxed text-neutral-700 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <span className="text-[#C9A227]">★</span> {theme}
            </li>
          ))}
        </ul>
      </section>

      <section className="py-4">
        <Eyebrow>Good to know</Eyebrow>
        <h2 className="font-display mt-2 text-2xl font-bold sm:text-3xl">At a glance</h2>
        <dl className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-[#E8DDD0] bg-white p-5"><dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">Where</dt><dd className="mt-1 font-semibold">{b.area}</dd><dd className="mt-1 text-sm text-neutral-600">{b.address}</dd></div>
          <div className="rounded-3xl border border-[#E8DDD0] bg-white p-5"><dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">When</dt><dd className="mt-1 font-semibold">{b.hours}</dd></div>
          <div className="rounded-3xl border border-[#E8DDD0] bg-white p-5"><dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">Typical spend</dt><dd className="mt-1 font-semibold">{b.priceInfo.split(";")[0]}</dd></div>
        </dl>
      </section>

      <section className="py-12">
        <Eyebrow>Life</Eyebrow>
        <h2 className="font-display mt-2 text-2xl font-bold sm:text-3xl">A look inside</h2>
        <GalleryGrid b={b} limit={6} />
      </section>

      <section className="py-4">
        <VisitCard b={b} />
      </section>
    </div>
  );
}
