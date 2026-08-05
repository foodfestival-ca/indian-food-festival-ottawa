"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Ticket, CalendarDays, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormButton } from "@/components/ui/FormButton";
import { Countdown } from "@/components/home/Countdown";
import { HeroParticles } from "@/components/home/HeroParticles";
import { MandalaCorner, GoldRule } from "@/components/ornament/Ornaments";
import { festival } from "@/content/festival";
import { EASE_BRAND } from "@/lib/motion";
import { cn } from "@/lib/cn";

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
 * v5 — the static illustration is now the uploaded MP4 (see <HeroVideo />
 * below). Every surrounding layer (mask, glow, timer-area darken, bottom
 * fade, particles, the "zoom out ~10%" scale wrapper, the layout itself) is
 * untouched — only the single media element inside each block changed from
 * an <Image> to a <video>.
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

            {/* CTA hierarchy: ① Passport ② Schedule ③ Explore.
                Full-width stacked on mobile for thumb-width targets. */}
            <motion.div
              {...rise(0.3)}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
            >
              <FormButton form="passport" size="lg" variant="primary" fluid>
                <Ticket size={18} aria-hidden="true" />
                Get Passport
              </FormButton>
              <Button href="/schedule" size="lg" variant="outline" fluid>
                <CalendarDays size={18} aria-hidden="true" />
                View Schedule
              </Button>
              <Button href="#why-visit" size="lg" variant="ghost" fluid>
                Explore Festival
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </motion.div>
          </div>

          <motion.div {...rise(0.38)} className="mx-auto w-full max-w-[30rem] lg:max-w-none">
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
        {/* zoomed out ~10%: scaling this frame down (rather than the image
            alone) around an origin near the drummer's face keeps her face
            anchored while revealing more of the drum and surrounding scene
            at the edges — everything inside (image, glow, particles) scales
            together, so the Ken Burns motion stays proportionally the same. */}
        <div
          className="relative h-full w-full"
          style={{ transform: "scale(0.9)", transformOrigin: "50% 20%" }}
        >
          {/* CSS `mask-image` on a <video> itself is unreliable in Chromium —
              the element's separate compositor layer frequently fails to
              mask at all, rendering the whole video invisible instead of
              faded. Masking a plain wrapping div instead (with the video as
              a normal child) sidesteps that entirely. */}
          <div className="hero-artwork-mask absolute inset-0 overflow-hidden">
            <HeroVideo objectPosition="50% 14%" />
          </div>

          {/* warm glow behind the performer */}
          <div
            className="hero-glow absolute left-1/2 top-[30%] h-[42%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(closest-side, var(--color-gold) 0%, transparent 72%)",
              mixBlendMode: "screen",
              opacity: 0.1,
            }}
          />

          {/* soft radial mask behind the timer only: gently darkens/softens
              the artwork right where the countdown card sits (the card
              itself renders in the content grid above this layer, roughly
              centered in this same region) — diffuse falloff, no visible
              edge, purely to lift the glass card's readability. */}
          <div
            className="absolute left-1/2 top-1/2 h-[74%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(20,12,10,0.30) 0%, rgba(20,12,10,0.16) 45%, rgba(20,12,10,0.05) 68%, transparent 82%)",
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
        <div
          className="relative h-full w-full"
          style={{ transform: "scale(0.9)", transformOrigin: "50% 25%" }}
        >
          <div className="hero-artwork-mask-mobile absolute inset-0 overflow-hidden">
            <HeroVideo objectPosition="50% 18%" />
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
 * The hero illustration, now the uploaded MP4 instead of a static photo.
 * Fills its parent exactly like the old `<Image fill>` did (absolute,
 * inset-0, object-cover) so it drops into the same mask/glow/particle
 * stack with no other layout change.
 *
 * - autoplay + muted + loop + playsInline + no controls, per the brief.
 * - `preload="metadata"` only — the browser fetches just enough to know
 *   duration/dimensions up front rather than the whole clip.
 * - `prefers-reduced-motion`: autoPlay is simply never set, so the video
 *   never starts and the poster frame stays on screen as a static image.
 *   No JS pause/play juggling needed.
 *
 * Why this element is now ALWAYS at opacity 1, with no loading/fade state:
 * the previous version hid it (opacity 0) until an `onLoadedData` callback
 * fired, to fade it in smoothly. That callback is not guaranteed to fire
 * promptly — with `preload="metadata"`, a browser only has to know
 * duration/dimensions, not decode an actual frame, until playback truly
 * starts; if autoplay is throttled or delayed for any reason, the callback
 * can arrive late or never, and the element sat invisible indefinitely with
 * nothing else to fall back on. That was the bug ("video not visible").
 * The fix removes the failure mode at its root instead of patching around
 * it: `poster` is the video's own real first frame, so it's already the
 * correct image to show, and rendering it at full opacity from the very
 * first paint means there is no state to get stuck in — the video is either
 * showing its poster or showing itself playing, never neither.
 */
function HeroVideo({ objectPosition }: { objectPosition: string }) {
  const reduced = useReducedMotion();

  return (
    <video
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full object-cover")}
      style={{ objectPosition }}
      poster="/media/hero/festival-drummer-poster.jpg?v=3"
      autoPlay={!reduced}
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src="/media/hero/festival-drummer.mp4?v=3" type="video/mp4" />
    </video>
  );
}
