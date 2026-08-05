import type { ScheduleEvent } from "@/content/schedule";
import { scheduleTypeMeta } from "@/content/schedule";

/**
 * One performance row.
 *
 * A compact horizontal agenda row rather than a photo-card: time, title and
 * performer read left-to-right on a single line at desktop width so many
 * events are visible without scrolling; wraps to a stacked layout on mobile.
 * Any field the spreadsheet left blank (type, performer, group) is simply
 * not rendered — no empty labels.
 */
export function EventCard({ event }: { event: ScheduleEvent }) {
  const meta = event.type ? scheduleTypeMeta[event.type] : undefined;
  const byline = [event.performer, event.group].filter(Boolean).join(" · ");

  return (
    <article className="rounded-[16px] border border-[var(--color-border)] bg-white px-4 py-3.5 shadow-[var(--shadow-sm)] transition-shadow duration-200 hover:shadow-[var(--shadow-md)] sm:px-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
        <p className="tabular shrink-0 text-[length:var(--text-sm)] font-semibold text-[var(--color-maroon)] sm:w-[10.5rem]">
          {event.time}
        </p>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold leading-tight text-[var(--color-ink)]">
              {event.title}
            </h3>
            {meta && (
              <span
                className="inline-flex items-center rounded-[var(--radius-pill)] px-2 py-0.5 text-[length:var(--text-xs)] font-medium"
                style={{ backgroundColor: `color-mix(in srgb, ${meta.color} 12%, transparent)`, color: meta.color }}
              >
                {event.type}
              </span>
            )}
          </div>
          {byline && (
            <p className="mt-0.5 truncate text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">{byline}</p>
          )}
        </div>
      </div>
    </article>
  );
}
