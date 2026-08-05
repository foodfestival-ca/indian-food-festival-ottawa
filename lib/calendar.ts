import { festival } from "@/content/festival";
import type { ScheduleEvent } from "@/content/schedule";

/** Convert "2026-08-21T16:00:00-04:00" → "20260821T200000Z" (UTC basic format). */
function toIcsUtc(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function dayIsoFor(dayId: ScheduleEvent["dayId"], hhmm: string): string {
  const day = festival.days.find((d) => d.id === dayId);
  const dateMap: Record<string, string> = {
    fri: "2026-08-21",
    sat: "2026-08-22",
    sun: "2026-08-23",
  };
  const date = dateMap[dayId] ?? dateMap.fri!;
  void day;
  return `${date}T${hhmm}:00-04:00`;
}

function escapeIcs(text: string): string {
  return text.replace(/[\\;,]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
}

/** Single-event .ics. Used by the per-event add-to-calendar button. */
export function eventToIcs(event: ScheduleEvent): string {
  const start = toIcsUtc(dayIsoFor(event.dayId, event.start));
  const end = toIcsUtc(dayIsoFor(event.dayId, event.end));

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Indian Food Festival of Ottawa//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@indianfoodfestival.ca`,
    `DTSTAMP:${toIcsUtc(new Date().toISOString())}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(`${event.stage}, ${festival.venue.name}, Ottawa`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Whole-festival .ics for the hero "Add to Calendar" affordance. */
export function festivalToIcs(): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Indian Food Festival of Ottawa//EN",
    "BEGIN:VEVENT",
    "UID:iffo-2026@indianfoodfestival.ca",
    `DTSTAMP:${toIcsUtc(new Date().toISOString())}`,
    `DTSTART:${toIcsUtc(festival.startsAt)}`,
    `DTEND:${toIcsUtc(festival.endsAt)}`,
    `SUMMARY:${escapeIcs(festival.name)} ${festival.dateLabel}`,
    `DESCRIPTION:${escapeIcs(`${festival.subheading}. ${festival.admission}.`)}`,
    `LOCATION:${escapeIcs(`${festival.venue.name}, Ottawa, ON`)}`,
    `URL:${festival.organizer.url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
