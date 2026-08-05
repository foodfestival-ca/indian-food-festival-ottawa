import Image from "next/image";
import { Handshake } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FormButton } from "@/components/ui/FormButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { sponsors, sponsorTiers, type Sponsor } from "@/content/sponsors";
import { cn } from "@/lib/cn";

const TIER_ORDER = ["presenting", "gold", "community"] as const;

/**
 * Sponsors.
 *
 * Every logo is optional. When `logo` is empty the tile renders a lettermark
 * placeholder in the brand palette rather than a broken image — so the section
 * is presentable at launch and logos can be dropped in one at a time.
 */
export function Sponsors({ className }: { className?: string } = {}) {
  return (
    <Section id="sponsors" ground="cream-deep" labelledBy="sponsors-heading" className={className}>
      <Container>
        <SectionHeader
          id="sponsors-heading"
          eyebrow="With Thanks"
          title="Made Possible by Our Partners"
          accent="Our Partners"
          intro="A free festival for fifteen thousand people only works because local businesses and organisations stand behind it."
        />

        <div className="mt-12 space-y-10">
          {TIER_ORDER.map((tier) => {
            const list = sponsors.filter((s) => s.tier === tier);
            if (list.length === 0) return null;
            const presenting = tier === "presenting";

            return (
              <div key={tier}>
                <h3 className="eyebrow text-center">{sponsorTiers[tier].label}</h3>
                <RevealGroup
                  className={cn(
                    "mt-5 grid justify-center gap-4",
                    presenting ? "grid-cols-1 max-w-sm mx-auto" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                  )}
                >
                  {list.map((sponsor) => (
                    <RevealItem key={sponsor.id}>
                      <SponsorTile sponsor={sponsor} presenting={presenting} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-12 text-center">
          <p className="mx-auto mb-4 max-w-[34rem] text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
            Interested in reaching fifteen thousand visitors across one weekend?
          </p>
          <FormButton form="sponsor" variant="secondary" size="md">
            <Handshake size={17} aria-hidden="true" />
            Become a Sponsor
          </FormButton>
        </Reveal>
      </Container>
    </Section>
  );
}

function SponsorTile({ sponsor, presenting }: { sponsor: Sponsor; presenting: boolean }) {
  const initials = sponsor.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const inner = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={200}
      height={80}
      className="max-h-full w-auto object-contain opacity-75 transition-opacity duration-300 hover:opacity-100"
    />
  ) : (
    // Graceful placeholder — never a broken image
    <span className="flex flex-col items-center gap-1.5 text-center">
      <span
        aria-hidden="true"
        className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-maroon)]/8 font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold text-[var(--color-maroon)]/55"
      >
        {initials}
      </span>
      <span className="text-[length:var(--text-xs)] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]/70">
        {sponsor.name}
      </span>
    </span>
  );

  const tile = (
    <div
      className={cn(
        "flex items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5 transition-shadow duration-300 hover:shadow-[var(--shadow-sm)]",
        presenting ? "min-h-[128px]" : "min-h-[104px]"
      )}
    >
      {inner}
    </div>
  );

  if (sponsor.url) {
    return (
      <a href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={sponsor.name} className="block h-full">
        {tile}
      </a>
    );
  }
  return tile;
}
