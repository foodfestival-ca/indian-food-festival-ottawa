"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCountdown } from "@/lib/useCountdown";
import { festival } from "@/content/festival";
import { Button } from "@/components/ui/Button";
import { TicketNotch } from "@/components/ornament/Ornaments";
import { GoldRule } from "@/components/ornament/Ornaments";

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
        // No white tint at all now — just the blur (for readability) and a
        // hairline border to keep the panel perceptible as a surface.
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.22)",
        textShadow: "0 1px 2px rgba(42,26,24,0.5), 0 2px 14px rgba(0,0,0,0.3)",
        // Forces this panel onto its own GPU compositing layer, independent
        // of the ancestor's entrance animation (the hero wraps this in a
        // motion.div that animates opacity + a y-transform on mount). Without
        // this, Chromium can fail to (re)sample the backdrop for the blur
        // while that ancestor transform is still in flight: the numbers and
        // labels paint immediately (plain content, no backdrop sampling
        // needed) but the frosted-glass background lags a beat behind or
        // never appears until the transform settles — the timer briefly
        // looks like bare floating text with no card behind it. Same class
        // of bug as the mask-image-on-<video> issue elsewhere in Hero.tsx:
        // an effect that depends on sampling what's already been painted
        // needs its own stable layer, not one nested inside something still
        // animating.
        transform: "translateZ(0)",
        willChange: "backdrop-filter",
      }}
    >
      <TicketNotch side="left" />
      <TicketNotch side="right" />

      {c.phase === "counting" && (
        <>
          <p className="eyebrow text-center">Festival Starts In</p>
          <GoldRule className="mx-auto mt-3 mb-5 max-w-[11rem]" />
          {/* 4 across even at 360px: each cell is ~68px, comfortably legible. */}
          <div className="grid grid-cols-4 gap-1 sm:gap-3">
            {UNITS.map((u, i) => (
              <div key={u.key} className="relative text-center">
                <span
                  className="tabular block font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-bold leading-none text-[var(--color-maroon)] sm:text-[length:var(--text-4xl)]"
                  /* Seconds must not be announced — a live region ticking every
                     second is unusable with a screen reader. */
                  aria-hidden={u.key === "seconds" ? "true" : undefined}
                >
                  {c.ready ? String(c[u.key]).padStart(2, "0") : "--"}
                </span>
                <span className="mt-1.5 block text-[length:var(--text-xs)] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                  {u.label}
                </span>
                {i < UNITS.length - 1 && (
                  <span aria-hidden="true" className="absolute -right-0.5 top-1 h-8 w-px bg-[var(--color-border)] sm:-right-1.5" />
                )}
              </div>
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
            <span className="eyebrow text-[var(--color-emerald)]">Happening Now</span>
          </span>
          <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-maroon)]">
            Festival Is Happening Now!
          </p>
          <p className="mt-1.5 text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
            Come celebrate food, culture, music and community.
          </p>
        </div>
      )}

      {/* No date is guessed here — "Until Next Year" without a specific year
          avoids asserting a 2027 edition that isn't in the canonical festival
          data. The gallery CTA gives the ended state something to do besides
          state a fact. */}
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
  );
}
