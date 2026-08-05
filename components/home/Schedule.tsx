"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Music, Disc3, Baby, Utensils, Store, Clock } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { festival } from "@/content/festival";
import { scheduleEvents, categoryMeta, type EventCategory } from "@/content/schedule";
import { cn } from "@/lib/cn";

const ICONS: Record<EventCategory, typeof Music> = {
  ceremony: Sparkles,
  performance: Music,
  dj: Disc3,
  kids: Baby,
  food: Utensils,
  marketplace: Store,
};

function to12h(hhmm: string): string {
  const [h = "0", m = "00"] = hhmm.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return m === "00" ? `${display} ${suffix}` : `${display}:${m} ${suffix}`;
}

/**
 * Day-wise timetable.
 *
 * MOBILE   day tabs scroll horizontally; events stack as full-width cards
 *          with the time above the title (a time gutter is unreadable at 360px)
 * TABLET+  time gutter on the left, timeline rail, cards to the right
 *
 * Category meaning is carried by icon + label as well as colour (WCAG 1.4.1).
 */
export function Schedule({ className }: { className?: string } = {}) {
  const [activeDay, setActiveDay] = useState(festival.days[0]!.id);
  const reduced = useReducedMotion();
  const events = scheduleEvents.filter((e) => e.dayId === activeDay);
  const day = festival.days.find((d) => d.id === activeDay)!;

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

        {/* Day tabs — horizontally scrollable on mobile */}
        <Reveal className="mt-10">
          <div
            role="tablist"
            aria-label="Festival days"
            className="mx-auto flex max-w-[38rem] gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
          >
            {festival.days.map((d) => {
              const active = d.id === activeDay;
              return (
                <button
                  key={d.id}
                  role="tab"
                  id={`tab-${d.id}`}
                  aria-selected={active}
                  aria-controls={`panel-${d.id}`}
                  onClick={() => setActiveDay(d.id)}
                  className={cn(
                    "relative min-h-[var(--touch-min)] flex-1 shrink-0 rounded-[var(--radius-pill)] px-4 py-2.5 text-center transition-colors",
                    active ? "text-[var(--color-cream)]" : "text-[var(--color-ink)] hover:bg-white/60"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={reduced ? undefined : "day-pill"}
                      className="absolute inset-0 rounded-[var(--radius-pill)] bg-[var(--color-maroon)]"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative block text-[length:var(--text-sm)] font-semibold">{d.weekday}</span>
                  <span className="relative block text-[length:var(--text-xs)] opacity-75">{d.dateLabel}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-5 flex items-center justify-center gap-2 text-[length:var(--text-sm)] font-medium text-[var(--color-ink-muted)]">
          <Clock size={15} className="text-[var(--color-saffron)]" aria-hidden="true" />
          {day.weekday} · {day.hoursLabel}
        </p>

        <div
          role="tabpanel"
          id={`panel-${activeDay}`}
          aria-labelledby={`tab-${activeDay}`}
          className="mx-auto mt-8 max-w-[52rem]"
        >
          <ol className="relative space-y-3 md:space-y-0">
            {/* Timeline rail — tablet and up only */}
            <span
              aria-hidden="true"
              className="absolute left-[7.5rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-[var(--color-gold)]/35 md:block"
            />

            {events.map((event) => {
              const meta = categoryMeta[event.category];
              const Icon = ICONS[event.category];
              return (
                <li key={event.id} className="relative md:flex md:gap-6 md:pb-6">
                  <div className="hidden w-[6.5rem] shrink-0 pt-4 text-right md:block">
                    <p className="tabular text-[length:var(--text-sm)] font-semibold text-[var(--color-maroon)]">
                      {to12h(event.start)}
                    </p>
                    <p className="tabular text-[length:var(--text-xs)] text-[var(--color-ink-muted)]">
                      {to12h(event.end)}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute left-[7.5rem] top-6 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[var(--color-gold)] ring-4 ring-[var(--color-cream-deep)] md:block"
                  />

                  <article className="flex-1 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-sm)] sm:p-5 md:ml-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-[var(--radius-chip)] px-2 py-1 text-[length:var(--text-xs)] font-medium"
                        style={{ backgroundColor: `color-mix(in srgb, ${meta.color} 12%, transparent)`, color: meta.color }}
                      >
                        <Icon size={12} aria-hidden="true" />
                        {meta.label}
                      </span>
                      <span className="tabular text-[length:var(--text-xs)] font-semibold text-[var(--color-maroon)] md:hidden">
                        {to12h(event.start)} – {to12h(event.end)}
                      </span>
                    </div>

                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold leading-tight text-[var(--color-maroon)]">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-ink-muted)]">
                      {event.description}
                    </p>
                    <p className="mt-2 text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]/75">
                      {event.stage}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="mt-8 text-center text-[length:var(--text-xs)] text-[var(--color-ink-muted)]">
          Programme subject to change. Final line-up announced closer to the festival.
        </p>
      </Container>
    </Section>
  );
}
