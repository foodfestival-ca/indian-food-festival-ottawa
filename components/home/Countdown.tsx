"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCountdown } from "@/lib/useCountdown";
import { festival } from "@/content/festival";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { TicketNotch, GoldRule, MandalaCorner, CornerFlourish } from "@/components/ornament/Ornaments";

const CORNERS = [
  "absolute left-2 top-2 text-[var(--color-gold)]",
  "absolute right-2 top-2 -scale-x-100 text-[var(--color-gold)]",
  "absolute bottom-2 left-2 -scale-y-100 text-[var(--color-gold)]",
  "absolute bottom-2 right-2 -scale-x-100 -scale-y-100 text-[var(--color-gold)]",
] as const;

const SUB_UNITS = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

/**
 * Hero countdown — redesigned as a compact festival-ticket-style overlay
 * rather than a large glassmorphism panel.
 *
 * Two things changed on purpose from the plain-card version this replaced:
 *  1. Footprint: capped to `max-w-[18rem]`/`20rem` (was unconstrained at
 *     `lg`, filling most of its grid column) so more of the hero artwork
 *     stays visible around it. Hero.tsx separately moved this card toward
 *     the bottom of its column (`lg:self-end`) so it sits over the calmer
 *     lower part of the scene rather than the arch/skyline band.
 *  2. Hierarchy: "Days" is now the single visual focal point (large
 *     display-face number, own line) with Hours/Minutes/Seconds demoted to
 *     a smaller supporting row underneath, plus a date/location line sourced
 *     from `festival` — closer to a printed event ticket than four
 *     equal-weight digital-clock cells.
 *
 * Surface: a warm cream-tinted translucent panel (not stark glass), a
 * double-line gold border (an outer hairline on the card itself plus a
 * second inset rule a few pixels in — the printed-invitation cue, not a
 * single flat edge), four small paisley corner flourishes, and a
 * low-opacity MandalaCorner watermark centered behind the numbers —
 * decorative only (aria-hidden), never strong enough to compete with the
 * text sitting on top of it. Same backdrop-filter-on-its-own-layer fix as
 * before (see the `transform`/`willChange` below) so the blur doesn't lag
 * behind the ancestor's entrance transform in Chromium.
 */
export function Countdown() {
  const c = useCountdown(festival.startsAt, festival.endsAt);
  const reduced = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-[18rem] overflow-hidden rounded-[var(--radius-card)] px-5 py-5 sm:max-w-[20rem] sm:px-6 sm:py-6"
      style={{
        background:
          "linear-gradient(175deg, rgba(253,248,240,0.94) 0%, rgba(250,240,222,0.88) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(196,145,54,0.32)",
        boxShadow: "0 14px 36px rgba(42,26,24,0.22), 0 2px 10px rgba(42,26,24,0.12)",
        transform: "translateZ(0)",
        willChange: "backdrop-filter",
      }}
    >
      <TicketNotch side="left" />
      <TicketNotch side="right" />

      {/* Second inset rule — the double-line border. Sits a few pixels in
          from the card's own outer border, same gold hue at a lighter
          weight, rounded to match. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[5px] rounded-[calc(var(--radius-card)-5px)]"
        style={{ border: "1px solid rgba(196,145,54,0.22)" }}
      />

      {CORNERS.map((cls, i) => (
        <CornerFlourish key={i} className={cn("h-6 w-6 opacity-70", cls)} />
      ))}

      {/* Mandala watermark — decorative only, sits behind every phase's
          content via z-index, low enough opacity to never affect contrast. */}
      <MandalaCorner
        className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold)] opacity-[0.09]"
      />

      {/* Extremely subtle static gold glow behind the focal number —
          not animated, just a soft warmth, per the "optional glow" brief. */}
      {c.phase === "counting" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[3.1rem] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full sm:top-[3.4rem]"
          style={{
            background: "radial-gradient(closest-side, var(--color-gold) 0%, transparent 72%)",
            opacity: 0.16,
            filter: "blur(4px)",
          }}
        />
      )}

      <div className="relative">
        {c.phase === "counting" && (
          <>
            <p className="text-center text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.24em] text-[var(--color-saffron-deep)]">
              The Countdown Begins
            </p>

            <div className="mt-2 text-center">
              <motion.span
                className="tabular block font-[family-name:var(--font-display)] text-[length:var(--text-6xl)] font-extrabold leading-none text-[var(--color-maroon)]"
                animate={reduced ? undefined : { opacity: [1, 0.85, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                {c.ready ? c.days : "--"}
              </motion.span>
              <span className="mt-1 block text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                Days To Go
              </span>
            </div>

            {/* Hours / Minutes / Seconds — smaller supporting row, not equal
                weight with Days. */}
            <div className="mt-4 grid grid-cols-3 gap-1 border-t border-[var(--color-gold)]/25 pt-4">
              {SUB_UNITS.map((u, i) => (
                <div key={u.key} className="relative text-center">
                  <span
                    className="tabular block font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold leading-none text-[var(--color-maroon)] sm:text-[length:var(--text-2xl)]"
                    /* Seconds must not be announced — a live region ticking
                       every second is unusable with a screen reader. */
                    aria-hidden={u.key === "seconds" ? "true" : undefined}
                  >
                    {c.ready ? String(c[u.key]).padStart(2, "0") : "--"}
                  </span>
                  <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink-muted)] sm:text-[10px]">
                    {u.label}
                  </span>
                  {i < SUB_UNITS.length - 1 && (
                    <span aria-hidden="true" className="absolute -right-0.5 top-0.5 h-6 w-px bg-[var(--color-border)]" />
                  )}
                </div>
              ))}
            </div>

            <p className="sr-only-focusable">
              {c.ready ? `${c.days} days until the festival begins.` : ""}
            </p>

            <GoldRule className="mx-auto mt-4 max-w-[7rem]" />

            <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-muted)]/85">
              {festival.dateLabel} · {festival.venue.city}
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
              <span className="eyebrow text-[var(--color-emerald)]">Happening Now</span>
            </span>
            <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-maroon)]">
              Festival Is Happening Now!
            </p>
            <p className="mt-1.5 text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
              Come celebrate food, culture, music and community.
            </p>
            <GoldRule className="mx-auto mt-4 max-w-[7rem]" />
            <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-ink-muted)]/85">
              {festival.dateLabel} · {festival.venue.city}
            </p>
          </div>
        )}

        {/* No date is guessed here — "Until Next Year" without a specific
            year avoids asserting a 2027 edition that isn't in the canonical
            festival data. The gallery CTA gives the ended state something
            to do besides state a fact. */}
        {c.phase === "ended" && (
          <div className="py-2 text-center">
            <p className="eyebrow">Until Next Year</p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-maroon)]">
              Thank You for Celebrating With Us
            </p>
            <p className="mt-1.5 text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
              Relive the memories, explore the gallery and stay tuned for what&rsquo;s next.
            </p>
            <div className="mt-4">
              <Button href="/gallery" size="sm" variant="outline">
                Explore Festival Gallery
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
