import { notFound } from "next/navigation";
import { getBusiness, categoryMeta } from "@/lib/full";
import { Eyebrow, GalleryGrid, VisitCard } from "@/components/site";

export default function GalleryPage({ params }: { params: { slug: string } }) {
  const b = getBusiness(params.slug);
  if (!b) notFound();
  const meta = categoryMeta(b);
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Eyebrow>Life</Eyebrow>
      <h1 className="font-display mt-2 text-3xl font-bold sm:text-5xl">Life at {b.name}</h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-600">
        {b.ambience} These are representative photos for now — on launch, this
        page becomes the business&apos;s own gallery: real interiors, real food,
        real work, real customers (with permission).
      </p>

      <section className="py-8">
        <Eyebrow>The space</Eyebrow>
        <h2 className="font-display mt-2 text-2xl font-bold sm:text-3xl">Inside {b.name}</h2>
        <GalleryGrid b={b} />
      </section>

      <section className="py-4">
        <Eyebrow>Moments</Eyebrow>
        <h2 className="font-display mt-2 text-2xl font-bold sm:text-3xl">Made for sharing</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {b.signatureItems.slice(0, 3).map((item) => (
            <div key={item} className="rounded-3xl border border-[#E8DDD0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <p className="font-display text-lg font-bold">{item}</p>
              <p className="mt-1 text-sm text-neutral-600">One of the things {b.name} is known for in {b.area}.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <VisitCard b={b} />
        <p className="mt-4 text-center">
          <a href={`/site/${b.slug}/book`} className="font-bold text-[#8A6D3B] underline">{meta.bookingLabel} →</a>
        </p>
      </section>
    </div>
  );
}
