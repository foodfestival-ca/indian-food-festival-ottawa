"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox, type LightboxItem } from "@/components/gallery/Lightbox";
import { GoldRule } from "@/components/ornament/Ornaments";
import { cn } from "@/lib/cn";
import { galleryItems } from "@/content/gallery";

const TYPE_FILTERS = ["All", "Photos", "Videos"] as const;

/** Sentinel tab id for the Preview Night tab — distinct from any real
 *  4-digit year string, so it can live in the same `selected` state as the
 *  year tabs without a separate union type or extra branching. */
const PREVIEW_NIGHT_TAB = "preview-night";

/** Sentinel tab id for Kids Zone — same trick as Preview Night above, but
 *  for content that isn't tied to any single festival year at all. Items
 *  are matched by `event === "kids-zone"` only; their `year` (if any) plays
 *  no part in whether they show up here. */
const KIDS_ZONE_TAB = "kids-zone";

/**
 * Festival years, newest first — derived from the data itself (every
 * distinct `year` value among `event: "festival"` items), not a hardcoded
 * list. Add a 2026 festival batch to content/gallery.ts and this array
 * picks it up automatically, sorted ahead of 2025 and 2024 with no code
 * change needed here. Preview Night items are deliberately excluded here:
 * they get their own single tab below, never a per-year festival tab.
 */
const FESTIVAL_YEARS = Array.from(
  new Set(
    galleryItems
      .filter((item) => item.event === "festival")
      // Festival items always carry a real `year` in practice — `year`
      // only goes unset on undated Kids Zone reference imagery, which is
      // never `event: "festival"`. This filter just proves that to
      // TypeScript, which otherwise sees `string | undefined` from the
      // schema's now-optional `year` field.
      .map((item) => item.year)
      .filter((year): year is string => Boolean(year))
  )
).sort((a, b) => Number(b) - Number(a));

const HAS_PREVIEW_NIGHT = galleryItems.some((item) => item.event === "preview-night");
const HAS_KIDS_ZONE = galleryItems.some((item) => item.event === "kids-zone");

/** Newest year among Preview Night items, for the banner title ("Preview
 *  Night 2026") — computed from data so a future "Preview Night 2027"
 *  batch relabels the banner automatically. */
const PREVIEW_NIGHT_YEAR = HAS_PREVIEW_NIGHT
  ? galleryItems
      .filter((item) => item.event === "preview-night")
      .map((item) => item.year)
      .sort((a, b) => Number(b) - Number(a))[0]
  : null;

/**
 * Tabs, in display order: Preview Night first (if any exists — unchanged,
 * so the default selected tab, `TABS[0]`, stays exactly what it was before
 * Kids Zone existed), then Kids Zone (an evergreen, year-agnostic
 * collection — placed ahead of the chronological years so it doesn't read
 * as "just another year"), then every festival year newest-first. This is
 * the one place that decides ordering — everything downstream (default
 * selection, filtering) just reads this array, so a future "Preview Night
 * 2027" or a new festival year slots in automatically with no other code
 * change.
 */
const TABS: string[] = [
  ...(HAS_PREVIEW_NIGHT ? [PREVIEW_NIGHT_TAB] : []),
  ...(HAS_KIDS_ZONE ? [KIDS_ZONE_TAB] : []),
  ...FESTIVAL_YEARS,
];

