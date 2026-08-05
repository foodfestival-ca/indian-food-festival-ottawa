import { z } from "zod";

/**
 * Performance Schedule — single source of truth for the /schedule page.
 *
 * Transcribed directly from "Performance Schedule 2026.xlsx" (Time,
 * Performance, Type of Performance, Group/Solo, Name of Performer, Group
 * Name). Nothing here is invented:
 *
 *  - `day` uses the same "fri"/"sat"/"sun" ids as `festival.days` in
 *    content/festival.ts, so the schedule page can reuse that file's
 *    weekday labels and dates instead of duplicating them.
 *  - `time` is the exact range string from the sheet (e.g. "5:00PM - 5:15PM").
 *  - `type` is taken from the sheet's "Type of Performance" column and left
 *    `undefined` (omitted, not shown as a badge) wherever that cell was
 *    blank — EXCEPT for three cases where the spreadsheet's own title makes
 *    the category unambiguous rather than guessed: the three interactive
 *    sessions ("Mandala Art Workshop" ×2, "Gymnastics", "Yoga") are typed
 *    "Workshop", "MC Welcome Remarks" is typed "Speech", and the three
 *    entries simply titled "DJ" are typed "DJ" rather than the sheet's
 *    literal "Music" — matching the DJ filter chip the page needs and the
 *    plain fact of what the performance is.
 *  - `performer` and `group` are omitted (left `undefined`) wherever the
 *    sheet cell was blank, and `group` is also omitted wherever it was
 *    identical to `performer` (several rows list a solo act's own name in
 *    both columns) — showing "Sidak — Sidak" on a card is redundant, not
 *    informative, so the duplicate is dropped rather than rendered twice.
 *  - Two sheet rows carried no usable event information and are excluded
 *    entirely rather than rendered as empty cards: the Saturday "5 min
 *    Break / MC Activity" filler row, and the blank Sunday 2:30–3:00PM row
 *    (no performance name at all). The one Saturday row whose performance
 *    name was literally "??" is kept — it's a real scheduled slot with an
 *    unconfirmed act — and displayed as "To Be Announced" for readability.
 */

export const SCHEDULE_TYPES = ["Music", "Dance", "Speech", "Workshop", "DJ", "Vocals"] as const;

const ScheduleTypeSchema = z.enum(SCHEDULE_TYPES);

const ScheduleEventSchema = z.object({
  id: z.string(),
  day: z.enum(["fri", "sat", "sun"]),
  time: z.string(),
  title: z.string(),
  type: ScheduleTypeSchema.optional(),
  performer: z.string().optional(),
  group: z.string().optional(),
});

