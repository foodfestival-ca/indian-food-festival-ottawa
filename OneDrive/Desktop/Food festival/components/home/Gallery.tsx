"use client";

import { useMemo, useState } from "react";
import { Expand, Play } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Lightbox, type LightboxItem } from "@/components/gallery/Lightbox";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { galleryItems, type GalleryItem } from "@/content/gallery";
import { cn } from "@/lib/cn";

type Item = LightboxItem & { year: string; type: "image" | "video" };

/** Placeholder tiles so the grid and lightbox are reviewable and shippable
 *  before photography arrives. Delete once gallery.ts is populated. */
const PLACEHOLDERS: Item[] = [
  { id: "p1", type: "image", src: "", alt: "Festival crowd enjoying the main stage", caption: "The Main Stage", meta: "2025", year: "2025" },
  { id: "p2", type: "image", src: "", alt: "A vendor serving street food", caption: "Street Food", meta: "2025", year: "2025" },
  { id: "p3", type: "video", src: "", poster: "", alt: "Classical dancer performing", caption: "Classical Dance", meta: "2025", year: "2025" },
  { id: "p4", type: "image", src: "", alt: "Musicians performing live", caption: "Live Music", meta: "2024", year: "2024" },
  { id: "p5", type: "image", src: "", alt: "Folk dancers in colourful dress", caption: "Folk Dance", meta: "2024", year: "2024" },
  { id: "p6", type: "video", src: "", poster: "", alt: "Children at craft activities", caption: "Kids Zone", meta: "2024", year: "2024" },
  { id: "p7", type: "image", src: "", alt: "Marketplace stall with textiles", caption: "The Marketplace", meta: "2024", year: "2024" },
  { id: "p8", type: "image", src: "", alt: "Families gathered on the festival grounds", caption: "Community", meta: "2024", year: "2024" },
];

/**
 * Gallery — a straight, year-grouped record of the festival, plus what's
 * coming next.
 *
 * This used to be a category-filtered grid (Highlights / Food / Music /
 * Dance / Kids Zone / Marketplace / Community / Videos, chosen via a row of
 * filter chips). The chips are gone: there isn't enough real photography yet
 * for a filter to do useful work, and grouping by the year something is
 * actually from is more honest for a "this is what it looks like" page than
 * a topic taxonomy. Each item now also carries its own `type` (image/video);
 * video tiles show a play badge in the grid and open in the lightbox as an
 * actual playable `<video>` (see components/gallery/Lightbox.tsx) rather than
 * a still frame.
 *
 * MOBILE   2 columns per year group
 * TABLET   3 columns
 * DESKTOP  4 columns, first tile in each year spans 2×2
 */
export function Gallery({ className }: { className?: string } = {}) {
  const [index, setIndex] = useState<number | null>(null);

  const hasRealItems = galleryItems.length > 0;

  const items: Item[] = useMemo(() => {
    if (!hasRealItems) return PLACEHOLDERS;
    return galleryItems.map((i: GalleryItem) => ({
      id: i.id,
      type: i.type,
      src: i.src,
      poster: i.poster,
      alt: i.alt,
      caption: i.caption,
      meta: `${i.category} · ${i.year}`,
      year: i.year,
    }));
  }, [hasRealItems]);

  // Newest year first; stable within a year (source order).
  const years = Array.from(new Set(items.map((i) => i.year))).sort((a, b) => Number(b) - Number(a));

  return (
    <Section id="gallery" ground="maroon" labelledBy="gallery-heading" className={className}>
      <Container>
        <SectionHeader
          id="gallery-heading"
          eyebrow="From Previous Years"
          title="This Is What It Looks Like"
          accent="What It Looks Like"
          intro="Three days, fifteen thousand people, and a park that stops being a park for a weekend."
          onDark
        />

        {years.map((year) => {
          const yearItems = items.filter((i) => i.year === year);
          return (
            <div key={year} className="mt-12 first:mt-9">
              <h3 className="eyebrow text-[var(--color-gold-soft)]">{year}</h3>
              <RevealGroup className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {yearItems.map((item, i) => {
                  const globalIndex = items.indexOf(item);
                  return (
                    <RevealItem key={item.id} className={cn(i === 0 && "lg:col-span-2 lg:row-span-2")}>
                      <button
                        type="button"
                        onClick={() => setIndex(globalIndex)}
                        className="group relative block h-full w-full overflow-hidden rounded-[var(--radius-card)]"
                        aria-label={`Open ${item.type === "video" ? "video" : "image"}: ${item.caption}`}
                      >
                        <MediaFrame
                          src={item.type === "video" ? item.poster ?? "" : item.src}
                          alt={item.alt}
                          label={item.caption}
                          rounded={false}
                          className={cn(
                            "h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]",
                            i === 0 ? "aspect-square lg:aspect-auto lg:h-full" : "aspect-square"
                          )}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />

                        {item.type === "video" && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 grid place-items-center bg-[var(--color-ink)]/15"
                          >
                            <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-cream)]/90 text-[var(--color-maroon)] shadow-[var(--shadow-sm)]">
                              <Play size={18} className="translate-x-0.5" />
                            </span>
                          </span>
                        )}

                        <span
                          aria-hidden="true"
                          className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-[var(--color-ink)]/75 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                        >
                          <span className="text-[length:var(--text-xs)] font-medium text-white">{item.caption}</span>
                          <Expand size={15} className="shrink-0 text-white" />
                        </span>
                      </button>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          );
        })}

        <p className="mt-10 text-center text-[length:var(--text-sm)] text-[var(--color-cream)]/60">
          {hasRealItems
            ? "2026 photos and videos land here as the festival happens — check back during and after the weekend."
            : "Photography and video from 2024 and 2025 coming soon — 2026 coverage lands here as the festival happens."}
        </p>
      </Container>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </Section>
  );
}
