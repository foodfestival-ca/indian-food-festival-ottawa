"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Ticket, CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroParticles } from "@/components/home/HeroParticles";
import { MandalaCorner, GoldRule } from "@/components/ornament/Ornaments";
import { festival } from "@/content/festival";
import { EASE_BRAND } from "@/lib/motion";
import { useCountdown } from "@/lib/useCountdown";

/**
 * MOBILE      single column, content stacked,
 *             min-height uses svh so iOS browser chrome can't clip it
 * TABLET      wider measure, CTAs go inline, larger display type
 * DESKTOP     single content column, left-aligned, capped to a readable
 *             measure — the festival photograph fills the rest of the
 *             section naturally behind it (see `HeroMedia`)
 *
 * v4 — reverted back to the overlay composition (v3's "countdown below the
 * illustration" redesign was not approved: the overlay was visually stronger,
 * readability was the only real problem). This version keeps the exact v2
 * layout/positions and solves readability with two additions instead of a
 * structural change:
 *   1. A soft radial mask on the artwork itself, centered roughly where the
 *      countdown sits, so the image gently darkens/softens right there and
 *      nowhere else — no hard edge, no visible shape.
 *   2. A frosted glass panel on the countdown card (translucent white +
 *      backdrop-blur + hairline border + soft shadow) instead of a solid
 *      card. The artwork stays visible through it.
 *
 * v5 — the static illustration became the uploaded MP4 (<HeroVideo />).
 *
 * v6 — swapped back to a static image (<HeroImage />), and swapped WHICH
 * image: the previous artwork was one performer close up, which read as a
 * portrait rather than "the festival, in Ottawa." The new artwork is a wide
 * scene — a festival entrance arch, food stalls, string lights and a
 * recognisable-but-not-dominant skyline at dusk — closer to what the
 * homepage needs to communicate at a glance. Two decisions behind the
 * format switch specifically:
 *   1. Performance: a hero-scale MP4 (the old asset was ~2.4MB, fetched on
 *      every visit) is real weight for something that, now that it's a
 *      wide establishing shot rather than a performer mid-motion, doesn't
 *      gain much from actually moving. A single optimized JPEG plus a very
 *      slow CSS/Framer scale (see <HeroImage />) reads as "alive" without
 *      the download, decode or battery cost of video.
 *   2. The old "zoom out ~10%, origin near the face" scale wrapper existed
 *      specifically to keep a person's face anchored while revealing more
 *      of the frame at the edges. There's no single face to anchor to in a
 *      wide scene, so that wrapper and its comment are gone; the image is
 *      simply object-cover positioned to favour the arch/skyline/lights
 *      band over the busier rangoli pattern at the very bottom, which crops
 *      out first on tall frames without losing the shot's main subject.
 * v7 — full-bleed: the artwork now covers the ENTIRE hero section rather
 * than sitting in a boxed 58%-wide panel on the right with a plain cream
 * field on the left. Only what's painted BEHIND the content changed, from
 * "cream, then an image box floated on top of the right half" to "one
 * continuous photograph behind everything, with gradient scrims doing the
 * work of keeping text readable." Concretely:
 *   - `HeroImage` is now `inset-0` (the full section), still rendered once
 *     for desktop/tablet and once for mobile so each keeps its own
 *     hand-tuned `objectPosition` — same idea as before, just no longer
 *     confined to a corner box.
 *   - The old "boxed illustration" mask/glow/face-anchoring machinery is
 *     gone — there's no box edge to mask anymore. In its place: a
 *     left-to-right cream scrim on desktop (opaque behind the copy column,
 *     fading out before the skyline so the photograph reads clearly on the
 *     right), a top-to-bottom cream scrim on mobile (content stacks over
 *     the full image there, so it needs a full-height wash rather than a
 *     side one).
 *   - Fewer overlapping gradients than the boxed version had — this was
 *     also a chance to simplify, per the brief's own "avoid excessive
 *     gradients."
 *
 * v8 — the countdown card (component, dedicated column, and its
 * supporting scrim) was removed entirely so a new countdown design could
 * be built from scratch separately. Single-column layout, as above.
 *
 * v9/v10 — an experiment: a client-supplied transparent ornamental frame
 * (`public/media/hero/countdown-frame.png`) was placed in a reintroduced
 * right-hand column, sized up over two rounds. The second sizing pass
 * caused a real regression (the headline wrapping onto four lines instead
 * of two at normal desktop widths), which was root-caused to the frame's
 * column eating into the headline's space with no protected minimum.
 *
 * v11 — the frame experiment is reverted. Per the client's explicit
 * direction, the Hero is back to the clean v8 single-column layout: no
 * grid, no reserved right-hand column, `container-page` (not a
 * hero-specific wider wrapper) for the content max-width, and `lg:` (not
 * `xl:`) as the breakpoint where the narrative column switches from
 * centred to left-aligned. `countdown-frame.png` itself is left in place
 * in `public/media/hero/` (not deleted) — it's simply unreferenced here
 * for now, per the client's note that it may be used again. Nothing in
 * `lib/useCountdown.ts` or `content/festival.ts` was ever touched by any
 * of this.
 *
 * v12 — the frame is back, this time sized and structured to avoid the v10
 * regression instead of repeating it. Two hard constraints from the client,
 * in priority order: (1) the headline must stay on its clean two-line
 * arrangement no matter what, (2) the frame should read as roughly 40-45%
 * of the hero's content width on large desktop. The layout that satisfies
 * both:
 *   - The narrative column keeps the same fixed, wrap-safe width used by
 *     the single-column layout (`max-w-2xl` = 42rem/672px) — the exact
 *     measure already proven, via the client's own screenshot, to keep
 *     "Tastes Like India" / "Feels Like Home" each on one line at the
 *     display type's max clamp size. In the grid it becomes a *fixed*
 *     42rem track (`xl:grid-cols-[42rem_1fr]`), not a flexible fraction —
 *     it cannot be squeezed by the frame growing, which is exactly what
 *     broke the headline last time.
 *   - The frame column is `1fr` (takes whatever room is left) but now has
 *     an explicit `max-w-[46rem]` ceiling, so it can't run away to a
 *     disproportionate share on very wide screens. Worked through the
 *     numbers against the hero's `max-w-[1680px]` wrapper: the frame lands
 *     at ~43-45% of the row's usable width from 1280px up through the
 *     1680px cap, which is the ratio the client asked for. At the single
 *     narrowest edge of the range (exactly 1280px, where the `xl:` grid
 *     first engages) the fixed 672px headline column leaves only ~530px
 *     for the frame — marginally *below* the previous "too small" 576px
 *     cap. That's a real, disclosed trade-off: it's the geometric ceiling
 *     once the headline column is non-negotiable at 1280px specifically.
 *     From ~1366px up (a more typical "large desktop" width) the frame is
 *     substantially bigger than every prior attempt.
 *   - Breakpoint stays at `xl:` (1280px), and the wrapper stays the
 *     wider `max-w-[1680px]` hero-specific container (not `container-page`'s
 *     1240px cap) — both carried over from the v10 fix since they're what
 *     made room for the frame without touching the headline's own classes.
 *   - Frame itself: same `next/image` `fill object-contain` inside an
 *     `aspect-[1536/1024]`-locked box as before — natural ratio, no crop,
 *     no stretch, transparency untouched. Center stays completely empty;
 *     no countdown markup exists yet anywhere in this file.
 *
 * v13 — v12's live result was wrong: the frame rendered underneath the CTA
 * row instead of beside the content, on what should have been a two-column
 * desktop width. Root cause, found by inspecting the actual compiled CSS
 * rather than guessing: the grid *was* correctly built as two real siblings
 * (narrative column, then `<HeroFrame />`, both direct children of one
 * `grid` element) with a verified `@media (min-width:80rem){.xl\:grid-cols-
 * […]}` rule in the production stylesheet — the two-column rule itself was
 * never broken. What's fragile is the *threshold*: `xl:` is exactly 1280px,
 * and Windows' classic (non-overlay) scrollbar subtracts ~17px from the
 * usable layout viewport, so a browser window that's "1280px" at the OS
 * level can report a CSS viewport a little under 1280 and land on the wrong
 * side of the breakpoint — collapsing to the single implicit grid column,
 * which stacks the frame below the CTAs exactly as reported, and (being
 * much taller stacked than side-by-side) reads as running past the fold.
 * Fix: the two-column switch now happens at `lg:` (1024px/64rem) instead of
 * `xl:` — the same breakpoint already used everywhere else in this file for
 * its other desktop/mobile forks, so it's consistent with the rest of the
 * component and gives real margin against this exact edge case. The fixed
 * 42rem headline column is untouched by this move: it stays a *hard*
 * 42rem/672px track no matter which breakpoint switches it on, so dropping
 * the switch-over point earlier does not reopen any wrap risk — worked
 * through the arithmetic at 1024px specifically (the new floor): usable
 * width after the hero's padding and the inter-column gap is ~960px, minus
 * the fixed 672px column, leaves ~288px for the frame. Small, but never
 * broken or overlapping — CSS Grid can shrink a `1fr`/capped track down,
 * it cannot make two explicit siblings overlap. From ~1366px up the frame
 * clears 600px, hits its (unchanged-in-spirit, retuned) 44rem/704px cap at
 * ~1440px, and holds 700-704px from there through the 1680px wrapper cap —
 * squarely inside the 600-700px / ~40-45%-of-row target for this round.
 * Also confirmed there is no ancestor clipping the section itself (no fixed
 * `height`/`overflow-y:hidden` above `<Hero>` in layout.tsx or globals.css)
 * — the earlier "cut off at the bottom" symptom was the single-column
 * fallback pushing total content past the fold, not literal CSS clipping.
 */
