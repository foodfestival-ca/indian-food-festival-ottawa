import Link from "next/link";
import { Utensils, Music, Store, Baby, Ticket, Gift, ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { whyVisit } from "@/content/whyVisit";
import { sectionCopy } from "@/content/sections";
import { cn } from "@/lib/cn";

const ICONS = { utensils: Utensils, music: Music, store: Store, baby: Baby, ticket: Ticket, gift: Gift } as const;

/**
 * §3 — the turn to "you".
 *
 * Everything before this section is about the festival. This is the first
 * section about the reader, and the register changes accordingly.
 * (The former Flavours card and its hook into the Featured Flavours section
 * were both removed — see content/whyVisit.ts.)
 *
 * Down to four cards (from six) — "Free for Everyone" and "The Festival
 * Passport" were removed entirely per the client's request, along with the
 * card-level special-casing that used to strip their CTA (there's nothing
 * left to special-case: every remaining card is a normal link). Grid
 * dropped from a 3-column bento to a plain 2-column one to match — 4 cards
 * at 2 columns is a clean 2×2 with no ragged trailing row, which a 3-column
 * grid can't give 4 items.
 *
 * MOBILE          1 col
 * TABLET/DESKTOP  2 col
 */
export function WhyVisit() {
  const copy = sectionCopy.whyVisit;

  return (
    <Section id="why-visit" ground="cream-deep" labelledBy="why-visit-heading">
      <Container>
        <SectionHeader
          id="why-visit-heading"
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          intro={copy.intro}
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16">
          {whyVisit.map((reason) => {
            const Icon = ICONS[reason.icon];
            const wide = reason.span === "wide";

            const cardClassName = cn(
              "group relative flex h-full min-h-[164px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 text-[var(--color-ink)] shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)] sm:p-7"
            );

            return (
              <RevealItem key={reason.id} className={cn(wide && "sm:col-span-2")}>
                <Link href={reason.href} className={cardClassName}>
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-saffron)]/12 text-[var(--color-saffron-deep)]"
                  >
                    <Icon size={20} />
                  </span>

                  <div className="mt-5">
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold leading-tight">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-ink-muted)]">
                      {reason.blurb}
                    </p>
                  </div>

                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                    className="absolute right-5 top-6 text-[var(--color-ink-muted)]/45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
