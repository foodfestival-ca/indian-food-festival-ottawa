import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScheduleShowcase } from "@/components/schedule/ScheduleShowcase";

/**
 * Legacy re-export.
 *
 * This component used to own the full day-tab timeline, driven by
 * content/schedule.ts's old { dayId, category, start, end, description,
 * stage } shape. That data file has been replaced with the real 2026
 * lineup transcribed from "Performance Schedule 2026.xlsx" — a different
 * shape ({ day, time, title, type, performer, group }) — and the timeline
 * UI itself was rebuilt as `components/schedule/ScheduleShowcase.tsx`,
 * which /schedule now renders directly.
 *
 * Nothing currently imports `Schedule` from here (the dedicated Schedule
 * page renders `ScheduleShowcase` directly, and it was never used on the
 * homepage). This file is kept — rather than deleted — only so it still
 * compiles against the new content shape instead of sitting broken; it
 * simply wraps the new showcase in the same `Section`/`SectionHeader`
 * scaffolding the old version used, in case something reaches for it again.
 */
export function Schedule({ className }: { className?: string } = {}) {
  return (
    <Section id="schedule" ground="cream-deep" labelledBy="schedule-heading" className={className}>
      <Container>
        <SectionHeader
          id="schedule-heading"
          eyebrow="Three Days"
          title="What's On, and When"
          accent="and When"
          intro="Gates open Friday afternoon and close Sunday evening. Here is how each day runs."
        />
      </Container>
      <ScheduleShowcase />
    </Section>
  );
}
