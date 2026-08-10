import { z } from "zod";
import { festival } from "@/content/festival";

// Performances intro below quotes the canonical performance count instead
// of a second hardcoded figure, so it can't drift out of sync with the
// homepage stats strip or the "Why Visit" card.
const performancesStat = festival.stats.find((s) => s.label === "Performances")!;

/**
 * Section copy — eyebrows, headers and intros.
 *
 * `bridge` used to carry a narrative hand-off line — a short sentence
 * acknowledging whichever section sat directly above it, back when the whole
 * site was one long homepage (see NARRATIVE-DIRECTION.md §4). Once Performances
 * and Marketplace/Vendors each moved to their own standalone routes, those
 * hand-off lines stopped having anything to hand off from and were removed
 * from both sections (Performances, Marketplace) along with the intro copy
 * that leaned on the same assumption. The `bridge` field stays in the schema
 * in case a real same-page transition needs it again, but nothing sets it now.
 */

const SectionCopySchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  accent: z.string().optional(),
  intro: z.string().optional(),
  bridge: z.string().optional(),
});

export const sectionCopy = {
  whyVisit: SectionCopySchema.parse({
    eyebrow: "Why You'll Love It",
    title: "Reasons to Clear Your Weekend",
    accent: "Clear Your Weekend",
    intro:
      "Fifteen thousand people came last year. Here is what they came for — and what you'd be walking into.",
  }),

  flavours: SectionCopySchema.parse({
    eyebrow: "First Taste",
    title: "Five Dishes. Five States. One Plate.",
    accent: "Five States.",
    intro:
      "Nobody craves “Indian food.” They crave a cold glass of jigarthanda in Madurai heat, or a dabeli eaten standing up in Mandvi. Five regions, five stories, all on one field in Ottawa.",
  }),

  performances: SectionCopySchema.parse({
    eyebrow: "On The Stage",
    title: "Put the Plate Down. Something's Starting.",
    accent: "Something's Starting.",
    intro:
      `Over ${performancesStat.value} performances across three days — classical forms carried by the families who kept them, folk traditions with the volume up, and three nights that end on a dance floor.`,
  }),

  marketplace: SectionCopySchema.parse({
    eyebrow: "Beyond The Plate",
    title: "More Than a Meal",
    accent: "More Than",
    intro:
      "Textiles, jewellery and home goods from Ottawa's Indian-owned makers and small businesses — block-printed cloth, bangles stacked by colour, a vendor who will tell you exactly how a thing was made if you ask. Come hungry, leave carrying something.",
  }),
} as const;

export type SectionCopy = z.infer<typeof SectionCopySchema>;
