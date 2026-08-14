import { z } from "zod";

/**
 * Bento grid — now four cards. Doubles as a contents list for scanners who
 * won't read linearly — every card links somewhere. The former "Five States
 * on One Plate" / Featured Flavours card was removed along with the
 * Featured Flavours section itself (not moved, just taken out). `stage` now
 * points at `/schedule#performances` rather than a same-page anchor, since
 * Performances moved off the homepage onto its own route; `market`,
 * `flavors` and `kids` point at their own dedicated routes too, since Venue,
 * Food Vendors and Gallery moved off the homepage when the site became
 * multi-page.
 *
 * `free` ("Free for Everyone") and `passport` ("The Festival Passport")
 * were removed entirely at the client's request — not just their CTA (which
 * had already been stripped in an earlier pass), the whole card. See
 * components/home/WhyVisit.tsx for the matching grid-column adjustment (was
 * a 3-column bento sized for six cards, now 2 columns for a clean 2×2 with
 * four).
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
  { id: "stage",      title: "Watch live performances",  blurb: "Bollywood dance performances, classical dance, live music, folk, and three nights of DJ",                          href: "/schedule#performances", icon: "music",  span: "normal" },
  { id: "flavors",    title: "Flavors from India",       blurb: "Street food, regional specialties and festival favourites — dishes from every corner of India, all in one place.",   href: "/vendor",       icon: "utensils", span: "normal" },
  { id: "market",     title: "A Full Marketplace",       blurb: "Textiles, jewellery, apparel and Ottawa's Indian-owned makers. Come hungry, leave carrying things.",                href: "/vendor",       icon: "store",  span: "normal" },
  { id: "kids",       title: "Kids Zone and Activities", blurb: "A dedicated Kids Zone, stroller-friendly grounds and food mild enough for small palates.",                          href: "/activities#kids-zone", icon: "baby",   span: "normal" },
]);

export type Reason = (typeof whyVisit)[number];
