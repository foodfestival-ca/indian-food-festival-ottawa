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
 */

const SponsorSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  url: z.string().url().optional(),
});

export const sponsors = z.array(SponsorSchema).parse([
  { id: "amazon", name: "Amazon", logo: "/sponsors/amazon.png" },
  { id: "right-at-home-ottawa", name: "Right at Home Realty — Ottawa", logo: "/sponsors/right-at-home-ottawa.jpg" },
  { id: "bmo", name: "BMO", logo: "/sponsors/bmo.png" },
  { id: "ontario", name: "Government of Ontario", logo: "/sponsors/ontario.png" },
  { id: "high-commission-of-india", name: "High Commission of India, Ottawa", logo: "/sponsors/high-commission-of-india.png" },
  { id: "joan-of-arc-academy", name: "Joan of Arc Academy", logo: "/sponsors/joan-of-arc-academy.png" },
  { id: "ottawa-200", name: "Ottawa 200", logo: "/sponsors/ottawa-200.png" },
  { id: "paras-bhasin", name: "Paras Bhasin — Mortgage Agent", logo: "/sponsors/paras-bhasin.jpg" },
  { id: "ramandeep-kapoor", name: "Ramandeep Kapoor — Right at Home Realty", logo: "/sponsors/ramandeep-kapoor.jpg" },
  { id: "surgenor-barrhaven", name: "Surgenor Barrhaven", logo: "/sponsors/surgenor-barrhaven.png" },
  { id: "new-art-of-living", name: "The New Art of Living", logo: "/sponsors/new-art-of-living.png" },
  { id: "bhaumikkumar-patel", name: "Bhaumikkumar Patel — Realtor", logo: "/sponsors/bhaumikkumar-patel.jpg" },
  { id: "nishanth-natarajan", name: "Nishanth Natarajan — Realtor", logo: "/sponsors/nishanth-natarajan.jpg" },
  { id: "billyard-insurance-group", name: "Billyard Insurance Group — Westboro", logo: "/sponsors/billyard-insurance-group.png" },
  { id: "phoenix-homes", name: "Phoenix Homes", logo: "/sponsors/phoenix-homes.jpg" },
  { id: "barrhaven-bia", name: "Barrhaven BIA", logo: "/sponsors/barrhaven-bia.png" },
  { id: "costco", name: "Costco Wholesale", logo: "/sponsors/costco.png" },
]);

export type Sponsor = (typeof sponsors)[number];
