"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCountdown } from "@/lib/useCountdown";
import { festival } from "@/content/festival";
import { TicketNotch, GoldRule } from "@/components/ornament/Ornaments";

/**
 * The frosted-glass countdown card — restored at the client's explicit
 * request ("preferred the previous timer style"). Translucent, blurred card
 * with ticket-stub notches on each side, sitting directly on the hero
 * photograph, all four units (Days/Hours/Minutes/Seconds) in one even
 * 4-across row.
 *
 * v2 — contrast fix (Phase 1 visual polish round). The original version of
 * this card had NO tint at all behind the blur (`background: transparent`,
 * just `backdrop-filter: blur()`), so its dark-maroon numbers sat directly
 * on whatever the blurred photograph happened to be at that spot — on the
 * live site that's a mix of dusk sky and a dark red market-stall banner,
 * which pushed the maroon-on-blur contrast well below anything readable.
 * Measured live: numbers were `rgb(107,16,40)` (--color-maroon) on an
 * effectively transparent card — contrast against the photo varied wildly
 * and was frequently under 2:1.
 *
 * Fix, per the client's explicit direction ("keep the frosted-glass ticket
 * concept, keep the notches, keep the Indian-festival character — just make
 * the numbers brighter and give the card a background that doesn't
 * disappear"):
 *   - The glass itself is now tinted with the festival's own maroon (a
 *     diagonal maroon → ink gradient at ~75-82% opacity, still blurred), so
 *     it reads as a consistent dark burgundy ticket regardless of what's
 *     behind it on the photograph — not a plain white/grey dashboard card.
 *   - Numbers switched from maroon to cream (--color-cream, warm ivory, not
 *     stark white) — cream-on-maroon-glass is ~12:1, comfortably AAA.
 *   - Unit labels (Days/Hours/Minutes/Seconds) and the "Festival Starts In"
 *     eyebrow switched from ink-muted/burgundy to gold-soft
 *     (--color-gold-soft) — ~9:1 against the tinted glass, and keeps the
 *     gold accent already used elsewhere in the Hero (GoldRule, admission
 *     chip) rather than introducing a new colour.
 *   - The divider ticks between units are now a soft gold-soft line instead
 *     of the pale tan `--color-border` (which was tuned for a light card and
 *     would have all but vanished against the new dark glass).
 *   - The "live" and "ended" phases got the same recolour pass for the same
 *     reason — they share this card and would have had the identical
 *     contrast problem the moment the festival opens or ends.
 *   - The old text-shadow was a compensating hack for the fully-transparent
 *     background; with an actually opaque-enough tinted glass behind it,
 *     it's replaced with a much smaller shadow used only for a touch of
 *     depth, not for legibility.
 *   - Added a soft drop shadow on the card itself so it reads as a surface
 *     sitting above the photograph rather than pasted flat onto it.
 *
 * Dynamic logic is untouched — same `useCountdown(festival.startsAt,
 * festival.endsAt)` hook, same 3-state (counting/live/ended) branching used
 * everywhere else on the site. `lib/useCountdown.ts` and
 * `content/festival.ts`'s dates were not modified.
 */
