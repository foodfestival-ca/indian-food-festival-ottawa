import { z } from "zod";

/**
 * Activities & Workshops — single source of truth for /activities.
 *
 * Every name, date, time and description below is the client-approved
 * wording, copied verbatim.
 *
 * "Explore your artistic side with a fun and creative painting experience."
 * (D Creative Pitara Painting Workshop) was originally supplied with a typo
 * ("experienc") and deliberately left uncorrected pending client
 * confirmation. The client has since re-supplied the line spelled correctly
 * — that's an explicit correction, not a silent "fix," so it's applied here.
 *
 * Aug 23 Pirouette Rhythmic Gymnastics and the Aug 23 Mandala Art Workshop
 * originally had their times reversed. Corrected per explicit client
 * instruction: Pirouette is 12:00 PM–1:00 PM, Mandala (Aug 23) is
 * 1:00 PM–2:00 PM. The `workshops` array below is also now ordered
 * chronologically by date/time (the client's own stated intent), not in the
 * original supply order.
 *
 * `image`/`alt` are optional per entry: only set where a supplied photo was
 * confidently matched to that specific activity/workshop by actually
 * inspecting the image (never guessed from a filename). Entries with no
 * confident photo match render icon/emoji + text only, which the card
 * component already supports as its default look — see the final report
 * for exactly which images were matched to what, and which were left out.
 *
 * `width`/`height` (added alongside `image`) are the real encoded pixel
 * dimensions of each file in /public — the same convention already used by
 * content/gallery.ts's masonry grid. app/activities/page.tsx sizes each
 * card's image container to this exact aspect ratio via CSS `aspect-ratio`
 * rather than a fixed height, so every photo/artwork renders at its full,
 * natural, uncropped composition (no forced `object-fit: cover` crop, no
 * letterboxing) while still filling its own image area completely — a
 * portrait shot and a landscape shot simply produce differently-shaped
 * cards, which is expected and intentional, not a layout bug.
 */

export const REGISTRATION_URL = "https://forms.gle/jHYKUErrbj5ppKQt7";