/**
 * Filter chips + masonry grid + lightbox — the interactive core of the
 * /gallery page.
 *
 * The tab bar is a hard partition, not a toggleable filter: exactly one tab
 * is ever selected (defaulting to `TABS[0]` — Preview Night when it exists,
 * otherwise the newest festival year), and the grid only ever shows that
 * tab's media. Festival years never mix with each other, and Preview Night
 * — a standalone event, not part of the festival itself — never mixes with
 * either. There is deliberately no "All" option. The Photos/Videos row is a
 * separate, ordinary filter that narrows further within whichever tab is
 * selected.
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
  const [tab, setTab] = useState<string>(TABS[0]!);
  const [index, setIndex] = useState<number | null>(null);
  /** id of the one video currently playing inline in its card, if any. Only
   *  ever one at a time — setting this to a new id is itself what "pauses"
   *  whichever card was previously playing: that card's <video> element is
   *  only ever mounted while its id === playingId, so the moment this
   *  changes, the old element unmounts (and with it, its playback). */
  const [playingId, setPlayingId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const isPreviewNight = tab === PREVIEW_NIGHT_TAB;
  const isKidsZone = tab === KIDS_ZONE_TAB;

  const filtered = useMemo(() => {
    return galleryItems.filter((i) => {
      if (isPreviewNight) {
        if (i.event !== "preview-night") return false;
      } else if (isKidsZone) {
        if (i.event !== "kids-zone") return false;
      } else {
        if (i.event !== "festival" || i.year !== tab) return false;
      }
      if (typeFilter === "Photos" && i.type !== "photo") return false;
      if (typeFilter === "Videos" && i.type !== "video") return false;
      return true;
    });
  }, [typeFilter, tab, isPreviewNight, isKidsZone]);

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
      {/* Tabs — newest first (Preview Night, then festival years),
          exactly one always selected. This is a hard partition (a
          different tab's media is never in the DOM at the same time as
          this one), not a filter toggle, so it's rendered as tabs
          (role="tablist") rather than the pill-toggle group pattern the
          type filter below uses. */}
      <div role="tablist" aria-label="Gallery event and year" className="flex flex-wrap justify-center gap-2">
        {TABS.map((t) => {
          const active = tab === t;
          const label =
            t === PREVIEW_NIGHT_TAB ? `Preview Night ${PREVIEW_NIGHT_YEAR}` : t === KIDS_ZONE_TAB ? "Kids Zone" : t;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              id={`gallery-tab-${t}`}
              aria-selected={active}
              aria-controls="gallery-panel"
              onClick={() => {
                setTab(t);
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
              {label}
            </button>
          );
        })}
      </div>

      {/* Preview Night banner — only shown while that tab is active. Reuses
          the same ornament (GoldRule) and type scale as the page's own
          hero so it reads as part of the same design language, not a new
          one. Purely additive: the type filter, masonry grid and lightbox
          below are completely unaffected by whether this renders. */}
      {isPreviewNight && (
        <Reveal className="mx-auto mt-8 max-w-[42rem] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--color-gold)] px-3 py-1 text-[length:var(--text-xs)] font-semibold uppercase tracking-wide text-[var(--color-ink)]">
            <Sparkles size={12} aria-hidden="true" />
            Exclusive Event
          </span>
          <h2 className="mx-auto mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-extrabold leading-tight text-[var(--color-cream)]">
            Preview Night {PREVIEW_NIGHT_YEAR}
          </h2>
          <GoldRule className="mx-auto mt-3 mb-4 max-w-[10rem]" />
          <p className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] italic text-[var(--color-gold)]">
            An exclusive evening celebrating the upcoming Indian Food Festival of Ottawa {PREVIEW_NIGHT_YEAR}.
          </p>
          <p className="mt-3 text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[var(--color-cream)]/80">
            An exclusive first look at the {PREVIEW_NIGHT_YEAR} Indian Food Festival of Ottawa.
          </p>
        </Reveal>
      )}

      {/* Kids Zone banner — same treatment as Preview Night above, kept
          deliberately short: this collection mixes real photos from past
          festivals with reference imagery for planned activities, so the
          copy stays general rather than asserting anything specific about
          any one image (each card's own caption/alt text carries that). */}
      {isKidsZone && (
        <Reveal className="mx-auto mt-8 max-w-[42rem] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--color-gold)] px-3 py-1 text-[length:var(--text-xs)] font-semibold uppercase tracking-wide text-[var(--color-ink)]">
            <Sparkles size={12} aria-hidden="true" />
            For Our Youngest Guests
          </span>
          <h2 className="mx-auto mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-extrabold leading-tight text-[var(--color-cream)]">
            Kids Zone
          </h2>
          <GoldRule className="mx-auto mt-3 mb-4 max-w-[10rem]" />
          <p className="mt-3 text-[length:var(--text-sm)] leading-[var(--leading-body)] text-[var(--color-cream)]/80">
            A dedicated space for kids and families — face painting, crafts, and activities, across every edition of the festival.
          </p>
        </Reveal>
      )}

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

      <div id="gallery-panel" role="tabpanel" aria-labelledby={`gallery-tab-${tab}`} className="mt-8 columns-2 gap-4 sm:columns-3 xl:columns-4">
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

                  {/* Kids Zone's promotional/reference entries have no
                      `year` (they aren't dated photos — see the schema note
                      in content/gallery.ts), so this chip only renders when
                      one is actually present rather than showing "undefined". */}
                  {item.year && (
                    <span
                      aria-hidden="true"
                      className="absolute left-2 top-2 rounded-[var(--radius-chip)] bg-[var(--color-ink)]/60 px-1.5 py-0.5 text-[length:var(--text-xs)] font-medium text-white"
                    >
                      {item.year}
                    </span>
                  )}

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
