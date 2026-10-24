# 20 Full Websites — Next.js (mobile-first, luxury theme)

One Next.js project, 20 complete business websites.

## Run
```
npm install
npm run dev
```
Open http://localhost:3000 — every card opens that business's full site.

## Structure per business — `/site/<slug>/`
- `/` — Home: hero, experience, favourite tastes, life preview, reviews, visit
- `/about` — Story (draft, from public listings), why customers return, at-a-glance
- `/menu` — Cafes: full creative digital menu with photos
- `/services` — Everyone else: services / treatments / plans / courses / collections
- `/gallery` — Life: gallery + moments
- `/contact` — Address, hours, phone, Google Maps link, WhatsApp message form
- `/book` — Booking / enquiry form (name, phone, date, time, interest, notes)
  → opens WhatsApp to the business's own number with the request pre-filled.
  No backend, no payment, nothing stored. Call + WhatsApp sticky bar on mobile.

## What is real, what is sample — read before sending to owners
- REAL: name, category, area, address, hours, phone, Instagram where confirmed,
  rating/review count, tagline, ambience, signature items, and the
  "From their public listings" price list in lib/businesses.ts (researched 2026-10-24).
- SAMPLE, labelled "Sample" on every page it appears: the expanded menu / price
  lists in lib/full.ts, and all photos. Photos are royalty-free Pexels
  representative images (same verified pool as the prototypes). Pinterest images
  are deliberately NOT used: most are copyrighted and cannot legally be
  republished on a client's commercial site, and Pinterest links break.
  Replace with the owner's real photos + real price list before launch.
- Website verdicts (rechecked 2026-10-24, flagged on the home index):
  Steve and Dodo, Dr Sobti's Dental Care, Singh Tutorials HAVE a website —
  pitch as redesign/upgrade only. Queens Makeovers, Towarz Fitness UNCERTAIN —
  check live before pitching. Other 15 confirmed no website.
- Own digital menu: 0 of the 15 no-website businesses has its own full digital
  menu (Swiggy/Zomato listings do not count). That is the cafe pitch.
- Phone normalisation: numbers stored with a trunk 0 (Sobti, Singh) are
  converted to +91 for wa.me links in lib/full.ts.

## To launch one business for real
1. Copy its site into its own Next.js project / Vercel project (or keep the
   /site/<slug> path and point their domain at it).
2. Swap photos in lib/businesses.ts, confirm/correct sample prices in lib/full.ts.
3. Confirm hours, phone and Instagram with the owner on the first call.

## Menu redesign (2026-10-24, mobile-first)
- Real listed items now have photos too: lib/menu-images.ts maps each item
  name (per category, keyword-matched) to a royalty-free Unsplash reference
  photo; all 41 URLs were curl-verified HTTP 200 image/jpeg on 2026-10-24.
  Representative only — owners replace with their own photos on launch.
- Fonts: Playfair Display (luxury serif headings) + Caveat (cool doodle
  handwriting for menu item names, deliberately large on mobile), via
  next/font/google. Base type is 17px for comfortable phone reading.
- Menu page is designed phone-first: one big photo card per item (image on
  top, doodle name, gold price pill), a swipeable signature strip, a
  horizontal category-chip index, and a one-tap "Order / enquire on WhatsApp"
  button per item that pre-fills that exact item to the business's number.

## Menu v3 + Add To Table + new home (2026-10-24)
- Menu: ONE item per row, large cards, big gaps — no more crowded grid.
  Crowd favourites are wider photo boxes with a price on every item
  (real listed price where one exists, otherwise a sample price marked Sample).
- Add To Table cart (client-side, localStorage per business, no backend):
  every menu item has "Add To Table"; the floating "My Table" button and
  /site/<slug>/cart show the collected dishes, quantities, and total.
  The cart's Order button (not a checkout) asks for name, table number and
  mobile number, generates a temp bill, and opens WhatsApp to the business's
  own number with that bill. No payment is taken.
- Animations: scroll-reveal (IntersectionObserver), hover lift + image zoom
  on cards, slow hero zoom, button press feedback; all disabled for
  prefers-reduced-motion.
- Home: modern minimal European luxury — huge serif name, thin gold rule,
  one-line experience, numbered signatures, three quiet menu images, one
  large review quote, centred visit section. Much less text than before.
