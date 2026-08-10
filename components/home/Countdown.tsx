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
  LotusBloom,
} from "@/components/ornament/Ornaments";

const SUB_UNITS = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

/**
 * Hero countdown — "ornate Indian invitation" redesign, round 3.
 *
 * Rounds 1–2 built the domed silhouette and added ornament, but scattered it
 * around the card's edges (corner flourishes, peacocks up near the crown)
 * rather than reproducing the reference's actual *structure*: a decorative
 * top crest, a traced vine running down each inner edge, and a pair of
 * peacocks anchored at the base flanking a full lotus bloom — three
 * integrated zones, not loose accents. This round rebuilds the ornament
 * layer around those three zones specifically:
 *
 *  - TOP: `CrownOrnament`, a symmetrical gold scrollwork crest astride the
 *    dome's apex (was a single small gem).
 *  - SIDES: `VineBorder` traces both inner edges top-to-bottom (was nothing
 *    — round 2's "side flourish" was two 20×20px corner icons, not a frame
 *    element).
 *  - BASE: two `PeacockOrnament`s — now a filled, coloured illustration
 *    (emerald body, gold/maroon tail eyes) rather than thin currentColor
 *    line-art — sit at the bottom-left/right corners facing the centre,
 *    flanking a full `LotusBloom` (a filled five-petal flower, not the
 *    small `LotusCap` bud from earlier rounds).
 *
 * All of it lives *inside* the card's own box (no negative-offset overflow
 * outside the card, unlike round 2's peacocks) — that removes the desktop/
 * tablet/mobile clipping risk entirely rather than needing per-breakpoint
 * offset tuning. `MandalaCorner` remains as a faint centred watermark; the
 * double-line maroon/gold border and domed top-corner radius are unchanged
 * from round 1.
 *
 * The card surface stays a near-opaque ivory gradient so the hero photograph
 * never shows through, and the Hours/Minutes/Seconds badges stay solid
 * maroon medallions with cream digits — both carried over from round 2 for
 * contrast.
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
        className="relative overflow-hidden px-7 pb-8 pt-11 sm:px-8 sm:pb-9 sm:pt-12"
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

        {/* SIDES — vine tracing both inner edges, top to bottom. Sits inside
            the card's own padding, well clear of the centred text column. */}
        <VineBorder className="absolute left-2.5 top-12 bottom-10 h-auto w-3.5 text-[var(--color-gold)] opacity-70 sm:left-3 sm:w-4" />
        <VineBorder className="absolute right-2.5 top-12 bottom-10 h-auto w-3.5 -scale-x-100 text-[var(--color-gold)] opacity-70 sm:right-3 sm:w-4" />

        {/* TOP — gold scrollwork crest astride the dome's apex. */}
        <CrownOrnament className="pointer-events-none absolute left-1/2 top-1 h-6 w-[5.5rem] -translate-x-1/2 text-[var(--color-gold)] sm:h-7 sm:w-24" />

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

              {/* Hours / Minutes / Seconds — solid maroon "medallion" badges
                  with a thin gold ring and cream digits: opaque and
                  crystal-clear against the hero photo behind the card. */}
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

          {/* BASE — a full lotus bloom flanked by two peacocks, facing
              inward, anchored to the bottom of the card. Present in every
              phase (it's part of the card's frame, not the countdown
              content), sized down slightly under `sm` per the "reduce
              scale, don't remove" brief. */}
          <div className="mt-5 flex items-end justify-center gap-1 sm:mt-6">
            <PeacockOrnament className="h-11 w-9 shrink-0 -translate-y-1 sm:h-12 sm:w-10" />
            <LotusBloom className="h-9 w-12 shrink-0 sm:h-10 sm:w-14" />
            <PeacockOrnament className="h-11 w-9 shrink-0 -translate-y-1 -scale-x-100 sm:h-12 sm:w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
