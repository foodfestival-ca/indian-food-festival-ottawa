"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCountdown } from "@/lib/useCountdown";
import { festival } from "@/content/festival";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import {
  TicketNotch,
  GoldRule,
  MandalaCorner,
  CornerFlourish,
  PeakGem,
  LotusCap,
} from "@/components/ornament/Ornaments";

// Four "paisley" leaf flourishes at the corners, plus two more (rotated 90°)
// at the mid-sides — the extra pair is new, giving the card ornament along
// all four edges rather than just the corners, per the "ornate invitation"
// reference. The top pair sits lower than a plain rectangle's corners would
// (top-9, not top-2) so they land on the card's straight side walls rather
// than getting swallowed by the domed top.
const CORNERS = [
  "absolute left-2.5 top-9 text-[var(--color-gold)]",
  "absolute right-2.5 top-9 -scale-x-100 text-[var(--color-gold)]",
  "absolute bottom-3 left-2.5 -scale-y-100 text-[var(--color-gold)]",
  "absolute bottom-3 right-2.5 -scale-x-100 -scale-y-100 text-[var(--color-gold)]",
] as const;

const SIDE_FLOURISHES = [
  "absolute left-1 top-1/2 h-5 w-5 -translate-y-1/2 rotate-90 text-[var(--color-gold)] opacity-60",
  "absolute right-1 top-1/2 h-5 w-5 -translate-y-1/2 -rotate-90 text-[var(--color-gold)] opacity-60",
] as const;

const SUB_UNITS = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

/**
 * Hero countdown — "invitation card" redesign.
 *
 * Reproduces the reference's ornate, arched invitation-card silhouette in
 * real markup rather than an image:
 *  - Silhouette: a very large border-radius on the two top corners only
 *    (clamped by the CSS spec to half the card's own width, so it always
 *    renders as a smooth dome regardless of viewport — no hand-authored
 *    breakpoint-specific path needed) domes the top into an arch. A
 *    `PeakGem` finial sits astride the apex and a `LotusCap` hangs off the
 *    bottom edge, so the card reads as "shaped," not a plain rectangle,
 *    at both ends.
 *  - Border: a heavier maroon outer line (was a hairline gold one) plus the
 *    existing inset gold rule a few pixels in — a real double-line frame,
 *    the printed-invitation cue, now in the deeper of the two ink colours
 *    the reference uses for its outline.
 *  - Ornament: the four corner paisleys plus two new mid-side ones and the
 *    centred MandalaCorner watermark carry the "paisley / floral / mandala"
 *    brief — all `aria-hidden`, all low-opacity enough to never sit under
 *    text at a contrast-affecting strength.
 *  - Surface: the day-number badge behind "Hours/Minutes/Seconds" moved off
 *    a solid maroon fill (which the reference uses) to a translucent
 *    saffron/orange wash instead — the one deliberate departure from the
 *    reference, per direct client note: keep the ornament, make the small
 *    timer badges themselves a "little transparent... orange" instead of a
 *    solid block colour.
 *
 * Hierarchy, copy and all live values are unchanged and still come straight
 * from `useCountdown()`/`festival` — nothing here is hardcoded.
 */
export function Countdown() {
  const c = useCountdown(festival.startsAt, festival.endsAt);
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem]">
      <div
        className="relative overflow-visible px-6 pb-6 pt-11 sm:px-7 sm:pb-7 sm:pt-12"
        style={{
          borderRadius: "999px 999px 26px 26px",
          background:
            "radial-gradient(120% 65% at 50% 0%, rgba(255,251,242,0.97) 0%, rgba(253,246,230,0.95) 45%, rgba(247,235,209,0.93) 100%)",
          border: "2.5px solid var(--color-maroon)",
          boxShadow: "0 22px 48px rgba(42,26,24,0.34), 0 6px 18px rgba(42,26,24,0.18)",
          transform: "translateZ(0)",
        }}
      >
        <TicketNotch side="left" />
        <TicketNotch side="right" />

        {/* Second inset rule — the double-line border, now traced in gold a
            few pixels inside the maroon outer edge, following the same
            domed-top silhouette as the card itself. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[6px] rounded-[999px_999px_20px_20px]"
          style={{ border: "1px solid rgba(196,145,54,0.38)" }}
        />

        {/* Apex finial — astride the top edge of the dome. */}
        <PeakGem className="pointer-events-none absolute left-1/2 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold)]" />

        {/* Bottom lotus drop — hangs just off the lower edge. */}
        <LotusCap className="pointer-events-none absolute bottom-0 left-1/2 h-6 w-10 -translate-x-1/2 translate-y-1/2 text-[var(--color-maroon)]" />

        {CORNERS.map((cls, i) => (
          <CornerFlourish key={i} className={cn("h-6 w-6 opacity-70", cls)} />
        ))}
        {SIDE_FLOURISHES.map((cls, i) => (
          <CornerFlourish key={`side-${i}`} className={cls} />
        ))}

        {/* Mandala watermark — decorative only, sits behind every phase's
            content via z-index, low enough opacity to never affect contrast. */}
        <MandalaCorner className="pointer-events-none absolute left-1/2 top-[54%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold)] opacity-[0.08]" />

        {/* Extremely subtle static gold glow behind the focal number —
            not animated, just a soft warmth. */}
        {c.phase === "counting" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[4.4rem] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full sm:top-[4.7rem]"
            style={{
              background: "radial-gradient(closest-side, var(--color-gold) 0%, transparent 72%)",
              opacity: 0.15,
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

              {/* Hours / Minutes / Seconds — each a little transparent-orange
                  "timer" badge (translucent saffron wash, not a solid fill)
                  rather than equal-weight digital-clock cells. */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[var(--color-gold)]/25 pt-4">
                {SUB_UNITS.map((u) => (
                  <div key={u.key} className="text-center">
                    <div
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
                      style={{
                        background: "rgba(232,121,43,0.14)",
                        border: "1px solid rgba(232,121,43,0.35)",
                      }}
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
                    </div>
                    <span className="mt-1.5 block text-[9px] font-medium uppercase tracking-[0.12em] text-[var(--color-ink-muted)] sm:text-[10px]">
                      {u.label}
                    </span>
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
    </div>
  );
}
