import Image from "next/image";
import { Handshake } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FormButton } from "@/components/ui/FormButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { sponsors, type Sponsor } from "@/content/sponsors";

/**
 * Sponsors — one flat, premium grid. No tiers.
 *
 * This used to be split into "Presenting / Gold / Community" groups, each
 * under its own heading, sized differently by tier. That's gone: every
 * sponsor is equal here — same card, same size, same grid, driven entirely
 * by the `sponsors` array in content/sponsors.ts (nothing below is
 * hardcoded; add a sponsor there and it appears here with no component
 * changes needed).
 *
 * Card size is intentionally identical for every sponsor regardless of
 * logo shape — a wide wordmark (Amazon) and a nearly-square badge (Right at
 * Home) both sit inside the same fixed-height frame with `object-contain`,
 * so nothing crops or stretches and every row still lines up.
 */
export function Sponsors({ className }: { className?: string } = {}) {
  return (
    <Section id="sponsors" ground="cream-deep" labelledBy="sponsors-heading" className={className}>
      <Container>
        <SectionHeader
          id="sponsors-heading"
          eyebrow="With Thanks"
          title="Our Sponsors"
          intro="Proudly supported by the organizations and businesses helping make Navatara's Indian Food Festival Ottawa 2026 possible."
        />

        <RevealGroup className="mx-auto mt-12 grid max-w-[72rem] grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sponsors.map((sponsor) => (
            <RevealItem key={sponsor.id}>
              <SponsorCard sponsor={sponsor} />
            </RevealItem>
          ))}
        </RevealGroup>

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

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const initials = sponsor.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const inner = sponsor.logo ? (
    <div className="relative h-20 w-full sm:h-24">
      <Image
        src={sponsor.logo}
        alt={sponsor.name}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 33vw, 17rem"
        className="object-contain"
      />
    </div>
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

  const card = (
    <div
      className="flex h-full min-h-[9.5rem] items-center justify-center rounded-[18px] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[var(--shadow-md)] sm:p-8"
    >
      {inner}
    </div>
  );

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={sponsor.name}
        className="block h-full"
      >
        {card}
      </a>
    );
  }
  return card;
}
