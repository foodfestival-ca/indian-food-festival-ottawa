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
 * MOBILE   1 col; wide cards are simply taller
 * TABLET   2 col bento
 * DESKTOP  3 col bento, wide cards span 2
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

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {whyVisit.map((reason) => {
            const Icon = ICONS[reason.icon];
            const wide = reason.span === "wide";
            const isPassport = reason.id === "passport";
            /* Client request: remove the CTA/button behaviour from the
               "Free for Everyone" and "The Festival Passport" cards
               specifically — the entire card IS the button/link in this
               component (the whole thing is wrapped in a `<Link>`, with the
               arrow icon as its visual affordance), so for just these two
               ids the card renders as plain, non-interactive content: no
               `<Link>` wrapper, no arrow icon. The other four cards keep
               their existing link behaviour and styling untouched. */
            const noCta = reason.id === "free" || reason.id === "passport";

            const cardClassName = cn(
              "group relative flex h-full min-h-[164px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-6 transition-shadow duration-300 sm:p-7",
              !noCta && "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
              isPassport
                ? "bg-[var(--color-maroon)] text-[var(--color-cream)]"
                : "border border-[var(--color-border)] bg-white text-[var(--color-ink)]"
            );

            const cardContent = (
              <>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-full",
                    isPassport
                      ? "bg-[var(--color-gold)]/20 text-[var(--color-gold)]"
                      : "bg-[var(--color-saffron)]/12 text-[var(--color-saffron-deep)]"
                  )}
                >
                  <Icon size={20} />
                </span>

                <div className="mt-5">
                  <h3
                    className={cn(
                      "font-[family-name:var(--font-display)] font-bold leading-tight",
                      wide ? "text-[length:var(--text-2xl)]" : "text-[length:var(--text-xl)]"
                    )}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-[length:var(--text-sm)] leading-relaxed",
                      isPassport ? "text-[var(--color-cream)]/75" : "text-[var(--color-ink-muted)]"
                    )}
                  >
                    {reason.blurb}
                  </p>
                </div>

                {!noCta && (
                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                    className={cn(
                      "absolute right-5 top-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                      isPassport ? "text-[var(--color-gold)]" : "text-[var(--color-ink-muted)]/45"
                    )}
                  />
                )}
              </>
            );

            return (
              <RevealItem key={reason.id} className={cn(wide && "md:col-span-2")}>
                {/* "Free for Everyone" and "The Festival Passport" lost their
                    CTA per the client's request — since the whole card is
                    the button/link in this design, that means these two
                    render as a plain, non-interactive `<div>` (no href, no
                    arrow icon, no hover affordance) instead of a `<Link>`.
                    Everything else about the card — copy, icon, colours,
                    spacing — is unchanged. */}
                {noCta ? (
                  <div className={cardClassName}>{cardContent}</div>
                ) : (
                  <Link href={reason.href} className={cardClassName}>
                    {cardContent}
                  </Link>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
