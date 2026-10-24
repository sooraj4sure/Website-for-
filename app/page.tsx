import Link from "next/link";
import { businesses } from "@/lib/businesses";
import { SITE_GROUPS, VERDICT, heroPhoto } from "@/lib/full";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A6D3B]">
        Full websites · Mobile-first · Luxury theme · Delhi
      </p>
      <h1 className="font-display mt-2 text-3xl font-bold leading-tight sm:text-5xl">
        20 Delhi businesses, with complete websites — not just a homepage
      </h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-neutral-600 sm:text-lg">
        Every business below gets the same full structure: <strong>Home, About,
        Menu / Services, Life, Contact and Booking</strong> — with its real name,
        area, hours, phone, rating and listed prices, a complete sample menu or
        price list clearly marked as sample, representative royalty-free photos,
        and a booking / enquiry form that opens WhatsApp to the business&apos;s
        own number. Tap any card to walk through that business&apos;s site exactly
        as a customer would, on a phone.
      </p>
      <div className="mt-5 rounded-3xl border border-[#E8DDD0] bg-white p-5 text-sm leading-relaxed text-neutral-600">
        <p className="font-bold text-neutral-800">Before you send these to owners — read this once:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>15 of the 20 are confirmed as having no real website (rechecked 2026-10-24). The other 5 are flagged on their cards — pitch those as a redesign / upgrade, or check live first, never as “you have no website”.</li>
          <li>None of the 15 has its <em>own</em> full digital menu — Swiggy / Zomato listings do not count as the business&apos;s own menu. That is the strongest pitch for the cafe menu pages here.</li>
          <li>Photos are representative stock photos and sample prices are labelled “Sample” on every site. Swap in the owner&apos;s real photos and real price list before launch — that is a 30-minute job per site, and it is the only step left.</li>
        </ul>
      </div>

      {SITE_GROUPS.map((group) => {
        const list = businesses.filter((b) => group.categories.includes(b.category));
        if (!list.length) return null;
        return (
          <section key={group.title} className="mt-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{group.title}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((b) => (
                <Link key={b.slug} href={`/site/${b.slug}`} className="group overflow-hidden rounded-3xl border border-[#E8DDD0] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5">
                  <div className="relative h-44 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heroPhoto(b)} alt={`${b.name} — ${b.area}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                    {VERDICT[b.slug] && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#171310] px-3 py-1 text-[11px] font-bold text-[#F5D98B]">⚠️ {VERDICT[b.slug]}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold leading-snug">{b.name}</h3>
                    <p className="mt-1 text-sm capitalize text-neutral-500">{b.category} · {b.area}</p>
                    {b.rating !== null && b.reviewCount !== null ? (
                      <p className="mt-2 text-sm font-semibold">★ {b.rating} ({b.reviewCount} reviews)</p>
                    ) : (
                      <p className="mt-2 text-sm font-semibold">📸 Instagram-first business</p>
                    )}
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{b.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#8A6D3B]">Open full website →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <p className="mt-12 text-center text-sm text-neutral-500">
        Full websites by Suraj Kumar — sooraj4business@gmail.com · Run: <code>npm install</code> → <code>npm run dev</code> → open any card above.
      </p>
    </main>
  );
}
