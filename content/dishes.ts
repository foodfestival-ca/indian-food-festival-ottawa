import { z } from "zod";

/**
 * Featured Indian Flavours — "Five Dishes, Five States, One Plate."
 * Each card is a dish, its home region, and why it exists.
 * Extending to six is a data entry here, not a code change.
 */

const DishSchema = z.object({
  id: z.string(),
  name: z.string(),
  phonetic: z.string(),
  region: z.string(),
  state: z.string(),
  /** Two sentences. First: what it is. Second: why it matters. */
  story: z.string(),
  notes: z.array(z.string()),
  vegetarian: z.boolean(),
  spiceLevel: z.number().min(0).max(3),
  kind: z.enum(["drink", "street", "snack", "main"]),
  image: z.string(),
  alt: z.string(),
  firstTimer: z.boolean(),
});

export const dishes = z.array(DishSchema).parse([
  {
    id: "jigarthanda",
    name: "Jigarthanda",
    phonetic: "ji-gar-THUN-da",
    region: "Madurai",
    state: "Tamil Nadu",
    story:
      "Chilled milk thickened with almond gum and nannari root syrup, crowned with a scoop of ice cream. The name means “cool heart” — Madurai's answer to a 40°C afternoon, sold on the same street corners for generations.",
    notes: ["Almond gum", "Nannari root", "Ice cream"],
    vegetarian: true,
    spiceLevel: 0,
    kind: "drink",
    image: "/media/food/jigarthanda.jpg",
    alt: "A tall glass of Jigarthanda, layered chilled milk topped with ice cream",
    firstTimer: false,
  },
  {
    id: "dabeli",
    name: "Dabeli",
    phonetic: "DAB-eh-lee",
    region: "Kutch",
    state: "Gujarat",
    story:
      "Spiced potato pressed into a soft pav with pomegranate seeds, roasted peanuts and a crackle of sev. Born in Mandvi in the 1960s and carried across India by Kutchi families — sweet, sharp and hot in the same bite.",
    notes: ["Dabeli masala", "Pomegranate", "Roasted peanuts"],
    vegetarian: true,
    spiceLevel: 2,
    kind: "street",
    image: "/media/food/dabeli.jpg",
    alt: "Dabeli sandwich topped with pomegranate seeds and sev",
    firstTimer: true,
  },
  {
    id: "punugulu",
    name: "Punugulu",
    phonetic: "poo-NOO-goo-loo",
    region: "Coastal Andhra",
    state: "Andhra Pradesh",
    story:
      "Golden fritters spooned from fermented dosa batter straight into hot oil — crisp shell, cloud-soft centre. The snack Vijayawada eats standing up, in the rain, with coconut chutney.",
    notes: ["Fermented batter", "Coconut chutney", "Ginger chutney"],
    vegetarian: true,
    spiceLevel: 1,
    kind: "snack",
    image: "/media/food/punugulu.jpg",
    alt: "A bowl of golden Punugulu fritters served with chutney",
    firstTimer: false,
  },
  {
    id: "methi-na-gota",
    name: "Methi Na Gota",
    phonetic: "MEH-thee na GO-ta",
    region: "Ahmedabad",
    state: "Gujarat",
    story:
      "Fenugreek leaves folded into a spiced chickpea batter and fried into fat golden clouds. A monsoon and kite-festival ritual — eaten hot, in company, with fried chillies on the side.",
    notes: ["Fenugreek", "Chickpea flour", "Fried chillies"],
    vegetarian: true,
    spiceLevel: 2,
    kind: "snack",
    image: "/media/food/methi-na-gota.jpg",
    alt: "Methi Na Gota fritters piled in a serving dish",
    firstTimer: false,
  },
  {
    id: "varan-batti",
    name: "Varan Batti",
    phonetic: "VUH-run BAH-tee",
    region: "Vidarbha",
    state: "Maharashtra",
    story:
      "Wheat dough roasted into dense golden battis, broken by hand into simple toor dal and drowned in ghee. Farmhouse food — there is nothing decorative about it, which is exactly the point.",
    notes: ["Toor dal", "Ghee", "Roasted wheat"],
    vegetarian: true,
    spiceLevel: 1,
    kind: "main",
    image: "/media/food/varan-batti.jpg",
    alt: "Varan Batti — roasted wheat battis served with dal and ghee",
    firstTimer: false,
  },
]);

export const firstTimerDish = dishes.find((d) => d.firstTimer) ?? dishes[0];
export type Dish = (typeof dishes)[number];
