import { businesses, type Business } from "./businesses";

/**
 * Full-site helpers for ~/workspace/clients-20/full-websites/
 *
 * Honesty rules baked into the template (do not remove):
 *  - Real researched prices from lib/businesses.ts are shown exactly as
 *    researched, with their priceLabel where one exists.
 *  - Everything in `sampleOfferings` is a SAMPLE, invented only to show the
 *    owner what a complete menu / price list could look like. Every sample
 *    section on every site is labelled "Sample — to be confirmed by the
 *    owner" and the site footer repeats it. Nothing sample is ever presented
 *    as the business's real price.
 *  - Photos: Pexels royalty-free representative photos only (the same pool
 *    the prototypes used, verified 2026-10-24). Instagram/Facebook CDN links
 *    from the research are deliberately NOT reused here — they expire and
 *    are not the business's to republish. On launch they are replaced with
 *    the business's own photos. Pinterest images are not used for the same
 *    reason: most Pinterest images are copyrighted and cannot legally be
 *    republished on a client's commercial site.
 *  - No fake reviews, no invented founder names, no invented awards. Review
 *    sections reuse the researched review themes only.
 *  - Website-verdict flags (2026-10-24 recheck): Steve and Dodo, Dr Sobti's
 *    Dental Care and Singh Tutorials HAVE a website — these three full
 *    sites are redesign/upgrade demos, never "you have no website" pitches.
 *    Queens Makeovers and Towarz Fitness are UNCERTAIN — check live before
 *    pitching. The other 15 are confirmed no-website.
 */

export const VERDICT: Record<string, string> = {
  "steve-and-dodo": "Has a website — pitch as redesign / upgrade only",
  "dr-sobtis-dental-care": "Has a website — pitch as redesign / upgrade only",
  "singh-tutorials-simran-study-circle": "Has a builder site — pitch as redesign / upgrade only",
  "queens-makeovers-rohini": "Website uncertain — check live before pitching",
  "towarz-fitness": "Website uncertain — check live before pitching",
};

export function getBusiness(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

/** Normalise a phone for wa.me: strip trunk 0, add 91 for 10-digit Indian numbers. */
export function whatsappNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 11) return `91${digits.slice(1)}`;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export function whatsappLink(b: Business, text: string): string {
  return `https://wa.me/${whatsappNumber(b.phone)}?text=${encodeURIComponent(text)}`;
}

export function mapsUrl(b: Business): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.name} ${b.address}`)}`;
}

const isPexels = (u: string) => u.includes("pexels.com");

/** Representative, royalty-free photos for a business (never expiring CDN links). */
export function sitePhotos(b: Business): string[] {
  const own = [b.heroImage, ...b.photoUrls, ...b.galleryImages].filter(isPexels);
  const pool = businesses
    .filter((x) => x.category === b.category)
    .flatMap((x) => [x.heroImage, ...x.photoUrls, ...x.galleryImages])
    .filter(isPexels);
  return Array.from(new Set([...own, ...pool]));
}

export function heroPhoto(b: Business): string {
  return sitePhotos(b)[0];
}

export interface CategoryMeta {
  offeringsLabel: string;
  offeringsSlug: "menu" | "services";
  bookingLabel: string;
  bookingShort: string;
  heroCta: string;
}

