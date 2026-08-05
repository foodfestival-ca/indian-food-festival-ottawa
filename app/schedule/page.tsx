import type { Metadata } from "next";
import { Section, Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { GoldRule, MandalaCorner } from "@/components/ornament/Ornaments";
import { Performances } from "@/components/home/Performances";
import { ScheduleShowcase } from "@/components/schedule/ScheduleShowcase";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Performance Schedule 2026",
  description:
    "The complete performance lineup for the Indian Food Festival of Ottawa 2026 — music, dance, workshops, cultural showcases and DJs across all three festival days.",
  path: "/schedule",
});

/**
 * Performance Schedule — replaces the old placeholder timeline with the real
 * 2026 lineup from "Performance Schedule 2026.xlsx" (content/schedule.ts).
 *
 * Structure:
 *  - Hero (this file, Server Component, static) — same pattern as the
 *    About/Vendors hero: MandalaCorner ornament, eyebrow, GoldRule, display
 *    title, italic subtitle, description.
 *  - ScheduleShowcase (client) — day tabs, search, type filter chips,
 *    performance list.
 *  - Performances (unchanged) — the stage-photography section that already
 *    lived on this page; not part of this request, left exactly as is.
 *    Its own ground is maroon, and ScheduleShowcase's Section below uses
 *    cream-deep, so the Thali rule still holds between them.
 *
 * `!pt-[var(--space-block)]` is not needed here — the hero is a plain
 * `<section>` with its own explicit `--space-block` padding (same approach
 * as the Vendors and About page heroes), not a `<Section>` carrying the
 * larger `section-y` padding that needed overriding on the old version of
 * this page.
 */
export default function SchedulePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Schedule", path: "/schedule" },
        ])}
      />

      <div style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top))" }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-[var(--color-cream)]"
          style={{ paddingTop: "var(--space-block)", paddingBottom: "var(--space-block)" }}
        >
          <MandalaCorner className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 text-[var(--color-gold)] opacity-[0.08] lg:h-96 lg:w-96" />
          <Container className="relative text-center">
            <Reveal>
              <p className="eyebrow">Festival Schedule</p>
              <GoldRule className="mx-auto mt-3 mb-6 max-w-[12rem]" />
              <h1 className="mx-auto max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-extrabold leading-[var(--leading-display)] text-[var(--color-maroon)]">
                Performance Schedule 2026
              </h1>
              <p className="mx-auto mt-3 max-w-[36ch] font-[family-name:var(--font-display)] text-[length:var(--text-xl)] italic text-[var(--color-saffron-deep)]">
                Three Days of Culture, Music &amp; Celebration
              </p>
              <p className="mx-auto mt-6 max-w-[56ch] text-[length:var(--text-lg)] leading-[var(--leading-body)] text-[var(--color-ink-muted)]">
                Browse the complete performance lineup for all three festival days. From music and dance
                performances to workshops, cultural showcases and DJs, discover what&rsquo;s happening
                throughout the weekend.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Showcase — day tabs, search, filters, list */}
        <Section id="schedule" ground="cream-deep" labelledBy="schedule-heading" cv={false}>
          <h2 id="schedule-heading" className="sr-only-focusable">
            Performance schedule
          </h2>
          <ScheduleShowcase />
        </Section>

        <Performances />
      </div>
    </>
  );
}
