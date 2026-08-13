import { z } from "zod";

/**
 * Sponsors — flat roster, no tiers.
 *
 * This used to be split into "Presenting / Gold / Community" categories with
 * a heading above each group. That's gone: every sponsor now renders in one
 * grid, in the order listed below, with no category label anywhere. `logo`
 * may still be an empty string for a slot with no artwork yet — the card
 * component falls back to a lettermark placeholder rather than a broken
 * image — but every entry below has real artwork in /public/sponsors/.
 *
 * Phase 6 — reordered to match the client's approved sponsor list (a
 * spreadsheet screenshot). There is no separate `order` field: this array's
 * own sequence IS the render order (see components/home/Sponsors.tsx, which
 * just `.map()`s it with no sort), so reordering the array is the entire
 * fix — no new ordering mechanism was added.
 *
 * Two things did NOT map cleanly onto the client's list, flagged here
 * rather than silently guessed:
 *   1. The client's list includes three sponsors — "Karnival Events",
 *      "613 Artistry", and "Tappy" — that do not exist anywhere in this
 *      file and have no logo in /public/sponsors/. Per this phase's own
 *      instructions ("do not invent," "do not add a new sponsor"), they are
 *      NOT included below. They need to be supplied (name confirmation +
 *      logo) before they can be added.
 *   2. Three existing sponsors — Right at Home Realty (Ottawa), Ottawa 200,
 *      and Costco Wholesale — are NOT on the client's approved list at all.
 *      Per "do not remove any sponsor," they're kept, placed after the 13
 *      client-list sponsors that have no local match issue and before
 *      Barrhaven BIA, since the client explicitly said Barrhaven BIA should
 *      be the final sponsor on the page. Their exact position is a judgment
 *      call (the client's list gives no guidance on them at all) and should
 *      be confirmed.
 *   3. "BGI Insurance Group" (client's #7) doesn't exactly match any name
 *      here — treated as `billyard-insurance-group` ("Billyard Insurance
 *      Group — Westboro"), the only insurance-group sponsor in the roster.
 *      Name itself was left untouched per "do not change sponsor names."
 */

const SponsorSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  url: z.string().url().optional(),
});

export const sponsors = z.array(SponsorSchema).parse([
  // 1
  { id: "ontario", name: "Government of Ontario", logo: "/sponsors/ontario.png" },
  // 2
  { id: "phoenix-homes", name: "Phoenix Homes", logo: "/sponsors/phoenix-homes.jpg" },
  // 3
  { id: "amazon", name: "Amazon", logo: "/sponsors/amazon.png" },
  // 4
  { id: "bmo", name: "BMO", logo: "/sponsors/bmo.png" },
  // 5
  { id: "high-commission-of-india", name: "High Commission of India, Ottawa", logo: "/sponsors/high-commission-of-india.png" },
  // 6
  { id: "surgenor-barrhaven", name: "Surgenor Barrhaven", logo: "/sponsors/surgenor-barrhaven.png" },
  // 7 — "BGI Insurance Group" on the client's list; see file-header note above.
  { id: "billyard-insurance-group", name: "Billyard Insurance Group — Westboro", logo: "/sponsors/billyard-insurance-group.png" },
  // 8
  { id: "joan-of-arc-academy", name: "Joan of Arc Academy", logo: "/sponsors/joan-of-arc-academy.png" },
  // 9
  { id: "bhaumikkumar-patel", name: "Bhaumikkumar Patel — Realtor", logo: "/sponsors/bhaumikkumar-patel.jpg" },
  // 10
  { id: "ramandeep-kapoor", name: "Ramandeep Kapoor — Right at Home Realty", logo: "/sponsors/ramandeep-kapoor.jpg" },
  // 11 — "Nishant" on the client's list.
  { id: "nishanth-natarajan", name: "Nishanth Natarajan — Realtor", logo: "/sponsors/nishanth-natarajan.jpg" },
  // 12
  { id: "paras-bhasin", name: "Paras Bhasin — Mortgage Agent", logo: "/sponsors/paras-bhasin.jpg" },
  // 13
  { id: "new-art-of-living", name: "The New Art of Living", logo: "/sponsors/new-art-of-living.png" },
  // Client's #14–16 (Karnival Events, 613 Artistry, Tappy) are not in this
  // file — no matching logo/data exists yet; see file-header note above.

  // Not on the client's list at all — kept per "do not remove any sponsor,"
  // placed here (judgment call, needs confirmation) so Barrhaven BIA can
  // stay the final card as the client specified.
  { id: "right-at-home-ottawa", name: "Right at Home Realty — Ottawa", logo: "/sponsors/right-at-home-ottawa.jpg" },
  { id: "ottawa-200", name: "Ottawa 200", logo: "/sponsors/ottawa-200.png" },
  { id: "costco", name: "Costco Wholesale", logo: "/sponsors/costco.png" },

  // 17 — client-specified final sponsor.
  { id: "barrhaven-bia", name: "Barrhaven BIA", logo: "/sponsors/barrhaven-bia.png" },
]);

export type Sponsor = (typeof sponsors)[number];
