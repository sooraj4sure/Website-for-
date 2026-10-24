import Link from "next/link";
import type { Business } from "@/lib/businesses";
import { categoryMeta, heroPhoto, sitePhotos, whatsappLink } from "@/lib/full";
import { CartProvider, CartFab } from "./cart";

export function waText(b: Business, extra = ""): string {
  return `Hi ${b.name}! I found your website and would like to know more. ${extra}`.trim();
}

export function SiteShell({ b, children }: { b: Business; children: React.ReactNode }) {
  const meta = categoryMeta(b);
  const wa = whatsappLink(b, waText(b));
  const nav = [
    { label: "Home", href: `/site/${b.slug}` },
    { label: "About", href: `/site/${b.slug}/about` },
    { label: meta.offeringsLabel, href: `/site/${b.slug}/${meta.offeringsSlug}` },
    { label: "Life", href: `/site/${b.slug}/gallery` },
    { label: "Contact", href: `/site/${b.slug}/contact` },
    { label: "My Table", href: `/site/${b.slug}/cart` },
  ];
  return (
    <CartProvider slug={b.slug}>
    <div className="min-h-screen bg-[#FBF8F3] text-[#171310]">
      <header className="sticky top-0 z-40 border-b border-[#E8DDD0] bg-[#FBF8F3]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href={`/site/${b.slug}`} className="min-w-0">
            <span className="font-display block truncate text-lg font-bold leading-tight sm:text-xl">{b.name}</span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A6D3B]">{b.category} · {b.area}</span>
          </Link>
          <Link href={`/site/${b.slug}/book`} className="shrink-0 rounded-full bg-[#171310] px-4 py-2.5 text-sm font-bold text-[#F5D98B] shadow">
            {meta.bookingShort} →
          </Link>
        </div>
        <nav className="overflow-x-auto">
          <div className="mx-auto flex w-full max-w-6xl gap-1 px-4 pb-2 sm:px-6">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold text-[#5A4A36] hover:bg-[#F1E8D8]">
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="pb-24 sm:pb-10">{children}</main>

      <footer className="border-t border-[#E8DDD0] bg-[#171310] px-4 py-8 text-center text-sm text-[#D8C9AE] sm:px-6">
        <p className="font-display text-lg font-bold text-[#F5D98B]">{b.name}</p>
        <p className="mt-1">{b.address}</p>
        <p className="mt-1">🕒 {b.hours}</p>
        <p className="mt-3 text-xs leading-relaxed text-[#B8A888]">
          Demo website built by Suraj Kumar · sooraj4business@gmail.com<br />
          Photos shown are representative, royalty-free images — replace with the
          business&apos;s own photos on launch. Menu / service prices marked
          “Sample” are illustrative and to be confirmed by the owner; prices
          shown without that mark come from the business&apos;s public listings.
        </p>
      </footer>

      <CartFab b={b} />

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E8DDD0] bg-white/95 px-3 py-2.5 backdrop-blur sm:hidden">
        <div className="flex gap-2">
          <a href={`tel:${b.phone}`} className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl border-2 border-[#171310] font-bold">📞 Call</a>
          <a href={wa} target="_blank" rel="noreferrer" className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl bg-[#25D366] font-bold text-black">💬 WhatsApp</a>
          <Link href={`/site/${b.slug}/book`} className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl bg-[#171310] font-bold text-[#F5D98B]">{meta.bookingShort}</Link>
        </div>
      </div>
    </div>
    </CartProvider>
  );
}

export function Hero({ b, kicker, children }: { b: Business; kicker?: string; children?: React.ReactNode }) {
  const meta = categoryMeta(b);
  const wa = whatsappLink(b, waText(b));
  return (
    <section className="relative overflow-hidden text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={heroPhoto(b)} alt={`${b.name} — ${b.area}`} className="hero-zoom absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />
      <div className="relative mx-auto flex min-h-[78svh] w-full max-w-6xl flex-col justify-end px-4 pb-10 pt-16 sm:px-6 sm:min-h-[68svh]">
        <span className="w-fit rounded-full bg-[#C9A227] px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">{kicker ?? `${b.category} · ${b.area}`}</span>
        <h1 className="font-display mt-3 text-4xl font-bold leading-[1.05] sm:text-6xl">{b.name}</h1>
        <p className="mt-3 max-w-xl text-base font-medium text-white/90 sm:text-xl">{b.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
          {b.rating !== null && b.reviewCount !== null && (
            <span className="rounded-full bg-white px-3 py-1.5 text-neutral-900">★ {b.rating} · {b.reviewCount} reviews</span>
          )}
          <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">{b.priceInfo.split(";")[0]}</span>
          {b.instagram && <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">{b.instagram}</span>}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={`/site/${b.slug}/book`} className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[#C9A227] px-6 py-3 text-base font-bold text-black shadow">{meta.bookingLabel} →</Link>
          <Link href={`/site/${b.slug}/${meta.offeringsSlug}`} className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/50 bg-white/10 px-6 py-3 text-base font-bold backdrop-blur">{meta.heroCta}</Link>
          <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-[#25D366] px-6 py-3 text-base font-bold text-black">💬 WhatsApp us</a>
        </div>
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A6D3B]">{children}</p>;
}

export function GalleryGrid({ b, limit }: { b: Business; limit?: number }) {
  const photos = sitePhotos(b).slice(0, limit ?? 9);
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {photos.map((src, i) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img key={i} src={src} alt={`${b.name} — life at the ${b.category} ${i + 1}`} className="h-40 w-full rounded-2xl object-cover sm:h-52" loading="lazy" />
      ))}
    </div>
  );
}

export function ReviewCards({ b }: { b: Business }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {b.reviewThemes.map((theme, i) => (
        <figure key={i} className="rounded-3xl border border-[#E8DDD0] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="text-lg text-[#C9A227]">★★★★★</div>
          <blockquote className="mt-2 text-sm leading-relaxed text-neutral-700">{theme}</blockquote>
          <figcaption className="mt-3 text-xs font-semibold text-neutral-500">What customers say — from public reviews</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function VisitCard({ b }: { b: Business }) {
  const wa = whatsappLink(b, waText(b));
  return (
    <div className="rounded-3xl bg-[#171310] p-6 text-white sm:p-8">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">Visit us</h2>
      <div className="mt-4 space-y-2 text-base font-medium">
        <p>📍 {b.address}</p>
        <p>🕒 {b.hours}</p>
        <p>📞 <a href={`tel:${b.phone}`} className="underline">{b.phone}</a></p>
        {b.instagram && <p>📸 Instagram: {b.instagram}</p>}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-2xl bg-[#25D366] px-5 py-3 font-bold text-black">💬 WhatsApp</a>
        <a href={`tel:${b.phone}`} className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-2xl border border-white/40 px-5 py-3 font-bold">📞 Call now</a>
      </div>
    </div>
  );
}