export const scheduleEvents = z.array(ScheduleEventSchema).parse([
  // ---------- Friday ----------
  { id: "fri-1", day: "fri", time: "5:00PM - 5:15PM", title: "MC Welcome Remarks", type: "Speech" },
  { id: "fri-2", day: "fri", time: "5:15PM - 6:15PM", title: "Bollywood Singing with Dhol", type: "Vocals", performer: "Sidak" },
  { id: "fri-3", day: "fri", time: "6:15PM - 6:45PM", title: "Opening Music Ceremony (Kerala Drums & Violin)", type: "Music", group: "Ottawa Mela Sangam" },
  { id: "fri-4", day: "fri", time: "6:45PM - 7:15PM", title: "Mayor Speech & Remarks", type: "Speech", performer: "Mayor/Councellor" },
  { id: "fri-5", day: "fri", time: "7:15PM - 7:25PM", title: "Cultural / Folk Performance", type: "Dance", performer: "Simran Kaur", group: "Lovin' Bhangra" },
  { id: "fri-6", day: "fri", time: "7:30PM - 8:00PM", title: "Ceremonial Dhol Tasha", type: "Music", group: "Ottawa Dhol Pathak" },
  { id: "fri-7", day: "fri", time: "8:05PM - 8:15PM", title: "Fusion Kids Performance", type: "Dance", performer: "Pranil", group: "Pranil Dance Studio" },
  { id: "fri-8", day: "fri", time: "8:20PM - 8:30PM", title: "Gujarati Garba with Daughter", type: "Dance", performer: "Urvashi Makwana" },
  { id: "fri-9", day: "fri", time: "8:30PM - 9:00PM", title: "Bollywood Singing", type: "Vocals", performer: "Devine Melodies" },
  { id: "fri-10", day: "fri", time: "9:00PM - 10:00PM", title: "DJ", type: "DJ", performer: "DJ Avatar" },

  // ---------- Saturday ----------
  { id: "sat-1", day: "sat", time: "12:30PM - 1:30PM", title: "Mandala Art Workshop", type: "Workshop" },
  { id: "sat-2", day: "sat", time: "1:30PM - 2:30PM", title: "Gymnastics", type: "Workshop" },
  { id: "sat-3", day: "sat", time: "2:30PM - 3:00PM", title: "To Be Announced" },
  { id: "sat-4", day: "sat", time: "3:00PM - 3:15PM", title: "Music – Vocal", type: "Music", performer: "Steffi" },
  { id: "sat-5", day: "sat", time: "3:20PM - 3:30PM", title: "Dance – Classical (Katthak)", type: "Dance", performer: "Shubha", group: "Mudra Academy of Dance" },
  { id: "sat-6", day: "sat", time: "3:30PM - 3:40PM", title: "South Indian Dance Performance", type: "Dance", performer: "Urvashi Makwana" },
  { id: "sat-7", day: "sat", time: "3:45PM - 3:55PM", title: "Dance – Fusion, Cultural / Folk Performance", type: "Dance", performer: "Tanna", group: "The Rhythm of Tanna" },
  { id: "sat-8", day: "sat", time: "4:00PM - 4:10PM", title: "Music – Vocal", type: "Music", performer: "Anukriti", group: "Anukriti Roy" },
  { id: "sat-9", day: "sat", time: "4:15PM - 4:25PM", title: "Dance – Classical", type: "Dance", performer: "Nikita", group: "Astha Patel" },
  { id: "sat-10", day: "sat", time: "4:30PM - 5:00PM", title: "Tamil Songs", type: "Vocals", performer: "Canadian Tamil Singers", group: "Canadian Tamil Singers Club" },
  { id: "sat-11", day: "sat", time: "5:00PM - 5:15PM", title: "Dance – Classical (Katthak)", type: "Dance", performer: "Geoffrey (Aroha Fine Arts)", group: "GD Dance Initiatives & Aroha Fine Arts" },
  { id: "sat-12", day: "sat", time: "5:15PM - 5:45PM", title: "Bollywood Singing", type: "Vocals", performer: "Devine Melodies" },
  { id: "sat-13", day: "sat", time: "5:45PM - 6:15PM", title: "Bharatnatyam/Traditional Dances", type: "Dance", performer: "Shri Abirami", group: "Gowri Padma Natyalaya" },
  { id: "sat-14", day: "sat", time: "6:15PM - 6:30PM", title: "Fusion Kids Performance", type: "Dance", performer: "Vivek", group: "RRB Dance Company Canada" },
  { id: "sat-15", day: "sat", time: "6:30PM - 6:35PM", title: "Dance – Classical, Dance – Bollywood", type: "Dance", performer: "Malosree", group: "Art of Kathak Ottawa" },
  { id: "sat-16", day: "sat", time: "6:40PM - 7:00PM", title: "Band Performance", type: "Music", performer: "Sounak", group: "MLC" },
  { id: "sat-17", day: "sat", time: "7:05PM - 7:15PM", title: "Dance – Classical (Katthak)", type: "Dance", performer: "Yasmine" },
  { id: "sat-18", day: "sat", time: "7:20PM - 7:30PM", title: "Bhangra", type: "Dance", performer: "Jaideep", group: "Algonquin Bhangra Group" },
  { id: "sat-19", day: "sat", time: "7:35PM - 7:50PM", title: "Bollywood + Tollywood Dance (Solo)", type: "Dance", performer: "Nivedhitha Arjun" },
  { id: "sat-20", day: "sat", time: "7:55PM - 8:10PM", title: "Rap Music/Storytelling/Poetry", type: "Music", performer: "Abhishek (Montreal)", group: "Khottaa Sikkaa" },
  { id: "sat-21", day: "sat", time: "8:15PM - 8:55PM", title: "Band Performance", type: "Music", performer: "Kavya", group: "Itskavyasun" },
  { id: "sat-22", day: "sat", time: "9:00PM - 10:00PM", title: "DJ", type: "DJ", performer: "DJ Vijay" },

  // ---------- Sunday ----------
  { id: "sun-1", day: "sun", time: "10:30AM - 11:30AM", title: "Yoga", type: "Workshop" },
  { id: "sun-2", day: "sun", time: "12:00PM - 1:00PM", title: "Mandala Art Workshop", type: "Workshop" },
  { id: "sun-3", day: "sun", time: "3:00PM - 3:45PM", title: "Canadian Tamil Singers", type: "Music", performer: "Sharmi", group: "canadiantamilsingersclub" },
  { id: "sun-4", day: "sun", time: "3:50PM - 4:00PM", title: "Freestyle Bollywood/Tollywood", type: "Dance", performer: "Sadhana", group: "Sadhana Dance Studio" },
  { id: "sun-5", day: "sun", time: "4:05PM - 4:10PM", title: "Dance – Fusion", type: "Dance", performer: "Catherine", group: "Athiradi Azhagigals" },
  { id: "sun-6", day: "sun", time: "4:15PM - 5:00PM", title: "Power Garba", type: "Dance", performer: "Hiral", group: "Garba with Hiral" },
  { id: "sun-7", day: "sun", time: "5:00PM - 6:00PM", title: "DJ", type: "DJ", performer: "DJ Avatar" },
]);

export type ScheduleEvent = (typeof scheduleEvents)[number];
export type ScheduleType = (typeof SCHEDULE_TYPES)[number];

/** Badge colour per type — reuses existing design-token colours only
 *  (no new colours introduced), same convention as the old categoryMeta. */
export const scheduleTypeMeta: Record<ScheduleType, { color: string }> = {
  Music: { color: "var(--color-burgundy)" },
  Dance: { color: "var(--color-maroon)" },
  Speech: { color: "var(--color-ink-muted)" },
  Workshop: { color: "var(--color-emerald)" },
  DJ: { color: "var(--color-saffron)" },
  Vocals: { color: "var(--color-gold)" },
};
