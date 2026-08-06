import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { MandalaCorner, GoldRule } from "@/components/ornament/Ornaments";
import { GalleryShowcase } from "@/components/gallery/GalleryShowcase";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gallery",
  description:
    "Relive Navatara's Indian Food Festival — real photos and video from 2024 and 2025, as we prepare for an even bigger 2026.",
  path: "/gallery",
});

/**
 * Gallery — replaces the old placeholder grid with real 2024 AND 2025
 * photography and video (content/gallery.ts), driven by content only: no
 * gallery card is hardcoded in JSX.
 *
 * The hero/closing copy below was written for 2024 only, then a 2025 batch
 * was added on top with an explicit ask to keep the two years
 * distinguishable rather than picking one. Rather than pin the page to
 * whichever year was uploaded most recently, the copy here now speaks to
 * both, and GalleryShowcase carries an explicit Year filter (All Years /
 * 2024 / 2025) plus a small year tag on every tile — so "differentiate
 * both" is answered structurally, not just in the closing line.
 *
 * Structure:
 *  - Hero (this file, Server Component, static) — maroon ground, matching
 *    the dark-hero treatment this route already had (Nav.tsx's
 *    DARK_HERO_ROUTES has included "/gallery" since the multi-page
 *    conversion, so the nav inverts to cream text expecting a dark section
 *    right under it — this hero has to stay maroon for that to still look
 *    correct, not a free colour choice).
 *  - GalleryShowcase (client) — Photos/Videos filter, Year filter, masonry
 *    grid, lightbox.
 *  - Closing CTA (this file, static) — cream ground, so the Thali rule
 *    holds against the maroon above it.
 *
 * The wrapping div keeps the same maroon background as the hero, same
 * reasoning as the previous version of this page: a transparent gap here
 * would show a strip of cream behind the transparent dark-mode nav.
 */
export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />

      <div className="bg-[var(--color-maroon)]" style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top))" }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-[var(--color-maroon)] text-[var(--color-cream)]"
          style={{ paddingTop: "var(--space-block)", paddingBottom: "var(--space-block)" }}
        >
          <MandalaCorner className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 text-[var(--color-gold)] opacity-[0.08] lg:h-96 lg:w-96" />
          <Container className="relative text-center">
            <Reveal>
              <p className="eyebrow text-[var(--color-gold-soft)]">Gallery</p>
              <GoldRule className="mx-auto mt-3 mb-6 max-w-[12rem]" />
              <h1 className="mx-auto max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-extrabold leading-[var(--leading-display)]">
                Relive the Festival
              </h1>
              <p className="mx-auto mt-3 max-w-[36ch] font-[family-name:var(--font-display)] text-[length:var(--text-xl)] italic text-[var(--color-gold)]">
                Moments From Navatara&rsquo;s Indian Food Festival
              </p>
              <p className="mx-auto mt-6 max-w-[56ch] text-[length:var(--text-lg)] leading-[var(--leading-body)] text-[var(--color-cream)]/80">
                Experience the colours, culture, music, food and unforgettable memories from 2024 and 2025.
                Browse through our favourite moments as we prepare for an even bigger celebration in 2026.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Showcase — filters + masonry grid + lightbox */}
        <Section id="gallery" ground="maroon" labelledBy="gallery-heading" cv={false}>
          <h2 id="gallery-heading" className="sr-only-focusable">
            2024 and 2025 photo and video gallery
          </h2>
          <GalleryShowcase />
        </Section>

        {/* Closing CTA */}
        <Section id="gallery-closing" ground="cream" labelledBy="gallery-closing-heading">
          <Container>
            <Reveal className="mx-auto max-w-[42rem] text-center">
              <h2
                id="gallery-closing-heading"
                className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-bold text-[var(--color-maroon)]"
              >
                Thank You for Making 2024 &amp; 2025 Unforgettable
              </h2>
              <p className="mt-4 text-[length:var(--text-base)] leading-[var(--leading-body)] text-[var(--color-ink-muted)]">
                Thousands of visitors, hundreds of performances, incredible food, and unforgettable memories.
                We&rsquo;re excited to welcome everyone back for an even bigger celebration in 2026.
              </p>
              <div className="mt-8">
                <Button href="/passport" size="lg">
                  See You in 2026
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </div>
            </Reveal>
          </Container>
        </Section>
      </div>
    </>
  );
}
