import { z } from "zod";

/** PLACEHOLDER PROGRAMME — structure is production-ready, times are indicative.
 *  Replace with the confirmed 2026 line-up. Categories drive both the colour
 *  clip and the icon, so meaning never rests on colour alone (WCAG 1.4.1). */

const EventSchema = z.object({
  id: z.string(),
  dayId: z.enum(["fri", "sat", "sun"]),
  start: z.string(),
  end: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.enum(["ceremony", "performance", "dj", "kids", "food", "marketplace"]),
  stage: z.string(),
});

export const scheduleEvents = z.array(EventSchema).parse([
  { id: "f1", dayId: "fri", start: "16:00", end: "16:30", title: "Gates Open", description: "Doors open and the marketplace comes alive.", category: "marketplace", stage: "Festival Grounds" },
  { id: "f2", dayId: "fri", start: "17:00", end: "17:45", title: "Opening Ceremony", description: "Lamp lighting and a welcome from the organisers.", category: "ceremony", stage: "Main Stage" },
  { id: "f3", dayId: "fri", start: "18:00", end: "19:30", title: "Classical Dance Showcase", description: "Bharatanatyam and Kathak from Ottawa's dance schools.", category: "performance", stage: "Main Stage" },
  { id: "f4", dayId: "fri", start: "19:45", end: "21:00", title: "Live Music", description: "Folk and fusion ensembles.", category: "performance", stage: "Main Stage" },
  { id: "f5", dayId: "fri", start: "21:00", end: "22:00", title: "Opening Night DJ", description: "Bollywood and bhangra to close the first night.", category: "dj", stage: "Main Stage" },

  { id: "s1", dayId: "sat", start: "12:00", end: "13:00", title: "Marketplace Opens", description: "Full marketplace and all food stalls trading.", category: "marketplace", stage: "Festival Grounds" },
  { id: "s2", dayId: "sat", start: "13:00", end: "14:00", title: "Regional Tasting Walk", description: "A guided walk through five regional specialities.", category: "food", stage: "Food Court" },
  { id: "s3", dayId: "sat", start: "14:00", end: "15:30", title: "Kids Zone Activities", description: "Rangoli, henna and craft workshops for children.", category: "kids", stage: "Kids Zone" },
  { id: "s4", dayId: "sat", start: "15:30", end: "17:00", title: "Folk Dance of India", description: "Garba, bhangra and lavani performances.", category: "performance", stage: "Main Stage" },
  { id: "s5", dayId: "sat", start: "17:30", end: "19:00", title: "Headline Music Act", description: "The weekend's headline performance.", category: "performance", stage: "Main Stage" },
  { id: "s6", dayId: "sat", start: "19:30", end: "22:00", title: "Saturday DJ Night", description: "The festival's biggest night on the dance floor.", category: "dj", stage: "Main Stage" },

  { id: "u1", dayId: "sun", start: "12:00", end: "13:00", title: "Family Morning", description: "A relaxed opening built around families.", category: "kids", stage: "Kids Zone" },
  { id: "u2", dayId: "sun", start: "13:00", end: "14:30", title: "Cooking Demonstrations", description: "Vendors cook their signature dishes in the open.", category: "food", stage: "Food Court" },
  { id: "u3", dayId: "sun", start: "14:30", end: "16:00", title: "Community Showcase", description: "Performances from Ottawa's cultural associations.", category: "performance", stage: "Main Stage" },
  { id: "u4", dayId: "sun", start: "16:00", end: "17:30", title: "Closing Concert", description: "The final performance of the weekend.", category: "performance", stage: "Main Stage" },
  { id: "u5", dayId: "sun", start: "17:30", end: "18:00", title: "Closing Ceremony", description: "Prize draws and farewell until 2027.", category: "ceremony", stage: "Main Stage" },
]);

export const categoryMeta = {
  ceremony:    { label: "Ceremony",    color: "var(--color-maroon)",  icon: "sparkles" },
  performance: { label: "Performance", color: "var(--color-burgundy)", icon: "music" },
  dj:          { label: "DJ",          color: "var(--color-saffron)", icon: "disc" },
  kids:        { label: "Kids",        color: "var(--color-emerald)", icon: "baby" },
  food:        { label: "Food",        color: "var(--color-gold)",    icon: "utensils" },
  marketplace: { label: "Marketplace", color: "var(--color-ink-muted)", icon: "store" },
} as const;

export type ScheduleEvent = (typeof scheduleEvents)[number];
export type EventCategory = keyof typeof categoryMeta;
