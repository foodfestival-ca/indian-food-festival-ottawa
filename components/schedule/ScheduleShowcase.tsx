"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { festival } from "@/content/festival";
import { scheduleEvents, SCHEDULE_TYPES } from "@/content/schedule";
import { EventCard } from "@/components/schedule/EventCard";

const FILTERS = ["All", ...SCHEDULE_TYPES] as const;

/**
 * Day tabs + search + type filter chips + the performance list — the
 * interactive core of the /schedule page. Hero (above) and any static copy
 * live directly in app/schedule/page.tsx as a Server Component; only the
 * parts that need state are client-side, same split used on /vendor.
 */
export function ScheduleShowcase() {
  const [activeDay, setActiveDay] = useState(festival.days[0]!.id as "fri" | "sat" | "sun");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const reduced = useReducedMotion();

  const day = festival.days.find((d) => d.id === activeDay)!;

  const events = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scheduleEvents.filter((e) => {
      if (e.day !== activeDay) return false;
      if (filter !== "All" && e.type !== filter) return false;
      if (q.length === 0) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        (e.performer?.toLowerCase().includes(q) ?? false) ||
        (e.group?.toLowerCase().includes(q) ?? false) ||
        (e.type?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [activeDay, filter, query]);

  return (
    <Container className="!max-w-[52rem]">
      {/* Day tabs */}
      <Reveal>
        <div
          role="tablist"
          aria-label="Festival days"
          className="mx-auto flex max-w-[30rem] gap-2"
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
                onClick={() => setActiveDay(d.id as "fri" | "sat" | "sun")}
                className={cn(
                  "relative min-h-[var(--touch-min)] flex-1 rounded-[var(--radius-pill)] px-4 py-2.5 text-center transition-colors",
                  active ? "text-[var(--color-cream)]" : "text-[var(--color-ink)] hover:bg-white/60"
                )}
              >
                {active && (
                  <motion.span
                    layoutId={reduced ? undefined : "schedule-day-pill"}
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

      {/* Search */}
      <div className="mx-auto mt-8 max-w-[28rem]">
        <label htmlFor="schedule-search" className="sr-only-focusable">
          Search performances, performers or groups
        </label>
        <div className="relative">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]/60"
          />
          <input
            id="schedule-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search performances, performers or groups..."
            className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white py-3 pl-11 pr-4 text-[length:var(--text-sm)] text-[var(--color-ink)] shadow-[var(--shadow-sm)] outline-none transition-shadow placeholder:text-[var(--color-ink-muted)]/60 focus-visible:shadow-[var(--shadow-md)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-maroon)]"
          />
        </div>
      </div>

      {/* Type filter chips */}
      <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by performance type">
        {FILTERS.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={isActive}
              className={cn(
                "tap-target rounded-[var(--radius-pill)] px-4 text-[length:var(--text-sm)] font-medium transition-colors",
                "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-maroon)]",
                isActive
                  ? "bg-[var(--color-maroon)] text-[var(--color-cream)]"
                  : "bg-white text-[var(--color-ink)] shadow-[var(--shadow-sm)] hover:bg-[var(--color-cream-deep)]"
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* List */}
      <div role="tabpanel" id={`panel-${activeDay}`} aria-labelledby={`tab-${activeDay}`} className="mt-8">
        <p className="text-center text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-[var(--color-ink-muted)]/75">
          {day.weekday} · {day.hoursLabel}
        </p>

        {events.length > 0 ? (
          <ol className="mt-5 space-y-2.5">
            {events.map((event, i) => (
              <Reveal as="li" key={event.id} delay={Math.min(i * 0.02, 0.3)}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </ol>
        ) : (
          <p className="mt-16 text-center text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
            No performances match your search or filter on {day.weekday}.
          </p>
        )}
      </div>

      <p className="mt-8 text-center text-[length:var(--text-xs)] text-[var(--color-ink-muted)]">
        Programme subject to change. Final line-up announced closer to the festival.
      </p>
    </Container>
  );
}