export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE_BRAND },
        };

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--color-cream)]"
      style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top) + 1.5rem)", paddingBottom: "3rem" }}
      aria-labelledby="hero-heading"
    >
      <HeroMedia />

      <MandalaCorner className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 text-[var(--color-gold)] opacity-[0.07] lg:h-96 lg:w-96" />
      <MandalaCorner className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 text-[var(--color-maroon)] opacity-[0.05] lg:h-[26rem] lg:w-[26rem]" />

      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-5 sm:px-6 lg:pl-10 lg:pr-3">
        <div className="grid items-center gap-10 lg:grid-cols-[554px_1fr] lg:gap-2">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
          <motion.p {...rise(0)} className="eyebrow">
            A Celebration of Flavours, Culture &amp; Community
          </motion.p>
          <GoldRule className="mx-auto mt-3 max-w-[15rem] lg:mx-0" />

          <motion.h1
            id="hero-heading"
            {...rise(0.08)}
            className="mt-5 font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-extrabold leading-[var(--leading-display)] text-[var(--color-maroon)]"
          >
            Tastes Like <span className="text-[var(--color-saffron)]">India</span>
            <br />
            Feels Like <span className="text-[var(--color-emerald)]">Home</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mx-auto mt-5 max-w-[34rem] text-[length:var(--text-lg)] text-[var(--color-ink-muted)] lg:mx-0"
          >
            Three days of incredible food, culture, music and celebration that brings us all together.
          </motion.p>

          <motion.ul
            {...rise(0.22)}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-[length:var(--text-sm)] font-medium text-[var(--color-ink)] lg:justify-start"
          >
            <li className="flex items-center gap-2">
              <Calendar size={17} className="text-[var(--color-saffron)]" aria-hidden="true" />
              {festival.dateLabel}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={17} className="text-[var(--color-saffron)]" aria-hidden="true" />
              {festival.venue.name}
            </li>
            <li>
              <span className="rounded-[var(--radius-pill)] bg-[var(--color-emerald)]/12 px-3 py-1 font-semibold text-[var(--color-emerald)]">
                {festival.admission}
              </span>
            </li>
          </motion.ul>

          {/* CTA hierarchy: ① Explore ② Schedule ③ Passport.
              Explore Festival and Get Passport swapped slots (and thus
              prominence) at the client's request — Get Passport now also
              links straight to the /passport page itself rather than
              opening the registration form directly from the homepage;
              the form is still one tap away once someone's on that page.
              Full-width stacked on mobile for thumb-width targets. */}
          <motion.div
            {...rise(0.3)}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
          >
            <Button href="#why-visit" size="lg" variant="primary" fluid>
              Explore Festival
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
            <Button href="/schedule" size="lg" variant="outline" fluid>
              <CalendarDays size={18} aria-hidden="true" />
              View Schedule
            </Button>
            <Button href="/passport" size="lg" variant="ghost" fluid>
              <Ticket size={18} aria-hidden="true" />
              Get Passport
            </Button>
          </motion.div>
          </div>

          <HeroFrame />
        </div>
      </div>
    </section>
  );
}

