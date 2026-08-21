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
 *  - The Saturday "5 min Break / MC Activity" filler row carries no usable
 *    event information and is excluded entirely rather than rendered as an
 *    empty card.
 *
 * 2026-08-18 update: the client supplied a newer schedule screenshot with
 * substantial changes across all three days — retitled performances, added/
 * changed group names, reordered and swapped time slots, some acts removed,
 * two new Sunday-morning workshop sessions added (now matching times already
 * on /activities), and — per the client's explicit instruction — a
 * back-to-back duplicated block of four Sunday-afternoon rows kept exactly
 * as supplied rather than deduplicated. See the inline comments above the
 * Saturday and Sunday blocks below for the specific per-row changes and
 * open questions (a couple of likely sheet typos, e.g. "Bollywood Meadly"
 * and "Breathing Excercises", were kept verbatim rather than silently
 * corrected, pending client confirmation).
 *
 * 2026-08-21 audit: line-by-line comparison against the client's Google
 * Sheet ("Performance Schedule 2026", View-only link) turned up 6 field-
 * level errors, now corrected (no events were missing or extra — the 48
 * entries and their ordering already matched):
 *  - fri-4 group "Ottawa Mela Sangam" -> "Ottawa Mela Sangham" (sheet spelling).
 *  - fri-5 performer "Mayor/Councillor" -> "Mayor/Councellor" (sheet's own
 *    spelling, kept verbatim per this file's established convention).
 *  - sat-9 was missing its group, "Canadian Tamil Singers Club".
 *  - sat-14 group "RRB Dance Company Canada" -> "RRB Dance Company Ottawa".
 *  - sun-6 was missing its group, "Gautami and Siona: Two Voices, One Heart".
 *  - sun-13 (the second Power Garba slot in the duplicated 3:45-6:00PM
 *    block) type "Dance" -> "Workshop" — the sheet's Type column literally
 *    says "Workshop" for this second occurrence, unlike the first (sun-9,
 *    still "Dance"); transcribed as shown rather than reconciled.
 *
 * 2026-08-21 follow-up (client corrections, same day): three items flagged
 * as pending confirmation in the audit above are now resolved directly by
 * the client — sat-2 "D Creative Pitaara Workshop" -> "D Creative Pitaara
 * Painting Workshop" (now matches content/activities.ts); sat-7 "Bollywood
 * Meadly" -> "Bollywood Medley" (typo fixed); fri-11's closing DJ set is
 * titled "BollyFusion", performed by "DJ Avtaar" (was "DJ"/"DJ Avatar").
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
  // Retitled per the client's latest schedule screenshot (2026-08-18):
  // "Bollywood Singing" -> "Acoustic Bollywood Hits" (both slots),
  // "Cultural / Folk Performance" -> "Bhangra Folk Dance",
  // "Fusion Kids Performance" -> "Indian Dance Fusion", and group names were
  // added to several rows that previously had none (Aaradhya -> "Mona",
  // Pratap -> "Ottawa Mela Sangam", Simran Kaur -> "Lovin' Bhangra",
  // Ceremonial Dhol Tasha -> "Ottawa Dhol Pathak", Pranil -> "Cherry Dance
  // Studios", Sujaya -> "Team Natya"). The closing DJ set is titled
  // "BollyFusion", performed by "DJ Avtaar" (client-confirmed 2026-08-21,
  // correcting the earlier "DJ"/"DJ Avatar" transcription).
  { id: "fri-1", day: "fri", time: "5:15PM - 5:25PM", title: "MC Welcome Remarks", type: "Speech" },
  { id: "fri-2", day: "fri", time: "5:25PM - 5:55PM", title: "Acoustic Bollywood Hits", type: "Vocals", performer: "Devine Melodies" },
  { id: "fri-3", day: "fri", time: "6:00PM - 6:10PM", title: "Indian Fusion Dance", type: "Dance", performer: "Aaradhya", group: "Mona" },
  { id: "fri-4", day: "fri", time: "6:15PM - 6:45PM", title: "Opening Music Ceremony (Kerala Drums & Violin)", type: "Music", performer: "Pratap", group: "Ottawa Mela Sangham" },
  { id: "fri-5", day: "fri", time: "6:45PM - 7:15PM", title: "Mayor Speech & Remarks", type: "Speech", performer: "Mayor/Councellor" },
  { id: "fri-6", day: "fri", time: "7:15PM - 7:25PM", title: "Bhangra Folk Dance", type: "Dance", performer: "Simran Kaur", group: "Lovin' Bhangra" },
  { id: "fri-7", day: "fri", time: "7:30PM - 8:00PM", title: "Ceremonial Dhol Tasha", type: "Music", group: "Ottawa Dhol Pathak" },
  { id: "fri-8", day: "fri", time: "8:05PM - 8:15PM", title: "Indian Dance Fusion", type: "Dance", performer: "Pranil", group: "Cherry Dance Studios" },
  { id: "fri-9", day: "fri", time: "8:20PM - 8:30PM", title: "Fusion Bharatnatyam", type: "Dance", performer: "Sujaya", group: "Team Natya" },
  { id: "fri-10", day: "fri", time: "8:30PM - 9:00PM", title: "Acoustic Bollywood Hits", type: "Vocals", performer: "Devine Melodies" },
  { id: "fri-11", day: "fri", time: "9:00PM - 10:00PM", title: "BollyFusion", type: "DJ", performer: "DJ Avtaar" },

  // ---------- Saturday ----------
  // Substantially reshuffled per the client's latest schedule screenshot
  // (2026-08-18) — this is a wholesale replacement of the day, not a patch:
  //  - "Gymnastics" (1:30-2:30PM) moved off Saturday entirely (now Sunday
  //    12:00-1:00PM, see below); its old slot is now "D Creative Pitaara
  //    Painting Workshop" (client-confirmed 2026-08-21, correcting the
  //    earlier "D Creative Pitaara Workshop" transcription — now also
  //    lines up with content/activities.ts's matching Aug 22 workshop
  //    entry).
  //  - The old 2:30-3:00PM "??"/To Be Announced slot and Steffi's
  //    3:00-3:15PM "Music – Vocal" slot are both gone; that time is now a
  //    real "MC Welcome Remarks" slot at 3:00-3:15PM.
  //  - Urvashi Makwana's "South Indian Dance Performance" (3:30-3:40PM) is
  //    gone; that slot is now Yasmine's Katthak performance (she previously
  //    had a later 7:05-7:15PM slot, which itself is now "Rajasthani Dance"
  //    — performed by Urvashi Makwana instead). Net effect: both performers
  //    are still on the day, just swapped time slots and, for Urvashi,
  //    a different dance style/title.
  //  - Shri Abirami's "Bharatnatyam/Traditional Dances" (5:45-6:15PM,
  //    Gowri Padma Natyalaya) and Abhishek's "Rap Music/Storytelling/Poetry"
  //    (7:55-8:10PM, Khottaa Sikkaa) no longer appear anywhere in the new
  //    sheet — both removed, not moved.
  //  - New slot added: "Dance - Bharatnatyam" (Nikita Gohel / Brahmormi) at
  //    6:00-6:10PM, between the existing Indian Dance Fusion and Fusion Kids
  //    Performance slots.
  //  - Several titles/groups were renamed even where the performer stayed
  //    the same: "Music – Vocal" (Anukriti) -> "Bollywood Medley" (client-
  //    confirmed 2026-08-21, correcting the sheet's earlier "Meadly" typo);
  //    "Dance – Classical" (Nikita)
  //    -> "Garba Performance", now performed as "Nikita Gohel" with group
  //    "Brahmormi" (was "Nikita" / "Astha Patel"); "Tamil Songs" -> "Tamil
  //    Melodies"; "Dance – Classical (Katthak)" (Geoffrey) -> "Geoffery
  //    Dollar - Kathak"; "Bollywood Singing" -> "Acoustic Bollywood Hits";
  //    "Fusion Kids Performance"/Vivek unchanged; "Bhangra" (Jaideep)'s
  //    group changed from "Algonquin Bhangra Group" to "UOttawa Bhangra";
  //    "Rap Music/Storytelling/Poetry" slot replaced by "90s Bollywood Theme
  //    Dance" (Yogita / 7 steps Dance); "Band Performance" (Kavya) ->
  //    "Pan India Musical Hits (Band Performance)", group changed from
  //    "Itskavyasun" to "Chai & Biscuits".
  { id: "sat-1", day: "sat", time: "12:30PM - 1:30PM", title: "Mandala Art Workshop", type: "Workshop" },
  { id: "sat-2", day: "sat", time: "1:30PM - 2:30PM", title: "D Creative Pitaara Painting Workshop", type: "Workshop" },
  { id: "sat-3", day: "sat", time: "3:00PM - 3:15PM", title: "MC Welcome Remarks", type: "Speech" },
  { id: "sat-4", day: "sat", time: "3:20PM - 3:30PM", title: "Dance – Classical (Katthak)", type: "Dance", performer: "Shubha", group: "Mudra Academy of Dance" },
  { id: "sat-5", day: "sat", time: "3:30PM - 3:40PM", title: "Dance – Classical (Katthak)", type: "Dance", performer: "Yasmine" },
  { id: "sat-6", day: "sat", time: "3:45PM - 3:55PM", title: "Dance – Fusion, Cultural / Folk Performance", type: "Dance", performer: "Tanna", group: "The Rhythm of Tanna" },
  { id: "sat-7", day: "sat", time: "4:00PM - 4:10PM", title: "Bollywood Medley", type: "Music", performer: "Anukriti", group: "Anukriti Roy" },
  { id: "sat-8", day: "sat", time: "4:15PM - 4:25PM", title: "Garba Performance", type: "Dance", performer: "Nikita Gohel", group: "Brahmormi" },
  { id: "sat-9", day: "sat", time: "4:30PM - 5:00PM", title: "Tamil Melodies", type: "Vocals", performer: "Canadian Tamil Singers", group: "Canadian Tamil Singers Club" },
  { id: "sat-10", day: "sat", time: "5:00PM - 5:15PM", title: "Geoffery Dollar - Kathak", type: "Dance", performer: "Geoffrey (Aroha Fine Arts)", group: "GD Dance Initiatives & Aroha Fine Arts" },
  { id: "sat-11", day: "sat", time: "5:15PM - 5:45PM", title: "Acoustic Bollywood Hits", type: "Vocals", performer: "Devine Melodies" },
  { id: "sat-12", day: "sat", time: "5:45PM - 5:55PM", title: "Indian Dance Fusion", type: "Dance", performer: "Pranil", group: "Cherry Dance Studio" },
  { id: "sat-13", day: "sat", time: "6:00PM - 6:10PM", title: "Dance - Bharatnatyam", type: "Dance", performer: "Nikita Gohel", group: "Brahmormi" },
  { id: "sat-14", day: "sat", time: "6:15PM - 6:30PM", title: "Fusion Kids Performance", type: "Dance", performer: "Vivek", group: "RRB Dance Company Ottawa" },
  { id: "sat-15", day: "sat", time: "6:30PM - 6:35PM", title: "Dance – Classical, Dance – Bollywood", type: "Dance", performer: "Malosree", group: "Art of Kathak Ottawa" },
  { id: "sat-16", day: "sat", time: "6:40PM - 7:00PM", title: "Band Performance", type: "Music", performer: "Sounak", group: "MLC" },
  { id: "sat-17", day: "sat", time: "7:05PM - 7:15PM", title: "Rajasthani Dance", type: "Dance", performer: "Urvashi Makwana" },
  { id: "sat-18", day: "sat", time: "7:20PM - 7:30PM", title: "Bhangra", type: "Dance", performer: "Jaideep", group: "UOttawa Bhangra" },
  { id: "sat-19", day: "sat", time: "7:35PM - 7:50PM", title: "Bollywood + Tollywood Dance (Solo)", type: "Dance", performer: "Nivedhitha Arjun" },
  { id: "sat-20", day: "sat", time: "7:55PM - 8:10PM", title: "90s Bollywood Theme Dance", type: "Dance", performer: "Yogita", group: "7 steps Dance" },
  { id: "sat-21", day: "sat", time: "8:15PM - 8:55PM", title: "Pan India Musical Hits (Band Performance)", type: "Music", performer: "Kavya", group: "Chai & Biscuits" },
  { id: "sat-22", day: "sat", time: "9:00PM - 10:00PM", title: "DJ", type: "DJ", performer: "DJ Vijay" },

  // ---------- Sunday ----------
  // Two new interactive sessions were inserted into the morning block, which
  // now lines up exactly with the matching workshop times already listed on
  // /activities (content/activities.ts): "Breathing Excercises" [sic — the
  // client's sheet spells it this way] with Ashok Saha at 11:30AM-12:00PM
  // matches "Mindful Breathing with Ashok Saha", and "Gymnastics" at
  // 12:00-1:00PM matches "Pirouette Rhythmic Gymnastics" — both previously
  // missing from this page even though they already existed on /activities.
  // Mandala Art Workshop shifts from 12:00-1:00PM to 1:00-2:00PM to make
  // room for them.
  //
  // The client's new sheet lists TWO back-to-back copies of the
  // 3:45PM-6:00PM block (rows for "Bollywood Singing"/Ankit Arora,
  // "Dance – Fusion"/Catherine, "Power Garba"/Hiral, and a closing DJ slot —
  // each appearing twice in a row, back to back, with the same performers).
  // The very last row differs between the two copies ("DJ with Sidak" /
  // DJ Avatar vs. "DJ with Dhol" / DJ Avtaar & Sidak). Per the client's
  // explicit instruction, both copies are included below exactly as
  // supplied — this does mean Catherine's and Hiral's sets and the DJ each
  // effectively appear twice on the published schedule; flagging this for a
  // final look in case the sheet's duplication was unintentional.
  { id: "sun-1", day: "sun", time: "10:30AM - 11:30AM", title: "Yoga", type: "Workshop" },
  { id: "sun-2", day: "sun", time: "11:30AM - 12:00PM", title: "Breathing Excercises", type: "Workshop", performer: "Ashok Saha" },
  { id: "sun-3", day: "sun", time: "12:00PM - 1:00PM", title: "Gymnastics", type: "Workshop" },
  { id: "sun-4", day: "sun", time: "1:00PM - 2:00PM", title: "Mandala Art Workshop", type: "Workshop" },
  { id: "sun-5", day: "sun", time: "2:30PM - 3:15PM", title: "Tamil Melodies", type: "Music", performer: "Sharmi", group: "canadiantamilsingersclub" },
  { id: "sun-6", day: "sun", time: "3:15PM - 3:45PM", title: "Bollywood Singing", type: "Music", performer: "Gautami & Siona", group: "Gautami and Siona: Two Voices, One Heart" },
  { id: "sun-7", day: "sun", time: "3:45PM - 4:00PM", title: "Bollywood Singing", type: "Music", performer: "Ankit Arora" },
  { id: "sun-8", day: "sun", time: "4:05PM - 4:10PM", title: "Dance – Fusion", type: "Dance", performer: "Catherine", group: "Athiradi Azhagigals" },
  { id: "sun-9", day: "sun", time: "4:15PM - 5:00PM", title: "Power Garba", type: "Dance", performer: "Hiral", group: "Garba with Hiral" },
  { id: "sun-10", day: "sun", time: "5:00PM - 6:00PM", title: "DJ with Sidak", type: "DJ", performer: "DJ Avatar" },
  { id: "sun-11", day: "sun", time: "3:45PM - 4:00PM", title: "Music - Vocals", type: "Music", performer: "Ankit Arora" },
  { id: "sun-12", day: "sun", time: "4:05PM - 4:10PM", title: "Dance – Fusion", type: "Dance", performer: "Catherine", group: "Athiradi Azhagigals" },
  { id: "sun-13", day: "sun", time: "4:15PM - 5:00PM", title: "Power Garba", type: "Workshop", performer: "Hiral", group: "Garba with Hiral" },
  { id: "sun-14", day: "sun", time: "5:00PM - 6:00PM", title: "DJ with Dhol", type: "DJ", performer: "DJ Avtaar & Sidak" },
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
