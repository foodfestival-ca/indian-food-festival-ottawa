"use client";

import { Flame, Leaf, Sparkles } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { RevealItem, RevealGroup } from "@/components/motion/Reveal";
import { DottedArc } from "@/components/ornament/Ornaments";
import { dishes, firstTimerDish, type Dish } from "@/content/dishes";
import { sectionCopy } from "@/content/sections";
import { cn } from "@/lib/cn";

/**
 * §4 — the emotional peak of Act II.
 *
 * MOBILE   horizontal scroll-snap carousel, one card per screen, full-bleed
 *          image. The most cinematic move available on a phone: each swipe
 *          is a reveal. Rail breaks the container; text keeps its gutters.
 * TABLET   2-column grid
 * DESKTOP  5 staggered editorial cards — 1/3/5 sit higher than 2/4.
 *          A flat row of five is precisely the generic treatment we avoid.
 */
export function FeaturedFlavours() {
  const copy = sectionCopy.flavours;

  return (
    <Section id="flavours" ground="cream" labelledBy="flavours-heading">
      <Container>
        <SectionHeader
          id="flavours-heading"
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          intro={copy.intro}
        />
      </Container>

      {/* Mobile: full-bleed snap rail. Gutters around a photograph on a
          390px screen kill immersion, so the rail escapes the container. */}
      <div
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--space-gutter)] pb-4 md:hidden"
        style={{ scrollbarWidth: "none" }}
        role="group"
        aria-label="Featured dishes — swipe to browse"
      >
        {dishes.map((dish) => (
          <div key={dish.id} className="w-[84vw] shrink-0 snap-center">
            <DishCard dish={dish} />
          </div>
        ))}
      </div>

      {/* Tablet & desktop */}
      <Container className="hidden md:block">
        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {dishes.map((dish, i) => (
            <RevealItem key={dish.id} className={cn("lg:pt-0", i % 2 === 0 && "lg:-translate-y-8")}>
              <DishCard dish={dish} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      <Container>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <DottedArc className="max-w-[14rem] text-[var(--color-gold)]" />
          <p className="inline-flex flex-wrap items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-emerald)]/10 px-5 py-3 text-[length:var(--text-sm)] text-[var(--color-ink)]">
            <Sparkles size={16} className="text-[var(--color-emerald)]" aria-hidden="true" />
            <span>
              <strong className="font-semibold">First time?</strong> Start with{" "}
              <strong className="font-semibold text-[var(--color-emerald)]">{firstTimerDish?.name}</strong> — mild,
              familiar in shape, and the easiest way in.
            </span>
          </p>
        </div>
      </Container>
    </Section>
  );
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]">
      <div className="relative overflow-hidden">
        <MediaFrame
          src={dish.image}
          alt={dish.alt}
          label={dish.name}
          rounded={false}
          className="aspect-[4/3] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] lg:aspect-[3/4]"
          sizes="(max-width: 768px) 84vw, (max-width: 1024px) 50vw, 20vw"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--color-cream)]/92 px-2.5 py-1 text-[length:var(--text-xs)] font-medium text-[var(--color-maroon)] backdrop-blur-sm">
          {dish.vegetarian && <Leaf size={12} className="text-[var(--color-emerald)]" aria-hidden="true" />}
          {dish.state}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow !tracking-[0.2em]">{dish.region}</p>
        <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold leading-tight text-[var(--color-maroon)]">
          {dish.name}
        </h3>
        <p className="mt-0.5 text-[length:var(--text-xs)] italic text-[var(--color-ink-muted)]">{dish.phonetic}</p>
        <p className="mt-3 flex-1 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-ink-muted)]">
          {dish.story}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
          <span className="flex flex-wrap gap-1.5">
            {dish.notes.slice(0, 2).map((note) => (
              <span key={note} className="rounded-[var(--radius-chip)] bg-[var(--color-cream-deep)] px-2 py-0.5 text-[length:var(--text-xs)] text-[var(--color-ink-muted)]">
                {note}
              </span>
            ))}
          </span>
          <span className="flex shrink-0 items-center gap-0.5" aria-label={`Spice level ${dish.spiceLevel} of 3`}>
            {[0, 1, 2].map((n) => (
              <Flame
                key={n}
                size={13}
                aria-hidden="true"
                className={n < dish.spiceLevel ? "text-[var(--color-saffron)]" : "text-[var(--color-border)]"}
              />
            ))}
          </span>
        </div>
      </div>
    </article>
  );
}
