import { z } from "zod";

/** Venue practicalities. Tone here is deliberately plain — this is the part
 *  of the page where clarity beats cadence. */

const InfoSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.enum(["car", "bus", "accessible", "clock"]),
  lines: z.array(z.string()),
});

export const venueInfo = z.array(InfoSchema).parse([
  {
    id: "parking",
    title: "Parking",
    icon: "car",
    lines: [
      "Free on-site parking is available on a first-come basis.",
      "Additional street parking nearby on surrounding residential roads.",
      "Arrive before 5 PM on Saturday for the easiest parking.",
    ],
  },
  {
    id: "transit",
    title: "Getting Here",
    icon: "bus",
    lines: [
      "Reachable by OC Transpo — check the trip planner for routes to the venue.",
      "Bicycle parking is available at the main entrance.",
      "Rideshare drop-off is at the main gate.",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    icon: "accessible",
    lines: [
      "Level, accessible pathways throughout the festival grounds.",
      "Accessible washrooms on site.",
      "Stroller and wheelchair friendly.",
      "Contact us ahead of your visit for specific access needs.",
    ],
  },
]);

export type VenueInfo = (typeof venueInfo)[number];