export function categoryMeta(b: Business): CategoryMeta {
  switch (b.category) {
    case "cafe":
      return { offeringsLabel: "Menu", offeringsSlug: "menu", bookingLabel: "Reserve a table", bookingShort: "Reserve", heroCta: "See the menu" };
    case "salon":
      return { offeringsLabel: "Services & Prices", offeringsSlug: "services", bookingLabel: "Book an appointment", bookingShort: "Book", heroCta: "See services" };
    case "gym":
      return { offeringsLabel: "Plans & Training", offeringsSlug: "services", bookingLabel: "Book a free trial", bookingShort: "Free trial", heroCta: "See plans" };
    case "dental clinic":
      return { offeringsLabel: "Treatments & Fees", offeringsSlug: "services", bookingLabel: "Book a consultation", bookingShort: "Consult", heroCta: "See treatments" };
    case "physiotherapy clinic":
      return { offeringsLabel: "Treatments & Fees", offeringsSlug: "services", bookingLabel: "Book a session", bookingShort: "Book", heroCta: "See treatments" };
    case "veterinary clinic & pet grooming":
      return { offeringsLabel: "Services & Care", offeringsSlug: "services", bookingLabel: "Book a visit", bookingShort: "Book", heroCta: "See services" };
    case "coaching / tuition institute":
      return { offeringsLabel: "Courses & Batches", offeringsSlug: "services", bookingLabel: "Book a free demo class", bookingShort: "Free demo", heroCta: "See courses" };
    case "boutique / fashion studio":
      return { offeringsLabel: "Collections", offeringsSlug: "services", bookingLabel: "Book a fitting", bookingShort: "Book fitting", heroCta: "See collections" };
    default:
      return { offeringsLabel: "Services", offeringsSlug: "services", bookingLabel: "Book now", bookingShort: "Book", heroCta: "See services" };
  }
}

export interface SampleItem {
  name: string;
  desc: string;
  price: number;
  tag?: string;
}
export interface SampleSection {
  title: string;
  items: SampleItem[];
}

