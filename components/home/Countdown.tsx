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
  PeacockOrnament,
  PaisleyMotif,
  FloralSprig,
} from "@/components/ornament/Ornaments";

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
 * Hero countdown — "ornate Indian invitation" redesign, round 2.
 *
 * Round 1 built the arched/domed silhouette (huge top-corner radius, clamped
 * by CSS to a smooth dome at any width), the maroon double-line border, and
 * a first pass at corner ornament. This round adds the pieces the client's
 * reference ("4th concept") called out specifically that round 1 didn't
 * have: two facing peacocks flanking the dome, denser paisley/floral
 * ornament around the bottom finial, and a fully opaque ivory surface (round
 * 1's sub-unit badges were a translucent orange wash; that read as *less*
 * finished against the busy hero photo, so this round goes back to solid
 * fills for anything text sits on, per the reference).
 *
 * Ornament budget: every new decorative element is `aria-hidden`, drawn in
 * `currentColor` (recolored per-instance via a Tailwind text-color utility)
 * with at most one or two fixed accent colours (peacock feather "eyes",
 * florals) so the palette stays inside the existing maroon/gold/saffron/
 * emerald set rather than introducing new hues. None of it sits behind text
 * at meaningful opacity — the two exceptions (MandalaCorner watermark, the
 * glow behind the day number) are unchanged from round 1 and were already
 * tuned low enough not to affect contrast.
 *
 * Countdown hierarchy, copy, and every dynamic value below still come
 * straight from `useCountdown()`/`festival` — nothing here is hardcoded,
 * and `lib/useCountdown.ts` / `content/festival.ts` were not touched.
 */
export function Countdown() {
  const c = useCountdown(festival.startsAt, festival.endsAt);
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]">
      {/* Peacocks — perched just outside the dome's shoulders, facing
          inward toward the countdown. Scaled down below `sm` per the
          "reduce scale on mobile, don't remove" brief. */}
      <PeacockOrnament
        className="pointer-events-none absolute -left-8 top-2 h-16 w-14 text-[var(--color-maroon)] opacity-80 sm:-left-11 sm:top-0 sm:h-20 sm:w-[4.25rem]"
      />
      <PeacockOrnament
        className="pointer-events-none absolute -right-8 top-2 h-16 w-14 -scale-x-100 text-[var(--color-maroon)] opacity-80 sm:-right-11 sm:top-0 sm:h-20 sm:w-[4.25rem]"
      />

      <div
        className="relative overflow-visible px-6 pb-6 pt-11 sm:px-7 sm:pb-7 sm:pt-12"
        style={{
          borderRadius: "999px 999px 26px 26px",
          background:
            "radial-gradient(120% 65% at 50% 0%, rgba(255,252,245,0.995) 0%, rgba(253,247,232,0.985) 45%, rgba(248,237,213,0.975) 100%)",
          border: "2.5px solid var(--color-maroon)",
          boxShadow: "0 22px 48px rgba(42,26,24,0.34), 0 6px 18px rgba(42,26,24,0.18)",
          transform: "translateZ(0)",
        }}
      >
        <TicketNotch side="left" />
        <TicketNotch side="right" />

        {/* Second inset rule — the double-line border, traced in gold a few
            pixels inside the maroon outer edge, following the same domed
            silhouette as the card itself. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[6px] rounded-[999px_999px_20px_20px]"
          style={{ border: "1px solid rgba(196,145,54,0.4)" }}
        />

        {/* Apex finial — astride the top edge of the dome. */}
        <PeakGem className="pointer-events-none absolute left-1/2 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold)]" />

        {/* Bottom finial cluster — lotus drop flanked by a small paisley on
            each side, matching the reference's denser base ornament. */}
        <LotusCap className="pointer-events-none absolute bottom-0 left-1/2 h-6 w-10 -translate-x-1/2 translate-y-1/2 text-[var(--color-maroon)]" />
        <PaisleyMotif className="pointer-events-none absolute bottom-0 left-[26%] h-7 w-5 translate-y-1/3 -rotate-12 text-[var(--color-gold)] opacity-70" />
        <PaisleyMotif className="pointer-events-none absolute bottom-0 right-[26%] h-7 w-5 translate-y-1/3 rotate-12 -scale-x-100 text-[var(--color-gold)] opacity-70" />
        <FloralSprig className="pointer-events-none absolute bottom-1 left-3 h-6 w-6 opacity-80" />
        <FloralSprig className="pointer-events-none absolute bottom-1 right-3 h-6 w-6 -scale-x-100 opacity-80" />

        {CORNERS.map((cls, i) => (
          <CornerFlourish key={i} className={cn("h-6 w-6 opacity-70", cls)} />
        ))}
        {SIDE_FLOURISHES.map((cls, i) => (
          <CornerFlourish key={`side-${i}`} className={cls} />
        ))}

        {/* Mandala watermark — decorative only, sits behind every phase's
            content via z-index, low enough opacity to never affect contrast. */}
        <MandalaCorner className="pointer-events-none absolute left-1/2 top-[54%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold)] opacity-[0.08]" />

        {/* Extremely subtle static gold glow behind the focal number — not
            animated, just a soft warmth. */}
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

              <GoldRule className="mx-auto mt-3 max-w-[6rem]" />

              {/* Hours / Minutes / Seconds — solid maroon "medallion" badges
                  with a thin gold ring and cream digits, matching the
                  reference's opaque timer badges (crystal-clear against the
                  hero photo behind the card, not a translucent wash). */}
              <div className="mt-4 grid grid-cols-3 gap-2 pt-1">
                {SUB_UNITS.map((u) => (
                  <div key={u.key} className="text-center">
                    <div
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14"
                      style={{
                        background: "var(--color-maroon)",
                        border: "1.5px solid var(--color-gold)",
                        boxShadow: "inset 0 0 0 2px rgba(253,248,240,0.18)",
                      }}
                    >
                      <span
                        className="tabular font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold leading-none text-[var(--color-cream)] sm:text-[length:var(--text-xl)]"
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
