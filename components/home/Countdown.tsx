"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCountdown } from "@/lib/useCountdown";
import { festival } from "@/content/festival";
import { Button } from "@/components/ui/Button";

const SUB_UNITS = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

// The card's own blank "content well" as a percentage box, measured off
// public/media/hero/countdown-card.png (982×1193): everything below the
// gold divider under the crown motif and above the peacock/lotus cluster is
// bare parchment, left blank in the artwork specifically so live content
// could be laid on top of it. All countdown text lives inside this one box
// — a single centred flex column, not a separate hand-measured position per
// line — so it re-centres itself automatically for whichever phase's
// content is currently shortest/tallest, and scales with the card at every
// breakpoint since it's percentage-based against the same box the image
// itself scales within.
const CONTENT_WELL = { left: 18, top: 18.5, width: 66, height: 70 };

/**
 * Hero countdown — round 6: the client supplied a second reference asset,
 * this time with the card's centre panel left intentionally blank (no
 * placeholder digits baked in at all). That removes the reason round 5
 * needed patch-and-overlay: there's nothing to hide anymore, so every line
 * of text — including "The Countdown Begins" and the date, which round 5
 * still left as picture pixels — is now real HTML laid directly onto bare
 * parchment inside `CONTENT_WELL`.
 *
 * WHAT'S IMAGE, WHAT'S REAL TEXT
 * The entire frame — arched/scalloped silhouette, maroon+gold double
 * border, crown motif, both side vines, both peacocks, and the bottom
 * lotus — is `public/media/hero/countdown-card.png`. As with round 5's
 * asset, this is a hand-masked crop of the client's supplied PNG (its own
 * photographic backdrop removed by tracing the card's silhouette in this
 * session — no background-removal model is reachable from this sandbox).
 * Every word of text on the card, for all three phases, is real DOM
 * content positioned inside `CONTENT_WELL` — none of it is part of the
 * picture.
 *
 * THREE PHASES, ONE IMAGE. The artwork has no phase-specific content baked
 * in (unlike round 5's asset), so the same frame is reused for all three
 * `useCountdown()` phases — "counting" shows the day/hour/minute/second
 * breakdown, "live" shows the in-progress message, "ended" shows the
 * thank-you + gallery CTA — all drawn inside the same blank well rather
 * than swapping frames or falling back to a different card design.
 *
 * `useCountdown()` and `festival` remain the only source for every dynamic
 * value (days/hours/minutes/seconds, dateLabel, venue.city) — nothing is
 * hardcoded, and neither `lib/useCountdown.ts` nor `content/festival.ts`
 * was touched. `c.ready` (false only until the client's first tick — see
 * useCountdown.ts) still gates real numbers vs "--" placeholders, so there
 * is no hydration mismatch and no incorrect flash of a phase before the
 * real one resolves.
 */
export function Countdown() {
  const c = useCountdown(festival.startsAt, festival.endsAt);
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem]">
      <div className="relative" style={{ aspectRatio: "982 / 1193" }}>
        <Image
          src="/media/hero/countdown-card.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 21rem, 19rem"
          className="object-contain drop-shadow-[0_18px_38px_rgba(42,26,24,0.3)]"
        />

        <div
          className="absolute flex flex-col items-center justify-center text-center"
          style={{
            left: `${CONTENT_WELL.left}%`,
            top: `${CONTENT_WELL.top}%`,
            width: `${CONTENT_WELL.width}%`,
            height: `${CONTENT_WELL.height}%`,
          }}
        >
          {c.phase === "counting" && (
            <>
              <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.22em] text-[var(--color-saffron-deep)] sm:text-[length:var(--text-sm)]">
                The Countdown Begins
              </p>

              <motion.span
                className="tabular mt-1 block font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-extrabold leading-none text-[var(--color-maroon)] sm:mt-2 sm:text-[length:var(--text-6xl)]"
                animate={reduced ? undefined : { opacity: [1, 0.85, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                {c.ready ? c.days : "--"}
              </motion.span>
              <span className="block text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                Days To Go
              </span>

              <div className="mt-3 flex items-start justify-center gap-4 border-t border-[var(--color-maroon)]/20 pt-3 sm:mt-4 sm:gap-6 sm:pt-4">
                {SUB_UNITS.map((u, i) => (
                  <div key={u.key} className="relative px-1.5 text-center sm:px-2">
                    <span
                      className="tabular block font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold leading-none text-[var(--color-maroon)] sm:text-[length:var(--text-3xl)]"
                      /* Seconds must not be announced — a live region
                         ticking every second is unusable with a screen
                         reader. */
                      aria-hidden={u.key === "seconds" ? "true" : undefined}
                    >
                      {c.ready ? String(c[u.key]).padStart(2, "0") : "--"}
                    </span>
                    <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-muted)] sm:text-[10px]">
                      {u.label}
                    </span>
                    {i < SUB_UNITS.length - 1 && (
                      <span aria-hidden="true" className="absolute -right-2 top-1 h-7 w-px bg-[var(--color-maroon)]/20 sm:-right-3" />
                    )}
                  </div>
                ))}
              </div>

              <p className="sr-only-focusable">
                {c.ready ? `${c.days} days until the festival begins.` : ""}
              </p>

              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-muted)]/85 sm:mt-4 sm:text-[11px]">
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
              <p className="mt-2 max-w-[85%] text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
                Come celebrate food, culture, music and community.
              </p>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-muted)]/85">
                {festival.dateLabel} · {festival.venue.city}
              </p>
            </>
          )}

          {/* No date is guessed here — "Thank You" without a specific year
              avoids asserting a 2027 edition that isn't in the canonical
              festival data. */}
          {c.phase === "ended" && (
            <>
              <p className="eyebrow">Until Next Year</p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold uppercase leading-tight text-[var(--color-maroon)] sm:text-[length:var(--text-3xl)]">
                Thank You For Celebrating With Us
              </p>
              <p className="mt-2 max-w-[85%] text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
                Relive the memories, explore the gallery and stay tuned for what&rsquo;s next.
              </p>
              <div className="mt-4">
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