const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export function Countdown() {
  const c = useCountdown(festival.startsAt, festival.endsAt);
  const reduced = useReducedMotion();

  return (
    <div
      className="relative rounded-[var(--radius-card)] p-5 sm:p-7"
      style={{
        // v4 — client asked for the maroon tint gone entirely: fully
        // transparent glass again, blur only. Numbers/labels stay the v2
        // cream/gold-soft colours (not the original maroon) — that alone is
        // a big legibility improvement over the very first version even
        // with zero tint, since light text tolerates a busy blurred photo
        // far better than dark maroon text did. The one compensating change
        // versus v2/v3: the text-shadow below is strengthened (was a subtle
        // depth-only shadow while the tint was doing the contrast work; now
        // it's the main thing anchoring the text against whatever the
        // blurred photo is doing at that spot).
        //
        // v5 — root-cause fix for two live bug reports: mobile numbers
        // "extremely faded/washed out", desktop card failing to render at
        // all. `background: transparent` meant the card had ZERO visible
        // surface of its own — every bit of contrast depended on (a) the
        // `backdrop-filter` blur actually rendering, and (b) the blurred
        // photo underneath happening to be dark enough at that exact spot.
        // Neither is guaranteed: on mobile the hero photo behind the card is
        // often light (sky/clothing), so the blur alone doesn't darken it
        // enough for cream-on-cream text — that's the "washed out" report.
        // On desktop, Chromium/WebKit can fail to composite a descendant's
        // backdrop-filter at all when an ancestor's CSS transform is
        // animating (see Hero.tsx's v21 note, which removes that trigger on
        // the wrapping motion.div) — when that happens the card had
        // literally nothing behind the text, which read as "doesn't
        // render". Fix: a real, low-opacity maroon→ink tint sits behind the
        // blur again, just far subtler than the old v2/v3 tint (18-22%
        // here vs. ~75-82% before) — enough to guarantee a dark, consistent
        // backing for the cream/gold text no matter what's in the photo or
        // whether the blur itself renders, while still reading as
        // translucent glass rather than a solid card.
        background:
          "linear-gradient(135deg, rgba(107,16,40,0.22) 0%, rgba(42,26,24,0.20) 100%)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(232,217,168,0.32)",
        boxShadow: "0 12px 32px rgba(20,10,10,0.35)",
        textShadow: "0 1px 3px rgba(0,0,0,0.55), 0 2px 14px rgba(0,0,0,0.35)",
        // Forces this panel onto its own GPU compositing layer, independent
        // of the ancestor's entrance animation (Hero wraps this in a
        // motion.div that animates opacity + a y-transform on mount).
        // Without this, Chromium can fail to (re)sample the backdrop for the
        // blur while that ancestor transform is still in flight.
        transform: "translateZ(0)",
        willChange: "backdrop-filter",
      }}
    >
      <TicketNotch side="left" />
      <TicketNotch side="right" />

      {c.phase === "counting" && (
        <>
          <p className="text-center text-[length:var(--text-xs)] font-medium uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-gold-soft)]">
            Festival Starts In
          </p>
          <GoldRule className="mx-auto mt-3 mb-5 max-w-[11rem]" />
          {/* 4 across even at 360px: each cell is ~68px, comfortably legible. */}
          <div className="grid grid-cols-4 gap-1 sm:gap-3">
            {UNITS.map((u, i) => (
              <div key={u.key} className="relative text-center">
                <span
                  className="tabular block font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-bold leading-none text-[var(--color-cream)] sm:text-[length:var(--text-4xl)]"
                  /* Seconds must not be announced — a live region ticking
                     every second is unusable with a screen reader. */
                  aria-hidden={u.key === "seconds" ? "true" : undefined}
                >
                  {c.ready ? String(c[u.key]).padStart(2, "0") : "--"}
                </span>
                <span className="mt-1.5 block text-[length:var(--text-xs)] font-medium uppercase tracking-[0.14em] text-[var(--color-gold-soft)]">
                  {u.label}
                </span>
                {i < UNITS.length - 1 && (
                  <span aria-hidden="true" className="absolute -right-0.5 top-1 h-8 w-px bg-[var(--color-gold-soft)]/30 sm:-right-1.5" />
                )}
              </div>
            ))}
          </div>
          {/* Event timing — per-day opening hours, straight from
              `festival.days` (content/festival.ts), so it can never drift
              out of sync with the Schedule/Venue pages' own hours. Sits
              below the digits as a compact, wrapping row rather than a
              fourth grid row, so it degrades gracefully at narrow widths
              instead of forcing the card wider. */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 border-t border-[var(--color-gold-soft)]/20 pt-3.5">
            {festival.days.map((day, i) => (
              <span key={day.id} className="inline-flex items-center gap-2.5">
                {i > 0 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[var(--color-gold-soft)]/50" />
                )}
                <span className="whitespace-nowrap text-[length:var(--text-xs)] font-medium text-[var(--color-gold-soft)]/90">
                  {day.weekday.slice(0, 3)} {day.hoursLabel}
                </span>
              </span>
            ))}
          </div>

          <p className="sr-only-focusable">
            {c.ready ? `${c.days} days until the festival begins.` : ""}
          </p>
        </>
      )}

      {c.phase === "live" && (
        <div className="py-2 text-center">
          <span className="inline-flex items-center gap-2">
            <motion.span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full bg-[var(--color-emerald)]"
              animate={reduced ? undefined : { opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[length:var(--text-xs)] font-medium uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-cream)]">
              Happening Now
            </span>
          </span>
          <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-cream)]">
            We&rsquo;re open — come on down
          </p>
          <p className="mt-1.5 text-[length:var(--text-sm)] text-[var(--color-gold-soft)]">
            {festival.venue.name}, Nepean
          </p>
        </div>
      )}

      {c.phase === "ended" && (
        <div className="py-2 text-center">
          <p className="text-[length:var(--text-xs)] font-medium uppercase tracking-[var(--tracking-eyebrow)] text-[var(--color-gold-soft)]">
            Until Next Year
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-cream)]">
            Thank you, Ottawa.
          </p>
          <p className="mt-1.5 text-[length:var(--text-sm)] text-[var(--color-gold-soft)]">
            See you in 2027 — join the newsletter for first word on dates.
          </p>
        </div>
      )}
    </div>
  );
}
