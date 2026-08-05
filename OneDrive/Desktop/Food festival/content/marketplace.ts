import { z } from "zod";

/** The Marketplace — "More Than a Meal." A visit is an afternoon, not a lunch. */

const CategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  blurb: z.string(),
  image: z.string(),
  alt: z.string(),
  icon: z.enum(["store", "hand", "gem", "shirt", "users"]),
});

export const marketplaceCategories = z.array(CategorySchema).parse([
  {
    id: "local-businesses",
    title: "Local Businesses",
    blurb: "Ottawa's Indian-owned shops, makers and family enterprises — many meeting their neighbours for the first time.",
    image: "/media/marketplace/local-businesses.jpg",
    alt: "A local vendor stall at the festival marketplace",
    icon: "store",
  },
  {
    id: "handcrafted",
    title: "Handcrafted Products",
    blurb: "Block-printed textiles, brass and clay homeware, and work that still carries the mark of the hand that made it.",
    image: "/media/marketplace/handcrafted.jpg",
    alt: "Handcrafted textiles and homeware on display",
    icon: "hand",
  },
  {
    id: "accessories",
    title: "Accessories",
    blurb: "Bangles stacked by colour, jhumkas, embroidered bags — the small things that finish an outfit.",
    image: "/media/marketplace/accessories.jpg",
    alt: "Colourful bangles and jewellery at a market stall",
    icon: "gem",
  },
  {
    id: "apparel",
    title: "Apparel",
    blurb: "Sarees, kurtas and festival wear, with vendors happy to explain the drape to anyone asking for the first time.",
    image: "/media/marketplace/apparel.jpg",
    alt: "Sarees and kurtas displayed at the marketplace",
    icon: "shirt",
  },
  {
    id: "community",
    title: "Community Vendors",
    blurb: "Non-profits, cultural associations and local collectives — the connective tissue of Ottawa's Indian community.",
    image: "/media/marketplace/community.jpg",
    alt: "Community organisation booth at the festival",
    icon: "users",
  },
]);

export type MarketplaceCategory = (typeof marketplaceCategories)[number];
