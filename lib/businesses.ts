/**
 * Business data for the customized website prototypes.
 *
 * Lot 1 (cafes, West/Central Delhi) is loaded from
 * ~/workspace/clients-20/lot1/businesses.json, Lot 2 (salons, Rohini) from
 * ~/workspace/clients-20/lot2/businesses.json, Lot 3 (gyms, East Delhi)
 * from ~/workspace/clients-20/lot3/businesses.json and Lot 4 (high-ticket
 * services: dental, physiotherapy, veterinary, coaching, boutique) from
 * ~/workspace/clients-20/lot4/businesses.json (all researched 2026-10-24),
 * with an added `accent` colour, `heroImage` and `galleryImages` per business.
 *
 * Photo note: `photoUrls` are the business's REAL photos where the research
 * found them. Where photoUrls was empty, `heroImage` / `galleryImages` are
 * representative photos for that category (cafes in Lot 1; salons, nail
 * studio and gyms in Lots 2–3; dental clinic, veterinary clinic and
 * coaching classroom in Lot 4) found via web image search (Pexels) and
 * curl-verified to return HTTP 200 image/jpeg on 2026-10-24. Lot 4's real
 * photos (PhysioLife, Begum's Boutique) were likewise curl-verified 200.
 * (Monash Makeover's research returned the same photo twice — de-duplicated.)
 *
 * Price note: Lots 2–4 research recorded prices as descriptive strings
 * ("₹800 / session", "Included in membership…"). Pure "₹N" prices are stored
 * as numeric `price`; anything richer is kept verbatim in `priceLabel` so no
 * researched price detail is lost and none is invented. Where a business has
 * no public price list (e.g. The Epic Nail and Makeup), services render with
 * "Ask in salon" — never a made-up price.
 * Rating note: Dazzle Beauty Studio has no published rating/review count in
 * the research (null) — its traction is Instagram-based, so no rating is
 * shown for it instead of inventing one.
 * Testimonial note (Lot 4): Dr. Dheeraj Pets Clinic has polarised reviews —
 * only the positive/general research themes are used as testimonials; the
 * negligence-allegation theme and Begum's owner-attitude complaint stay in
 * `riskFlags` only. No medical claims were added beyond the research.
 */

export interface MenuItem {
  name: string;
  price: number | null;
  /** Verbatim researched price text (e.g. "₹800 / session") when it carries
   *  more than a bare number. Takes display precedence over `price`. */
  priceLabel?: string;
}

export interface Business {
  slug: string;
  name: string;
  category: string;
  area: string;
  address: string;
  placeId: string | null;
  rating: number | null;
  reviewCount: number | null;
  phone: string;
  instagram: string | null;
  hours: string;
  priceInfo: string;
  tagline: string;
  ambience: string;
  signatureItems: string[];
  servicesOrMenu: MenuItem[];
  photoUrls: string[];
  reviewThemes: string[];
  score: number;
  scoreReason: string;
  websiteStatus: string;
  riskFlags: string[];
  /** Brand accent colour used across this business's demo page. */
  accent: string;
  /** Hero image: real photo if available, else a verified representative photo. */
  heroImage: string;
  /** Extra representative gallery photos (empty when real photos exist). */
  galleryImages: string[];
}

/** Digits-only phone for wa.me links. */
export function whatsappNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** All photos to show for a business: hero + real photos + gallery, de-duplicated. */
export function allPhotos(b: Business): string[] {
  return Array.from(new Set([b.heroImage, ...b.photoUrls, ...b.galleryImages].filter(Boolean)));
}

