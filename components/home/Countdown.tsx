"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCountdown } from "@/lib/useCountdown";
import { festival } from "@/content/festival";
import { Button } from "@/components/ui/Button";
import { TicketNotch, GoldRule, MandalaCorner } from "@/components/ornament/Ornaments";

// `center` is each medallion's horizontal position (% from the card's left
// edge), measured directly off the artwork — bundled onto each unit rather
// than kept in a parallel array so rendering never needs to index into a
// second array by position.
const SUB_UNITS = [
  { key: "hours", label: "Hours", center: 29.6 },
  { key: "minutes", label: "Minutes", center: 51.9 },
  { key: "seconds", label: "Seconds", center: 74.0 },
] as const;

// Percentage geometry measured directly off the reference artwork
// (public/media/hero/countdown-card.png, 672×719, cropped tight to the
// card's own silhouette — re-measured after the mask was regenerated with
// a wider safety margin, see the file comment below) — see the long
// comment further down for how these were derived and why they exist.
const DAY_BOX = { left: 38.1, top: 28.1, width: 23.9, height: 18.8 };
const MEDALLION_BOX = { top: 60.3, width: 17, height: 9.4 };
const CARD_PAPER = "#F7D7A3";
const MEDALLION_FILL = "#520817";

/**
 * Hero countdown — round 5: the client supplied the actual reference
 * artwork directly ("cant we use the picture") after four rounds of
 * hand-authored SVG ornament (paisleys, a peacock, a scalloped medallion,
 * a lotus) still read as noticeably plainer than the reference's illustrated
 * card. Round 5 uses that artwork directly instead of continuing to
 * approximate it in vector shapes.
 *
 * WHAT'S IMAGE, WHAT'S REAL TEXT
 * The card frame — the arched/scalloped silhouette, the maroon+gold double
 * border, both peacocks, the corner florals, the crown motif, the side
 * vines and the bottom lotus — is `public/media/hero/countdown-card.png`,
 * a cropped, background-removed version of the client's reference PNG (the
 * photographic backdrop baked into the original crop was masked out by
 * hand-tracing the card's silhouette in this session, since no background-
 * removal model was reachable from this sandbox). The first mask traced the
 * silhouette too tightly and clipped slivers of the card's own border/vine
 * artwork in a few spots — visible as small missing bits of background right
 * at the edge. The mask was regenerated with a ~15px outward safety margin
 * (better to let a thin, barely-visible sliver of the original photo bleed
 * in at the very edge than to lose real card artwork), which is why this
 * crop is a few pixels larger than the first pass.
 *
 * Everything that actually changes at runtime is still real, live HTML laid
 * on top of the artwork at measured percentage positions, NOT baked into
 * the picture:
 *   - the big day count (`DAY_BOX`)
 *   - the three Hours/Minutes/Seconds digits (each `SUB_UNITS` entry's `center`)
 * Each sits on a small flat-colour patch (sampled directly from the
 * artwork's own paper/medallion fill — `CARD_PAPER` / `MEDALLION_FILL`) that
 * fully covers the reference's static placeholder digits before the live
 * value is drawn on top, so at a glance it reads as one seamless card, not
 * a photo with numbers floating over it. `useCountdown()` is the only
 * source for any of these values — nothing is hardcoded.
 *
 * The static line art the picture already carries correctly for our actual
 * dates — "THE COUNTDOWN BEGINS", "DAYS TO GO", the HOURS/MINUTES/SECONDS
 * captions, and "AUGUST 21–23, 2026 · OTTAWA" — is left as picture pixels
 * rather than re-overlaid with duplicate text, since it happens to already
 * match `festival.dateLabel`/`festival.venue.city` exactly. That is a real
 * coupling worth flagging: if those values ever change in
 * `content/festival.ts`, this artwork would need to be regenerated/re-cropped
 * to match — it will not update itself the way the day/hour/minute/second
 * numbers do. A `sr-only-focusable` paragraph gives screen readers the full
 * live sentence regardless, since none of the picture's own text is exposed
 * to assistive tech.
 *
 * ONLY THE "COUNTING" PHASE USES THIS ARTWORK. The reference depicts a
 * single moment — days still to go, with three digit medallions — and has
 * no equivalent composition for "the festival is happening now" or "thanks
 * for coming." Rather than force those two (rarer, shorter-lived) states
 * into a card built for different content, they keep the simpler on-brand
 * frame the site used before this round (double gold border, corner
 * TicketNotch, MandalaCorner watermark) — still on the same silhouette
 * language, just without the artwork.
 *
 * `lib/useCountdown.ts` and `content/festival.ts` were not touched.
 */
