import { Play, Music2 } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { performances } from "@/content/performances";
import { sectionCopy } from "@/content/sections";
import { cn } from "@/lib/cn";

/**
 * §5 — the stage.
 *
 * Video-forward by design: dance is motion, and a still of dance is a
 * compromise. Ground is maroon, the same dark chapter it always was.
 *
 * The italic "bridge" line this section used to open with ("Put the plate
 * down. Something's starting.") was a hand-off from the Flavours section
 * that used to sit directly above it on the homepage. It duplicated the
 * heading below almost word for word, and now that this section lives on
 * `/schedule` (moved off the homepage) rather than after Flavours (removed
 * entirely), that hand-off no longer makes sense either — so it's gone.
 * `sectionCopy.performances.bridge` is unused now; kept in content/sections.ts
 * rather than deleted, in case a future homepage bridge line reuses it.
 *
 * MOBILE   stacked full-bleed cards, feature first
 * TABLET   2 col
 * DESKTOP  feature spans 2 rows on the left, three stacked right
 */
export function Performances() {
  const copy = sectionCopy.performances;
  const feature = performances.find((p) => p.feature);
  const rest = performances.filter((p) => !p.feature);

  return (
    <Section id="performances" ground="maroon" labelledBy="performances-heading">
      <Container>
        <SectionHeader
          id="performances-heading"
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          intro={copy.intro}
          onDark
        />

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {feature && (
            <RevealItem className="lg:col-span-2 lg:row-span-2">
              <PerformanceCard performance={feature} feature />
            </RevealItem>
          )}
          {rest.map((p) => (
            <RevealItem key={p.id}>
              <PerformanceCard performance={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function PerformanceCard({
  performance,
  feature = false,
}: {
  performance: (typeof performances)[number];
  feature?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-cream)]/12",
        feature ? "min-h-[320px] lg:min-h-[460px]" : "min-h-[200px]"
      )}
    >
      <MediaFrame
        src={performance.poster}
        alt={performance.alt}
        label={performance.title}
        rounded={false}
        className={cn(
          "absolute inset-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        )}
        sizes={feature ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
      />

      {/* Scrim guarantees text contrast over any photograph */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-maroon)] via-[var(--color-maroon)]/55 to-transparent"
      />

      <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
        <span
          aria-hidden="true"
          className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-[var(--color-cream)]/15 text-[var(--color-cream)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-maroon)]"
        >
          {performance.video ? <Play size={18} /> : <Music2 size={18} />}
        </span>

        <p className="eyebrow text-[var(--color-gold-soft)]">{performance.form}</p>
        <h3
          className={cn(
            "mt-1.5 font-[family-name:var(--font-display)] font-bold leading-tight text-[var(--color-cream)]",
            feature ? "text-[length:var(--text-3xl)]" : "text-[length:var(--text-xl)]"
          )}
        >
          {performance.title}
        </h3>
        <p
          className={cn(
            "mt-2 max-w-[38ch] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-cream)]/75",
            !feature && "hidden sm:block"
          )}
        >
          {performance.blurb}
        </p>
      </div>
    </article>
  );
}
