import type { Metadata } from "next";
import { Store, Handshake, Mail, Target, Eye } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FormButton } from "@/components/ui/FormButton";
import { FounderPortrait } from "@/components/about/FounderPortrait";
import { Contact } from "@/components/home/Contact";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { GoldRule, MandalaCorner } from "@/components/ornament/Ornaments";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { festival } from "@/content/festival";
import { journey } from "@/content/journey";
import { organizers, aboutCopy, type Organizer } from "@/content/about";

export const metadata: Metadata = pageMeta({
  title: "About Us",
  description:
    "The story of the Indian Food Festival of Ottawa — founded by Navatara Inc. in 2024 and now in its third edition. Meet the organisers, find out how to get involved as a vendor or sponsor, and get in touch with the team.",
  path: "/about",
});

export default function AboutPage() {
  // Split by role rather than adding a new schema field — content/about.ts
  // already distinguishes "Co-Founder" from "Team Lead" in `role`, so
  // grouping off that keeps the data file's shape unchanged.
  const founders = organizers.filter((p) => p.role === "Co-Founder");
  const teamLeads = organizers.filter((p) => p.role === "Team Lead");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[var(--color-cream)]"
        style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top) + 3rem)", paddingBottom: "var(--space-block)" }}
      >
        <MandalaCorner className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 text-[var(--color-gold)] opacity-[0.08] lg:h-96 lg:w-96" />
        <Container className="relative text-center">
          <Reveal>
            <p className="eyebrow">{aboutCopy.story.eyebrow}</p>
            <GoldRule className="mx-auto mt-3 mb-6 max-w-[12rem]" />
            <h1 className="mx-auto max-w-[20ch] font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-extrabold leading-[var(--leading-display)] text-[var(--color-maroon)]">
              It Started With a{" "}
              <span className="text-[var(--color-saffron)]">Simple Question</span>
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* Story */}
      <Section ground="cream" labelledBy="story-heading" cv={false}>
        <Container>
          <div className="mx-auto max-w-[42rem]">
            <h2 id="story-heading" className="sr-only-focusable">Our story</h2>
            {aboutCopy.story.body.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p
                  className={
                    i === 0
                      ? "font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] leading-snug text-[var(--color-maroon)]"
                      : "mt-5 text-[length:var(--text-lg)] leading-[var(--leading-body)] text-[var(--color-ink-muted)]"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-[52rem] gap-4 md:grid-cols-2">
            {[
              { ...aboutCopy.mission, Icon: Target },
              { ...aboutCopy.vision, Icon: Eye },
            ].map(({ title, body, Icon }) => (
              <Reveal key={title}>
                <div className="h-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)]">
                  <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-emerald)]/12 text-[var(--color-emerald)]">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold text-[var(--color-maroon)]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-ink-muted)]">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Journey */}
      <Section ground="cream-deep" labelledBy="journey-heading">
        <Container>
          <SectionHeader id="journey-heading" eyebrow="Our Journey" title="Three Years, One Idea" accent="One Idea" />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {journey.map((year) => (
              <RevealItem key={year.year}>
                <article
                  className={`flex h-full flex-col rounded-[var(--radius-card)] border p-6 ${
                    year.current
                      ? "border-[var(--color-gold)] bg-[var(--color-maroon)] text-[var(--color-cream)] shadow-[var(--shadow-md)]"
                      : "border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)]"
                  }`}
                >
                  <p className={`font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-bold ${year.current ? "text-[var(--color-gold)]" : "text-[var(--color-maroon)]"}`}>
                    {year.year}
                  </p>
                  <h3 className={`mt-1 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold ${year.current ? "text-[var(--color-cream)]" : "text-[var(--color-maroon)]"}`}>
                    {year.title}
                  </h3>
                  <p className={`mt-2.5 flex-1 text-[length:var(--text-sm)] leading-relaxed ${year.current ? "text-[var(--color-cream)]/75" : "text-[var(--color-ink-muted)]"}`}>
                    {year.blurb}
                  </p>
                  <dl className={`mt-4 grid grid-cols-3 gap-2 border-t pt-3 ${year.current ? "border-[var(--color-cream)]/20" : "border-[var(--color-border)]"}`}>
                    {year.stats.map((s) => (
                      <div key={s.label}>
                        <dt className="sr-only-focusable">{s.label}</dt>
                        <dd>
                          <span className={`block text-[length:var(--text-sm)] font-bold ${year.current ? "text-[var(--color-gold)]" : "text-[var(--color-maroon)]"}`}>
                            {s.value}
                          </span>
                          <span className={`block text-[length:var(--text-xs)] ${year.current ? "text-[var(--color-cream)]/60" : "text-[var(--color-ink-muted)]"}`}>
                            {s.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Organizers */}
      <Section ground="cream" labelledBy="team-heading">
        <Container>
          <SectionHeader
            id="team-heading"
            eyebrow="Meet the Organisers"
            title={`Behind It All: ${festival.organizer.legalName}`}
            accent={festival.organizer.legalName}
          />
          {/* Two explicit rows — Co-Founders, then Team Leads underneath —
              rather than one flat grid. Each row is its own 2-up grid capped
              at ~38rem so the pair sits together at a card width matching
              the rest of the site's card sizing, and centers as a pair
              instead of stretching to fill a wider track. Stacks to one
              column on mobile via the same sm:grid-cols-2 breakpoint used
              elsewhere on this page. */}
          <div className="mx-auto mt-12 max-w-[40rem] space-y-10">
            <div>
              <p className="text-center text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-[var(--color-saffron-deep)]">
                Co-Founders
              </p>
              <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-2">
                {founders.map((person, i) => (
                  <RevealItem key={person.id}>
                    <OrganizerCard person={person} priority={i === 0} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div>
              <p className="text-center text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-[var(--color-saffron-deep)]">
                Team Leads
              </p>
              <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-2">
                {teamLeads.map((person) => (
                  <RevealItem key={person.id}>
                    <OrganizerCard person={person} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* Get Involved */}
      <Section id="get-involved" ground="maroon" labelledBy="involved-heading">
        <Container>
          <SectionHeader
            id="involved-heading"
            eyebrow="Get Involved"
            title="Be Part of 2026"
            accent="2026"
            intro="Fifteen thousand visitors across one weekend. If you'd like a stall, a sponsorship, or press access, start here."
            onDark
          />

          <RevealGroup className="mx-auto mt-12 grid max-w-[56rem] gap-4 md:grid-cols-3">
            {[
              { id: "vendors", title: "Vendors", body: "Food stalls and marketplace booths for makers, restaurants and local businesses.", Icon: Store, form: "vendor" as const, cta: "Apply as a Vendor" },
              { id: "sponsors", title: "Sponsors", body: "Reach fifteen thousand engaged visitors across three days. Packages at every level.", Icon: Handshake, form: "sponsor" as const, cta: "Sponsor the Festival" },
              { id: "contact", title: "Media & Press", body: "Press access, interviews and creator collaborations for the 2026 edition.", Icon: Mail, form: "contact" as const, cta: "Contact the Team" },
            ].map((card) => (
              <RevealItem key={card.id}>
                <article id={card.id} className="flex h-full scroll-mt-28 flex-col rounded-[var(--radius-card)] border border-[var(--color-cream)]/15 bg-[var(--color-cream)]/5 p-6">
                  <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-gold)]/18 text-[var(--color-gold)]">
                    <card.Icon size={20} />
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold text-[var(--color-cream)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-cream)]/75">{card.body}</p>
                  <div className="mt-5">
                    <FormButton form={card.form} variant="onDark" size="md" fluid>
                      {card.cta}
                    </FormButton>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 text-center">
            <p className="text-[length:var(--text-sm)] text-[var(--color-cream)]/70">
              Or email us directly at{" "}
              <a href={`mailto:${festival.organizer.email}`} className="font-medium text-[var(--color-gold)] underline underline-offset-4">
                {festival.organizer.email}
              </a>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Contact — merged in from the former standalone /contact route.
          Get Involved above ends on a maroon ground; Contact's own ground
          is cream, so the Thali rule (no two adjacent same-ground sections)
          still holds. */}
      <Contact />
    </>
  );
}

/** One organizer card — factored out so the Co-Founders and Team Leads rows
 *  render identical, consistently-sized cards without duplicating markup. */
function OrganizerCard({ person, priority = false }: { person: Organizer; priority?: boolean }) {
  return (
    <article className="h-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)]">
      <FounderPortrait
        src={person.image}
        alt={`Portrait of ${person.name}`}
        objectPosition={person.objectPosition}
        label={person.name}
        priority={priority}
      />
      <div className="p-5">
        <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold text-[var(--color-maroon)]">
          {person.name}
        </h3>
        <p className="eyebrow mt-1">{person.role}</p>
        <p className="mt-3 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-ink-muted)]">{person.bio}</p>
      </div>
    </article>
  );
}
