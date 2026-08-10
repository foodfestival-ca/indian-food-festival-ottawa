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
 *      card — see Countdown.tsx. The artwork stays visible through it.
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
 * field on the left. The two-column grid below (narrative left, countdown
 * right) is untouched — only what's painted BEHIND it changed, from
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
 *     side one), and one soft dark radial behind the countdown card's
 *     corner so its ticket surface has something to sit "on" without a
 *     hard-edged panel.
 *   - Fewer overlapping gradients than the boxed version had (no separate
 *     glow + two masks + two washes) — this was also a chance to simplify,
 *     per the brief's own "avoid excessive gradients."
 *
 * v8 — the countdown card is gone. Per the client's direction, the entire
 * countdown UI (component, its dedicated column, and the scrim that only
 * existed to seat it against the photograph) has been removed so a new
 * countdown design can be built from scratch separately. The narrative
 * column is now the section's only content — no more two-column grid, no
 * reserved second column, no placeholder where the card used to sit. The
 * underlying countdown logic (`lib/useCountdown.ts`) and data
 * (`content/festival.ts`) are untouched and not currently rendered
 * anywhere on this page.
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

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
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
      </div>
    </section>
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
