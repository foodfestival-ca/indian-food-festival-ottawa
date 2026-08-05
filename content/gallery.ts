import { z } from "zod";

/**
 * ASSET MANIFEST — year-first, exactly as the gallery navigates.
 *
 * The gallery used to be a category-filtered grid (Highlights / Food /
 * Cultural Performances / Music / Dance / Kids Zone / Marketplace /
 * Community / Videos, chosen via a row of filter chips). That's gone: the
 * page now just shows everything, grouped by the year it's actually
 * from — 2025, then 2024 — which is what a "photos and videos from
 * previous editions, plus what's coming" page should organize by. `category`
 * stays on each item as descriptive metadata (shown as a caption tag), it
 * just no longer drives a filter UI.
 *
 * ⚠️ PLACEHOLDER ENTRIES. Replace `src` paths with real festival photography
 * and video. File layout: /public/media/<category>/<name>.jpg|.mp4
 */

const ItemSchema = z.object({
  id: z.string(),
  type: z.enum(["image", "video"]),
  /** Descriptive tag only now (e.g. "Music", "Marketplace") — no longer a filter key. */
  category: z.string(),
  src: z.string(),
  /** Required for videos (the paused frame shown in the grid); optional for images. */
  poster: z.string().optional(),
  /** Real descriptive alt text. Never a filename. */
  alt: z.string(),
  caption: z.string(),
  year: z.enum(["2024", "2025"]),
  width: z.number(),
  height: z.number(),
  /** Feature items earn full-bleed or 2x grid placement. */
  feature: z.boolean().default(false),
});

export const galleryItems = z.array(ItemSchema).parse([]);

export type GalleryItem = z.infer<typeof ItemSchema>;
