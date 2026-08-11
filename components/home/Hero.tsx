"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Ticket, CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroParticles } from "@/components/home/HeroParticles";
import { MandalaCorner, GoldRule } from "@/components/ornament/Ornaments";
import { festival } from "@/content/festival";
import { EASE_BRAND } from "@/lib/motion";

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

      <div className="relative z-10 mx-auto w-full max-w-[1680px] px-5 sm:px-6 xl:px-5">
        <div className="grid items-center gap-10 xl:grid-cols-[42rem_1fr] xl:gap-6">
          <div className="mx-auto max-w-2xl text-center xl:mx-0 xl:max-w-none xl:text-left">
          <motion.p {...rise(0)} className="eyebrow">
            A Celebration of Flavours, Culture &amp; Community
          </motion.p>
          <GoldRule className="mx-auto mt-3 max-w-[15rem] xl:mx-0" />

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
            className="mx-auto mt-5 max-w-[34rem] text-[length:var(--text-lg)] text-[var(--color-ink-muted)] xl:mx-0"
          >
            Three days of incredible food, culture, music and celebration that brings us all together.
          </motion.p>

          <motion.ul
            {...rise(0.22)}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-[length:var(--text-sm)] font-medium text-[var(--color-ink)] xl:justify-start"
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
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center xl:justify-start"
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
 * No countdown markup lives here — the panel drawn into the center of the
 * artwork itself stays exactly as delivered, empty. That's deliberate per
 * this round's brief: the timer gets mounted here in a later pass.
 */
function HeroFrame() {
  return (
    <div className="mx-auto w-full max-w-[27rem] sm:max-w-[32rem] xl:mx-0 xl:max-w-[46rem]">
      <div className="relative aspect-[1536/1024] w-full">
        <Image
          src="/media/hero/countdown-frame.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1280px) 46rem, (min-width: 640px) 32rem, 27rem"
          className="object-contain"
        />
      </div>
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
