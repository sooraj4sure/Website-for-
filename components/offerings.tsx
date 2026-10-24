import type { Business } from "@/lib/businesses";
import { categoryMeta, sampleOfferings, whatsappLink } from "@/lib/full";
import { itemImage } from "@/lib/menu-images";
import { Eyebrow } from "./site";
import { AddToTableButton } from "./cart";
import { Reveal } from "./reveal";

/**
 * Menu / services page v3 — spacious, neat, luxury:
 *  - ONE item per row, with real breathing space (large cards, big gaps).
 *  - Crowd favourites get the same breathing space: wider photo boxes,
 *    bigger gaps, and a price on every single one.
 *  - Every item has an "Add To Table" button (real menu first, sample
 *    menu too) that collects dishes into the table cart.
 */

function priceText(item: { price: number | null; priceLabel?: string }): string {
  return item.priceLabel ?? (item.price !== null ? `₹${item.price.toLocaleString("en-IN")}` : "Ask for price");
}

function priceValue(item: { price: number | null; priceLabel?: string }): number | null {
  if (item.price !== null) return item.price;
  const m = item.priceLabel?.match(/₹([\d,]+)/);
  return m ? parseInt(m[1].replace(/,/g, ""), 10) : null;
}

const SAMPLE_PRICES = [299, 349, 399, 279, 449, 499];

/** Price for a signature item: its real listed price when it has one, else any sample price. */
function signaturePrice(b: Business, name: string, i: number): { text: string; value: number | null; sample: boolean } {
  const match = b.servicesOrMenu.find((s) => s.name.toLowerCase() === name.toLowerCase() || name.toLowerCase().includes(s.name.toLowerCase()));
  if (match && priceValue(match) !== null) {
    return { text: priceText(match), value: priceValue(match), sample: false };
  }
  const v = SAMPLE_PRICES[i % SAMPLE_PRICES.length];
  return { text: `₹${v}`, value: v, sample: true };
}