/** Sample menus / price lists, per category. ALL prices here are illustrative. */
export function sampleOfferings(b: Business): SampleSection[] {
  switch (b.category) {
    case "cafe":
      return [
        { title: "Coffee & Beverages", items: [
          { name: "Cappuccino", desc: "Double shot, velvety milk foam", price: 199, tag: "Bestseller" },
          { name: "Biscoff Latte", desc: "Caramelised biscuit, espresso, steamed milk", price: 279 },
          { name: "Cold Coffee", desc: "Chilled, blended, lightly sweetened", price: 229 },
          { name: "Hot Chocolate", desc: "Rich Belgian chocolate, whipped cream", price: 249 },
        ]},
        { title: "All-Day Breakfast", items: [
          { name: "Croissant & Cappuccino Combo", desc: "Buttery croissant with your coffee", price: 299, tag: "Morning favourite" },
          { name: "Paneer Sandwich", desc: "Grilled, with mint chutney", price: 249 },
          { name: "Classic Pancakes", desc: "Honey, butter and seasonal fruit", price: 279 },
        ]},
        { title: "Pizzas & Pastas", items: [
          { name: "Margherita Pizza", desc: "San Marzano tomato, fresh mozzarella, basil", price: 349 },
          { name: "Loaded Chicken Pizza", desc: "Double chicken, peppers, cheese burst edge", price: 525 },
          { name: "Veg White Sauce Pasta", desc: "Creamy, garlicky, parmesan finish", price: 329, tag: "Bestseller" },
          { name: "Alfredo Pasta", desc: "Silky cream sauce, mushrooms, herbs", price: 359 },
        ]},
        { title: "Asian & Mains", items: [
          { name: "Kung Pao Chicken", desc: "Sichuan heat, peanuts, peppers, steamed rice", price: 399 },
          { name: "Thai Green Curry with Rice", desc: "Coconut, Thai basil, jasmine rice", price: 449 },
          { name: "Chilli Paneer", desc: "Indo-Chinese classic, spring onion, peppers", price: 299 },
          { name: "Chicken Katsu Sushi", desc: "Crisp katsu, sushi rice, house sauce", price: 499, tag: "Signature" },
        ]},
        { title: "Desserts & Bakery", items: [
          { name: "Chocolate Muffin", desc: "Warm, molten centre", price: 149 },
          { name: "Tiramisu", desc: "Coffee-soaked, mascarpone, cocoa dust", price: 299, tag: "Must try" },
          { name: "Cheesecake of the Day", desc: "Ask your server for today's flavour", price: 329 },
        ]},
      ];
    case "salon":
      return [
        { title: "Hair", items: [
          { name: "Haircut & Styling", desc: "Consultation, wash, cut and finish", price: 499 },
          { name: "Global Colour", desc: "Full colour with bond care", price: 3499, tag: "Popular" },
          { name: "Balayage", desc: "Hand-painted, low-maintenance dimension", price: 4999 },
          { name: "Keratin / Smoothening", desc: "Frizz-free, glossy finish", price: 5999 },
        ]},
        { title: "Skin & Facials", items: [
          { name: "Classic Facial", desc: "Cleanse, exfoliate, massage, mask", price: 999 },
          { name: "Bridal Glow Facial", desc: "Pre-wedding radiance ritual", price: 2499, tag: "Bridal" },
          { name: "Anti-Acne Facial", desc: "Deep cleanse and calming care", price: 1499 },
        ]},
        { title: "Nails", items: [
          { name: "Nail Art", desc: "Hand-painted designs, your choice of theme", price: 799 },
          { name: "Nail Extensions", desc: "Gel / acrylic, shape and finish of your choice", price: 1499, tag: "Most booked" },
          { name: "Classic Manicure & Pedicure", desc: "Soak, shape, polish, massage", price: 999 },
        ]},
        { title: "Makeup", items: [
          { name: "Party Makeup", desc: "Long-wear glam for the evening", price: 2999 },
          { name: "Bridal Makeup", desc: "Full bridal look, hair and draping on request", price: 12999, tag: "Bridal" },
          { name: "Engagement Look", desc: "Soft glam, lashes and hairstyling", price: 5999 },
        ]},
      ];
    case "gym":
      return [
        { title: "Membership Plans", items: [
          { name: "Monthly", desc: "Full floor access, all group classes", price: 2000, tag: "Flexible" },
          { name: "Quarterly", desc: "Full access + diet chart", price: 5000, tag: "Best value" },
          { name: "Annual", desc: "Full access + diet chart + 2 PT sessions", price: 15000 },
          { name: "Couple / Family", desc: "Two memberships, one plan", price: 28000 },
        ]},
        { title: "Training", items: [
          { name: "Personal Training (per month)", desc: "1-on-1 coaching, custom plan", price: 8000, tag: "Popular" },
          { name: "CrossFit Batch", desc: "Strength and conditioning, coached", price: 3000 },
          { name: "Aerobics & Zumba", desc: "High-energy group classes", price: 1500 },
          { name: "Diet & Transformation Plan", desc: "Nutrition plan with monthly check-ins", price: 2500 },
        ]},
      ];
    case "dental clinic":
      return [
        { title: "Checkup & Cleaning", items: [
          { name: "Dental Consultation", desc: "Examination and treatment plan", price: 500 },
          { name: "Scaling & Polishing", desc: "Full cleaning, stain removal", price: 1500, tag: "Most booked" },
          { name: "Teeth Whitening", desc: "In-clinic whitening session", price: 8000 },
        ]},
        { title: "Restorative", items: [
          { name: "Tooth Filling", desc: "Composite, tooth-coloured", price: 1500 },
          { name: "Root Canal Treatment", desc: "Single sitting, painless protocol", price: 6000, tag: "Speciality" },
          { name: "Crown / Cap", desc: "Ceramic crown, natural finish", price: 8000 },
        ]},
        { title: "Smile & Alignment", items: [
          { name: "Braces Consultation", desc: "Alignment assessment and plan", price: 500 },
          { name: "Clear Aligners", desc: "Invisible alignment, monthly reviews", price: 60000 },
          { name: "Dental Implant", desc: "Consultation, implant and crown plan", price: 25000 },
        ]},
      ];
    case "physiotherapy clinic":
      return [
        { title: "Sessions", items: [
          { name: "Physiotherapy Session", desc: "Assessment-led treatment, 45 minutes", price: 800, tag: "Most booked" },
          { name: "Back & Neck Pain Programme", desc: "4-session structured plan", price: 3000 },
          { name: "Sports Injury Rehab", desc: "Return-to-play programme", price: 1200 },
          { name: "Posture & Ergonomics Session", desc: "Desk-worker assessment and correction", price: 900 },
        ]},
        { title: "Specialised Care", items: [
          { name: "Osteopathy Session", desc: "Hands-on structural treatment", price: 1200 },
          { name: "Dry Needling", desc: "Trigger-point release", price: 1000 },
          { name: "Home Visit Session", desc: "Treatment at your home in Dwarka", price: 1500, tag: "At home" },
        ]},
      ];
    case "veterinary clinic & pet grooming":
      return [
        { title: "Vet Care", items: [
          { name: "General Consultation", desc: "Health check and advice", price: 500, tag: "Most booked" },
          { name: "Vaccination", desc: "Core vaccines, record card updated", price: 800 },
          { name: "Deworming", desc: "Weight-based dose, guidance", price: 300 },
          { name: "Health Check Package", desc: "Full check, blood work on advice", price: 2000 },
        ]},
        { title: "Grooming", items: [
          { name: "Bath & Blow Dry", desc: "Shampoo, dry, brush-out", price: 800 },
          { name: "Full Grooming", desc: "Bath, haircut, nails, ears, hygiene trim", price: 1500, tag: "Popular" },
          { name: "Nail Clipping", desc: "Quick, gentle nail care", price: 300 },
        ]},
      ];
    case "coaching / tuition institute":
      return [
        { title: "School Batches (CBSE)", items: [
          { name: "Class 9–10 — All Subjects", desc: "Maths, Science, English, SST", price: 3000, tag: "Most enrolled" },
          { name: "Class 11–12 Science", desc: "Physics, Chemistry, Maths / Biology", price: 4500 },
          { name: "Class 11–12 Commerce", desc: "Accounts, Economics, Business Studies", price: 4000 },
        ]},
        { title: "Test & Revision", items: [
          { name: "Board Exam Crash Course", desc: "Revision, sample papers, mock tests", price: 5000, tag: "Boards" },
          { name: "Weekly Test Series", desc: "Chapter tests with detailed feedback", price: 1000 },
          { name: "1-on-1 Doubt Sessions", desc: "Personal mentoring, per month", price: 6000 },
        ]},
      ];
    case "boutique / fashion studio":
      return [
        { title: "Collections", items: [
          { name: "Designer Saree", desc: "Hand-finished, festive edit", price: 8999, tag: "Festive" },
          { name: "Anarkali Suit Set", desc: "Embroidered, fully lined", price: 6999 },
          { name: "Lehenga", desc: "Bridal and occasion wear", price: 15999, tag: "Bridal" },
          { name: "Kurti & Co-ord Set", desc: "Everyday luxury, breathable fabrics", price: 2499 },
        ]},
        { title: "Stitching & Fitting", items: [
          { name: "Blouse Stitching", desc: "Custom fit, your fabric or ours", price: 1200 },
          { name: "Suit Stitching", desc: "Measured, fitted, finished", price: 1800, tag: "Most booked" },
          { name: "Alterations", desc: "Fit correction and restyling", price: 500 },
        ]},
      ];
    default:
      return [];
  }
}

export const SITE_GROUPS: { title: string; categories: string[] }[] = [
  { title: "Cafes", categories: ["cafe"] },
  { title: "Salons & Beauty", categories: ["salon"] },
  { title: "Gyms & Fitness", categories: ["gym"] },
  { title: "Clinics, Coaching & Boutique", categories: ["dental clinic", "physiotherapy clinic", "veterinary clinic & pet grooming", "coaching / tuition institute", "boutique / fashion studio"] },
];