/**
 * Static ornamental frame, right column, desktop-only until it stacks below
 * the content on smaller screens. The asset itself is untouched — same file,
 * same transparency, same peacocks/vines/lotus/border — this component only
 * decides how much room it's given at each breakpoint. Locked to the
 * artwork's real pixel ratio (1536×1024) via `aspect-[1536/1024]` so
 * `object-contain` never has to crop or letterbox unevenly; the whole frame
 * is always fully visible.
 *
 * v14 — desktop cap raised from 44rem (704px) to 936px, ~33% larger, per
 * the client's "substantially larger, 30-35% more" request. This is purely
 * a ceiling increase on the SAME mechanism as before (fixed 672px headline
 * track + a `1fr` frame column that fills whatever room is left, up to this
 * cap) — nothing about the grid, the breakpoint, or the headline column
 * changed, so the v13 breakpoint fix (switch at `lg:`/1024px, safe against
 * Windows scrollbar edge cases) and the headline-wrap protection both carry
 * over unchanged. Concretely, at a `lg:px-5` gutter and `lg:gap-6` between
 * columns, the frame now renders at: ~288px at the 1024px floor (unchanged
 * — still the honest geometric minimum once the headline column is
 * protected), ~630px at 1366px, ~800px at 1536px, and the full 936px cap
 * from ~1656px up.
 *
 * No countdown markup lives here — the panel drawn into the center of the
 * artwork itself stays exactly as delivered, empty. That's deliberate per
 * this round's brief: the timer gets mounted here in a later pass.
 *
 * v15 — measured the actual rendered layout in a real browser (DevTools-
 * style `getBoundingClientRect()` on every element, not assumption) and
 * found the true constraint on the client's own screen: the fixed 672px
 * headline column plus the container's padding/gap left only ~459-475px
 * for the frame regardless of this component's own `max-w` cap, because
 * that cap was never the binding constraint. Measuring every left-column
 * element's own intrinsic (max-content) width found real slack: the
 * headline only needs ~544px, the CTA row (the tightest real element) only
 * needs ~645px — both well under the 672px the column was reserving. The
 * fixed track was tightened to 656px (a ~11px buffer over the CTA row's
 * measured minimum, so it still can't wrap), and the hero's outer padding/
 * inter-column gap were tightened to match, which is what actually grew
 * the frame — confirmed by reloading and re-measuring in the same browser
 * session rather than trusting the CSS alone.
 *
 * Also nudged up slightly (`lg:-translate-y-8`) at the client's request in
 * preparation for mounting the countdown inside the frame's blank center
 * in a later pass — a small vertical offset only, no change to the grid,
 * the column widths, or anything on the left.
 *
 * v16 — the countdown is mounted. `useCountdown(festival.startsAt,
 * festival.endsAt)` (untouched, same hook/data used everywhere else on the
 * site) drives a small 3-state readout absolutely positioned over the
 * artwork's blank center panel — nothing about the PNG itself changed, the
 * numbers just sit on top of it. Typography deliberately reuses the site's
 * own display system rather than inventing a new look: digits are set in
 * `var(--font-display)` (Playfair Display, the same face as "Tastes Like
 * India") in the frame's own maroon, the unit labels use the same
 * small-caps/tracked-uppercase treatment as the hero's eyebrow line, and a
 * `GoldRule` ties it back to the rule already under that eyebrow — so the
 * countdown reads as part of the same ornamental system as the rest of the
 * hero rather than a bolted-on widget. The panel's safe-inset percentages
 * (how far from each edge the text sits) were eyeballed against the
 * artwork's actual arch/border/peacock/lotus geometry from the live
 * screenshots this session, then confirmed in the running browser.
 */