export const businesses: Business[] = [
  {
    "slug": "dripping-dose",
    "name": "Dripping Dose",
    "category": "cafe",
    "area": "East Patel Nagar",
    "address": "28/7, next to Gud Price Bazar, Block 28, East Patel Nagar, New Delhi 110008",
    "placeId": "1399386674689620",
    "rating": 4.7,
    "reviewCount": 1448,
    "phone": "+919355155150",
    "instagram": null,
    "hours": "Daily 11:30 AM - 12:00 AM (places); JustDial shows open until 11:30 PM",
    "priceInfo": "₹1,200 for two (JustDial); moderate price level; 124+ menu items listed",
    "tagline": "East Patel Nagar's pink-themed cafe where pasta meets sushi",
    "ambience": "Vibrant pink-themed, cozy and aesthetically pleasing interior; described as cute and Instagram-friendly, popular for couples, brunch and family hangouts; candle-light dinner listed on JustDial; free Wi-Fi, indoor seating",
    "signatureItems": [
      "Veg White Sauce Pasta",
      "Loaded Chicken Pizza",
      "Butter Chicken Balls",
      "Chicken Katsu Sushi",
      "Asparagus Tempura Sushi",
      "Kung Pao Chicken"
    ],
    "servicesOrMenu": [
      {
        "name": "Chicken Half & Half Pizza",
        "price": 550
      },
      {
        "name": "Chicken Loaded Pizza",
        "price": 525
      },
      {
        "name": "All American Pizza",
        "price": 495
      },
      {
        "name": "Non-veg Thai Green Curry with Rice",
        "price": 495
      },
      {
        "name": "Non-veg Thai Red Curry with Rice",
        "price": 495
      },
      {
        "name": "Veg Penang Curry with Rice",
        "price": 475
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "\"The food and the ambience was awesome\" (places summary)",
      "Loved the ambience and cleanliness; quality of service praised repeatedly (magicpin)",
      "Multi-cuisine variety - Italian, Chinese, Asian, Continental, bakery/desserts (menucard.in, 4.2-4.4 across platforms)"
    ],
    "score": 9,
    "scoreReason": "Traction 3/3: JustDial 4.7 with 1,448 ratings is the strongest in Lot 1. No-website 2/2: only a free dripping-dose.business.site, no real website. Contact 2/2: public phone +91 93551 55150 verified in places details. Paying capacity 2/2: ₹1,200 for two, premium multi-cuisine menu (sushi, wood-fired pizza, Thai curries), candle-light dinner, running 15% off offers - a business already spending to attract diners.",
    "websiteStatus": "Only https://dripping-dose.business.site/ (free Google site) returned as website in places details (verified 2026-10-24); no independent website found in search",
    "riskFlags": [
      "photoUrls empty: places details gallery returned no media for this place_id on 2026-10-24",
      "JustDial rating count (1,448) is far higher than other platforms (magicpin 4.3/14) - cite JustDial figure as JustDial-specific",
      "No Instagram handle confirmed in sources - contact via phone first"
    ],
    "accent": "#ec4899",
    "heroImage": "https://images.pexels.com/photos/7688356/pexels-photo-7688356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "galleryImages": [
      "https://images.pexels.com/photos/36853823/pexels-photo-36853823/free-photo-of-gourmetpizza-og-pastamaltid-i-budapest.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
  },
  {
    "slug": "steve-and-dodo",
    "name": "Steve and Dodo",
    "category": "cafe",
    "area": "Karol Bagh",
    "address": "4/8 WEA, Saraswati Marg, Karol Bagh, New Delhi 110005",
    "placeId": null,
    "rating": 4.9,
    "reviewCount": 295,
    "phone": "+918826874005",
    "instagram": null,
    "hours": "Daily 8:00 AM - 11:00 PM (TripAdvisor/JustDial)",
    "priceInfo": "₹100-₹599 per person range (TripAdvisor); pure vegetarian cafe menu",
    "tagline": "Karol Bagh's cosy pure-veg corner cafe for coffee, books and slow mornings",
    "ambience": "Cosy corner neighbourhood cafe with cute furniture and warm vibe; calm escape from busy Saraswati Marg market; good for working, meetings, reading, small get-togethers and birthday parties; free Wi-Fi, complimentary chia-seed water and nachos-salsa on arrival noted by reviewers",
    "signatureItems": [
      "Cappuccino",
      "Biscoff Latte",
      "Thai Curry with Rice",
      "Pizza",
      "Hummus and Pita",
      "Croissant + Cappuccino combo (₹300, per reviewer)",
      "Hot Chocolate with Marshmallows",
      "Cafe Mocha"
    ],
    "servicesOrMenu": [
      {
        "name": "Croissant + Cappuccino combo",
        "price": 300
      },
      {
        "name": "Cappuccino",
        "price": null
      },
      {
        "name": "Biscoff Latte",
        "price": null
      },
      {
        "name": "Thai Curry with Rice",
        "price": null
      },
      {
        "name": "Pizza",
        "price": null
      },
      {
        "name": "Hummus and Pita",
        "price": null
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "\"Amazing coffee served by friendly staff in a lovely place, great for breakfast\" - TripAdvisor, Jan 2026",
      "Curated vegetarian menu praised as a refreshing change from Karol Bagh's usual fare; cappuccino 'perfectly brewed' (TripAdvisor, Jan 2026)",
      "Cozy, budget-friendly for students; complimentary chia-seed water and nachos noted (TripAdvisor, Apr 2026)"
    ],
    "score": 9,
    "scoreReason": "Traction 3/3: JustDial 4.9/295 (latest crawl; earlier crawls 4.8/263), Google 4.9/221, TripAdvisor 5.0/67 and ranked #58 of 10,833 Delhi restaurants, with fresh reviews Jan-Apr 2026. No-website 2/2: no website found anywhere - only JustDial/TripAdvisor listings. Contact 1.5/2: public phone +91 88268 74005 verified on TripAdvisor; Instagram handle not confirmed. Paying capacity 1.5/2: chef-curated menu, events/birthday positioning, tourist + local footfall in a prime shopping hub.",
    "websiteStatus": "No website found in any search result 2026-10-24 - only JustDial, TripAdvisor and Google listings",
    "riskFlags": [
      "No place_id returned by search, so places details/photos could not be pulled - photoUrls empty",
      "Instagram handle not confirmed - verify by searching the name on Instagram before DMing; phone is the safe first channel",
      "JustDial rating/count varies by crawl (4.8/157 to 4.9/295) - figures are crawl-dependent"
    ],
    "accent": "#d97706",
    "heroImage": "https://images.pexels.com/photos/31321857/pexels-photo-31321857.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200",
    "galleryImages": [
      "https://images.pexels.com/photos/35134981/pexels-photo-35134981/free-photo-of-chic-modern-cafe-interior-with-natural-decor.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/12455528/pexels-photo-12455528.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    ]
  },
  {
    "slug": "refuel-cafe",
    "name": "Refuel Cafe",
    "category": "cafe",
    "area": "Karol Bagh",
    "address": "15A/59, Ground Floor, WEA, Karol Bagh, New Delhi 110005",
    "placeId": null,
    "rating": 4.4,
    "reviewCount": 169,
    "phone": "+919958549739",
    "instagram": null,
    "hours": "Daily 10:00 AM - 11:00 PM (JustDial)",
    "priceInfo": "₹850 for two (JustDial); ₹1,000 for two (Swiggy Dineout)",
    "tagline": "A rustic English-countryside-style cafe hidden in Karol Bagh's lanes",
    "ambience": "Cosy cafe with rustic decor and 'English countryside' vibes per reviewers; indoor seating; described as a hidden gem ideal for a day out with friends; warm atmosphere and attentive service in JustDial summary",
    "signatureItems": [
      "Fish Tikka",
      "Paneer Tikka Pizza",
      "Chicken Malai Tikka",
      "Afghani Chicken",
      "Dahi Ke Kebab",
      "Chilli Paneer",
      "Kadhai Paneer",
      "Chicken Lababdar",
      "Fried Stuffed Wontons",
      "Holistic Salads and Sizzlers"
    ],
    "servicesOrMenu": [
      {
        "name": "Fish Tikka",
        "price": null
      },
      {
        "name": "Chicken Malai Tikka",
        "price": null
      },
      {
        "name": "Afghani Chicken",
        "price": null
      },
      {
        "name": "Dahi Ke Kebab",
        "price": null
      },
      {
        "name": "Chilli Paneer",
        "price": null
      },
      {
        "name": "Kadhai Paneer",
        "price": null
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "\"A cosy cafe in the lanes of Karol Bagh that reminds you of an English countryside cafe - rustic decor and beautiful vibes\" (worldorgs review aggregate)",
      "Reviewers praise fresh, well-cooked North Indian/Chinese/Continental food and quick delivery with nice packaging",
      "JustDial summary: quality food, warm atmosphere, attentive service - 'a favourite spot for food lovers'"
    ],
    "score": 8,
    "scoreReason": "Traction 2.5/3: JustDial 4.4/169 plus Swiggy Dineout 4.6/154 (crawled within the last day) - two independent platforms above 150 ratings. No-website 2/2: no website in JustDial/Swiggy/magicpin listings. Contact 1.5/2: phone public but conflicting numbers across platforms (see risks); no IG confirmed. Paying capacity 2/2: ₹850-1,000 for two, broad multi-cuisine menu (North Indian, Chinese, Continental, Italian, sizzlers, salads), dine-in experience positioning.",
    "websiteStatus": "No website listed on JustDial, Swiggy Dineout or magicpin as of 2026-10-24 - listing/phone only. Note: unrelated same-name Refuel cafes in Mahavir Enclave/Palam DO have a .business.site - do not confuse them with this Karol Bagh outlet",
    "riskFlags": [
      "Phone conflict: Swiggy lists +91 99585 49739 (fresh crawl), magicpin lists +91 98108 78976 - verify on JustDial at send time",
      "Name spelled 'Reefuel Cafe' on Swiggy vs 'Refuel Cafe' on JustDial",
      "No place_id for the Karol Bagh outlet was returned (same-name outlets elsewhere polluted results), so no places gallery photos - photoUrls empty; JustDial page advertises 92-101 photos to source manually"
    ],
    "accent": "#65a30d",
    "heroImage": "https://images.pexels.com/photos/36338002/pexels-photo-36338002/free-photo-of-cozy-evening-in-a-turkish-cafe-interior.jpeg?w=600",
    "galleryImages": [
      "https://images.pexels.com/photos/776538/pexels-photo-776538.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/34206672/pexels-photo-34206672/free-photo-of-cozy-sunset-cafe-interior-with-warm-lighting.jpeg?auto=compress&w=600"
    ]
  },
  {
    "slug": "bon-temps-cafe",
    "name": "BON TEMPS Cafe",
    "category": "cafe",
    "area": "Rajinder Nagar",
    "address": "Shop No-106, Shankar Road Market, opposite Reaxo Footwear, New Rajinder Nagar, Delhi",
    "placeId": "2626950410837604",
    "rating": 4.1,
    "reviewCount": 122,
    "phone": "+919999367991",
    "instagram": "@bontemps__cafe",
    "hours": "Mon-Fri 11:00 AM - 11:00 PM; Sat-Sun 9:00 AM - 11:00 PM (places details)",
    "priceInfo": "₹450 for two (JustDial); ₹1,000 for two (Swiggy Dineout); RestaurantGuru: ₹400-600 per person; moderate price level",
    "tagline": "Rajinder Nagar's American-style cafe with a spectacular atmosphere",
    "ambience": "American-style cafe/diner with a 'spectacular atmosphere' (places summary); soothing, pretty interiors with acrylic paintings and big plants per Google reviews; used for birthday celebrations; dine-in comfort plus delivery, friendly staff, Wi-Fi",
    "signatureItems": [
      "Hot Chocolate",
      "Crostini",
      "Pasta (veg pastas praised)",
      "Margherita Pizza",
      "Salads",
      "Potato Wedges with Hung Curd Dip"
    ],
    "servicesOrMenu": [
      {
        "name": "Hot Chocolate",
        "price": null
      },
      {
        "name": "Crostini",
        "price": null
      },
      {
        "name": "Pasta",
        "price": null
      },
      {
        "name": "Margherita Pizza",
        "price": null
      },
      {
        "name": "Salads",
        "price": null
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "Google rating 4.7 cited by RestaurantGuru - 'well known for great service and friendly staff, nice atmosphere'",
      "Birthday-celebration review: 'wow moment' ambience, loved Margherita pizza and veg pasta, staff never rushed them (Google via Wanderlog)",
      "Swiggy Dineout 4.7/52 for American/Italian/Beverages"
    ],
    "score": 8,
    "scoreReason": "Traction 2/3: JustDial 4.1/122, Swiggy 4.7/52, Google 4.7 (RestaurantGuru) - solid but JustDial score is the softest of the five. No-website 2/2: the 'website' in places details is literally its Instagram (@bontemps__cafe) - no real site. Contact 2/2: phone +91 99993 67991 verified in places + Swiggy, IG handle confirmed. Paying capacity 2/2: moderate pricing (up to ₹1,000 for two on Swiggy), American/Italian menu, atmosphere-led positioning and birthday/event use - exactly the kind of brand-led cafe that benefits from a website.",
    "websiteStatus": "Website field in places details = https://www.instagram.com/bontemps__cafe (Instagram only, verified 2026-10-24); no independent website found",
    "riskFlags": [
      "photoUrls empty: places details gallery returned no media for this place_id on 2026-10-24",
      "One Google review notes limited veg options and average coffee - not a blocker, just don't over-claim in the pitch",
      "JustDial hours (open until 11:30 PM) differ slightly from places hours (11:00 PM)"
    ],
    "accent": "#dc2626",
    "heroImage": "https://images.pexels.com/photos/35968000/pexels-photo-35968000/free-photo-of-cozy-american-diner-interior-with-counter-seating.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "galleryImages": [
      "https://images.pexels.com/photos/1601775/pexels-photo-1601775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      "https://images.pexels.com/photos/4232135/pexels-photo-4232135.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    ]
  },
  {
    "slug": "woodland-cafe",
    "name": "Woodland Cafe",
    "category": "cafe",
    "area": "Karol Bagh",
    "address": "2168, Ground Floor, Gurudwara Road, opp. Post Office, Block 37J, Beadonpura, Karol Bagh, New Delhi 110005",
    "placeId": "1141981746663247",
    "rating": 4.7,
    "reviewCount": 83,
    "phone": "+919599336285",
    "instagram": "@cafewoodlandofficial",
    "hours": "Sun-Fri 9:30 AM - 9:00 PM; Sat 9:30 AM - 9:30 PM (places details). Zomato lists 10:30 AM - 10:30 PM",
    "priceInfo": "₹500 for two (JustDial); ₹450 for two (Zomato); inexpensive price level",
    "tagline": "Karol Bagh's fairy-lit quiet oasis for hazelnut cappuccino and slow evenings",
    "ambience": "Quiet cafe oasis with fairy lights; calm, cozy retreat feel; indoor seating, good for solo dining and working on a laptop; dine-in and takeout; vegetarian-friendly with vegan options",
    "signatureItems": [
      "Hazelnut Cappuccino",
      "Paneer Sandwich",
      "Peri Peri Chicken Roll",
      "Cappuccino",
      "Lattes",
      "Cold Coffee",
      "Muffins"
    ],
    "servicesOrMenu": [
      {
        "name": "Hazelnut Cappuccino",
        "price": null
      },
      {
        "name": "Paneer Sandwich",
        "price": null
      },
      {
        "name": "Peri Peri Chicken Roll",
        "price": null
      },
      {
        "name": "Cappuccino",
        "price": null
      },
      {
        "name": "Cold Coffee",
        "price": null
      },
      {
        "name": "Muffins",
        "price": null
      }
    ],
    "photoUrls": [
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/722810772_18159689722457851_7546645288585530821_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=ckPsFD53ufEQ7kNvwH6Zhfj&_nc_oc=AdoTugFnlB4Xk3rUgErsvI5HmEXTkAseepF-66ztthkd8NFPzuipJyxfAHoj17tp1latbM9tnLPacywxHsS6LGiC&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=PEg7ltukLmCacg-VioIUrw&oh=00_AQOkOdm_nRzBGv0-5lcn8kv9PCHYxRllPJbSox70PclJ7w&oe=6AE19545",
      "https://scontent-den2-1.cdninstagram.com/v/t39.30808-6/542752183_122129058740907630_5231545941553317730_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=3Shb_Gc5Q-UQ7kNvwFZpMIi&_nc_oc=AdpF2V2CmZJT9vhnxwhWWAwKG56BkOnNC535d1M7jtCVzcaNljF0q05bG-TCIsn44nE4YIqHBu6P5AZqqPksQvMI&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=PEg7ltukLmCacg-VioIUrw&oh=00_AQPRvW98iSlyzBqPW2tbAIY8vcF6ngLtuhDRPdmaPHdwVA&oe=6AE178E0",
      "https://scontent-den2-1.cdninstagram.com/v/t39.30808-6/542752943_122129058464907630_6188518164293198705_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=lUXNL44HmWYQ7kNvwG_n5cj&_nc_oc=AdoDfZTJ8G509Rops-ddVps2dW_AP-k9kTh0Bj8ekX1t1Gn2QkVJ_My4QVOp8kd5aZjLbHQIAMaZUEG_zyR0Y5QF&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=PEg7ltukLmCacg-VioIUrw&oh=00_AQPHlhMoeCq4aV_xx0gAMDwTx24Uxc6WWENXlvczAv0DfA&oe=6AE16B82",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/723562141_18159689713457851_1116116527135922129_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=vtv2JaDzOY0Q7kNvwGV0btZ&_nc_oc=AdqbhkzPC421iesAVSllrjyp6PiqOVxvXI-oOYofuA91F3KU84JAp5NiAj9oX51NjKnj7Aw6A_S89Qlwe5qFaSLe&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=PEg7ltukLmCacg-VioIUrw&oh=00_AQP-olDGR81WLrNUdBGzUQ_4MBFq5bNnaPw46DtDOUcECw&oe=6AE19CE4",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/736493798_18088010612450468_2775313806080794918_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=8rMGQBUK-iAQ7kNvwEUAj71&_nc_oc=AdqU2tALCCDaO8SpJatj4gelv5i1crvnuk7T1a1wuQgAMhlOuaTJjJnO-1IB9JxaaQADQ2OJ_afCjxHrEMD-fUYU&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=PEg7ltukLmCacg-VioIUrw&oh=00_AQOs0MYeA4B_E5PntTuyc-_tBxr0iuj3LudHf9VO6gyrNw&oe=6AE16B65"
    ],
    "reviewThemes": [
      "\"Nice coffee at very reasonable price\" - recurring reviewer praise in places summary",
      "Fairy-lights, calm cozy vibe is the standout theme across listings",
      "Google 4.7/66 (top-rated.online) aligns with JustDial 4.7/83 - consistent quality signal"
    ],
    "score": 7,
    "scoreReason": "Traction 1.5/3: 4.7 stars but counts are under the 100+ ideal on each single platform (JustDial 83-84, Google 66) - combined ~150 across platforms. No-website 2/2: no website in places details, only Facebook page + Instagram links. Contact 2/2: phone +91 95993 36285 verified, IG @cafewoodlandofficial confirmed and active (own posts in gallery). Paying capacity 1.5/2: budget pricing (₹450-500 for two) caps ticket size, but the strong ambience brand, active Instagram and dine-in experience make a ₹4,999 starter site a plausible, well-matched ask.",
    "websiteStatus": "No website in places details (verified 2026-10-24) - only a Facebook page link and Instagram @cafewoodlandofficial; Zomato/JustDial listings carry no website",
    "riskFlags": [
      "Review counts below 100 per platform - included on combined traction + perfect contactability + active IG",
      "Hours differ between places (9:30 AM-9:00 PM) and Zomato (10:30 AM-10:30 PM) - confirm at build time",
      "Do not confuse with Woodland footwear stores in Karol Bagh (same name, same area)"
    ],
    "accent": "#059669",
    "heroImage": "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/722810772_18159689722457851_7546645288585530821_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=ckPsFD53ufEQ7kNvwH6Zhfj&_nc_oc=AdoTugFnlB4Xk3rUgErsvI5HmEXTkAseepF-66ztthkd8NFPzuipJyxfAHoj17tp1latbM9tnLPacywxHsS6LGiC&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=PEg7ltukLmCacg-VioIUrw&oh=00_AQOkOdm_nRzBGv0-5lcn8kv9PCHYxRllPJbSox70PclJ7w&oe=6AE19545",
    "galleryImages": []
  },
  {
    "slug": "monash-makeovers-rohini",
    "name": "Monash Makeover & Skin Clinic Luxury Unisex Salon & Academy",
    "category": "salon",
    "area": "Rohini Sector 7/8",
    "address": "A-1/10, Basement, Rohini Sector 8 Rd, near Deepali Chowk, opposite M2K Cinemas, Rohini, Delhi-110085",
    "placeId": null,
    "rating": 4.2,
    "reviewCount": 891,
    "phone": "+919999442966",
    "instagram": null,
    "hours": "Mon-Sun 9:00 AM - 9:00 PM",
    "priceInfo": "Moderate (places price level 2); Facial ₹800, Nail Extension ₹519-₹601, Honey Wax ₹75 (JustDial published rates)",
    "tagline": "Luxury unisex salon & academy in Rohini since 2010 — bridal, hair, skin and nails under one roof",
    "ambience": "Large basement luxury-format unisex salon + training academy opposite M2K Cinemas; busy, high-footfall setup taking walk-ins and appointments; premium product positioning (Dermalogica)",
    "signatureItems": [
      "Bridal makeup with hair styling & saree draping",
      "Airbrush makeup",
      "Dermalogica core treatment",
      "Nail extensions & nail art",
      "Cysteine / hair smoothing treatments"
    ],
    "servicesOrMenu": [
      {
        "name": "Facial",
        "price": null,
        "priceLabel": "₹800 / session"
      },
      {
        "name": "Nail Extension Services",
        "price": null,
        "priceLabel": "₹519 - ₹601 / session"
      },
      {
        "name": "Honey Wax for Women",
        "price": null,
        "priceLabel": "₹75 / session"
      },
      {
        "name": "Anti-Acne Facial",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Cysteine Treatment",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Airbrush Makeup",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Nude Makeup",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Bridal Makeup + Hair Styling + Draping",
        "price": null,
        "priceLabel": "Ask in salon"
      }
    ],
    "photoUrls": [
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/442488602_122094532532335737_3120921707664670892_n.png?_nc_cat=110&ccb=1-7&_nc_sid=eed8e3&_nc_ohc=Vlu7AWWrgNAQ7kNvwEaRKkt&_nc_oc=AdrZ5d_QthCWS0z9RgnuuYK_poyasXW5O_JcXpm6vpaLjPcnZhtKA7LXEoBXcv2qzagbL1ukKFn21CHbgVFeuujq&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=E3tny8pyHknozxNdnyP78A&oh=00_AQNqOvdY2NFmFq6nELJGm4S9Ad89SRhtmbhD30ugROOTHw&oe=6AE17523"
    ],
    "reviewThemes": [
      "Friendly and caring staff",
      "Owners' comforting presence praised",
      "High-quality products",
      "Damaged-hair repair results",
      "233-256 people recently enquired on JustDial — very high demand"
    ],
    "score": 9,
    "scoreReason": "Traction 3/3 (4.2★, 891 JustDial ratings — biggest verified count in this lot, 200+ recent enquiries); No-website 2/2 (only a free monash-makeovers.business.site + Facebook page); Contactable 2/2 (public phone +91 99994 42966, JustDial WhatsApp, responds in ~4 hrs); Paying capacity 2/2 (luxury + academy format since 2010, bridal/airbrush/Dermalogica premium services, moderate price level). Minor deduction already applied inside traction: 4.2 is the lot's lowest rating.",
    "websiteStatus": "NO proper website — verified 2026-10-24: only https://monash-makeovers.business.site/ (free Google site) listed as website in places data, plus a Facebook page. No own domain found in search.",
    "riskFlags": [
      "JustDial lists location as 'Basement, Rohini Sector 7' while places address says Sector 8 Rd near Deepali Chowk — same premises area, confirm exact address before printing in prototype",
      "Rating 4.2 is solid but lowest of the lot — lead the pitch with volume (891 reviews), not rating",
      "Instagram handle not confirmed in places links (only FB page + IG location page) — pitch via phone/WhatsApp first"
    ],
    "accent": "#9333ea",
    "heroImage": "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/442488602_122094532532335737_3120921707664670892_n.png?_nc_cat=110&ccb=1-7&_nc_sid=eed8e3&_nc_ohc=Vlu7AWWrgNAQ7kNvwEaRKkt&_nc_oc=AdrZ5d_QthCWS0z9RgnuuYK_poyasXW5O_JcXpm6vpaLjPcnZhtKA7LXEoBXcv2qzagbL1ukKFn21CHbgVFeuujq&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=E3tny8pyHknozxNdnyP78A&oh=00_AQNqOvdY2NFmFq6nELJGm4S9Ad89SRhtmbhD30ugROOTHw&oe=6AE17523",
    "galleryImages": []
  },
  {
    "slug": "queens-makeovers-rohini",
    "name": "Queens Makeovers",
    "category": "salon",
    "area": "Rohini Sector 24",
    "address": "No. 237, Ground Floor, Pocket 20, Sector 24, Rohini, Delhi-110085 (branches also at Pocket 26 Sec-24 and Pocket 10 Sec-24)",
    "placeId": null,
    "rating": 4.8,
    "reviewCount": 807,
    "phone": "+917011840316",
    "instagram": null,
    "hours": "Mon-Sun 10:00 AM - 8:30 PM",
    "priceInfo": "Inexpensive (places price level 1); Hair Cut ₹112, Waxing ₹150, Rica Waxing ₹350, Basic Facial ₹449 (JustDial published rates) — volume pricing",
    "tagline": "Rohini Sector 24's high-volume women's salon — makeup, hair, nails and waxing at honest prices",
    "ambience": "Bustling neighbourhood women's salon, now 3 branches within Sector 24; magicpin reviewers call out polite, attentive staff and a one-stop-shop feel (makeup, massage, nail-art)",
    "signatureItems": [
      "Party makeup",
      "Acrylic permanent nail extensions",
      "Rica waxing",
      "Bridal makeup",
      "Hair extensions"
    ],
    "servicesOrMenu": [
      {
        "name": "Hair Cut for Women",
        "price": null,
        "priceLabel": "₹112 / session"
      },
      {
        "name": "Waxing",
        "price": null,
        "priceLabel": "₹150 / session"
      },
      {
        "name": "Rica Waxing for Women",
        "price": null,
        "priceLabel": "₹350 / session"
      },
      {
        "name": "Basic Facial",
        "price": null,
        "priceLabel": "₹449 / session"
      },
      {
        "name": "Party Makeup",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Acrylic Permanent Nail Extension",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Bridal Makeup",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Hair Straightening",
        "price": null,
        "priceLabel": "Ask in salon"
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "Customer service & satisfaction repeatedly praised (magicpin)",
      "Polite and attentive staff",
      "Rebonding results praised — 'hair looks smoother and manageable'",
      "Great pricing — reviewers say they 'feel like family' and keep coming back",
      "807 JustDial ratings at 4.8★ across listings"
    ],
    "score": 8,
    "scoreReason": "Traction 3/3 (4.8★, 807 JustDial ratings); No-website 2/2 (website field is only their Facebook page — queensmakeoversbyRomiJain; no domain, no .business.site even); Contactable 2/2 (public phone +91 70118 40316); Paying capacity 1/2 (budget price points ₹112-₹449, BUT 3 branches in one sector = proven expansion money and volume that can fund a ₹4,999 site).",
    "websiteStatus": "NO website at all — verified 2026-10-24: places 'website' link is https://m.facebook.com/queensmakeoversbyRomiJain/ (Facebook page only). No own domain or .business.site found.",
    "riskFlags": [
      "3 branches — pitch one flagship site covering all branches, don't pitch 3 sites",
      "Budget pricing (haircut ₹112) — anchor pitch on volume: 800+ reviews and 3 branches with zero web presence",
      "photoUrls empty: places gallery returned no images on 2026-10-24 — pull photos from their Facebook page before building the prototype",
      "JustDial address variants (Pocket 20/26, 'Hanumangarh' tag in one listing is a JustDial error) — use Pocket 20, Sector 24 main branch"
    ],
    "accent": "#e11d48",
    "heroImage": "https://images.pexels.com/photos/7750115/pexels-photo-7750115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "galleryImages": [
      "https://images.pexels.com/photos/7750090/pexels-photo-7750090.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/7750124/pexels-photo-7750124.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
  },
  {
    "slug": "the-epic-nail-and-makeup-rohini",
    "name": "The Epic Nail and Makeup",
    "category": "salon",
    "area": "Rohini Sector 7",
    "address": "B-4/239, Rohini Sector 7, Delhi-110085 (JustDial: Devised Road, Rohini Sector 7)",
    "placeId": null,
    "rating": 5.0,
    "reviewCount": 139,
    "phone": "+919310628749",
    "instagram": "@theepicnail",
    "hours": "Mon-Sun 10:30 AM - 8:00 PM",
    "priceInfo": "Not publicly listed — nail art / extensions and makeup are premium-category services; home services offered",
    "tagline": "5-star nail art & makeup studio in Rohini — the nails everyone screenshots, now bookable",
    "ambience": "Boutique nail + makeup studio format (not a big salon floor) — visual, Instagram-first brand; offers beauty classes/academy angle alongside services and home services",
    "signatureItems": [
      "Nail art",
      "Nail extensions",
      "Basic makeup",
      "Skin care services",
      "Beauty classes"
    ],
    "servicesOrMenu": [
      {
        "name": "Nail Art",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Nail Extensions",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Basic Makeup",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Skin Care Services",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Body Art Services",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Beauty Classes",
        "price": null,
        "priceLabel": "Ask in salon"
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "Perfect 5.0★ across 139 JustDial ratings — strongest rating in the lot",
      "Nail art is the hero service reviewers seek out",
      "Home services offered — convenience praised in listing data"
    ],
    "score": 9,
    "scoreReason": "Traction 3/3 (5.0★ perfect score, 139 ratings — above the 100+ bar); No-website 2/2 (their 'website' IS their Instagram profile — instagram.com/theepicnail; zero web presence beyond IG + JustDial); Contactable 2/2 (public phone +91 93106 28749 + confirmed IG handle @theepicnail for DM pitch); Paying capacity 2/2 (nail extensions + makeup are high-margin festive/bridal-season services; academy/classes = second revenue stream).",
    "websiteStatus": "NO website — verified 2026-10-24: places website link is literally https://instagram.com/theepicnail (Instagram profile used as website). Only other presence is JustDial.",
    "riskFlags": [
      "photoUrls empty: places gallery returned no media on 2026-10-24 — their Instagram @theepicnail is photo-rich, pull 4-6 nail photos from there before the prototype build",
      "No public price list found — prototype should use 'DM/Call for price' slots rather than invented prices",
      "Single small studio (B-4/239) — keep pitch to the ₹4,999 starter, don't oversell the bundle first"
    ],
    "accent": "#0891b2",
    "heroImage": "https://images.pexels.com/photos/3997389/pexels-photo-3997389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "galleryImages": [
      "https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/4677852/pexels-photo-4677852.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
  },
  {
    "slug": "dazzle-beauty-studio-rohini",
    "name": "Dazzle Beauty Studio",
    "category": "salon",
    "area": "Rohini Sector 8",
    "address": "C-9/122, Opposite Fire Station, Bhagwan Mahavir Marg, Rohini Sector 8, Delhi-110085",
    "placeId": null,
    "rating": null,
    "reviewCount": null,
    "phone": "+919711181463",
    "instagram": "@dazzle_beauty_studio",
    "hours": "Mon-Sun 10:00 AM - 8:00 PM",
    "priceInfo": "Not publicly listed — premium treatment menu (Nanoplastia, Hair Botox, Keratin, bridal glam) signals mid-to-premium pricing; run by owner MUA Ritu Budhiraja",
    "tagline": "Rohini's bridal-glam studio by makeup artist Ritu Budhiraja — hair, makeup and nails, seven days a week",
    "ambience": "Owner-led unisex studio opposite Rohini fire station; soft, feminine glam aesthetic on Instagram (soft subtle looks, brown-tone flawless makeup, draping reels); one draping reel drew ~18.9k reactions — serious content traction",
    "signatureItems": [
      "Bridal glam / bridal makeup",
      "Nanoplastia hair treatment",
      "Hair Botox",
      "Keratin treatment",
      "Nail art & extensions",
      "Hair colour"
    ],
    "servicesOrMenu": [
      {
        "name": "Bridal Glam / Bridal Makeup",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Nanoplastia Hair Treatment",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Hair Colour",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Hair Botox",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Keratin Treatment",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Nail Art",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Makeup",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Spa & Pedicure",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Waxing",
        "price": null,
        "priceLabel": "Ask in salon"
      }
    ],
    "photoUrls": [
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/774350113_18350580691222959_2394039992894935174_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=bta6kYGBWo4Q7kNvwHHFAFJ&_nc_oc=AdpX81Z9z4QGWE1tCVKE1zrnTIJ7L5xVObWu583tkjTl-zfrm8qEk7VUuxqpbIgcP9uZsPB65avFMAvZ7cljUd21&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=XFBwNF1Hi7Eo18KF4jP9ZQ&oh=00_AQMV6Z-9_zD4h7p4D8hctauVNiSKA8w4N9t5SiN-l8IToA&oe=6AE18DEF",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/549573304_18307687909222959_4167700515883110980_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=v60Hwxuief4Q7kNvwHyreIx&_nc_oc=AdqSSIuKyjWKkrUP-P33gcaz5CJt4zNY_qTQLZX0p6rEhHSi1YmCcAKD97BGZgjCZ4dD15n2hj8EzzVd3HPaqCnq&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=XFBwNF1Hi7Eo18KF4jP9ZQ&oh=00_AQOeue6JKjcaHTID5brEd4Dd41yqtoa7aQDOZpp8rZpA8A&oe=6AE19AB7",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/793902358_18354359260222959_4276961161114919797_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=oFh-HHyBv8cQ7kNvwEUJsm-&_nc_oc=AdrJASIFY1TdYiR1R_xUDvQYYXSx4gbShfVXO1Fu1wp-Le327tB4ajFQF7ejTEv9LjWWL13QeVCsCI_iv6G2YqU2&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=XFBwNF1Hi7Eo18KF4jP9ZQ&oh=00_AQPzQMTdLKbxqR0k61YqYOm0GpgkwJKwZNfycd8bcTBDUw&oe=6AE174B7",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/813582856_18354769951222959_209071863199254451_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=Psvl9xjwVnkQ7kNvwHqAmYY&_nc_oc=Adp3Xkr5p0NO_15JontJCf8sO0osR7AyNe9ey1Q4VGOQzxTk6b-nC1xST75EFpb_2BpFIHyc3ZekLbPxEk2MZ3LZ&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=XFBwNF1Hi7Eo18KF4jP9ZQ&oh=00_AQPrF4MOIwDNnX20uPG2bZ6MpWX_iKNDvl5PmLUoEinoUA&oe=6AE18AF7",
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/481275783_1085690336906471_6295026478456347161_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=957871&_nc_ohc=hmQUiEwPWfoQ7kNvwFkyNHL&_nc_oc=AdogNQJGsrhstJI1JTR5mhRy7yuskgdmt7eC0WKBmSHRaNFeiR_q4ulSy7Na0a0ROznTWC_LfFR5MAE4qPnD2Khk&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=XFBwNF1Hi7Eo18KF4jP9ZQ&oh=00_AQOoJTYgOzmYZbrI7tCeyOpHYXL9HsQkJP2C4MPLLF4Baw&oe=6AE189BA"
    ],
    "reviewThemes": [
      "Polite and supportive staff praised",
      "Layered haircut called 'exactly what I wanted'",
      "Bridal makeup and nail extensions praised",
      "Mixed note: a few reviewers mention poor service / inexperienced staff — service consistency is a known weak spot"
    ],
    "score": 7,
    "scoreReason": "Traction 1.5/3 (places/JustDial publish no rating count — scored instead on verified Instagram activity: active @dazzle_beauty_studio with a ~18.9k-reaction reel, which meets the 'strong IG activity' alternative in the brief); No-website 2/2 (only free dazzle-beauty-studio.business.site); Contactable 2/2 (phone +91 97111 81463 + confirmed IG handle); Paying capacity 1.5/2 (premium treatment menu — Nanoplastia/Botox/bridal — and a registered trademark held by proprietor Ritu Budhiraja since 2020 = established, brand-conscious owner).",
    "websiteStatus": "NO proper website — verified 2026-10-24: only https://dazzle-beauty-studio.business.site/ (free Google site) in places links, plus Instagram/Facebook. No own domain.",
    "riskFlags": [
      "Rating/review count not published on places or JustDial — traction rests on Instagram activity; verify Google rating in person before quoting any number in the pitch",
      "A few negative reviews (inexperienced staff) — don't over-promise review scores in the prototype",
      "Trademark/brand-conscious owner — prototype must look premium, a rough mockup will backfire"
    ],
    "accent": "#6d28d9",
    "heroImage": "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/774350113_18350580691222959_2394039992894935174_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=bta6kYGBWo4Q7kNvwHHFAFJ&_nc_oc=AdpX81Z9z4QGWE1tCVKE1zrnTIJ7L5xVObWu583tkjTl-zfrm8qEk7VUuxqpbIgcP9uZsPB65avFMAvZ7cljUd21&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=XFBwNF1Hi7Eo18KF4jP9ZQ&oh=00_AQMV6Z-9_zD4h7p4D8hctauVNiSKA8w4N9t5SiN-l8IToA&oe=6AE18DEF",
    "galleryImages": []
  },
  {
    "slug": "sunaina-beauty-studio-rohini",
    "name": "Sunaina Beauty Studio",
    "category": "salon",
    "area": "Rohini Sector 8 (near Rohini East Metro)",
    "address": "Shop No-17, CSC-2, D-14, near Rohini East Metro Station, Rohini, Delhi-110085",
    "placeId": null,
    "rating": 4.9,
    "reviewCount": 59,
    "phone": "+917217742589",
    "instagram": "@sunainabeautystudio",
    "hours": "Mon-Fri + Sun 10:30 AM - 7:30 PM (closed Tuesdays per places hours)",
    "priceInfo": "Premium bridal pricing (JustDial): Bridal Makeup ₹12,000 / 4 hrs, Bridal (Outstation) ₹20,000, Party Makeup for Family ₹2,000 / 60 mins",
    "tagline": "Women-only beauty studio since 2012 — two decades of makeup artistry by Mrs. Sunita, near Rohini East Metro",
    "ambience": "Intimate women-only studio (est. 2012) run by veteran MUA Mrs. Sunita (20+ years' experience); warm, pampering, transformation-focused vibe — 'your beauty is our passion'",
    "signatureItems": [
      "Bridal makeup (₹12,000)",
      "Party makeup for family (₹2,000)",
      "Nanoplastia hair treatment",
      "Hair Botox",
      "Keratin & global hair colour",
      "Balayage"
    ],
    "servicesOrMenu": [
      {
        "name": "Bridal Makeup Artist",
        "price": null,
        "priceLabel": "₹12,000 / 4 hours"
      },
      {
        "name": "Bridal Makeup (Outstation)",
        "price": null,
        "priceLabel": "₹20,000 / session"
      },
      {
        "name": "Party Makeup for Family",
        "price": null,
        "priceLabel": "₹2,000 / 60 minutes"
      },
      {
        "name": "Nanoplastia Hair Treatment",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Hair Botox",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Keratin",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Global Hair Color",
        "price": null,
        "priceLabel": "Ask in salon"
      },
      {
        "name": "Balayage",
        "price": null,
        "priceLabel": "Ask in salon"
      }
    ],
    "photoUrls": [
      "https://scontent-den2-1.cdninstagram.com/v/t39.30808-6/461715444_18419724772075693_7246362311200577314_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=qfoCMda9KK8Q7kNvwH0CRN7&_nc_oc=AdqbLo6lh9_iuHpyk4JO8-6R04Z5C_1Tr7uWb2qKGPe5AW7bPq38QjigXapZN5-HBlqiSasSlI_0tHH-T51bWpNB&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=cYMQS7_FxzUWb_hcBt2OhA&oh=00_AQMCUmwu0Z4pBZn3qeraPhzpYb5MDH1-HMr9QNXTNFQ_pA&oe=6AE1907D",
      "https://scontent-den2-1.cdninstagram.com/v/t39.30808-6/469492370_18431866690075693_1111179695906233331_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=_zaXCtsFO90Q7kNvwG_ZNm0&_nc_oc=Adq5MB3gnQ1dxqMkCzRROHIr4iu4DvavLE8Ladsacbb7Qktk5LgD9QkbPvSX4X9hzLHT6CxZcHKmgwyP4LOLDtri&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=cYMQS7_FxzUWb_hcBt2OhA&oh=00_AQOKx8MMwoxUzi-3Dhi78iTckUKiLkz8TU2-5WucGOgSZA&oe=6AE1929D",
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/472668708_3859368094328065_2875091610856508693_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=957871&_nc_ohc=2yASTsb8EMcQ7kNvwEyw37W&_nc_oc=AdrFUoSUV28b45oXyhVljfcDf8niAzuADV0m4zRLQc2TM1dCxE8wU73G-xkB_nFXo5KJjZ7ETt4Lcyt1cY-E91r1&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=cYMQS7_FxzUWb_hcBt2OhA&oh=00_AQO5jMwDktlZKssb-MjLqlVvCISQ0bdFqZEGWNFBG1BcLg&oe=6AE17E35"
    ],
    "reviewThemes": [
      "4.9★ on JustDial — near-perfect satisfaction",
      "Bridal and party makeup are the most-booked premium services",
      "Longevity trust: operating since 2012, founder with 20+ years' experience"
    ],
    "score": 8,
    "scoreReason": "Traction 2/3 (4.9★ but 59 JustDial ratings — below the 100+ ideal, offset by premium proof below); No-website 2/2 (places links contain NO website at all — only Facebook + Instagram @sunainabeautystudio); Contactable 2/2 (phone +91 72177 42589 + confirmed IG handle); Paying capacity 2/2 (bridal at ₹12,000 and outstation bridal ₹20,000 — one bridal booking = 2.4x the website price; 14 years in business).",
    "websiteStatus": "NO website — verified 2026-10-24: places record has no website link whatsoever (only FB page and IG account @sunainabeautystudio). No domain or .business.site found in search.",
    "riskFlags": [
      "Review count (59) is the lot's lowest verified count — pitch leads with bridal pricing and since-2012 trust, not volume",
      "Places hours show Tuesday closed / no Tuesday entry — confirm hours before printing them in the prototype",
      "Women-only studio — prototype design and pitch copy must be women-focused"
    ],
    "accent": "#881337",
    "heroImage": "https://scontent-den2-1.cdninstagram.com/v/t39.30808-6/461715444_18419724772075693_7246362311200577314_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=qfoCMda9KK8Q7kNvwH0CRN7&_nc_oc=AdqbLo6lh9_iuHpyk4JO8-6R04Z5C_1Tr7uWb2qKGPe5AW7bPq38QjigXapZN5-HBlqiSasSlI_0tHH-T51bWpNB&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=cYMQS7_FxzUWb_hcBt2OhA&oh=00_AQMCUmwu0Z4pBZn3qeraPhzpYb5MDH1-HMr9QNXTNFQ_pA&oe=6AE1907D",
    "galleryImages": []
  },
  {
    "slug": "f-n-f-gym",
    "name": "F N F Gym",
    "category": "gym",
    "area": "Krishna Nagar, Laxmi Nagar",
    "address": "Building No. C 2/5, F&F Gym, Opp. Friends Centre Market, Lal Quarters Road, Krishna Nagar, Delhi-110051",
    "placeId": "1625250567968464",
    "rating": 4.7,
    "reviewCount": 525,
    "phone": "+919540901679",
    "instagram": null,
    "hours": "Mon-Sat 6:00 AM - 11:00 PM; Sun 7:00 AM - 12:00 PM",
    "priceInfo": "1-month gym membership starting at ₹1,800 (JustDial). Longer tiers not publicly priced.",
    "tagline": "Krishna Nagar's most-reviewed local gym — 12 years in business, now ready to own its bookings online.",
    "ambience": "Large, established neighbourhood strength-and-fitness floor in the Lal Quarter market area; busy, community-driven vibe with locker facility and group-class energy (aerobics/CrossFit). Places gallery shows an active, social training floor.",
    "signatureItems": [
      "CrossFit",
      "Aerobics",
      "Locker Facility",
      "Personal Training",
      "Strength Training"
    ],
    "servicesOrMenu": [
      {
        "name": "Gym Membership - 1 Month",
        "price": 1800
      },
      {
        "name": "CrossFit",
        "price": null,
        "priceLabel": "Included in membership (per JustDial listing)"
      },
      {
        "name": "Aerobics",
        "price": null,
        "priceLabel": "Included in membership (per JustDial listing)"
      },
      {
        "name": "Personal Training",
        "price": null,
        "priceLabel": "Not publicly listed"
      }
    ],
    "photoUrls": [
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/686088691_18593989699013697_5137452010350137295_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=wZYkbU6hv-4Q7kNvwFysmdL&_nc_oc=AdrKVQZI7Z7JwrzXONV3GdHYbdPS3v6nTWolx4sKz1Soims_BZOBigp-N9MPZNdNrmeazfF2ZW_wXur5jpHvjwcr&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=pDE50dcToFa344oFdNoiXw&oh=00_AQNYmsAty8yCKWu7MetpGrK0LzjmzP-A96GEXzz2Z3WPLw&oe=6AE193F7",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/806299275_18566965105074429_5752273186017585506_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=pGKygruJH50Q7kNvwFdgLI6&_nc_oc=AdouL7ZnOdSJkdtlzBwYdgPx2ogDl21Zm_pY72n4aZtibuLUUleL-1uEPmBGHcPZt7Jb5hOkANJOUpsWf0LDtwdD&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=pDE50dcToFa344oFdNoiXw&oh=00_AQO3GsbD99hr9Cy4ixqxxStNqZx_gj-ZUBtEFPZWTTNW_w&oe=6AE17618",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/686152166_18103465109512701_6756146909691795188_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=105&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=mrB0hkYn2aEQ7kNvwHTtTGa&_nc_oc=Adp_ZfKF4mO4D0ZY23UgVvnt2PgyOVEFFIWu02aio_rRR5q5D_f_clN8GO3oT6g7OKTRvslWcCUc9_zCATywOLUs&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=pDE50dcToFa344oFdNoiXw&oh=00_AQOEIrdjjkKx_pd1oj9454s9A0LWPlQasDCl-alcrgqpKw&oe=6AE18DDF",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/703715807_17946625719193002_5267704988456169629_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=_6Uad6yX6aQQ7kNvwEmaSqL&_nc_oc=AdowmxbnqNeTKYNDUjD511hcsaofVt6cys2dGcTWOGXlRmwHEXql4L6Wb-9BUxUSJkPSR6SkCMpv0W_hA0eKv3ka&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=pDE50dcToFa344oFdNoiXw&oh=00_AQNj2rV9uIpAlliccneaJH3cBVdSuHBpKyXwPMuTeLRXmg&oe=6AE1778C",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/686193367_18103465142512701_1430643606613010489_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=100&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=69qSHXZp120Q7kNvwHJkImO&_nc_oc=AdrP-6CydLj_CyBczPQgHo46kDtpI4ed0sR8H_tns3riDB46NhmWW0JdDdO8J7OM9P4WBhGnhtavdzBRDF_eyFsX&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=pDE50dcToFa344oFdNoiXw&oh=00_AQM_L3V-Ow8-ZfibAT1EnvINFtvXiypZ1_eY2vMa2vnPbg&oe=6AE188EA"
    ],
    "reviewThemes": [
      "High call pick-up rate on JustDial",
      "137 people recently enquired (JustDial)",
      "Verified, claimed JustDial listing",
      "Long-standing (12 years) local reputation"
    ],
    "score": 9,
    "scoreReason": "Traction 2/2 (4.7 stars, 525 JustDial ratings - highest in this lot); No-website 2/2 (no own website found 2026-10-24; only JustDial + a Fitternity aggregator page); Contactable 2/2 (direct phone +91 95409 01679 from places record, WhatsApp on JustDial); Paying capacity 2/2 (membership from ₹1,800/mo, locker facility, CrossFit/aerobics programme, 12 years trading); Timing 1/1 (post-Diwali signup wave, no site to capture it).",
    "websiteStatus": "No proper website. Evidence 2026-10-24: places record website field points to fitternity.com (third-party aggregator, not their own site); JustDial profile has no owned domain; web search returns only JustDial/aggregator listings.",
    "riskFlags": [
      "JustDial displays a virtual number (08123122107) - use the places-record phone +91 95409 01679 and verify on first call",
      "No confirmed Instagram handle found (only an Instagram location page and a Facebook page) - pitch channel is phone/WhatsApp first",
      "A separate 'F & F Gym And Spa' on Mandir Marg (4.4, ~292 ratings) may be a sister branch - confirm it is the same owner before pitching both"
    ],
    "accent": "#ea580c",
    "heroImage": "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/686088691_18593989699013697_5137452010350137295_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiRkVFRC5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=wZYkbU6hv-4Q7kNvwFysmdL&_nc_oc=AdrKVQZI7Z7JwrzXONV3GdHYbdPS3v6nTWolx4sKz1Soims_BZOBigp-N9MPZNdNrmeazfF2ZW_wXur5jpHvjwcr&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=pDE50dcToFa344oFdNoiXw&oh=00_AQNYmsAty8yCKWu7MetpGrK0LzjmzP-A96GEXzz2Z3WPLw&oe=6AE193F7",
    "galleryImages": []
  },
  {
    "slug": "father-of-fitness",
    "name": "Father Of Fitness",
    "category": "gym",
    "area": "Dayanand Vihar, Karkardooma (Anand Vihar)",
    "address": "Father of Fitness 8, near Shanti Mukund Hospital, above Hyundai showroom, Dayanand Vihar, Karkardooma, Delhi-110092",
    "placeId": "1209919503409725",
    "rating": 4.7,
    "reviewCount": 513,
    "phone": "+919911151701",
    "instagram": "@foffitnesa",
    "hours": "Mon-Sat 6:00 AM - 10:30 PM; Sun 8:00 AM - 12:00 PM",
    "priceInfo": "Membership pricing not publicly listed; premium positioning above a Hyundai showroom in Karkardooma suggests mid-to-premium tiers - confirm on call.",
    "tagline": "East Delhi's father-figure gym — 500+ ratings deep, living entirely on Instagram.",
    "ambience": "Big-box floor above the Hyundai showroom near Shanti Mukund Hospital; energetic unisex vibe with aerobics and Zumba classes alongside strength training.",
    "signatureItems": [
      "Aerobics",
      "Zumba",
      "Strength Training",
      "Personal Training",
      "Unisex Training Floor"
    ],
    "servicesOrMenu": [
      {
        "name": "Gym Membership",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Aerobics",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Zumba",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Personal Training",
        "price": null,
        "priceLabel": "Not publicly listed"
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "Consistently 4.7-4.9 stars across multiple JustDial category lists (451-513 ratings)",
      "Aerobics and Zumba repeatedly listed as draws",
      "Strong East Delhi local following"
    ],
    "score": 9,
    "scoreReason": "Traction 2/2 (4.7 stars, 513 JustDial ratings); No-website 2/2 (places record's website field IS its Instagram profile - textbook Instagram-only business); Contactable 2/2 (direct phone +91 99111 51701 + confirmed IG @foffitnesa); Paying capacity 2/2 (large premises above a car showroom, multi-class programme in Anand Vihar/Karkardooma catchment); Timing 1/1 (post-Diwali wave).",
    "websiteStatus": "No website at all. Evidence 2026-10-24: places record website field = https://www.instagram.com/foffitnesa; no owned domain appears in any search result - JustDial + Instagram only.",
    "riskFlags": [
      "Places gallery returned no photos for this record (photoUrls empty) - pull imagery from their Instagram @foffitnesa when building the prototype",
      "JustDial shows a virtual number (08147182652) - the places-record direct number is +91 99111 51701; verify on first contact",
      "Membership prices are not public, so prototype pricing section needs owner confirmation"
    ],
    "accent": "#4f46e5",
    "heroImage": "https://images.pexels.com/photos/6455960/pexels-photo-6455960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "galleryImages": [
      "https://images.pexels.com/photos/6455976/pexels-photo-6455976.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/5936039/pexels-photo-5936039.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
  },
  {
    "slug": "towarz-fitness",
    "name": "Towarz Fitness Pvt Ltd",
    "category": "gym",
    "area": "Mayur Vihar Phase 1",
    "address": "Plot No. 37-38, Above Nainital Bank, Gomti Complex, Shashi Park Road, Shashi Garden, Near Alchon Public School, Mayur Vihar Phase 1, Delhi-110091",
    "placeId": null,
    "rating": 4.6,
    "reviewCount": 403,
    "phone": "+919999767867",
    "instagram": null,
    "hours": "Mon-Sat 6:00 AM - 10:30 PM; Sun 10:00 AM - 4:00 PM",
    "priceInfo": "Membership pricing not publicly listed on JustDial; established 2015, Pvt Ltd company - confirm tiers on call.",
    "tagline": "Mayur Vihar's spacious powerhouse — separate rooms for yoga, Zumba and CrossFit since 2015.",
    "ambience": "Spacious, fully-equipped floor with separate rooms for Yoga/Zumba/Aerobics sessions, lockers and showers; reviewers call it peaceful, clean and hygienic with a supportive, family-like trainer team.",
    "signatureItems": [
      "CrossFit",
      "Zumba",
      "Yoga",
      "Aerobics",
      "Kickboxing / MMA",
      "Lockers & Showers"
    ],
    "servicesOrMenu": [
      {
        "name": "Gym Membership",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Personal Training",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Zumba / Aerobics",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Yoga",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Weight Gain / Weight Loss Programmes",
        "price": null,
        "priceLabel": "Not publicly listed"
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "Trainers praised by name (Vishal's CrossFit/abs sessions, Surya, Prashant, Abhilaksh)",
      "Spacious area, machines never malfunctioning, value for money",
      "Separate session rooms, lockers and shower facility highlighted",
      "One older review flags washroom upkeep"
    ],
    "score": 8,
    "scoreReason": "Traction 2/2 (4.6 stars, 403 JustDial ratings, verified, 9 years in business); No-proper-website 1.5/2 (current web presence is a free site123.me builder page + directory listings; older directories cite a towarzfitness.com domain that did not surface as a live owned site in 2026-10-24 search); Contactable 1.5/2 (phone 09999767867 published across their own listings; JustDial number is masked); Paying capacity 2/2 (Pvt Ltd, multi-room facility, MMA/kickboxing/yoga/CrossFit programme, personal + general trainers); Timing 1/1 (post-Diwali wave in Mayur Vihar Phase 1).",
    "websiteStatus": "No proper website. Evidence 2026-10-24: live web presence found = towarzfitness.site123.me (free site-builder subdomain, last crawled ~83 days ago) plus JustDial/Gympik/Zumvu directory pages. Older directories reference towarzfitness.com but no live owned website was returned by search today - verify domain status in the first call.",
    "riskFlags": [
      "Legacy towarzfitness.com domain is cited in older directories - if the owner says a website exists, check whether it is live before pitching (pitch angle then becomes a redesign/upgrade)",
      "No places (Meta) record found, so photoUrls is empty - JustDial hosts 8 photos; pull visuals from their social/directory pages when building",
      "Phone comes from the gym's own directory listings (09999767867); JustDial masks its number"
    ],
    "accent": "#16a34a",
    "heroImage": "https://images.pexels.com/photos/7289370/pexels-photo-7289370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "galleryImages": [
      "https://images.pexels.com/photos/16996376/pexels-photo-16996376/free-photo-of-man-exercising-with-dumbbells-at-gym.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/17718738/pexels-photo-17718738.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
  },
  {
    "slug": "neelkanth-gym",
    "name": "Neelkanth Gym",
    "category": "gym",
    "area": "Laxmi Nagar",
    "address": "M-122, Main Jagat Ram Park Road, Laxmi Nagar, Delhi-110092",
    "placeId": "1207796910013900",
    "rating": 4.6,
    "reviewCount": 235,
    "phone": "+918287641860",
    "instagram": "@neelkanthgym_1994",
    "hours": "Mon-Sat 6:00 AM - 11:00 PM (per JustDial; places record lists morning batch 6:00-11:00 AM)",
    "priceInfo": "Membership tiers of 1, 3 and 6 months listed on JustDial (prices not shown); a reviewer cites fees around ₹1,800/month. Moderate price level.",
    "tagline": "Changing bodies, changing lives — Laxmi Nagar's four-floor gym, 32 years strong.",
    "ambience": "Spacious four themed floors - weights, cardio and Zumba/aerobics floors - with imported machines; reviewers describe a family-like, safe and supportive atmosphere (women members specifically call it safe), though peak hours get crowded.",
    "signatureItems": [
      "Four Themed Floors",
      "Imported Machines",
      "Zumba",
      "Aerobics",
      "Calisthenics",
      "Certified Personal Trainers",
      "Tyre Workouts"
    ],
    "servicesOrMenu": [
      {
        "name": "Gym Membership - 1 Month",
        "price": null,
        "priceLabel": "~₹1,800 (reviewer-cited; confirm)"
      },
      {
        "name": "Gym Membership - 3 Months",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Gym Membership - 6 Months",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Personal Training",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Zumba / Aerobics / Yoga",
        "price": null,
        "priceLabel": "Included per listings (confirm)"
      }
    ],
    "photoUrls": [
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/764711384_18471576373113286_2080115817154405881_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=Bdd69tNjU44Q7kNvwGlIxYk&_nc_oc=Adq06OpTvPNT6iavNZidqUplidhfMZZVWOYrBOtN2RILDd6fBOCPDyS1HIvyptDaaQA43kmynocTk70RFNn1eez8&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=1-FyjANnk_y18-mPtUReEw&oh=00_AQPTtOtXfoABMFZc5w9lc60yjd2BEg-68mnK-hpkUIHIsg&oe=6AE18D1B",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/758274230_18415281823144970_7831518712560711405_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=6WrdFdIE90QQ7kNvwHpscml&_nc_oc=Adol2wjyKSwCYmPquwLdb7CP2Tm9_-b8nNtNDvPppf3msFpl0CSn_SDCOIPd2dJFxlOHz7DyE1FH_U_uastW1Jgj&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=1-FyjANnk_y18-mPtUReEw&oh=00_AQPkyBDLFZJmgpKHcMwEqdUNvOB0Rxmbs0eGfhGT5XJKjw&oe=6AE16F12",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/763334213_18471576328113286_8847749500502806841_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=bYBmIZHTmIoQ7kNvwGHoIpV&_nc_oc=Adqu3CWlunz-xlWON4YBtAmaF-LhVzE5Q5FGIX9O0vy1zdUqWSb-oYjNOIMVYSh5QRv1vKjW7NAZM9vYAT4kGc6r&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=1-FyjANnk_y18-mPtUReEw&oh=00_AQNIRg8vVfWxcP-szYOJbuSkC861FcDKI6v6blfIcsz5cw&oe=6AE16908",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/763298888_18471576337113286_5547012663340625290_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=gcS6b1dgFd8Q7kNvwHf4JTF&_nc_oc=AdrSZ4I2dnCrhcv9S6P7T5SUjtlyAqBrMHKQZOqqa-UN7t2Op8La0f5OT0fCVb3zBF5uJB4sHOXwaVkdN163QqXU&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=1-FyjANnk_y18-mPtUReEw&oh=00_AQO7lsc0GWcd9ffbF_uZrg8mygvzF7QRKgpIsMa7nrZcJQ&oe=6AE18EED",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/755363927_18415281724144970_8028076603637544115_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=a7jG0t7Azi0Q7kNvwEx_qrt&_nc_oc=AdoSkvU-w50FGimS6-uV9QxcAT2XymqfPkuo5ZLkLg2EykHPegQKrxOuoeB3AWUSUlgvThEfbEAYkcZg9HVrIXM_&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=1-FyjANnk_y18-mPtUReEw&oh=00_AQPGlTNHnnY5z1nKtZwtWClkChjCiQg4wSk5eMBtXmuDqg&oe=6AE16715"
    ],
    "reviewThemes": [
      "Experienced trainers, spacious workout space",
      "Owner personally takes sessions and is cooperative",
      "Safe environment noted by women members",
      "Crowded at peak hours; fees slightly high for some; occasional trainer-attention complaints for beginners"
    ],
    "score": 9,
    "scoreReason": "Traction 2/2 (4.6 stars, 235 JustDial ratings, 32 years in business); No-website 2/2 (only a free neelkanthgym.business.site page, confirmed in places record links); Contactable 2/2 (direct phone +91 82876 41860 + confirmed IG @neelkanthgym_1994); Paying capacity 2/2 (four floors of imported machines, 1/3/6-month tiers, PT, Zumba/yoga/aerobics programme); Timing 1/1 (post-Diwali wave).",
    "websiteStatus": "No proper website. Evidence 2026-10-24: places record website link = https://neelkanthgym.business.site/ (free Google business site only); all other presence is JustDial/Gympik/Instagram.",
    "riskFlags": [
      "Hours conflict: places record lists only 6-11 AM Mon-Sat while JustDial says open until 11 PM - confirm full hours before publishing a prototype",
      "Mixed older reviews on trainer attention for beginners and one machine-maintenance complaint - do not over-claim in copy",
      "Name is sometimes misspelled 'Neelkhant' in reviews - use the official 'Neelkanth Gym' spelling"
    ],
    "accent": "#0284c7",
    "heroImage": "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/764711384_18471576373113286_2080115817154405881_n.webp?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=Bdd69tNjU44Q7kNvwGlIxYk&_nc_oc=Adq06OpTvPNT6iavNZidqUplidhfMZZVWOYrBOtN2RILDd6fBOCPDyS1HIvyptDaaQA43kmynocTk70RFNn1eez8&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=1-FyjANnk_y18-mPtUReEw&oh=00_AQPTtOtXfoABMFZc5w9lc60yjd2BEg-68mnK-hpkUIHIsg&oe=6AE18D1B",
    "galleryImages": []
  },
  {
    "slug": "no-limit-gym",
    "name": "No Limit Gym",
    "category": "gym",
    "area": "Krishna Nagar, Laxmi Nagar",
    "address": "9, Khureji Khas Road, near SBI Bank, West Laxmi Market, Krishna Nagar, Delhi-110031",
    "placeId": "1240362826720875",
    "rating": 4.8,
    "reviewCount": 198,
    "phone": "+917838626878",
    "instagram": "@no_limit_gym_",
    "hours": "Mon-Sat 6:00 AM - 11:30 PM",
    "priceInfo": "Membership pricing not publicly listed for the Delhi gym; inexpensive price level per places record - confirm tiers on call.",
    "tagline": "No limits in Krishna Nagar — CrossFit and Pilates under one roof, open till 11:30 PM.",
    "ambience": "Hardcore, late-night neighbourhood training vibe near SBI Khureji — functional/CrossFit energy with Pilates in the mix; inexpensive, no-frills and community-led.",
    "signatureItems": [
      "CrossFit",
      "Pilates",
      "Strength Training",
      "Late Hours (till 11:30 PM)"
    ],
    "servicesOrMenu": [
      {
        "name": "Gym Membership",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "CrossFit",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Pilates",
        "price": null,
        "priceLabel": "Not publicly listed"
      },
      {
        "name": "Personal Training",
        "price": null,
        "priceLabel": "Not publicly listed"
      }
    ],
    "photoUrls": [
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/630114891_18080897879254758_2464953908055457736_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=XQvP4AkcBNgQ7kNvwE7Kq1K&_nc_oc=AdqEHTRJi7cUsISFtH1itLKD9FbgJINNAv5uUSlAfXPcoIB6w8n6K6lEzXSJXEJ1qLY10O8rGyBT4rqaQR79T7SF&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=5sW21Lb22T6vkArRZZ1FXQ&oh=00_AQN7o4b7cMkQMcoJywlaW-CW4dSIaDZpsLpLxkVuq_NWhA&oe=6AE191FF",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/632020900_18080897882254758_5584745142055174235_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=-HLgp4F4BegQ7kNvwE7_kHg&_nc_oc=AdqDlXnsbCfdz5Cg2yPOT-mMklND2wtcTWmRKIMSSuzSkRAeuQzsvNJVggLhlFioLFe8dcKO1PVYQDBzFU1JCeX-&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=5sW21Lb22T6vkArRZZ1FXQ&oh=00_AQN9rptRQsRBwa-157qjJcOKeBoJyBcxd8b9muSQIgubzQ&oe=6AE1982B"
    ],
    "reviewThemes": [
      "Rated 4.8-5.0 across JustDial category lists (195-199 ratings)",
      "CrossFit and Pilates repeatedly listed as specialities",
      "Strong Krishna Nagar/Lal Quarter local following"
    ],
    "score": 8,
    "scoreReason": "Traction 1.5/2 (4.8 stars, ~198 JustDial ratings - just under the lot's top tier); No-website 2/2 (only a free nolimitgym.business.site page, confirmed in places record); Contactable 2/2 (direct phone +91 78386 26878 + confirmed IG @no_limit_gym_); Paying capacity 1.5/2 (CrossFit + Pilates programme and long hours, but inexpensive positioning and no public price tiers); Timing 1/1 (post-Diwali wave).",
    "websiteStatus": "No proper website. Evidence 2026-10-24: places record website link = https://nolimitgym.business.site/ (free Google business site only); remaining presence is JustDial + Instagram.",
    "riskFlags": [
      "NAME COLLISION: 'No Limit Fitness' (nolimitfitness.in) is a different gym in Goregaon, Mumbai - do not use its prices, photos or founder details for this Delhi gym",
      "A Noida 'No Limit Gym' record shows permanently closed - that is a different branch/location; the Khureji Khas record is confirmed active (is_permanently_closed: false)",
      "Only 2 real photos returned by the places gallery - supplement from IG @no_limit_gym_ when building"
    ],
    "accent": "#111827",
    "heroImage": "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/630114891_18080897879254758_2464953908055457736_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=XQvP4AkcBNgQ7kNvwE7Kq1K&_nc_oc=AdqEHTRJi7cUsISFtH1itLKD9FbgJINNAv5uUSlAfXPcoIB6w8n6K6lEzXSJXEJ1qLY10O8rGyBT4rqaQR79T7SF&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=5sW21Lb22T6vkArRZZ1FXQ&oh=00_AQN7o4b7cMkQMcoJywlaW-CW4dSIaDZpsLpLxkVuq_NWhA&oe=6AE191FF",
    "galleryImages": []
  },
  {
    "slug": "dr-sobtis-dental-care",
    "name": "Dr Sobti's Dental Care",
    "category": "dental clinic",
    "area": "Rajouri Garden",
    "address": "J-12/26, First Floor, Rajouri Garden, Above Rajmandir, Major Sudesh Kumar Marg, New Delhi (Practo address; JustDial lists Major Sudesh Kumar Marg, Rajouri Garden)",
    "placeId": null,
    "rating": 5.0,
    "reviewCount": 95,
    "phone": "07383725195",
    "instagram": null,
    "hours": "Mon-Sat: 10:00 AM - 2:00 PM & 3:00 PM - 7:00 PM; Sunday closed",
    "priceInfo": "Consultation Rs 700 - the premium end for West Delhi (most rivals charge Rs 100-500). High-ticket treatments: All-on-4 dental implants, CAD-CAM zirconia crowns, all-ceramic crowns with warranty, single-visit RCT, sedation dentistry.",
    "tagline": "State-of-the-art, painless dentistry in the heart of Rajouri Garden",
    "ambience": "Modern first-floor clinic above Rajmandir on Major Sudesh Kumar Marg, Rajouri Garden's main market road. Practo hosts 19+ clinic photos; reviewers describe it as clean, modern and well-equipped. Serious in-house tech: CBCT / dental CT scan, OPG, dental microscope, intraoral scanner, digital X-rays - capex that signals a premium, investment-minded practice.",
    "signatureItems": [
      "All-on-4 Dental Implants",
      "Single-Visit Root Canal Treatment",
      "CAD-CAM Zirconia Crowns",
      "Sedation Dentistry",
      "Kids Dentistry (MDS Paedodontics)"
    ],
    "servicesOrMenu": [
      {
        "name": "Consultation (Dr. Pushkar Sobti / Dr. Parul Sobti)",
        "price": null,
        "priceLabel": "Rs 700"
      },
      {
        "name": "Advanced Root Canal Treatment (single-visit available)",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Dental Implants incl. All-on-4",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Crowns & Bridges (metal-free / all-ceramic, with warranty)",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Complete / Partial Dentures",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Impacted Tooth Extraction",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Teeth Bleaching / Whitening",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Braces & Orthodontic Treatment",
        "price": null,
        "priceLabel": "Price on consultation"
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "100% recommendation rate on Practo (37-42 reviews for Dr. Pushkar, 14 for Dr. Parul; 52 clinic patient stories)",
      "JustDial: 5.0 across 92-97 ratings, 'Clean & hygienic' top tag (13 suggestions)",
      "Patients praise detailed explanations, gentle painless work and meticulous quality",
      "Long-term loyal families - reviewers treated there for years",
      "Emergency cases handled promptly with clear guidance"
    ],
    "score": 9,
    "scoreReason": "Active & open 2/2 - JustDial verified, 28-87 recent enquiries per crawl, doctors reply to Practo reviews, Practo Prime with instant pay. No website 2/2 - three dedicated searches surfaced only Practo + JustDial; no domain exists. Traction 1.5/2 - perfect 5.0 everywhere; JustDial count 92-97 sits just under the 100 ideal but Practo adds 52 clinic stories (~147 total). Contactable 1.5/2 - public phone + WhatsApp + Practo booking; no Instagram found. Paying capacity 2/2 - Rs 700 premium consult, Rajouri Garden premium locality, CBCT/scanner/microscope capex, TWO MDS/BDS doctors, and the clinic literally buys JustDial ads and Practo Prime - proven digital spend with no website to show for it.",
    "websiteStatus": "NO own website. Verified 2026-10-24 via three separate browser searches (name + website/Instagram, name + address): only Practo doctor/clinic profiles and JustDial listings appear. No domain, no Instagram-as-website, no business.site.",
    "riskFlags": [
      "JustDial review count (92-97) is just below the 100+ ideal - offset by 52 Practo patient stories, all 5.0/100%",
      "No place_id found in Meta places data and no direct photo URLs returned - Practo shows 19+ clinic photos behind its own pages",
      "Two doctors share one clinic brand - pitch the clinic, not an individual doctor"
    ],
    "accent": "#155e75",
    "heroImage": "https://images.pexels.com/photos/6812548/pexels-photo-6812548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "galleryImages": [
      "https://images.pexels.com/photos/6812532/pexels-photo-6812532.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/6812480/pexels-photo-6812480.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
  },
  {
    "slug": "physiolife-physiotherapy-osteopathy-clinic",
    "name": "PhysioLife Physiotherapy and Osteopathy Clinic",
    "category": "physiotherapy clinic",
    "area": "Dwarka Sector 6",
    "address": "Flat No. 9A, Vande Mataram Apartments, DDA Pocket 2, Behind Sector 6 Market, Dwarka, New Delhi-110075",
    "placeId": "551178820987233",
    "rating": 5.0,
    "reviewCount": 285,
    "phone": "+918882749417",
    "instagram": null,
    "hours": "Mon-Sat: 10:00 AM - 2:00 PM & 5:00 PM - 8:30 PM; Sun: 10:00 AM - 2:00 PM",
    "priceInfo": "Consultation Rs 700, follow-up Rs 350 (Practo). Premium Class IV laser therapy on the treatment menu - high per-session value services.",
    "tagline": "Evidence-based physiotherapy & osteopathy in Dwarka, led by Dr. Payal",
    "ambience": "Clinic set inside a DDA apartment block (Flat 9A, Vande Mataram Apartments) behind the busy Sector 6 market - a residential-premises clinic with dedicated treatment rooms and an exercise/rehab area. Facebook page photos show a clean, equipment-led treatment space (laser unit, treatment beds).",
    "signatureItems": [
      "Class IV Laser Therapy",
      "Osteopathy",
      "Post-Surgery Rehabilitation",
      "Sports Injury Rehab",
      "Sciatica & Back Pain Care"
    ],
    "servicesOrMenu": [
      {
        "name": "Consultation (Dr. Payal)",
        "price": null,
        "priceLabel": "Rs 700"
      },
      {
        "name": "Follow-up Session",
        "price": null,
        "priceLabel": "Rs 350"
      },
      {
        "name": "Back & Neck Pain Treatment",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Knee Pain & Arthritis Care",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Frozen Shoulder Treatment",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Sciatica Treatment",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Post-Surgery Rehabilitation",
        "price": null,
        "priceLabel": "Price on consultation"
      },
      {
        "name": "Sports Injury Rehabilitation",
        "price": null,
        "priceLabel": "Price on consultation"
      }
    ],
    "photoUrls": [
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/691215664_122120944641228208_8266933529973553820_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=eed8e3&_nc_ohc=rel1afoRlj8Q7kNvwEsxuOU&_nc_oc=AdrAq-2nlD2_ltAlPbvPzmED-QPwX89nlJ1W6hMw2fbk-C5SuZ5VfT1966gbCpGlShG4NORLREl2GlhiBqYx_yXM&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=ZLUgSthUfdyKWHp6onuDqw&oh=00_AQNgDMfyWLg6i2otmwBitrD7freD3SuBf_TltgWltRjSpw&oe=6AE167B9",
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/645214701_122112231627228208_3197273809745462570_n.png?_nc_cat=104&ccb=1-7&_nc_sid=957871&_nc_ohc=C00kRYdRgioQ7kNvwE29EdL&_nc_oc=Adp0gtVznFXH17GLAdNaur6mzC27qSMrb1TF_FM0EdMZ9tzls2DM8dNHcCFrr2N0Buj7rqhdowNwh5-3PWeBREQx&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=ZLUgSthUfdyKWHp6onuDqw&oh=00_AQMzcGfdh4v-f6VTEC4cDcgeUuNuWDVa3DXGIORJh0D4Kg&oe=6AE17B69"
    ],
    "reviewThemes": [
      "Practo: perfect 5.0 across ~285 reviews - unusually strong for a single-practitioner clinic",
      "Led by Dr. Payal, 20+ years experience - personal trust in the doctor is the recurring theme",
      "Patients highlight personalised, evidence-based treatment plans",
      "Relief stories for chronic back/neck/knee pain and post-surgery rehab"
    ],
    "score": 9,
    "scoreReason": "Active & open 2/2 - places record confirms not closed; active Facebook page and current Practo profile. No website 2/2 - the places 'website' field is only a Practo doctor URL; no own domain anywhere. Traction 2/2 - 5.0 with ~285 Practo reviews. Contactable 1/2 - public phone from places record; no confirmed Instagram handle (location page only). Paying capacity 2/2 - Rs 700 consult is premium for physio, Class IV laser capex, Dwarka Sector 6 catchment, appointment-led practice run by a 20+ year specialist.",
    "websiteStatus": "NO own website. The Meta places 'website' field points to a Practo doctor profile URL only; searches return Practo + Facebook page only. Qualifies as Practo-listing-only.",
    "riskFlags": [
      "Only 2 photos exist in the places gallery despite repeated pulls - prototype will need fresh photos sourced from their Facebook page or a visit",
      "Runs from a residential flat address - premises look modest vs the premium pricing; website must carry the premium positioning",
      "Single-practitioner dependency (Dr. Payal)"
    ],
    "accent": "#0d9488",
    "heroImage": "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/691215664_122120944641228208_8266933529973553820_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=eed8e3&_nc_ohc=rel1afoRlj8Q7kNvwEsxuOU&_nc_oc=AdrAq-2nlD2_ltAlPbvPzmED-QPwX89nlJ1W6hMw2fbk-C5SuZ5VfT1966gbCpGlShG4NORLREl2GlhiBqYx_yXM&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=ZLUgSthUfdyKWHp6onuDqw&oh=00_AQNgDMfyWLg6i2otmwBitrD7freD3SuBf_TltgWltRjSpw&oe=6AE167B9",
    "galleryImages": []
  },
  {
    "slug": "dr-dheeraj-pets-clinic-surgery-center",
    "name": "Dr. Dheeraj Pets Clinic & Surgery Center",
    "category": "veterinary clinic & pet grooming",
    "area": "Paschim Vihar (Meera Bagh)",
    "address": "RZ-239, Sayed Nangloi, Meera Bagh, Near Hanuman Mandir & Opposite GH-6, Paschim Vihar, Delhi-110087",
    "placeId": "3718377868473071",
    "rating": 4.9,
    "reviewCount": 605,
    "phone": "+918130904789",
    "instagram": "@kumardheeraj1525",
    "hours": "Mon-Sat: 8:00 AM - 2:00 PM & 5:00 PM - 9:30 PM; Sun: 8:00 AM - 2:00 PM",
    "priceInfo": "Consultation Rs 300 (Practo/myUpchar). Revenue drivers are procedures: soft-tissue surgery, neutering, dental prophylaxis, grooming, vaccination and home visits - priced at clinic.",
    "tagline": "Paschim Vihar's trusted pet clinic & surgery centre - for dogs, cats and birds",
    "ambience": "Street-facing clinic on the Nilothi-Meera Bagh road opposite GH-6, next to Hanuman Mandir - high-footfall market edge in Paschim Vihar. Set up as a working surgery centre with in-house pharmacy; also runs home visits across West Delhi. (No photos in the Meta places gallery - see risk flags.)",
    "signatureItems": [
      "Soft-Tissue Pet Surgery",
      "Pet Grooming",
      "Bird (Avian) Treatment",
      "Home Visit Care",
      "Neutering & Dental Prophylaxis"
    ],
    "servicesOrMenu": [
      {
        "name": "Consultation (Dr. Dheeraj Kr. Singh, BVSc & AH)",
        "price": null,
        "priceLabel": "Rs 300"
      },
      {
        "name": "Pet Grooming",
        "price": null,
        "priceLabel": "Price on enquiry"
      },
      {
        "name": "Soft-Tissue Surgery",
        "price": null,
        "priceLabel": "Price on enquiry"
      },
      {
        "name": "Neutering / Castration",
        "price": null,
        "priceLabel": "Price on enquiry"
      },
      {
        "name": "Vaccination & Immunization",
        "price": null,
        "priceLabel": "Price on enquiry"
      },
      {
        "name": "Veterinary Dental Prophylaxis",
        "price": null,
        "priceLabel": "Price on enquiry"
      },
      {
        "name": "Bird Treatment",
        "price": null,
        "priceLabel": "Price on enquiry"
      },
      {
        "name": "Home Visit Treatment",
        "price": null,
        "priceLabel": "Price on enquiry"
      },
      {
        "name": "Pet Pharmacy",
        "price": null,
        "priceLabel": "In-clinic"
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "JustDial 4.9 across 605 ratings, claimed profile, 8 years in business",
      "Strong praise for saving critical cases and honest advice - including telling owners when surgery is NOT needed",
      "Bird owners specifically recommend him (rare avian expertise in West Delhi)"
    ],
    "score": 8,
    "scoreReason": "Active & open 2/2 - claimed JustDial profile, current Practo listing crawled 17-25 days ago. No website 2/2 - places 'website' field is his personal Instagram; web presence is JustDial/Practo/myUpchar only. Traction 2/2 - 4.9 with 605 ratings. Contactable 1/2 - phone +91 81309 04789 recovered from Meta places record and Instagram is linked, but JustDial masks the number behind 'Show Number'. Paying capacity 1/2 - surgery centre + pharmacy + grooming in affluent Paschim Vihar gives real ticket size, but Rs 300 consult and 'inexpensive' price level temper it; single-doctor practice.",
    "websiteStatus": "NO own website. Meta places record lists his Instagram profile as the 'website' link (Instagram-only presence); otherwise JustDial, Practo and myUpchar listings only.",
    "riskFlags": [
      "Reputation risk: JustDial improvement themes include negligence allegations and pet deaths - a website with a reviews/testimonials section must be handled carefully; verify current standing before outreach",
      "Places gallery returned zero photos - no usable real photo URLs; prototype needs photos from his Instagram/JustDial",
      "Hours conflict: Meta places says daily 10 AM - 9:30 PM, Practo says split shifts 8 AM - 2 PM & 5 - 9:30 PM - confirm before publishing",
      "Single-doctor clinic (Dr. Dheeraj Kr. Singh, 11 yrs experience)"
    ],
    "accent": "#b45309",
    "heroImage": "https://images.pexels.com/photos/7470634/pexels-photo-7470634.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    "galleryImages": [
      "https://images.pexels.com/photos/7470633/pexels-photo-7470633.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/7469229/pexels-photo-7469229.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
  },
  {
    "slug": "begums-boutique",
    "name": "Begum's Boutique",
    "category": "boutique / fashion studio",
    "area": "Rani Bagh (Pitampura fringe)",
    "address": "3342, Mahindra Park, Road Number 44, Rani Bagh, Delhi-110034",
    "placeId": "345841397738980",
    "rating": 5.0,
    "reviewCount": 7,
    "phone": "+919718840034",
    "instagram": "@begums_official",
    "hours": "Tue-Sun: 11:00 AM - 9:00 PM; Monday closed",
    "priceInfo": "Moderate price level (Meta places price_level 2), but the catalogue is high-ticket: bridal lehengas, designer sarees and wedding gowns. No public price list - all orders run through WhatsApp (+91 93151 99337, +91 83778 78781). Worldwide shipping offered.",
    "tagline": "Designer sarees & bridal lehengas since 1994 - shipped worldwide",
    "ambience": "Long-running ethnic-wear boutique on Road No. 44, Mahindra Park, Rani Bagh - a destination store rather than a mall unit, trading on 30+ years of word-of-mouth. Instagram reels show dense racks of embroidered lehengas/sarees and bridal try-on content; the social feed IS the shop window today.",
    "signatureItems": [
      "Bridal Lehengas",
      "Designer Sarees",
      "Wedding Gowns",
      "Customisation & Alterations",
      "Worldwide Shipping"
    ],
    "servicesOrMenu": [
      {
        "name": "Bridal Lehengas",
        "price": null,
        "priceLabel": "Price on enquiry (WhatsApp)"
      },
      {
        "name": "Designer Sarees",
        "price": null,
        "priceLabel": "Price on enquiry (WhatsApp)"
      },
      {
        "name": "Silk Sarees",
        "price": null,
        "priceLabel": "Price on enquiry (WhatsApp)"
      },
      {
        "name": "Salwar Kameez",
        "price": null,
        "priceLabel": "Price on enquiry (WhatsApp)"
      },
      {
        "name": "Wedding Gowns",
        "price": null,
        "priceLabel": "Price on enquiry (WhatsApp)"
      },
      {
        "name": "Customisation & Alterations",
        "price": null,
        "priceLabel": "Price on enquiry (WhatsApp)"
      }
    ],
    "photoUrls": [
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/719852665_1512542473905898_9207887252452335866_n.jpg?stp=cp1_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=957871&_nc_ohc=M3D7WjSEaVIQ7kNvwEKbWN5&_nc_oc=Adq1EEhGbsGWxJckvWIXXJSQspCwtosok2RNgvqD6uZ1adks-R8gJg7EznW4fDhBqO1VUh9J8fB6HOvE9BjxIgWG&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=Zy3OzEgTAvgUNtEOIvCSWQ&oh=00_AQMSd0PvZ3tfI_FYEaacDnHilY_Bcmzqvy7XwS-TtLObtw&oe=6AE16D21",
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/480218664_1140012004492282_4042586815553157849_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8c4ec0&_nc_ohc=coNCiqczr-4Q7kNvwEFZsRn&_nc_oc=Ado7_1fS_xW3tC_y4KemdK_pyoDYDF4DnR_c-I_7k4EouY7LDq9rAoauYMh4x9alD42ZHlf_ukHRMTPO1cEj4nMX&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=Zy3OzEgTAvgUNtEOIvCSWQ&oh=00_AQNXG2Gl2zQSPZJOuYASYptkmTjZPgAO8iHyUW92B6rAIg&oe=6AE17904",
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/476434355_1135816424911840_8955056911190713808_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8c4ec0&_nc_ohc=vMeKVyE9794Q7kNvwEDbgyU&_nc_oc=AdqpZ5-4n7xxnTCoPH4NCGOa-oTaAXI5nDdzsRXMsudVg3cv7sZSaXbjiDasZLSKhhOUYv8hQGXRBpypy3LKG-Ht&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=Zy3OzEgTAvgUNtEOIvCSWQ&oh=00_AQOrfszcdH_n4ND_AAREU6M_AFX82tN9sLa4-l849iLrbw&oe=6AE17C5C",
      "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/475641348_9517594101586224_5741531987347675017_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=89be11&_nc_ohc=SWOyp38FRu8Q7kNvwGRt6ne&_nc_oc=Adr8RCTR5uWKUwgepSYCeRdGHHyKnAng12SM-bSbATWf2VuVEGywrYoSNp-3vAf1U9DLCO04zoPEyTLLTtM8WQz3&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=Zy3OzEgTAvgUNtEOIvCSWQ&oh=00_AQO6mA_hgkgrSEAW2u9cRwXBXIluie6fjM80Bv32_Fa2Yw&oe=6AE18F91",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/858088879_18146280628604023_5006849921783290315_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=Qk3t_Kuj3eIQ7kNvwEg545x&_nc_oc=Ado1L4w6Hq7fgAQZvJwZ45nffH-tLMisx3PMTlmyuit4jkNOxOuizVVtAnEkNO75_5ojmH6_OGVJJ8tJhuEgwmz9&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=Zy3OzEgTAvgUNtEOIvCSWQ&oh=00_AQO-6AY78-R0_wil6sfDqCdHpwBkqInYw0tmfoT1FLqxEQ&oe=6AE1710D",
      "https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/847847483_18146173477604023_598568785414545803_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=T1OZwAhlWGUQ7kNvwG4MkFZ&_nc_oc=AdpZy1cItCnQBLLdCcVw_VwM2Dm8z_zAxzmSAoS_x2_bdIU8TlCdmi0sGycGXa4XpMW2MRuvfh7R3iTdVH0pY1Kk&_nc_zt=23&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_gid=Zy3OzEgTAvgUNtEOIvCSWQ&oh=00_AQO0dfRpeKKtM-187fbdHf0jOZB-6egmRSy5kOHjzM_24Q&oe=6AE196EA"
    ],
    "reviewThemes": [
      "Premium fabric quality - reviewers single out 'the fabric feels premium'",
      "Excellent workmanship and personalised attention",
      "Trusted since 1994 - multi-decade bridal clientele",
      "Instagram reels pull 1,000+ reactions - social traction far exceeds its review footprint"
    ],
    "score": 7,
    "scoreReason": "Active & open 2/2 - places record confirms not closed; Instagram reels posted recently with 367-1,100 reactions. No website 2/2 - the places 'website' field IS its Instagram profile; sales run entirely via Instagram + WhatsApp. Traction 0.5/2 - the honest weak point: only 7 places ratings (5.0) and a small JustDial listing (4.5/4); social engagement substitutes partially. Contactable 2/2 - phone plus TWO WhatsApp order numbers published in its own bio. Paying capacity 1.5/2 - bridal is among the highest-ticket local retail, 30-year legacy, worldwide shipping ambition, moderate price level; a catalogue website with WhatsApp ordering is a direct revenue upgrade for them.",
    "websiteStatus": "NO own website - Instagram-only. The Meta places 'website' link is literally its Instagram profile (@begums_official); plus a Facebook page. No domain, no business.site.",
    "riskFlags": [
      "Review counts are LOW everywhere (7 on Meta places, ~4 on a separate JustDial 'Begum' listing) - fails the 100+ reviews ideal; included on legacy (since 1994), bridal ticket size and proven Instagram demand - verify footfall/revenue in the first conversation",
      "Owner-attitude complaints appear in reviews",
      "No Return / No Exchange / No COD policy stated in its own bio - e-commerce features beyond a catalogue + WhatsApp order flow are unlikely to fit"
    ],
    "accent": "#9d174d",
    "heroImage": "https://scontent-den2-1.xx.fbcdn.net/v/t39.30808-6/719852665_1512542473905898_9207887252452335866_n.jpg?stp=cp1_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=957871&_nc_ohc=M3D7WjSEaVIQ7kNvwEKbWN5&_nc_oc=Adq1EEhGbsGWxJckvWIXXJSQspCwtosok2RNgvqD6uZ1adks-R8gJg7EznW4fDhBqO1VUh9J8fB6HOvE9BjxIgWG&_nc_zt=23&_nc_ht=scontent-den2-1.xx&_nc_gid=Zy3OzEgTAvgUNtEOIvCSWQ&oh=00_AQMSd0PvZ3tfI_FYEaacDnHilY_Bcmzqvy7XwS-TtLObtw&oe=6AE16D21",
    "galleryImages": []
  },
  {
    "slug": "singh-tutorials-simran-study-circle",
    "name": "Singh Tutorials and Simran Study Circle",
    "category": "coaching / tuition institute",
    "area": "Pitampura",
    "address": "144-C, QU Block, Near Income Tax Colony, Pitampura, Delhi-110034",
    "placeId": null,
    "rating": 4.8,
    "reviewCount": 490,
    "phone": "07795671020",
    "instagram": null,
    "hours": "Mon-Sun: 10:00 AM - 10:00 PM",
    "priceInfo": "JustDial fee range Rs 350 - Rs 10,000. Published fees: Commerce tutorials Rs 2,500-2,600 / 12 sessions; Humanities Rs 2,000-2,500 / 12 sessions; Home tuitions Rs 8,000-10,000 / 20 sessions; per-session home tutors Rs 350-600 (Class VIII Science Rs 350-400, Class X Science Rs 450-550, Class XII Physics Rs 500-600); Physics tutorials Rs 2,500-3,000 / session. 18 courses listed.",
    "tagline": "Pitampura's trusted CBSE coaching for Classes 9-12 - since 2002",
    "ambience": "Established institute premises in QU Block, a residential Pitampura pocket near Income Tax Colony - classroom setup (JustDial hosts 36 photos of the centre) plus online classes over Zoom. Runs 12 hours a day, 7 days a week - a full-time admission-driven operation, not a casual home tutor.",
    "signatureItems": [
      "Class 11-12 Science (Physics, Chemistry, Maths)",
      "Class 9-10 All Subjects (CBSE)",
      "Commerce & Humanities Streams",
      "Home Tuitions across Pitampura/Rohini",
      "Admissions Open - New Session 1 March 2026"
    ],
    "servicesOrMenu": [
      {
        "name": "Class 9 Tuition (Science, Maths, Social Science)",
        "price": null,
        "priceLabel": "See fee range Rs 350 - Rs 10,000"
      },
      {
        "name": "Class 10 Tuition (Science, Maths, Social Science)",
        "price": null,
        "priceLabel": "See fee range Rs 350 - Rs 10,000"
      },
      {
        "name": "Class 11-12 Science (Physics, Chemistry, Maths)",
        "price": null,
        "priceLabel": "See fee range Rs 350 - Rs 10,000"
      },
      {
        "name": "Commerce Tutorials",
        "price": null,
        "priceLabel": "Rs 2,500 - Rs 2,600 / 12 sessions"
      },
      {
        "name": "Humanities Tutorials",
        "price": null,
        "priceLabel": "Rs 2,000 - Rs 2,500 / 12 sessions"
      },
      {
        "name": "Home Tuitions",
        "price": null,
        "priceLabel": "Rs 8,000 - Rs 10,000 / 20 sessions"
      },
      {
        "name": "Home Tutor (per session, Class VIII-XII subjects)",
        "price": null,
        "priceLabel": "Rs 350 - Rs 600 / session"
      },
      {
        "name": "Physics Tutorials",
        "price": null,
        "priceLabel": "Rs 2,500 - Rs 3,000 / session"
      }
    ],
    "photoUrls": [],
    "reviewThemes": [
      "JustDial 4.7-4.8 across ~490 ratings, claimed and long-established (since 2002)",
      "High call pick-up rate and 91-184 recent enquiries across crawls - parents actively shopping for seats",
      "Runs admission offers (Rs 100 discount, 3 offers live on JustDial)",
      "Mock tests and doubt support are part of the pitch",
      "UrbanPro profile is verified but carries no reviews - all reputation sits on JustDial"
    ],
    "score": 8,
    "scoreReason": "Active & open 2/2 - claimed JustDial profile, 'Admission starts 1 March 2026' banner, enquiries flowing now. No website 1.5/2 - no domain surfaced in any search (every rejected rival's domain appeared instantly); presence is JustDial + UrbanPro only; JustDial's generic 'Visit our Website' footer text is unresolvable to any real domain. Traction 2/2 - 4.8 with 490 ratings. Contactable 1/2 - public phone + JustDial WhatsApp; no Instagram found. Paying capacity 1.5/2 - Pitampura parents pay premium for Class 11-12 science; 18 courses, home-tuition arm at Rs 8,000-10,000 per 20 sessions, 24 years in business, actively marketing admissions - a website with course/fees pages + enquiry form is a direct admissions funnel.",
    "websiteStatus": "NO own website found. Multiple targeted searches returned only its JustDial listing and UrbanPro profile - no domain (contrast: Vidyasthal, Skylight, Talika, Brilliant Academy etc. all surfaced domains immediately and were rejected). JustDial pages show a generic 'Visit our Website' footer link, but no actual website URL exists in any indexed source.",
    "riskFlags": [
      "UrbanPro labels the address 'Tutor's home' - may be partly home-run despite the institute scale; confirm premises on first call",
      "UrbanPro shows postcode 110052 vs JustDial 110034 for the same QU Block address - 110034 used (QU Block Pitampura); verify on call",
      "JustDial hosts 36 photos of the centre but no direct photo URLs were returned by search/places - photoUrls left empty rather than inventing links; pull from the JustDial photos page during the build",
      "No Instagram presence found - social proof for the prototype rests on JustDial reviews"
    ],
    "accent": "#1e40af",
    "heroImage": "https://images.pexels.com/photos/8423075/pexels-photo-8423075.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "galleryImages": [
      "https://images.pexels.com/photos/5306439/pexels-photo-5306439.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/8617975/pexels-photo-8617975.jpeg?auto=compress&cs=tinysrgb&w=600"
    ]
  }
];