export function Countdown() {
  const c = useCountdown(festival.startsAt, festival.endsAt);

  const srSummary = c.ready
    ? c.phase === "counting"
      ? `${c.days} days, ${c.hours} hours, ${c.minutes} minutes until the festival begins.`
      : c.phase === "live"
        ? "The festival is happening now."
        : "The festival has ended. Thank you for celebrating with us."
    : "";

  if (c.phase !== "counting") {
    return (
      <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]">
        <div
          className="relative overflow-hidden px-6 py-7 sm:px-7 sm:py-8"
          style={{
            borderRadius: "999px 999px 26px 26px",
            background:
              "radial-gradient(120% 65% at 50% 0%, rgba(255,252,245,0.995) 0%, rgba(253,247,232,0.985) 45%, rgba(248,237,213,0.975) 100%)",
            border: "2.5px solid var(--color-maroon)",
            boxShadow: "0 22px 48px rgba(42,26,24,0.34), 0 6px 18px rgba(42,26,24,0.18)",
          }}
        >
          <TicketNotch side="left" />
          <TicketNotch side="right" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[6px] rounded-[999px_999px_20px_20px]"
            style={{ border: "1px solid rgba(196,145,54,0.4)" }}
          />
          <MandalaCorner className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gold)] opacity-[0.08]" />

          <div className="relative">
            {c.phase === "live" && (
              <div className="py-2 text-center">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--color-emerald)]" />
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
        <p className="sr-only-focusable">{srSummary}</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem]">
      <div className="relative" style={{ aspectRatio: "672 / 719" }}>
        <Image
          src="/media/hero/countdown-card.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 21rem, 19rem"
          className="object-contain drop-shadow-[0_18px_38px_rgba(42,26,24,0.3)]"
        />

        {/* Day count — patch hides the artwork's static placeholder digits,
            the live value from useCountdown() draws on top. */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: `${DAY_BOX.left}%`,
            top: `${DAY_BOX.top}%`,
            width: `${DAY_BOX.width}%`,
            height: `${DAY_BOX.height}%`,
          }}
        >
          <span className="absolute inset-0 rounded-sm" style={{ background: CARD_PAPER }} aria-hidden="true" />
          <span className="relative tabular font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-extrabold leading-none text-[var(--color-maroon)] sm:text-[length:var(--text-6xl)]">
            {c.ready ? c.days : "--"}
          </span>
        </div>

        {/* Hours / Minutes / Seconds digits — same patch-then-overlay
            treatment, one per medallion already drawn in the artwork. */}
        {SUB_UNITS.map((u) => (
          <div
            key={u.key}
            className="absolute flex items-center justify-center"
            style={{
              left: `${u.center - MEDALLION_BOX.width / 2}%`,
              top: `${MEDALLION_BOX.top}%`,
              width: `${MEDALLION_BOX.width}%`,
              height: `${MEDALLION_BOX.height}%`,
            }}
          >
            <span className="absolute inset-0 rounded-sm" style={{ background: MEDALLION_FILL }} aria-hidden="true" />
            <span
              className="relative tabular font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold leading-none text-[var(--color-cream)] sm:text-[length:var(--text-xl)]"
              /* Seconds must not be announced — a live region ticking every
                 second is unusable with a screen reader. */
              aria-hidden={u.key === "seconds" ? "true" : undefined}
            >
              {c.ready ? String(c[u.key]).padStart(2, "0") : "--"}
            </span>
          </div>
        ))}
      </div>

      <p className="sr-only-focusable">{srSummary}</p>
    </div>
  );
}
