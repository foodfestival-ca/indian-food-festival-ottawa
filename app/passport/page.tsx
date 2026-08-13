import type { Metadata } from "next";
import { Ticket, QrCode, BookOpen, MapPin, Gift } from "lucide-react";
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
    "Your Indian Food Festival Passport is your guide to the Indian Food Festival of Ottawa 2026 — check in to unlock the festival and enter the prize draws.",
  path: "/passport",
});

const STEPS = [
  { n: "01", title: "Claim Your Passport", body: "Reserve your Indian Food Festival Passport through Eventbrite before the festival.", Icon: Ticket },
  { n: "02", title: "Check In at the Festival", body: "When you arrive, show your Eventbrite QR code at the festival check-in.", Icon: QrCode },
  { n: "03", title: "Pick Up Your Passport", body: "Receive your Indian Food Festival Passport and start exploring — inside you'll find the schedule, vendor details, food recommendations and activities.", Icon: BookOpen },
  { n: "04", title: "Explore & Enjoy", body: "Use your passport to discover meals, vendors, performances and activities across the festival grounds.", Icon: MapPin },
  { n: "05", title: "You're Automatically Entered to Win!", body: "Checking in at the festival automatically enters you into the prize draw.", Icon: Gift },
];

const DRAW_TIMES = [
  { day: "Friday, August 21", time: "9:00 PM" },
  { day: "Saturday, August 22", time: "4:00 PM & 9:00 PM" },
  { day: "Sunday, August 23", time: "4:00 PM" },
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
            <h1 className="mx-auto max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-extrabold leading-[var(--leading-display)]">
              Your Indian Food Festival Passport
            </h1>
            <p className="mx-auto mt-3 max-w-[36ch] font-[family-name:var(--font-display)] text-[length:var(--text-xl)] italic text-[var(--color-gold)]">
              Your Guide to the Ultimate Festival Experience
            </p>
            <p className="mx-auto mt-5 max-w-[52ch] text-[length:var(--text-lg)] text-[var(--color-cream)]/80">
              Don&rsquo;t just attend the Indian Food Festival — experience it all! The Indian Food Festival Passport is your personal guide to discovering the best of the festival. From must-try dishes and food vendors to live performances, activities and special experiences, your passport helps you make the most of your visit.
            </p>
            <p className="mx-auto mt-3 max-w-[52ch] text-[length:var(--text-lg)] text-[var(--color-cream)]/80">
              And there&rsquo;s a little extra excitement — when you check in, you&rsquo;re automatically entered for a chance to win exciting prizes!
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-8">
            <FormButton form="passport" variant="primary" size="lg">
              <Ticket size={18} aria-hidden="true" />
              Claim your passport
            </FormButton>
            <p className="mt-3 text-[length:var(--text-xs)] text-[var(--color-cream)]/55">
              Free · Takes under a minute
            </p>
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <Section ground="cream" labelledBy="how-heading">
        <Container>
          <SectionHeader id="how-heading" eyebrow="How It Works" title="Five Simple Steps" accent="Five Simple Steps" />

          <RevealGroup className="mx-auto mt-12 grid max-w-[72rem] gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

          <Reveal delay={0.1} className="mx-auto mt-10 max-w-[42rem] text-center">
            <p className="font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold text-[var(--color-maroon)]">
              No stamps. No extra steps. Just check in and enjoy the festival!
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Prize section */}
      <Section ground="cream-deep" labelledBy="prize-heading">
        <Container>
          <SectionHeader
            id="prize-heading"
            eyebrow="Prizes"
            title="12 Winners. 3 Days. Lots of Excitement."
            accent="Lots of Excitement."
            intro="We'll be giving away prizes throughout the festival, with 12 lucky winners selected across the three days."
          />

          <Reveal delay={0.1} className="mx-auto mt-10 max-w-[36rem]">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)] sm:p-7">
              <p className="eyebrow text-center">Prize Draw Times</p>
              <dl className="mt-5 grid gap-4 border-t border-[var(--color-border)] pt-5 sm:grid-cols-3">
                {DRAW_TIMES.map((d) => (
                  <div key={d.day} className="text-center">
                    <dt className="font-semibold text-[var(--color-ink)]">{d.day}</dt>
                    <dd className="mt-1 text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">{d.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mx-auto mt-8 max-w-[42rem] text-center">
            <p className="font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-maroon)]">
              Will your name be called?
            </p>
            <p className="mt-2 text-[length:var(--text-base)] text-[var(--color-ink-muted)]">
              Make sure you&rsquo;re at the festival when the draws take place for your chance to win!
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <Section ground="cream" labelledBy="cta-heading">
        <Container>
          <Reveal className="mx-auto max-w-[42rem] text-center">
            <span aria-hidden="true" className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--color-maroon)] text-[var(--color-gold)]">
              <Ticket size={26} />
            </span>
            <h2 id="cta-heading" className="mt-5 font-[family-name:var(--font-display)] text-[length:var(--text-3xl)] font-bold text-[var(--color-maroon)]">
              🎟️ Claim Your Indian Food Festival Passport
            </h2>
            <p className="mt-3 text-[length:var(--text-base)] text-[var(--color-ink-muted)]">
              Reserve your passport through Eventbrite, check in when you arrive, and get ready to explore everything the festival has to offer.
            </p>
            <div className="mt-6">
              <FormButton form="passport" variant="primary" size="lg">
                <Ticket size={18} aria-hidden="true" />
                Claim your passport
              </FormButton>
            </div>
            <p className="mt-4 text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
              {festival.dateLabel} · {festival.venue.name}, Nepean
            </p>
            <p className="mt-2 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.16em] text-[var(--color-maroon)]/60">
              {festival.themeLine}
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