const BmoActivitySchema = z.object({
  id: z.string(),
  emoji: z.string(),
  name: z.string(),
  image: z.string().optional(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  /** Optional external booking link — only set for Net Cricket with Planet
   *  Cricket, whose slots need advance booking directly on Planet
   *  Cricket's own site. Every other BMO/Kids Zone activity has no
   *  reservation step, so this stays unset (no button rendered) for them. */
  bookingUrl: z.string().optional(),
});

/**
 * BMO Activity Zone — exactly the client's six activities, in the client's
 * order. Do not rename, describe, price, or date these beyond what's here.
 */
export const bmoActivities = z.array(BmoActivitySchema).parse([
  {
    id: "giant-inflatable",
    emoji: "🎈",
    name: "30-ft Giant Inflatable",
    // Reused from the existing Kids Zone media (public/media/gallery/kids-zone/)
    // rather than duplicated — same physical attraction as the client's
    // previously-approved "30-ft Inflatable Obstacle Course" entry.
    image: "/media/gallery/kids-zone/inflatable-obstacle-course.jpg",
    alt: "A 30-foot inflatable obstacle course bouncy house set up outdoors",
    width: 1264,
    height: 843,
  },
  {
    id: "face-painting",
    emoji: "🎨",
    name: "Free Face Painting",
    image: "/media/gallery/kids-zone/kids-face-painting-2025.jpg",
    alt: "A young boy having a Spider-Man mask design face-painted by an artist at the festival's Kids Zone",
    width: 933,
    height: 1400,
  },
  {
    id: "nail-painting",
    emoji: "💅",
    name: "Free Nail Painting",
    image: "/media/gallery/kids-zone/nail-art-activity.jpg",
    alt: "A pair of hands with nails painted in pink and blue patterns",
    width: 447,
    height: 447,
  },
  {
    id: "90s-games",
    emoji: "🕹️",
    name: "90s Games",
    // Client-supplied "Back to the 90's" nostalgia prop photo (Game Boys,
    // UNO, Carrom board, Business board game, 1990 diary) — a staged/
    // AI-generated representative image, not an on-site festival photo,
    // same disclosed convention already used for the Mindful Breathing
    // workshop's stock image above.
    image: "/media/activities/90s-games.jpg",
    alt: "A staged \"Back to the 90's\" display of Game Boy consoles, UNO cards, a Carrom board and 90s board games",
    width: 1536,
    height: 1024,
  },
  {
    id: "mandala-art-zone",
    emoji: "🎨",
    name: "Mandala Art Workshop",
    image: "/media/gallery/kids-zone/mandala-art-activity.jpg",
    alt: "A hand-drawn and colored mandala design on paper, in blue and green",
    width: 387,
    height: 516,
  },
  {
    id: "net-cricket",
    emoji: "🏏",
    name: "Net Cricket with Planet Cricket",
    image: "/media/gallery/kids-zone/net-cricket-activity.jpg",
    alt: "Two players using a portable cricket batting cage outdoors",
    width: 894,
    height: 894,
    bookingUrl: "https://www.planetcricketottawa.com/food-festival-cricket-nets",
  },
]);

const WorkshopSchema = z.object({
  id: z.string(),
  emoji: z.string(),
  name: z.string(),
  date: z.string(),
  time: z.string(),
  description: z.string(),
  image: z.string().optional(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

/**
 * Free Workshops — exactly the client's seven scheduled sessions, now
 * ordered chronologically by date/time (the client's explicit intent — Aug
 * 22 sessions first, then Aug 23 sessions in the order they actually run
 * that day). The two Mandala Art Workshop entries (Aug 22 and Aug 23) are
 * deliberately kept as separate sessions, not merged — they share
 * representative artwork (the same supplied mandala photo) since both are
 * the same kind of activity, but that is a shared IMAGE, not a shared or
 * removed session.
 */
export const workshops = z.array(WorkshopSchema).parse([
  {
    id: "mandala-art-aug22",
    emoji: "🎨",
    name: "Mandala Art Workshop",
    date: "Aug 22",
    time: "12:30 PM–1:30 PM",
    description: "Unwind and get creative while exploring the calming art of mandala-making.",
    image: "/media/activities/mandala-art-workshop.jpg",
    alt: "A hand-painted mandala design in pink, gold and black on paper, an example of mandala art",
    width: 807,
    height: 818,
  },
  {
    id: "d-creative-pitara-painting",
    emoji: "🖌️",
    name: "D Creative Pitara Painting Workshop",
    date: "Aug 22",
    time: "1:30 PM–2:30 PM",
    // Client re-supplied this line with the typo corrected — see the
    // file-header note above.
    description: "Explore your artistic side with a fun and creative painting experience.",
    image: "/media/activities/d-creative-pitara-painting.jpg",
    alt: "A colourful unicorn and rainbow acrylic painting on canvas, an example of the workshop's painting",
    width: 626,
    height: 767,
  },
  {
    id: "yoga-in-the-park",
    emoji: "🧘‍♀️",
    name: "Yoga in the Park",
    date: "Aug 23",
    time: "10:30 AM–11:30 AM",
    description:
      "Start your Sunday with movement, mindfulness and positive energy. Yoga mats and T-shirts will be provided!",
    image: "/media/activities/yoga-in-the-park.jpg",
    alt: "A group of festival visitors standing on yoga mats outdoors near the festival's tents during a group session",
    width: 1600,
    height: 1200,
  },
  {
    id: "mindful-breathing",
    emoji: "🌬️",
    name: "Mindful Breathing with Ashok Saha",
    date: "Aug 23",
    time: "11:30 AM–12:00 PM",
    description: "Slow down, breathe deeply and reconnect through simple mindful breathing techniques.",
    // Client-supplied representative image (not an on-site festival photo —
    // see the final report). Alt text describes only what's shown.
    image: "/media/activities/mindful-breathing-stock.jpg",
    alt: "A woman practicing a seated breathing exercise outdoors on a yoga mat",
    width: 721,
    height: 450,
  },
  {
    id: "pirouette-rhythmic-gymnastics",
    emoji: "🤸‍♀️",
    name: "Pirouette Rhythmic Gymnastics",
    date: "Aug 23",
    time: "12:00 PM–1:00 PM",
    description: "Experience the beauty and energy of rhythmic gymnastics through movement, coordination and fun.",
    image: "/media/activities/pirouette-rhythmic-gymnastics.jpg",
    alt: "Seven young gymnasts in black leotards posing in a star formation, each holding a rhythmic gymnastics ribbon",
    width: 591,
    height: 545,
  },
  {
    id: "mandala-art-aug23",
    emoji: "🎨",
    name: "Mandala Art Workshop",
    date: "Aug 23",
    time: "1:00 PM–2:00 PM",
    description: "Create your own mindful masterpiece and enjoy a relaxing, creative experience.",
    image: "/media/activities/mandala-art-workshop.jpg",
    alt: "A hand-painted mandala design in pink, gold and black on paper, an example of mandala art",
    width: 807,
    height: 818,
  },
  {
    id: "power-garba",
    emoji: "💃",
    name: "Power Garba with Hiral",
    date: "Aug 23",
    time: "4:15 PM–5:00 PM",
    description:
      "Garba meets fitness! Dance, move and get your energy flowing with this fun, high-energy Garba session.",
    // No supplied image could be confidently confirmed as a genuine photo
    // for this session — see the final report.
  },
]);

export type BmoActivity = (typeof bmoActivities)[number];
export type Workshop = (typeof workshops)[number];
