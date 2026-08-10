import { z } from "zod";
import { festival } from "@/content/festival";

/** Chronology lives HERE, not in the gallery. This is the one place
 *  where 2024 vs 2025 is the actual point. */

// The 2026 entry below is the CURRENT edition, so its vendor/performance
// figures are derived from `festival.stats` (the canonical source) instead
// of a second hardcoded set of numbers that could drift out of sync with
// what the rest of the site shows. The 2024 and 2025 entries are historical
// and stay hardcoded — they describe completed editions, not this one.
const foodVendorsStat = festival.stats.find((s) => s.label === "Food Vendors")!;
const productVendorsStat = festival.stats.find((s) => s.label === "Product Vendors")!;
const performancesStat = festival.stats.find((s) => s.label === "Performances")!;
const currentTotalVendors = `${foodVendorsStat.value + productVendorsStat.value}+`;
const currentPerformances = `${performancesStat.value}${performancesStat.suffix}`;

const YearSchema = z.object({
  year: z.string(),
  title: z.string(),
  blurb: z.string(),
  stats: z.array(z.object({ value: z.string(), label: z.string() })),
  image: z.string(),
  alt: z.string(),
  current: z.boolean(),
});

export const journey = z.array(YearSchema).parse([
  {
    year: "2024",
    title: "The First Plate",
    blurb:
      "The first edition proved the appetite was there. Ten thousand people came through the gates over one weekend, and thirty vendors sold out well before closing.",
    stats: [
      { value: "10,000+", label: "Attendees" },
      { value: "30+", label: "Vendors" },
      { value: "1", label: "Weekend" },
    ],
    image: "/media/journey/2024.jpg",
    alt: "Crowds at the first Indian Food Festival of Ottawa in 2024",
    current: false,
  },
  {
    year: "2025",
    title: "Ottawa Noticed",
    blurb:
      "The festival grew in every direction — more vendors, a larger site, a fuller performance programme — and both CBC and CTV covered the weekend.",
    stats: [
      { value: "15,000+", label: "Attendees" },
      { value: "60+", label: "Vendors" },
      { value: "CBC · CTV", label: "Coverage" },
    ],
    image: "/media/journey/2025.jpg",
    alt: "Performers on stage at the 2025 festival",
    current: false,
  },
  {
    year: "2026",
    title: "The Largest Yet",
    blurb:
      `Three days, ${currentTotalVendors} vendors, and the most ambitious cultural programme we have staged. The third edition is the one we have been building toward.`,
    stats: [
      { value: "3", label: "Days" },
      { value: currentTotalVendors, label: "Vendors" },
      { value: currentPerformances, label: "Performances" },
    ],
    image: "/media/journey/2026.jpg",
    alt: "Poster artwork for the 2026 Indian Food Festival of Ottawa",
    current: true,
  },
]);

export type JourneyYear = (typeof journey)[number];
