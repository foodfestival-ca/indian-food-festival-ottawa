"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox, type LightboxItem } from "@/components/gallery/Lightbox";
import { cn } from "@/lib/cn";
import { galleryItems } from "@/content/gallery";

const TYPE_FILTERS = ["All", "Photos", "Videos"] as const;

/**
 * Available festival years, newest first — derived from the data itself
 * (every distinct `year` value actually present in `galleryItems`), not a
 * hardcoded list. Add a 2026 batch to content/gallery.ts and this array
 * picks it up automatically, sorted ahead of 2025 and 2024 with no code
 * change needed here.
 */
const YEARS = Array.from(new Set(galleryItems.map((item) => item.year))).sort(
  (a, b) => Number(b) - Number(a)
);

/**
 * Filter chips + masonry grid + lightbox — the interactive core of the
 * /gallery page.
 *
 * Year is a hard partition, not a toggleable filter: exactly one year is
 * ever selected (defaulting to the newest, `YEARS[0]`), and the grid only
 * ever shows that year's media — 2024 and 2025 content is never mixed in
 * the same view. There is deliberately no "All Years" option. The Photos/
 * Videos row is a separate, ordinary filter that narrows further within
 * whichever year is selected.
 *
 * Masonry is CSS `columns` (2/3/4 at mobile/tablet/desktop), not a JS
 * layout library: each tile is `break-inside-avoid` and sized by its real
 * `width`/`height` via `aspect-ratio`, so the natural variable-height
 * "photo wall" look falls out of the browser's own column-fill algorithm
 * with zero layout-shift and zero extra JS.
 *
 * Video tiles never open the lightbox. They render their `thumbnail` with a
 * play badge and duration chip; clicking that swaps the poster for a real
 * inline `<video controls>` in that same card, at the same size, in the
 * masonry grid — see `playingId` below. The lightbox (existing
 * components/gallery/Lightbox.tsx, unchanged) only ever shows photos.
 */
