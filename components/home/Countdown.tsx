"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCountdown } from "@/lib/useCountdown";
import { festival } from "@/content/festival";
import { Button } from "@/components/ui/Button";
import {
  TicketNotch,
  GoldRule,
  MandalaCorner,
  CrownOrnament,
  VineBorder,
  PeacockOrnament,
  PinkBlossom,
  ScallopedMedallion,
  LotusBloom,
} from "@/components/ornament/Ornaments";

const SUB_UNITS = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

/**
 * Hero countdown — "ornate Indian invitation" redesign, round 4.
 *
 * Round 4 matches the client's reference crop directly rather than a general
 * "more ornate" pass. Three concrete corrections from round 3:
 *
 *  1. The peacocks move from the very bottom row up to flank the
 *     Hours/Minutes/Seconds + date band, tail curling down toward the
 *     bottom corners — the reference's birds sit beside that content, not
 *     underneath it. Their tail is now one large curling paisley shape (a
 *     teal-blue fixed colour) rather than a fan of separate feathers, with
 *     a small `PinkBlossom` tucked above each — matching the reference's
 *     "bird + flower" cluster on both sides.
 *  2. The Hours/Minutes/Seconds badges sit on a `ScallopedMedallion` (a
 *     ten-bump fluted disc) instead of a plain circle — the reference's
 *     medallions read as flower-shaped badges, not dots.
 *  3. `LotusBloom` is now pink/magenta (was saffron) and hangs as a pendant
 *     below the card's own bottom edge, overlapping the border like the
 *     reference's flower — the card wrapper is `overflow-visible` again so
 *     that intentional overlap isn't clipped (everything else stays inside
 *     the card's own padding box, so this doesn't reopen the edge-clipping
 *     risk rounds 1–2 had).
 *
 * `CrownOrnament` at the apex and `VineBorder` down both inner edges are
 * unchanged in kind from round 3, just re-spaced so the vine stops above
 * the new peacock zone instead of running through it. `MandalaCorner`
 * remains a faint centred watermark; the maroon double-line border and
 * domed top-corner radius are unchanged since round 1.
 *
 * Countdown hierarchy, copy, and every dynamic value below still come
 * straight from `useCountdown()`/`festival`; `lib/useCountdown.ts` and
 * `content/festival.ts` were not touched.
 */
export function Countdown() {
  const c = useCountdown(festival.startsAt, festival.endsAt);
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]">
      <div
        className="relative overflow-visible px-7 pb-9 pt-11 sm:px-8 sm:pb-10 sm:pt-12"
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

        {/* SIDES — vine tracing both inner edges, stopping above the
            peacock zone lower down so the two ornament layers don't
            overlap. */}
        <VineBorder className="absolute left-2.5 top-12 bottom-32 h-auto w-3.5 text-[var(--color-gold)] opacity-70 sm:left-3 sm:w-4 sm:bottom-36" />
        <VineBorder className="absolute right-2.5 top-12 bottom-32 h-auto w-3.5 -scale-x-100 text-[var(--color-gold)] opacity-70 sm:right-3 sm:w-4 sm:bottom-36" />

        {/* BASE — peacocks flanking the medallion/date band, tails curling
            down toward the bottom corners, a small pink blossom above each,
            and a lotus pendant hanging below the card's own bottom border.
            Sized against the "counting" phase's content (medallions + date
            line fill the lower third of the card, matching the reference);
            the "live"/"ended" phases are shorter and have no medallion row
            to sit beside, so this cluster only renders for "counting" to
            avoid the birds overlapping shorter body copy. Positioned inside
            the card's own box on the horizontal axis (no clipping risk);
            only the lotus is allowed to overlap the bottom edge. */}
        {c.phase === "counting" && (
          <>
            <PeacockOrnament className="pointer-events-none absolute bottom-9 left-0 h-24 w-16 text-[#1C6E86] sm:bottom-10 sm:h-28 sm:w-20" />
            <PeacockOrnament className="pointer-events-none absolute bottom-9 right-0 h-24 w-16 -scale-x-100 text-[#1C6E86] sm:bottom-10 sm:h-28 sm:w-20" />
            <PinkBlossom className="pointer-events-none absolute bottom-[7.5rem] left-2 h-7 w-7 sm:bottom-[8.5rem] sm:left-2.5" />
            <PinkBlossom className="pointer-events-none absolute bottom-[7.5rem] right-2 h-7 w-7 -scale-x-100 sm:bottom-[8.5rem] sm:right-2.5" />
            <LotusBloom className="pointer-events-none absolute -bottom-4 left-1/2 h-9 w-14 -translate-x-1/2 sm:-bottom-5 sm:h-10 sm:w-16" />
          </>
        )}

        {/* TOP — gold scrollwork crest astride the dome's apex. */}
        <CrownOrnament className="pointer-events-none absolute left-1/2 top-1 h-6 w-24 -translate-x-1/2 text-[var(--color-gold)] sm:h-7 sm:w-28" />

        {/* Mandala watermark — decorative only, sits behind every phase's
            content via z-index, low enough opacity to never affect contrast. */}
        <MandalaCorner className="pointer-events-none absolute left-1/2 top-[52%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold)] opacity-[0.08]" />

        {/* Extremely subtle static gold glow behind the focal number — not
            animated, just a soft warmth. */}
        {c.phase === "counting" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[4.6rem] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full sm:top-[4.9rem]"
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

              {/* Hours / Minutes / Seconds — a scalloped, flower-shaped
                  medallion (fluted rim, not a plain circle) with cream
                  digits centred on top: opaque and crystal-clear against
                  the hero photo behind the card. */}
              <div className="mt-4 grid grid-cols-3 gap-2 pt-1">
                {SUB_UNITS.map((u) => (
                  <div key={u.key} className="text-center">
                    <div className="relative mx-auto flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
                      <ScallopedMedallion className="absolute inset-0 h-full w-full" />
                      <span
                        className="relative z-10 tabular font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold leading-none text-[var(--color-cream)] sm:text-[length:var(--text-xl)]"
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
