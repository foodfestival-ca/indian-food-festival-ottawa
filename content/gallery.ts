import { z } from "zod";

/**
 * Gallery — single source of truth for the /gallery page.
 *
 * Every item below is real photography/video from Navatara's Indian Food
 * Festival 2024, supplied directly by the client. Two clips from the
 * original upload batch (Parliament Hill "International Day of Yoga"
 * footage) were left out — that's a different Navatara-run event, not the
 * food festival, and this page's hero explicitly frames everything here as
 * "Moments From Navatara's Indian Food Festival 2024," so including them
 * would misrepresent what's shown.
 *
 * `category` is inferred from what's actually in each shot (Crowd /
 * Performances / Food) — the upload didn't come pre-tagged, so these are a
 * best-effort read of the footage itself, not invented themes with nothing
 * behind them.
 *
 * `width`/`height` are the real encoded pixel dimensions of each asset in
 * /public/media/gallery/2024/ — the masonry grid uses these to size each
 * tile's aspect ratio up front (via `aspect-ratio` in CSS), so nothing
 * shifts on load and nothing gets stretched or cropped.
 */

export const GALLERY_CATEGORIES = ["Crowd", "Performances", "Food"] as const;

const CategorySchema = z.enum(GALLERY_CATEGORIES);

const GalleryItemSchema = z.object({
  id: z.string(),
  type: z.enum(["photo", "video"]),
  title: z.string(),
  year: z.literal("2024"),
  category: CategorySchema,
  alt: z.string(),
  width: z.number(),
  height: z.number(),
  /** Photos only — the full-resolution image. */
  image: z.string().optional(),
  /** Videos only — the playable source. */
  video: z.string().optional(),
  /** Videos only — the paused-frame poster shown in the grid. */
  thumbnail: z.string().optional(),
  /** Videos only — display duration, e.g. "0:15". */
  duration: z.string().optional(),
});

const BASE = "/media/gallery/2024";

export const galleryItems = z.array(GalleryItemSchema).parse([
  // ---------- Photos ----------
  {
    id: "friends-group",
    type: "photo",
    title: "Friends at the Festival",
    year: "2024",
    category: "Crowd",
    alt: "Six friends sitting together on the grass at the festival",
    image: `${BASE}/friends-group.jpg`,
    width: 1024,
    height: 603,
  },
  {
    id: "family-portrait",
    type: "photo",
    title: "A Family Outing",
    year: "2024",
    category: "Crowd",
    alt: "Three generations of a family posing together at the festival",
    image: `${BASE}/family-portrait.jpg`,
    width: 1024,
    height: 775,
  },
  {
    id: "crowd-candid",
    type: "photo",
    title: "Wandering the Grounds",
    year: "2024",
    category: "Crowd",
    alt: "Festival-goers walking across the grounds past the vendor tents",
    image: `${BASE}/crowd-candid.jpg`,
    width: 1920,
    height: 1280,
  },
  {
    id: "crowd-field",
    type: "photo",
    title: "The Festival Grounds",
    year: "2024",
    category: "Crowd",
    alt: "A large crowd gathered across the open festival field",
    image: `${BASE}/crowd-field.jpg`,
    width: 1920,
    height: 1280,
  },
  {
    id: "crowd-sunset",
    type: "photo",
    title: "Golden Hour Crowd",
    year: "2024",
    category: "Crowd",
    alt: "Visitors seated on the grass watching the stage at sunset",
    image: `${BASE}/crowd-sunset.jpg`,
    width: 1920,
    height: 1280,
  },
  {
    id: "stage-dancers",
    type: "photo",
    title: "On Stage",
    year: "2024",
    category: "Performances",
    alt: "Two dancers mid-performance in traditional dress on the festival stage",
    image: `${BASE}/stage-dancers.jpg`,
    width: 1200,
    height: 1600,
  },

  // ---------- Videos ----------
  {
    id: "dance-performance-1",
    type: "video",
    title: "Live Dance Performance",
    year: "2024",
    category: "Performances",
    alt: "Dancers performing on the main stage as the crowd watches",
    video: `${BASE}/dance-performance-1.mp4`,
    thumbnail: `${BASE}/dance-performance-1-poster.jpg`,
    duration: "0:15",
    width: 1280,
    height: 720,
  },
  {
    id: "bhangra-performance",
    type: "video",
    title: "Bhangra on the Main Stage",
    year: "2024",
    category: "Performances",
    alt: "Bhangra dancers in white and orange performing on stage",
    video: `${BASE}/bhangra-performance.mp4`,
    thumbnail: `${BASE}/bhangra-performance-poster.jpg`,
    duration: "0:12",
    width: 1280,
    height: 720,
  },
  {
    id: "dhol-procession",
    type: "video",
    title: "Dhol Procession",
    year: "2024",
    category: "Performances",
    alt: "A dhol drum procession with flags moving through the crowd",
    video: `${BASE}/dhol-procession.mp4`,
    thumbnail: `${BASE}/dhol-procession-poster.jpg`,
    duration: "0:13",
    width: 1280,
    height: 720,
  },
  {
    id: "festival-grounds-video",
    type: "video",
    title: "Festival Atmosphere",
    year: "2024",
    category: "Crowd",
    alt: "Wide view of the festival grounds with vendor tents and seated visitors",
    video: `${BASE}/festival-grounds.mp4`,
    thumbnail: `${BASE}/festival-grounds-poster.jpg`,
    duration: "0:05",
    width: 1280,
    height: 720,
  },
  {
    id: "food-vendor-serving",
    type: "video",
    title: "Fresh From the Stall",
    year: "2024",
    category: "Food",
    alt: "A vendor serving a freshly prepared drink to a festival visitor",
    video: `${BASE}/food-vendor-serving.mp4`,
    thumbnail: `${BASE}/food-vendor-serving-poster.jpg`,
    duration: "0:16",
    width: 1280,
    height: 720,
  },
  {
    id: "roti-griddle",
    type: "video",
    title: "Made Fresh on the Griddle",
    year: "2024",
    category: "Food",
    alt: "Roti being cooked fresh on a large griddle at a food stall",
    video: `${BASE}/roti-griddle.mp4`,
    thumbnail: `${BASE}/roti-griddle-poster.jpg`,
    duration: "0:39",
    width: 720,
    height: 1280,
  },
]);

export type GalleryItem = (typeof galleryItems)[number];