export function GalleryShowcase() {
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_FILTERS)[number]>("All");
  const [year, setYear] = useState<(typeof YEARS)[number]>(YEARS[0]!);
  const [index, setIndex] = useState<number | null>(null);
  /** id of the one video currently playing inline in its card, if any. Only
   *  ever one at a time — setting this to a new id is itself what "pauses"
   *  whichever card was previously playing: that card's <video> element is
   *  only ever mounted while its id === playingId, so the moment this
   *  changes, the old element unmounts (and with it, its playback). */
  const [playingId, setPlayingId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const filtered = useMemo(() => {
    return galleryItems.filter((i) => {
      if (i.year !== year) return false;
      if (typeFilter === "Photos" && i.type !== "photo") return false;
      if (typeFilter === "Videos" && i.type !== "video") return false;
      return true;
    });
  }, [typeFilter, year]);

  // Lightbox is photos-only — videos never open it (they play inline in
  // their own card instead), so its index space is the photo subset, not
  // the full filtered list.
  const photoItems = useMemo(() => filtered.filter((i) => i.type === "photo"), [filtered]);

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      photoItems.map((item) => ({
        id: item.id,
        type: "image",
        src: item.image!,
        alt: item.alt,
        caption: item.title,
        meta: item.year,
      })),
    [photoItems]
  );

  return (
    <Container>
      {/* Year tabs — newest first, exactly one always selected. This is a
          hard partition (a different year's media is never in the DOM at
          the same time as this one), not a filter toggle, so it's rendered
          as tabs (role="tablist") rather than the pill-toggle group pattern
          the type filter below uses. */}
      <div role="tablist" aria-label="Festival year" className="flex flex-wrap justify-center gap-2">
        {YEARS.map((y) => {
          const active = year === y;
          return (
            <button
              key={y}
              type="button"
              role="tab"
              id={`gallery-year-tab-${y}`}
              aria-selected={active}
              aria-controls="gallery-year-panel"
              onClick={() => {
                setYear(y);
                setPlayingId(null);
              }}
              className={cn(
                "tap-target rounded-[var(--radius-pill)] border px-5 text-[length:var(--text-sm)] font-semibold transition-colors",
                "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]",
                active
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                  : "border-[var(--color-cream)]/20 text-[var(--color-cream)]/75 hover:bg-[var(--color-cream)]/10"
              )}
            >
              {y}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery by type">
        {TYPE_FILTERS.map((f) => {
          const active = typeFilter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => {
                setTypeFilter(f);
                setPlayingId(null);
              }}
              aria-pressed={active}
              className={cn(
                "tap-target rounded-[var(--radius-pill)] px-4 text-[length:var(--text-sm)] font-medium transition-colors",
                "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]",
                active
                  ? "bg-[var(--color-gold)] text-[var(--color-ink)]"
                  : "bg-[var(--color-cream)]/10 text-[var(--color-cream)] hover:bg-[var(--color-cream)]/18"
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div id="gallery-year-panel" role="tabpanel" aria-labelledby={`gallery-year-tab-${year}`} className="mt-8 columns-2 gap-4 sm:columns-3 xl:columns-4">
        {filtered.map((item, i) => {
          const isPlayingVideo = item.type === "video" && playingId === item.id;

          return (
            <Reveal
              key={item.id}
              preset="fadeIn"
              delay={reduced ? 0 : Math.min(i * 0.03, 0.3)}
              className="mb-4 break-inside-avoid"
            >
              {isPlayingVideo ? (
                // Playing state — the poster/button is replaced by a real
                // HTML5 <video> with native controls, still inside the same
                // card at the same size (no lightbox, no lightbox-triggered
                // zoom). `key` forces a fresh element per video id so the
                // browser never confuses one clip's playback with another's.
                <div
                  className="relative w-full overflow-hidden rounded-[18px] bg-[var(--color-ink)] shadow-[var(--shadow-md)]"
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                >
                  <video
                    key={item.id}
                    src={item.video}
                    poster={item.thumbnail}
                    controls
                    controlsList="nodownload"
                    autoPlay
                    playsInline
                    onEnded={() => setPlayingId(null)}
                    className="absolute inset-0 h-full w-full"
                  >
                    Sorry, your browser doesn&rsquo;t support embedded video.
                  </video>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (item.type === "video") {
                      setPlayingId(item.id);
                    } else {
                      setIndex(photoItems.findIndex((p) => p.id === item.id));
                    }
                  }}
                  aria-label={item.type === "video" ? `Play video: ${item.title}` : `Open photo: ${item.title}`}
                  className="group relative block w-full overflow-hidden rounded-[18px] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-[280ms] ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                >
                  <Image
                    src={item.type === "video" ? item.thumbnail! : item.image!}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />

                  <span
                    aria-hidden="true"
                    className="absolute left-2 top-2 rounded-[var(--radius-chip)] bg-[var(--color-ink)]/60 px-1.5 py-0.5 text-[length:var(--text-xs)] font-medium text-white"
                  >
                    {item.year}
                  </span>

                  {item.type === "video" && (
                    <>
                      <span aria-hidden="true" className="absolute inset-0 bg-[var(--color-ink)]/15" />
                      <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-cream)]/90 text-[var(--color-maroon)] shadow-[var(--shadow-sm)]">
                          <Play size={18} className="translate-x-0.5" />
                        </span>
                      </span>
                      {item.duration && (
                        <span
                          aria-hidden="true"
                          className="absolute right-2 top-2 rounded-[var(--radius-chip)] bg-[var(--color-ink)]/70 px-1.5 py-0.5 text-[length:var(--text-xs)] font-medium text-white"
                        >
                          {item.duration}
                        </span>
                      )}
                    </>
                  )}

                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-end bg-gradient-to-t from-[var(--color-ink)]/75 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <span className="text-[length:var(--text-xs)] font-medium text-white">{item.title}</span>
                  </span>
                </button>
              )}
            </Reveal>
          );
        })}
      </div>

      <Lightbox items={lightboxItems} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </Container>
  );
}
