import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FormButton } from "@/components/ui/FormButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ornament/BrandIcons";
import { festival } from "@/content/festival";

const SOCIALS = [
  { label: "Instagram", href: festival.social.instagram, Icon: InstagramIcon, handle: festival.social.instagramHandle },
  { label: "Facebook", href: festival.social.facebook, Icon: FacebookIcon, handle: "Indian Food Festival Ottawa" },
  { label: "YouTube", href: festival.social.youtube, Icon: YoutubeIcon, handle: "Indian Food Festival Ottawa" },
];

export function Contact() {
  return (
    <Section id="contact" ground="cream" labelledBy="contact-heading">
      <Container>
        <SectionHeader
          id="contact-heading"
          eyebrow="Get In Touch"
          title="Questions? We're Happy to Help."
          accent="We're Happy to Help."
          intro="Whether you're planning a visit, want a stall, or are writing about the festival — reach out."
        />

        <div className="mx-auto mt-12 grid max-w-[56rem] gap-4 md:grid-cols-2">
          <Reveal>
            <a
              href={`mailto:${festival.organizer.email}`}
              className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
            >
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-saffron)]/12 text-[var(--color-saffron-deep)]">
                <Mail size={20} />
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold text-[var(--color-maroon)]">
                Email Us
              </h3>
              <p className="mt-1.5 break-words text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
                {festival.organizer.email}
              </p>
            </a>
          </Reveal>

          <Reveal delay={0.06}>
            <a
              href={festival.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
            >
              <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-emerald)]/12 text-[var(--color-emerald)]">
                <MapPin size={20} />
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold text-[var(--color-maroon)]">
                Find Us
              </h3>
              <p className="mt-1.5 text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
                {festival.venue.name}, {festival.venue.city}, {festival.venue.regionCode}
              </p>
            </a>
          </Reveal>
        </div>

        <RevealGroup className="mx-auto mt-4 grid max-w-[56rem] gap-4 sm:grid-cols-3">
          {SOCIALS.map(({ label, href, Icon, handle }) => (
            <RevealItem key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white/70 p-4 transition-colors hover:border-[var(--color-maroon)]/30"
              >
                <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-maroon)]/8 text-[var(--color-maroon)]">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[length:var(--text-sm)] font-semibold text-[var(--color-ink)]">{label}</span>
                  <span className="block truncate text-[length:var(--text-xs)] text-[var(--color-ink-muted)]">{handle}</span>
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <FormButton form="contact" variant="secondary" size="lg">
            <MessageCircle size={18} aria-hidden="true" />
            Send Us a Message
          </FormButton>
        </Reveal>
      </Container>
    </Section>
  );
}
