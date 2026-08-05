import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { vendorHighlights, vendorsClosing } from "@/content/vendors";

/**
 * "A Culinary Journey Across India" — closing section, from the document's
 * summary list. Server Component: purely static, no state needed.
 */
export function VendorHighlights() {
  return (
    <Container>
      <SectionHeader
        id="vendor-highlights-heading"
        eyebrow="What's on Offer"
        title="A Culinary Journey Across India"
        accent="Across India"
      />

      <RevealGroup className="mx-auto mt-12 grid max-w-[64rem] grid-cols-2 gap-4 sm:grid-cols-3">
        {vendorHighlights.map((h) => (
          <RevealItem key={h.label}>
            <div className="flex h-full flex-col items-center gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5 text-center shadow-[var(--shadow-sm)]">
              <span aria-hidden="true" className="text-[length:var(--text-3xl)] leading-none">
                {h.emoji}
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-sm)] font-bold leading-snug text-[var(--color-maroon)]">
                {h.label}
              </h3>
              <p className="text-[length:var(--text-xs)] leading-relaxed text-[var(--color-ink-muted)]">
                {h.detail}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mx-auto mt-10 max-w-[42rem] text-center">
        <p className="text-[length:var(--text-base)] leading-[var(--leading-body)] text-[var(--color-ink-muted)]">
          {vendorsClosing}
        </p>
      </Reveal>
    </Container>
  );
}
