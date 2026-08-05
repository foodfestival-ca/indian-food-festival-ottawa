import type { Metadata } from "next";
import { Ticket, MapPin, QrCode, Gift, Check } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FormButton } from "@/components/ui/FormButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { MandalaCorner, GoldRule } from "@/components/ornament/Ornaments";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { festival } from "@/content/festival";

export const metadata: Metadata = pageMeta({
  title: "Festival Passport",
  description:
    "Claim your free Festival Passport for the Indian Food Festival of Ottawa 2026. Collect stamps across the weekend and enter the prize draws. Free to claim, under a minute.",
  path: "/passport",
});

const STEPS = [
  { n: "01", title: "Claim Your Passport", body: "Fill in a short form with your name and email. Free, and it takes under a minute.", Icon: Ticket },
  { n: "02", title: "Visit the Festival", body: `Come to ${festival.venue.name} across ${festival.dateLabel}. Admission is free for all three days.`, Icon: MapPin },
  { n: "03", title: "Check In at Vendors", body: "Collect a stamp at each participating stall you visit. The more you try, the more you collect.", Icon: QrCode },
  { n: "04", title: "Win Prizes", body: "Completed passports go into the prize draws, announced at the Sunday closing ceremony.", Icon: Gift },
];

const BENEFITS = [
  "Free to claim — no purchase, no catch",
  "Entry into the weekend prize draws",
  "A reason to try stalls you'd otherwise walk past",
  "First word on next year's dates",
];

export default function PassportPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Festival Passport", path: "/passport" },
        ])}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[var(--color-maroon)] text-[var(--color-cream)]"
        style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top) + 3rem)", paddingBottom: "var(--space-section)" }}
      >
        <MandalaCorner className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 text-[var(--color-gold)] opacity-[0.08] lg:h-[26rem] lg:w-[26rem]" />
        <Container className="relative text-center">
          <Reveal>
            <p className="eyebrow text-[var(--color-gold-soft)]">The Festival Passport</p>
            <GoldRule className="mx-auto mt-3 mb-6 max-w-[12rem]" />
            <h1 className="mx-auto max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-extrabold leading-[var(--leading-display)]">
              Eat More. <span className="text-[var(--color-gold)]">Win Things.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[48ch] text-[length:var(--text-lg)] text-[var(--color-cream)]/80">
              A free passport that turns three days of eating into a game. Collect stamps as you go, and go into the draw for prizes at Sunday&rsquo;s closing ceremony.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-8">
            <FormButton form="passport" variant="primary" size="lg">
              <Ticket size={18} aria-hidden="true" />
              Claim Your Passport
            </FormButton>
            <p className="mt-3 text-[length:var(--text-xs)] text-[var(--color-cream)]/55">
              Free · Takes under a minute
            </p>
          </Reveal>
        </Container>
      </section>

      {/* What it is */}
      <Section ground="cream" labelledBy="what-heading">
        <Container>
          <SectionHeader
            id="what-heading"
            eyebrow="What Is It?"
            title="A Passport for a Weekend of Food"
            accent="Weekend of Food"
            intro="Over a hundred vendors is a lot of choice, and most people default to the two stalls they recognise. The passport is our nudge to do the opposite — wander further, try the thing you can't pronounce, and get rewarded for it."
          />
        </Container>
      </Section>

      {/* How it works */}
      <Section ground="cream-deep" labelledBy="how-heading">
        <Container>
          <SectionHeader id="how-heading" eyebrow="How It Works" title="Four Simple Steps" accent="Four Simple Steps" />

          <RevealGroup className="mx-auto mt-12 grid max-w-[62rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <RevealItem key={step.n}>
                <article className="relative flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]">
                  <span aria-hidden="true" className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-bold text-[var(--color-gold)]/45">
                    {step.n}
                  </span>
                  <span aria-hidden="true" className="mt-3 grid h-11 w-11 place-items-center rounded-full bg-[var(--color-saffron)]/12 text-[var(--color-saffron-deep)]">
                    <step.Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold leading-tight text-[var(--color-maroon)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-ink-muted)]">
                    {step.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Benefits + CTA */}
      <Section ground="cream" labelledBy="benefits-heading">
        <Container>
          <div className="mx-auto grid max-w-[56rem] items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <h2 id="benefits-heading" className="font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-bold text-[var(--color-maroon)]">
                What You Get
              </h2>
              <ul className="mt-5 space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[length:var(--text-base)] text-[var(--color-ink)]">
                    <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-emerald)]/15 text-[var(--color-emerald)]">
                      <Check size={13} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-[var(--radius-card)] border border-[var(--color-gold)]/35 bg-[var(--color-cream-deep)] p-7 text-center shadow-[var(--shadow-md)]">
                <span aria-hidden="true" className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--color-maroon)] text-[var(--color-gold)]">
                  <Ticket size={26} />
                </span>
                <p className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-maroon)]">
                  Ready when you are
                </p>
                <p className="mt-2 text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
                  Claim now and bring it with you on the day.
                </p>
                <div className="mt-5">
                  <FormButton form="passport" variant="primary" size="lg" fluid>
                    <Ticket size={18} aria-hidden="true" />
                    Claim Your Passport
                  </FormButton>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