function HeroFrame() {
  return (
    <div className="mx-auto w-full max-w-[27rem] sm:max-w-[32rem] lg:mx-0 lg:max-w-[936px] lg:-translate-y-8">
      <div className="relative aspect-[1536/1024] w-full">
        <Image
          src="/media/hero/countdown-frame.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 936px, (min-width: 640px) 32rem, 27rem"
          className="object-contain"
        />
        <HeroCountdown />
      </div>
    </div>
  );
}

const COUNTDOWN_UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

/**
 * Sits inside the ornamental frame's blank center panel. Positioned with
 * inset percentages (not fixed px) so it scales with the frame at every
 * breakpoint — the frame is `object-contain`, so its rendered box always
 * keeps the artwork's real proportions, and a percentage inset keeps this
 * overlay aligned with the panel regardless of how big the frame ends up.
 */
function HeroCountdown() {
  const c = useCountdown(festival.startsAt, festival.endsAt);

  return (
    <div className="absolute inset-[35%_18%_22%_18%] flex flex-col items-center justify-center text-center">
      {c.phase === "counting" && (
        <>
          <p className="text-[length:10px] font-semibold uppercase tracking-[0.24em] text-[var(--color-maroon)]/75 sm:text-[length:12px] lg:text-[length:13px]">
            Festival Starts In
          </p>
          <GoldRule className="mx-auto mt-1.5 max-w-[5.5rem] sm:max-w-[6.5rem]" />

          {/* Days — the headline number. Large, centered, on its own, in the
              same display face as "Tastes Like India" so it reads as the
              one figure that matters most at a glance. Pulled up with a
              negative margin to cancel out Playfair Display's built-in
              ascent whitespace above the numeral — without it, the glyph's
              own font metrics leave a gap here even at `leading-none`. */}
          <div className="-mt-4">
            <span className="tabular block font-[family-name:var(--font-display)] font-bold leading-none text-[var(--color-maroon)] text-[length:var(--text-5xl)] sm:text-[length:var(--text-6xl)]">
              {c.ready ? c.days : "--"}
            </span>
            <span className="mt-1 block text-[length:10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-saffron-deep)] sm:text-[length:11px] lg:text-[length:12px]">
              Days
            </span>
          </div>

          {/* Hours / minutes / seconds — a smaller supporting row underneath. */}
          <div className="mt-1 flex items-start justify-center gap-3.5 sm:mt-1.5 sm:gap-5">
            {COUNTDOWN_UNITS.filter((u) => u.key !== "days").map((u) => (
              <div key={u.key} className="text-center">
                <span
                  className="tabular block font-[family-name:var(--font-display)] font-bold leading-none text-[var(--color-maroon)] text-[length:var(--text-lg)] sm:text-[length:var(--text-xl)] lg:text-[length:var(--text-2xl)]"
                  aria-hidden={u.key === "seconds" ? "true" : undefined}
                >
                  {c.ready ? String(c[u.key]).padStart(2, "0") : "--"}
                </span>
                <span className="mt-1 block text-[length:8px] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-muted)] sm:text-[length:9px] lg:text-[length:10px]">
                  {u.label}
                </span>
              </div>
            ))}
          </div>

          <p className="sr-only-focusable">
            {c.ready ? `${c.days} days until the festival begins.` : ""}
          </p>
        </>
      )}

      {c.phase === "live" && (
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-emerald)]"
            />
            <span className="text-[length:9px] font-semibold uppercase tracking-[0.24em] text-[var(--color-emerald)] sm:text-[length:10px]">
              Happening Now
            </span>
          </span>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-bold text-[var(--color-maroon)] sm:text-[length:var(--text-lg)]">
            We&rsquo;re open — come on down
          </p>
        </div>
      )}

      {c.phase === "ended" && (
        <div className="text-center">
          <p className="text-[length:9px] font-semibold uppercase tracking-[0.24em] text-[var(--color-maroon)]/75 sm:text-[length:10px]">
            Until Next Year
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-bold text-[var(--color-maroon)] sm:text-[length:var(--text-lg)]">
            Thank you, Ottawa.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Media layer — v7, full-bleed. The photograph now fills the whole section;
 * everything else here is a scrim doing the job the old "cream half of the
 * screen" used to do for free.
 */
function HeroMedia() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* Base wash — shows briefly before the image paints, and is what's
          behind the image at its own edges/corners if the aspect ratio
          ever doesn't perfectly fill the section. */}
      <div className="absolute inset-0 bg-[var(--color-cream)]" />

      {/* The artwork itself, full-bleed. Two instances so desktop/tablet and
          mobile can keep their own hand-tuned crop (favouring the arch,
          skyline and string lights over the busier rangoli pattern low in
          the frame) rather than sharing one compromise position. */}
      <div className="absolute inset-0 hidden lg:block">
        <HeroImage objectPosition="64% 38%" />
      </div>
      <div className="absolute inset-0 lg:hidden">
        <HeroImage objectPosition="58% 32%" />
      </div>

      {/* Desktop readability scrim: opaque cream behind the copy column on
          the left, fading out before the skyline so the photograph reads
          clearly across the right half rather than being hidden under a
          panel. */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(100deg, rgba(253,248,240,0.97) 0%, rgba(253,248,240,0.91) 26%, rgba(253,248,240,0.48) 48%, rgba(253,248,240,0.12) 64%, transparent 78%)",
        }}
      />
      {/* Mobile/tablet: content stacks vertically over the full image here,
          so this needs a full-height wash rather than a one-sided one.
          Strongest through the middle where body copy and buttons sit; a
          little more picture shows at the very top and bottom. */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(253,248,240,0.82) 0%, rgba(253,248,240,0.9) 18%, rgba(253,248,240,0.9) 70%, rgba(253,248,240,0.8) 100%)",
        }}
      />

      <HeroParticles />

      {/* Bottom fade into the next section, unchanged */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-cream)] to-transparent" />
    </div>
  );
}

/**
 * The hero illustration — a static optimized image instead of the previous
 * autoplaying MP4 (see the v6 note above). `next/image` handles the actual
 * format/size negotiation (AVIF/WebP, responsive `srcset`) at request time,
 * so the ~400KB source JPEG here is a ceiling, not what any given visitor
 * downloads.
 *
 * The "very slow background movement" asked for is a single, extremely
 * gentle scale drift (1 → 1.025 → 1) over 24s, looping, on the wrapping
 * `motion.div` — cheap (transform-only, GPU-composited) and, unlike the old
 * video, costs nothing when it's not actually animating (no decode loop,
 * no autoplay-policy edge cases, no battery draw). Skipped entirely under
 * `prefers-reduced-motion`, same as everywhere else in this file.
 */
function HeroImage({ objectPosition }: { objectPosition: string }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0 h-full w-full"
      animate={reduced ? undefined : { scale: [1, 1.025, 1] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src="/media/hero/festival-ottawa.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        style={{ objectPosition }}
        className="object-cover"
      />
    </motion.div>
  );
}
