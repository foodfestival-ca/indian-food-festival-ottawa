import { festival } from "@/content/festival";
import type { ScheduleEvent } from "@/content/schedule";

/** Convert "2026-08-21T16:00:00-04:00" → "20260821T200000Z" (UTC basic format). */
function toIcsUtc(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** "5:15PM" → "17:15" (24h, zero-padded) — the sheet's times are 12h. */
function to24h(t: string): string {
  const m = t.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return "00:00";
  const [, hh, mm, ap] = m as unknown as [string, string, string, string];
  let h = parseInt(hh, 10) % 12;
  if (ap.toUpperCase() === "PM") h += 12;
  return `${String(h).padStart(2, "0")}:${mm}`;
}

/** "5:00PM - 5:15PM" → { start: "17:00", end: "17:15" } */
function parseTimeRange(time: string): { start: string; end: string } {
  const [s, e] = time.split("-").map((part) => part.trim());
  return { start: to24h(s ?? ""), end: to24h(e ?? s ?? "") };
}

function dayIsoFor(day: ScheduleEvent["day"], hhmm: string): string {
  const dateMap: Record<ScheduleEvent["day"], string> = {
    fri: "2026-08-21",
    sat: "2026-08-22",
    sun: "2026-08-23",
  };
  return `${dateMap[day]}T${hhmm}:00-04:00`;
}

function escapeIcs(text: string): string {
  return text.replace(/[\\;,]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
}

/** Single-event .ics. Used by the per-event add-to-calendar button. */
export function eventToIcs(event: ScheduleEvent): string {
  const { start: startHHMM, end: endHHMM } = parseTimeRange(event.time);
  const start = toIcsUtc(dayIsoFor(event.day, startHHMM));
  const end = toIcsUtc(dayIsoFor(event.day, endHHMM));
  const byline = [event.performer, event.group].filter(Boolean).join(" — ");

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
    ...(byline ? [`DESCRIPTION:${escapeIcs(byline)}`] : []),
    `LOCATION:${escapeIcs(`${festival.venue.name}, Ottawa`)}`,
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
