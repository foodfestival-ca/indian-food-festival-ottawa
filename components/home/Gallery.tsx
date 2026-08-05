import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GalleryShowcase } from "@/components/gallery/GalleryShowcase";

/**
 * Legacy re-export.
 *
 * This component used to own the full year-grouped gallery grid, driven by
 * content/gallery.ts's old { src, poster, caption, feature, ... } shape. That
 * data file has been replaced with the real 2024 photo/video manifest
 * (content/gallery.ts's new { image, video, thumbnail, title, ... } shape),
 * and the grid UI itself was rebuilt as `components/gallery/
 * GalleryShowcase.tsx`, which /gallery now renders directly.
 *
 * Nothing currently imports `Gallery` from here (the dedicated Gallery page
 * renders `GalleryShowcase` directly, and it was never used on the
 * homepage). Kept — rather than deleted — only so it still compiles against
 * the new content shape instead of sitting broken, same as the equivalent
 * `components/home/Schedule.tsx` wrapper.
 */
export function Gallery({ className }: { className?: string } = {}) {
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
      </Container>
      <GalleryShowcase />
    </Section>
  );
}
