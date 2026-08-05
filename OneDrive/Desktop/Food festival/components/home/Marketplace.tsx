import { Store, Hand, Gem, Shirt, Users, ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { FormButton } from "@/components/ui/FormButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { marketplaceCategories } from "@/content/marketplace";
import { sectionCopy } from "@/content/sections";
import { cn } from "@/lib/cn";

const ICONS = { store: Store, hand: Hand, gem: Gem, shirt: Shirt, users: Users } as const;

/**
 * "Become a Vendor" page content — was §6 on the old single-page homepage
 * ("sound hands to touch": Performances directly above, then this).
 *
 * The italic bridge line this section used to open with ("The music stops.
 * You wander.") was a hand-off from Performances, which sat directly above
 * it on the homepage. Now that Marketplace lives on its own `/vendor` route
 * with nothing musical above it, that line doesn't sync with what's actually
 * on the page — same issue as the "Put the plate down" line on Performances,
 * fixed the same way: removed rather than left dangling. Nothing about the
 * cards, layout or CTA below changed.
 * `sectionCopy.marketplace.bridge` is unused now; kept in content/sections.ts
 * rather than deleted, same as `sectionCopy.performances.bridge`.
 *
 * MOBILE   horizontal scroll-snap rail. The physical metaphor of walking
 *          past stalls, which is exactly right for the content.
 * TABLET   2 col
 * DESKTOP  asymmetric editorial grid — first card spans 2 columns
 *
 * Photography direction: hands, close crops, texture. Not wide shots of
 * stalls — wide shots communicate logistics, and this section is about touch.
 */
export function Marketplace({ className }: { className?: string } = {}) {
  const copy = sectionCopy.marketplace;

  return (
    <Section id="marketplace" ground="cream" labelledBy="marketplace-heading" className={className}>
      <Container>
        <SectionHeader
          id="marketplace-heading"
          eyebrow={copy.eyebrow}
          title={copy.title}
          accent={copy.accent}
          intro={copy.intro}
        />
      </Container>

      {/* Mobile: full-bleed snap rail — walking past stalls */}
      <div
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--space-gutter)] pb-4 md:hidden"
        style={{ scrollbarWidth: "none" }}
        role="group"
        aria-label="Marketplace categories — swipe to browse"
      >
        {marketplaceCategories.map((cat) => (
          <div key={cat.id} className="w-[78vw] shrink-0 snap-center">
            <MarketCard category={cat} />
          </div>
        ))}
      </div>

      <Container className="hidden md:block">
        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {marketplaceCategories.map((cat, i) => (
            <RevealItem key={cat.id} className={cn(i === 0 && "lg:col-span-2")}>
              <MarketCard category={cat} wide={i === 0} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      <Container>
        <Reveal className="mt-12 text-center">
          <FormButton form="vendor" variant="outline" size="md">
            Become a vendor
            <ArrowRight size={16} aria-hidden="true" />
          </FormButton>
        </Reveal>
      </Container>
    </Section>
  );
}

function MarketCard({
  category,
  wide = false,
}: {
  category: (typeof marketplaceCategories)[number];
  wide?: boolean;
}) {
  const Icon = ICONS[category.icon];

  return (
    <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]">
      <MediaFrame
        src={category.image}
        alt={category.alt}
        label={category.title}
        rounded={false}
        className={cn(
          "h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]",
          wide ? "aspect-[16/10]" : "aspect-[4/5] md:aspect-[4/3]"
        )}
        sizes={wide ? "(max-width: 768px) 78vw, 66vw" : "(max-width: 768px) 78vw, 33vw"}
      />

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-[var(--color-ink)]/30 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <span
          aria-hidden="true"
          className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[var(--color-cream)]/18 text-[var(--color-cream)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-ink)]"
        >
          <Icon size={18} />
        </span>
        <h3
          className={cn(
            "font-[family-name:var(--font-display)] font-bold leading-tight text-white",
            wide ? "text-[length:var(--text-2xl)]" : "text-[length:var(--text-xl)]"
          )}
        >
          {category.title}
        </h3>
        <p className="mt-1.5 max-w-[42ch] text-[length:var(--text-sm)] leading-relaxed text-white/80">
          {category.blurb}
        </p>
      </div>
    </article>
  );
}
