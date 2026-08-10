"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Ticket, CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Countdown } from "@/components/home/Countdown";
import { HeroParticles } from "@/components/home/HeroParticles";
import { MandalaCorner, GoldRule } from "@/components/ornament/Ornaments";
import { festival } from "@/content/festival";
import { EASE_BRAND } from "@/lib/motion";

/**
 * MOBILE      single column, content stacked, countdown below CTAs,
 *             min-height uses svh so iOS browser chrome can't clip it
 * TABLET      wider measure, CTAs go inline, larger display type
 * DESKTOP     two columns — narrative left, countdown overlaying the
 *             illustration on the right (per the approved composition)
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
 * The mask, glow, particles and bottom fade are otherwise untouched. The
 * timer-area radial mask was resized/lowered to track the countdown card,
 * which itself moved toward the bottom of its column (see the JSX below) so
 * it sits over the calmer lower part of the new scene instead of the arch
 * sign and skyline.
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
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="text-center lg:text-left">
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

          {/* `lg:self-end`: overrides the grid's own `items-center` for just
              this child, so on desktop the card sits toward the bottom of
              its column — over the calmer lower portion of the new artwork
              (past the arch sign and skyline) — rather than dead-centre
              across the middle of the scene. Unchanged on mobile, where it
              already follows the text/CTAs in normal document flow. */}
          <motion.div
            {...rise(0.38)}
            className="mx-auto w-full max-w-[30rem] lg:max-w-none lg:self-end lg:pb-6"
          >
            <Countdown />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Media layer — v4: same layering as v2 (base wash → artwork → glow → radial
 * timer-area mask → cream text-side wash → particles → bottom fade), with one
 * addition: a soft radial mask centered on the artwork roughly where the
 * countdown sits, so that specific area of the image gently darkens/softens
 * — diffuse, no hard edge — giving the frosted glass card behind it more
 * contrast to read against without needing a solid background of its own.
 */
function HeroMedia() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* 1 — base wash, untouched */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#FFFDF8_0%,var(--color-cream)_45%,var(--color-cream-deep)_100%)]" />

      {/* 2–3 — desktop artwork: oversized, raised, right-anchored, mask-faded.
          No bounding box at 50% — the mask itself is the only edge, and it
          fades to nothing rather than to an opaque color. */}
      <div
        className="absolute hidden lg:block"
        style={{ top: "-100px", right: "-8%", width: "58%", height: "125%" }}
      >
        <div className="relative h-full w-full">
          {/* CSS `mask-image` on a <video> was unreliable in Chromium; kept
              masking a plain wrapping div (with the media as a normal
              child) since that still applies to <Image>. */}
          <div className="hero-artwork-mask absolute inset-0 overflow-hidden">
            <HeroImage objectPosition="50% 32%" />
          </div>

          {/* warm ambient glow, unchanged in spirit — the new scene already
              has its own dusk lighting, so this just adds a touch more
              warmth centred on the arch/skyline band rather than a face */}
          <div
            className="hero-glow absolute left-1/2 top-[28%] h-[38%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(closest-side, var(--color-gold) 0%, transparent 72%)",
              mixBlendMode: "screen",
              opacity: 0.08,
            }}
          />

          {/* soft radial mask behind the timer only — resized and moved
              down to track the countdown card, which now sits near the
              bottom of its column (see the `lg:self-end` card below)
              instead of dead-centre. Diffuse falloff, no visible edge,
              purely to lift the card's readability against the artwork. */}
          <div
            className="absolute left-1/2 top-[78%] h-[52%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(20,12,10,0.32) 0%, rgba(20,12,10,0.17) 45%, rgba(20,12,10,0.05) 68%, transparent 82%)",
            }}
          />

          {/* soften the artwork's own bottom edge, in addition to the mask */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[var(--color-cream)]/70" />

          <HeroParticles />
        </div>
      </div>

      {/* mobile/tablet: full-bleed, top-anchored, mask-faded at the bottom
          only (single-column layout, no left/right seam to worry about) */}
      <div className="absolute inset-x-0 top-0 h-[64%] lg:hidden">
        <div className="relative h-full w-full">
          <div className="hero-artwork-mask-mobile absolute inset-0 overflow-hidden">
            <HeroImage objectPosition="50% 30%" />
          </div>

          {/* same soft timer-area mask on mobile — the countdown sits toward
              the lower half of this stacked artwork block */}
          <div
            className="absolute left-1/2 bottom-0 h-[62%] w-full"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 100%, rgba(20,12,10,0.30) 0%, rgba(20,12,10,0.14) 42%, transparent 75%)",
              transform: "translateX(-50%)",
            }}
          />

          <HeroParticles />
        </div>
      </div>

      {/* 4 — wide cream radial wash behind the text column. Soft and wide
          rather than a hard-edged band, so it reads as ambient light rather
          than a panel boundary. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 85% at 20% 45%, var(--color-cream) 0%, var(--color-cream) 38%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-cream) 0%, var(--color-cream) 38%, rgba(253,248,240,0.55) 64%, rgba(253,248,240,0.15) 100%)",
        }}
      />

      {/* 6 — bottom fade into the next section, unchanged */}
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
        sizes="(max-width: 1024px) 100vw, 58vw"
        style={{ objectPosition }}
        className="object-cover"
      />
    </motion.div>
  );
}
