"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCountdown } from "@/lib/useCountdown";
import { festival } from "@/content/festival";
import { Button } from "@/components/ui/Button";
import { GoldRule } from "@/components/ornament/Ornaments";

const SUB_UNITS = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

/**
 * Hero countdown — round 9, full rebuild.
 *
 * Every previous round of this component was built around
 * `public/media/hero/countdown-card.png` — a supplied illustration (arched
 * scalloped frame, twin peacocks, paisley, floral vines, a lotus base) used
 * as the card's entire visual background, with real HTML text positioned
 * on top of it inside a hand-measured "blank parchment" region. That whole
 * approach is gone as of this round, at the client's explicit direction:
 * no more artwork-as-background, no more masking/GrabCut pipeline to strip
 * its photographic backdrop, and no more percentage-based content well
 * whose alignment depended on exactly matching an image's pixel geometry
 * (the repeated source of the positioning bugs in every prior round).
 *
 * The card is now built entirely from HTML/CSS/SVG: a plain rounded
 * rectangle with a thin two-tone (gold outer / maroon inner) border, a
 * warm cream surface, a soft shadow, and four small rotated-square corner
 * marks as the only ornament — no illustration of any kind. `GoldRule`
 * (a thin gold line with a small central gem, already used as a divider
 * elsewhere on this site) is reused for the two dividers inside the card;
 * everything else is plain text laid out with normal block/grid flow, so
 * there is no fixed "well" for content to overflow or get clipped by —
 * the card's height is simply however tall its real content needs it to
 * be, and the three time units sit in a CSS grid (`grid-cols-3`), which
 * guarantees three equal-width columns and makes it structurally
 * impossible for the seconds column to be pushed off/clipped by its
 * neighbours the way it was in the old flex-row layout.
 *
 * `useCountdown()` and `festival` remain the only source for every
 * dynamic value (days/hours/minutes/seconds, dateLabel, venue.city) —
 * nothing is hardcoded, and neither `lib/useCountdown.ts` nor
 * `content/festival.ts` was touched. `c.ready` (false only until the
 * client's first tick — see useCountdown.ts) still gates real numbers vs
 * "--" placeholders, so there is no hydration mismatch and no incorrect
 * flash of a phase before the real one resolves.
 */
export function Countdown() {
  const c = useCountdown(festival.startsAt, festival.endsAt);
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[21rem] lg:max-w-[22rem]">
      {/* The only decoration on the card besides its border: four small
          gold diamond corner marks, restrained enough to never compete
          with the content. */}
      <span aria-hidden="true" className="absolute left-3 top-3 h-1.5 w-1.5 rotate-45 border border-[var(--color-gold)]/70 sm:left-4 sm:top-4" />
      <span aria-hidden="true" className="absolute right-3 top-3 h-1.5 w-1.5 rotate-45 border border-[var(--color-gold)]/70 sm:right-4 sm:top-4" />
      <span aria-hidden="true" className="absolute bottom-3 left-3 h-1.5 w-1.5 rotate-45 border border-[var(--color-gold)]/70 sm:bottom-4 sm:left-4" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 h-1.5 w-1.5 rotate-45 border border-[var(--color-gold)]/70 sm:bottom-4 sm:right-4" />

      {/* Outer sliver = the gold half of the double border; inner
          hairline = the maroon half — a 1.5px padded gradient frame
          instead of two stacked border rules, so the two colours read as
          one continuous edge rather than a visible gap between them. */}
      <div className="rounded-2xl bg-gradient-to-br from-[var(--color-gold)] via-[var(--color-gold)]/80 to-[var(--color-maroon)]/70 p-[1.5px] shadow-[0_20px_45px_-8px_rgba(42,26,24,0.35)]">
        <div className="rounded-[15px] border border-[var(--color-maroon)]/20 bg-[var(--color-cream)]/95 px-6 py-7 text-center backdrop-blur-sm sm:px-7 sm:py-8">
          {c.phase === "counting" && (
            <>
              <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-saffron-deep)] sm:text-[11px]">
                The Countdown Begins
              </p>

              <motion.span
                className="tabular mt-3 block font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-extrabold leading-none text-[var(--color-maroon)] sm:text-[length:var(--text-4xl)]"
                animate={reduced ? undefined : { opacity: [1, 0.85, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                {c.ready ? c.days : "--"}
              </motion.span>
              <span className="mt-1.5 block text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
                Days To Go
              </span>

              <GoldRule className="mx-auto mt-5 w-20 sm:w-24" />

              {/* `grid-cols-3` gives every unit an equal, hard column
                  width — the seconds column can never be squeezed or
                  clipped by its neighbours regardless of digit width. */}
              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {SUB_UNITS.map((u) => (
                  <div
                    key={u.key}
                    className="flex flex-col items-center rounded-lg border border-[var(--color-maroon)]/20 bg-white/40 py-2 sm:py-2.5"
                  >
                    <span
                      className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold leading-none text-[var(--color-maroon)] sm:text-[length:var(--text-xl)]"
                      /* Seconds must not be announced — a live region
                         ticking every second is unusable with a screen
                         reader. */
                      aria-hidden={u.key === "seconds" ? "true" : undefined}
                    >
                      {c.ready ? String(c[u.key]).padStart(2, "0") : "--"}
                    </span>
                    <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-muted)] sm:text-[9px]">
                      {u.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="sr-only-focusable">
                {c.ready ? `${c.days} days until the festival begins.` : ""}
              </p>

              <GoldRule className="mx-auto mt-5 w-20 sm:w-24" />

              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]/85 sm:text-[11px]">
                {festival.dateLabel} · {festival.venue.city}
              </p>
            </>
          )}

          {c.phase === "live" && (
            <>
              <span className="inline-flex items-center gap-2">
                <motion.span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full bg-[var(--color-emerald)]"
                  animate={reduced ? undefined : { opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="eyebrow text-[var(--color-emerald)]">Happening Now</span>
              </span>
              <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold uppercase leading-tight text-[var(--color-maroon)] sm:text-[length:var(--text-3xl)]">
                The Festival Is Happening Now!
              </p>
              <p className="mt-2 text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
                Come celebrate food, culture, music and community.
              </p>
              <GoldRule className="mx-auto mt-5 w-20 sm:w-24" />
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-muted)]/85">
                {festival.dateLabel} · {festival.venue.city}
              </p>
            </>
          )}

          {/* No date is guessed here — "Until Next Year" without a
              specific year avoids asserting a 2027 edition that isn't in
              the canonical festival data. */}
          {c.phase === "ended" && (
            <>
              <p className="eyebrow">Until Next Year</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold uppercase leading-tight text-[var(--color-maroon)] sm:text-[length:var(--text-3xl)]">
                Thank You For Celebrating With Us
              </p>
              <p className="mt-2 text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
                Relive the memories and explore the festival gallery.
              </p>
              <div className="mt-5">
                <Button href="/gallery" size="sm" variant="outline">
                  Explore Festival Gallery
                  <ArrowRight size={15} aria-hidden="true" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
