"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox, type LightboxItem } from "@/components/gallery/Lightbox";
import { cn } from "@/lib/cn";
import { galleryItems, GALLERY_YEARS } from "@/content/gallery";

const TYPE_FILTERS = ["All", "Photos", "Videos"] as const;
const YEAR_FILTERS = ["All Years", ...GALLERY_YEARS] as const;

/**
 * Filter chips + masonry grid + lightbox — the interactive core of the
 * /gallery page.
 *
 * Two independent filter rows — media type (All/Photos/Videos) and year
 * (All Years/2024/2025) — combine with AND logic, so "2025" + "Videos"
 * narrows straight to just the 2025 highlight reel. The year row is what
 * keeps 2024 and 2025 content distinguishable once they're mixed into one
 * grid, rather than only being able to tell them apart from the small
 * "2024"/"2025" tag the lightbox shows per item.
 *
 * Masonry is CSS `columns` (2/3/4 at mobile/tablet/desktop), not a JS
 * layout library: each tile is `break-inside-avoid` and sized by its real
 * `width`/`height` via `aspect-ratio`, so the natural variable-height
 * "photo wall" look falls out of the browser's own column-fill algorithm
 * with zero layout-shift and zero extra JS.
 *
 * Video tiles render their `thumbnail` with a play badge and duration chip
 * instead of autoplaying; opening the lightbox (existing
 * components/gallery/Lightbox.tsx, unchanged) is what actually plays them.
 */
export function GalleryShowcase() {
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_FILTERS)[number]>("All");
  const [yearFilter, setYearFilter] = useState<(typeof YEAR_FILTERS)[number]>("All Years");
  const [index, setIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const filtered = useMemo(() => {
    return galleryItems.filter((i) => {
      if (typeFilter === "Photos" && i.type !== "photo") return false;
      if (typeFilter === "Videos" && i.type !== "video") return false;
      if (yearFilter !== "All Years" && i.year !== yearFilter) return false;
      return true;
    });
  }, [typeFilter, yearFilter]);

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      filtered.map((item) => ({
        id: item.id,
        type: item.type === "video" ? "video" : "image",
        src: item.type === "video" ? item.video! : item.image!,
        poster: item.thumbnail,
        alt: item.alt,
        caption: item.title,
        meta: item.year,
      })),
    [filtered]
  );

  return (
    <Container>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery by type">
        {TYPE_FILTERS.map((f) => {
          const active = typeFilter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setTypeFilter(f)}
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

      <div className="mt-3 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery by year">
        {YEAR_FILTERS.map((y) => {
          const active = yearFilter === y;
          return (
            <button
              key={y}
              type="button"
              onClick={() => setYearFilter(y)}
              aria-pressed={active}
              className={cn(
                "tap-target rounded-[var(--radius-pill)] border px-4 text-[length:var(--text-sm)] font-medium transition-colors",
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

      <div className="mt-8 columns-2 gap-4 sm:columns-3 xl:columns-4">
        {filtered.map((item, i) => (
          <Reveal
            key={item.id}
            preset="fadeIn"
            delay={reduced ? 0 : Math.min(i * 0.03, 0.3)}
            className="mb-4 break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open ${item.type === "video" ? "video" : "photo"}: ${item.title}`}
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
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 grid place-items-center"
                  >
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
          </Reveal>
        ))}
      </div>

      <Lightbox items={lightboxItems} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </Container>
  );
}
