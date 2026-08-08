import { z } from "zod";

/**
 * Bento grid of six. Doubles as a contents list for scanners who won't read
 * linearly — every card links somewhere. The former "Five States on One
 * Plate" / Featured Flavours card was removed along with the Featured
 * Flavours section itself (not moved, just taken out). `stage` now points at
 * `/schedule#performances` rather than a same-page anchor, since Performances
 * moved off the homepage onto its own route; `free`, `market`, `flavors` and
 * `kids` point at their own dedicated routes too, since Venue, Food Vendors
 * and Gallery moved off the homepage when the site became multi-page. All
 * six cards are "normal" span so the 3-column grid resolves cleanly (2 rows
 * of 3, no ragged trailing row).
 */

const ReasonSchema = z.object({
  id: z.string(),
  title: z.string(),
  blurb: z.string(),
  href: z.string(),
  icon: z.enum(["utensils", "music", "store", "baby", "ticket", "gift"]),
  /** Bento emphasis: "wide" spans 2 columns from md up. */
  span: z.enum(["normal", "wide"]),
});

export const whyVisit = z.array(ReasonSchema).parse([
  { id: "free",       title: "Free for Everyone",        blurb: "No ticket, no gate fee, no age limit. You pay only for what you choose to eat or buy.",                              href: "/venue",      icon: "gift",     span: "normal" },
  { id: "stage",      title: "35+ Live Performances",    blurb: "Classical dance, folk traditions, live music and three nights of DJs.",                                             href: "/schedule#performances", icon: "music",  span: "normal" },
  { id: "flavors",    title: "Flavors from India",       blurb: "Street food, regional specialties and festival favourites — dishes from every corner of India, all in one place.",   href: "/vendor",       icon: "utensils", span: "normal" },
  { id: "market",     title: "A Full Marketplace",       blurb: "Textiles, jewellery, apparel and Ottawa's Indian-owned makers. Come hungry, leave carrying things.",                href: "/vendor",       icon: "store",  span: "normal" },
  { id: "kids",       title: "Kids Zone and Activities", blurb: "A dedicated Kids Zone, stroller-friendly grounds and food mild enough for small palates.",                          href: "/gallery",      icon: "baby",   span: "normal" },
  { id: "passport",   title: "The Festival Passport",    blurb: "Claim it free, check in at the festival, enter the prize draws. It takes under a minute.",                          href: "/passport",     icon: "ticket", span: "normal" },
]);

export type Reason = (typeof whyVisit)[number];