function Tile({
  b, name, desc, priceText: price, priceValue: value, sample, img, delay,
}: {
  b: Business; name: string; desc?: string; priceText: string; priceValue: number | null; sample: boolean; img: string; delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="menu-card overflow-hidden rounded-[28px] border border-[#E8DDD0] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} className="h-72 w-full object-cover sm:h-80" loading="lazy" />
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-doodle text-[38px] leading-[1.05]">{name}</h3>
            <span className="shrink-0 rounded-full bg-[#171310] px-4 py-2 text-base font-bold text-[#F5D98B]">{price}</span>
          </div>
          {desc && <p className="mt-3 leading-relaxed text-neutral-600">{desc}</p>}
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#7A5E1F]">
            {sample ? "Sample price — owner to confirm" : "From the business's public listings"}
          </p>
          <div className="mt-5 flex gap-3">
            <AddToTableButton b={b} name={name} price={value} sample={sample} />
            <a
              href={whatsappLink(b, `Hi ${b.name}! I'd like to ask about: ${name}.`)}
              target="_blank"
              rel="noreferrer"
              className="btn-press flex min-h-[52px] items-center justify-center rounded-2xl border-2 border-[#171310] px-5 py-3 text-base font-bold"
            >
              💬
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function OfferingsBody({ b }: { b: Business }) {
  const meta = categoryMeta(b);
  const samples = sampleOfferings(b);
  const chips = [{ label: "Real favourites", href: "#real" }, ...samples.map((s, i) => ({ label: s.title, href: `#sample-${i}` }))];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Eyebrow>{meta.offeringsLabel}</Eyebrow>
      <h1 className="font-display mt-2 text-4xl font-bold leading-tight sm:text-5xl">{meta.offeringsLabel} at {b.name}</h1>
      <p className="font-doodle mt-2 text-[32px] leading-none text-[#8A6D3B]">pick slowly, enjoy fully.</p>
      <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600">
        {b.tagline}. One dish per row, plenty of space, and a price on every
        item. Tap “Add To Table” on anything you like — it collects into your
        table, and you order the whole table at once from the cart.
      </p>
      <p className="mt-4 inline-block rounded-full bg-[#171310] px-3 py-1 text-xs font-bold text-[#F5D98B]">✦ New: Add To Table + spacious menu</p>

      <div className="sticky top-[104px] z-30 -mx-4 overflow-x-auto bg-[#FBF8F3]/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:px-0">
        <div className="flex gap-3">
          {chips.map((c) => (
            <a key={c.href} href={c.href} className="shrink-0 rounded-full border border-[#C9A227] bg-white px-5 py-2.5 text-sm font-bold text-[#7A5E1F] shadow-sm active:bg-[#F1E8D8]">
              {c.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Crowd favourites — spacious, with prices ── */}
      <section id="real" className="scroll-mt-40 py-12">
        <Eyebrow>From their public listings</Eyebrow>
        <h2 className="font-display mt-2 text-3xl font-bold sm:text-4xl">Crowd favourites</h2>
        <p className="mt-2 text-neutral-600">Their real signature items — with a photo and a price on every one. Swipe sideways on your phone.</p>

        <div className="-mx-4 overflow-x-auto px-4 py-2 sm:mx-0 sm:px-0">
          <div className="flex snap-x gap-5 pb-2">
            {b.signatureItems.map((item, i) => {
              const p = signaturePrice(b, item, i);
              return (
                <div key={item} className="menu-card w-60 shrink-0 snap-start overflow-hidden rounded-[24px] border border-[#E8DDD0] bg-white">
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={itemImage(item, b.category, i)} alt={item} className="aspect-square w-full object-cover" loading="lazy" />
                    <span className="absolute right-3 top-3 rounded-full bg-[#171310] px-3.5 py-1.5 text-sm font-bold text-[#F5D98B] shadow">{p.text}</span>
                  </div>
                  <div className="p-5">
                    <p className="font-doodle text-[30px] leading-[1.05]">{item}</p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#7A5E1F]">{p.sample ? "Sample price" : "Listed price"}</p>
                    <div className="mt-4">
                      <AddToTableButton b={b} name={item} price={p.value} sample={p.sample} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 space-y-8">
          {b.servicesOrMenu.map((item, i) => (
            <Tile
              key={item.name}
              b={b}
              name={item.name}
              priceText={priceText(item)}
              priceValue={priceValue(item)}
              sample={false}
              img={itemImage(item.name, b.category, i)}
              delay={(i % 4) * 80}
            />
          ))}
        </div>
        <p className="mt-6 text-sm text-neutral-500">{b.priceInfo}</p>
      </section>

      {/* ── Sample menu — same spacious rows ── */}
      <section className="py-12">
        <Eyebrow>Sample — to be confirmed by the owner</Eyebrow>
        <h2 className="font-display mt-2 text-3xl font-bold sm:text-4xl">The full {meta.offeringsLabel.toLowerCase()} — sample edition</h2>
        <p className="mt-2 text-neutral-600">
          A complete, shoppable {b.category === "cafe" ? "digital menu" : "price list"}. Every price here is illustrative.
        </p>
        {samples.map((section, si) => (
          <div key={section.title} id={`sample-${si}`} className="mt-14 scroll-mt-40">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">{section.title}</h3>
              <span className="h-px flex-1 bg-[#E8DDD0]" />
              <span className="rounded-full bg-[#F1E8D8] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#7A5E1F]">Sample</span>
            </div>
            <div className="mt-8 space-y-8">
              {section.items.map((item, ii) => (
                <Tile
                  key={item.name}
                  b={b}
                  name={item.name}
                  desc={item.desc}
                  priceText={`₹${item.price.toLocaleString("en-IN")}`}
                  priceValue={item.price}
                  sample
                  img={itemImage(item.name, b.category, si * 3 + ii)}
                  delay={(ii % 4) * 80}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
