/**
 * Royalty-free (Unsplash) reference photos for every menu / service item.
 * Every URL below was curl-verified on 2026-10-24 to return HTTP 200
 * image/jpeg. These are representative photos for reference only — on
 * launch the owner replaces them with photos of their own dishes / work.
 * Matching is by keyword in the item name, checked per category first so
 * e.g. a vet's "Nail Clipping" gets a dog photo, not a salon nail photo.
 */

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

const IMG = {
  pizza: U("1513104890138-7c749659a591"),
  pasta: U("1473093295043-cdd812d0e601"),
  sushi: U("1579871494447-9811cf80d66c"),
  latte: U("1541167760496-1628856ab772"),
  coffee: U("1495474472287-4d71bcdd2085"),
  coldCoffee: U("1461023058943-07fcbe16d735"),
  sandwich: U("1528735602780-2552fd46c7af"),
  salad: U("1512621776951-a57141f2eefd"),
  cake: U("1578985545062-69928b1d9587"),
  indian: U("1585937421612-70a008356fbe"),
  noodles: U("1585032226651-759b368d7246"),
  asian: U("1455619452474-d2be8b1e70cd"),
  kebab: U("1599487488170-d11ec9c172f0"),
  dessert: U("1551024506-0bccd828d307"),
  burger: U("1568901346375-23c9450c58cd"),
  restaurant: U("1555396273-367ea4eb4db5"),
  cafe: U("1554118811-1e0d58224f24"),
  croissant: U("1555507036-ab1f4038808a"),
  pancakes: U("1567620905732-2d1ec7ab7445"),
  fineDining: U("1414235077428-338989a2e8c0"),
  hair: U("1560066984-138dadb4c035"),
  hairColour: U("1522337660859-02fbefca4702"),
  makeup: U("1487412947147-5cebf100ffc2"),
  nails: U("1604654894610-df63bc536371"),
  facial: U("1570172619644-dfd03ed5d881"),
  spa: U("1544161515-4ab6ce6db874"),
  bridal: U("1519741497674-611481863552"),
  gym: U("1534438327276-14e5300c3a48"),
  weights: U("1517836357463-d25dfeac3438"),
  fitnessClass: U("1518611012118-696072aa579a"),
  training: U("1571019613454-1cb2f99b2d8b"),
  dental: U("1629909613654-28e377c37b09"),
  dentist: U("1606811841689-23dfddce3e95"),
  physio: U("1544367567-0f2fcb009e0b"),
  dog: U("1548199973-03cce0bbc87b"),
  vet: U("1583337130417-3346a1be7dee"),
  cat: U("1514888286974-6c03e2ca1dba"),
  fashion: U("1445205170230-053b83016050"),
  weddingDress: U("1595777457583-95e059d581b8"),
  education: U("1503676260728-1c00da094a0b"),
  study: U("1456513080510-7bf3a84b82f8"),
};

type Rule = [string[], string];
const has = (name: string, words: string[]) =>
  words.some((w) => name.includes(w));

function rulesFor(category: string): { rules: Rule[]; fallback: string } {
  switch (category) {
    case "cafe":
      return {
        rules: [
          [["pizza"], IMG.pizza],
          [["pasta", "penne", "alfredo"], IMG.pasta],
          [["sushi", "katsu"], IMG.sushi],
          [["latte", "cappuccino", "mocha", "espresso"], IMG.latte],
          [["cold coffee"], IMG.coldCoffee],
          [["coffee"], IMG.coffee],
          [["croissant", "muffin", "bakery"], IMG.croissant],
          [["pancake"], IMG.pancakes],
          [["sandwich", "roll"], IMG.sandwich],
          [["salad"], IMG.salad],
          [["tikka", "kebab", "malai", "lababdar", "tandoor"], IMG.kebab],
          [["curry", "thai"], IMG.asian],
          [["noodle", "wonton", "chilli paneer", "kung pao"], IMG.noodles],
          [["chicken", "paneer", "fish"], IMG.indian],
          [["cake", "tiramisu", "cheesecake", "chocolate", "dessert"], IMG.cake],
          [["burger"], IMG.burger],
        ],
        fallback: IMG.restaurant,
      };
    case "salon":
      return {
        rules: [
          [["nail"], IMG.nails],
          [["bridal"], IMG.bridal],
          [["makeup"], IMG.makeup],
          [["facial", "skin", "acne"], IMG.facial],
          [["colour", "color", "balayage", "keratin", "botox", "nanoplastia"], IMG.hairColour],
          [["spa", "pedicure", "manicure", "massage", "wax"], IMG.spa],
          [["hair"], IMG.hair],
        ],
        fallback: IMG.hair,
      };
    case "gym":
      return {
        rules: [
          [["crossfit"], IMG.weights],
          [["aerobic", "zumba"], IMG.fitnessClass],
          [["personal", "trainer", "training"], IMG.training],
          [["diet", "transformation"], IMG.training],
        ],
        fallback: IMG.gym,
      };
    case "dental clinic":
      return {
        rules: [
          [["whitening"], IMG.dentist],
          [["implant", "crown", "braces", "aligner", "root canal", "filling"], IMG.dental],
        ],
        fallback: IMG.dental,
      };
    case "physiotherapy clinic":
      return { rules: [], fallback: IMG.physio };
    case "veterinary clinic & pet grooming":
      return {
        rules: [
          [["groom", "bath", "nail"], IMG.vet],
          [["cat"], IMG.cat],
        ],
        fallback: IMG.dog,
      };
    case "boutique / fashion studio":
      return {
        rules: [
          [["lehenga", "bridal", "wedding"], IMG.weddingDress],
          [["stitch", "blouse", "alteration"], IMG.fashion],
        ],
        fallback: IMG.fashion,
      };
    case "coaching / tuition institute":
      return {
        rules: [[["test", "board", "crash", "revision"], IMG.study]],
        fallback: IMG.education,
      };
    default:
      return { rules: [], fallback: IMG.cafe };
  }
}

/** Reference photo for one menu/service item. `seed` varies the fallback. */
export function itemImage(itemName: string, category: string, seed = 0): string {
  const { rules, fallback } = rulesFor(category);
  const name = itemName.toLowerCase();
  for (const [words, url] of rules) {
    if (has(name, words)) return url;
  }
  const fallbacks = [fallback, IMG.cafe, IMG.restaurant, IMG.fineDining];
  return fallbacks[seed % fallbacks.length];
}
