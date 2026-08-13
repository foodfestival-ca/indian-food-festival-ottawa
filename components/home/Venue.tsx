import { MapPin, Car, Bus, Accessibility, Navigation, Clock } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { festival } from "@/content/festival";
import { venueInfo } from "@/content/venue";

const ICONS = { car: Car, bus: Bus, accessible: Accessibility, clock: Clock } as const;

/**
 * Venue & map.
 *
 * The map is a lazy iframe (`loading="lazy"`, no cookies until scrolled into
 * view) rather than the Maps JS API — saves ~300KB and avoids a third-party
 * script on initial load. Full directions open in the user's own maps app.
 *
 * MOBILE   map first (it's what people came for), info cards stacked below
 * DESKTOP  two columns — details left, map right
 */
export function Venue({ className }: { className?: string } = {}) {
  const v = festival.venue;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${v.name}, ${v.city}, ${v.regionCode}, ${v.country}`
  )}&output=embed`;

  return (
    <Section id="venue" ground="cream" labelledBy="venue-heading" className={className}>
      <Container>
        <SectionHeader
          id="venue-heading"
          eyebrow="Finding Us"
          title="Clarke Fields Park, Nepean"
          accent="Nepean"
          intro="Free admission, free parking, and level access throughout. Here is everything you need to plan the trip."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Map — first on mobile */}
          <Reveal preset="scaleIn" className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-[var(--radius-media)] border border-[var(--color-border)] shadow-[var(--shadow-md)]">
              <iframe
                title={`Map showing ${v.name}, Ottawa`}
                src={embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[280px] w-full border-0 sm:h-[360px] lg:h-full lg:min-h-[440px]"
              />
            </div>
          </Reveal>

          <div className="order-2 lg:order-1">
            <Reveal>
              <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-sm)] sm:p-6">
                <p className="flex items-start gap-3">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-[var(--color-saffron)]" aria-hidden="true" />
                  <span>
                    <span className="block font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold text-[var(--color-maroon)]">
                      {v.name}
                    </span>
                    <span className="block text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
                      {v.city}, {v.region}, {v.country}
                    </span>
                  </span>
                </p>

                <dl className="mt-4 grid gap-2 border-t border-[var(--color-border)] pt-4 text-[length:var(--text-sm)] sm:grid-cols-3">
                  {festival.days.map((d) => (
                    <div key={d.id}>
                      <dt className="font-semibold text-[var(--color-ink)]">{d.weekday}</dt>
                      <dd className="text-[var(--color-ink-muted)]">{d.hoursLabel}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <Button href={v.directionsUrl} variant="secondary" size="md" fluid>
                    <Navigation size={17} aria-hidden="true" />
                    Get Directions
                  </Button>
                  <Button href={v.mapsUrl} variant="outline" size="md" fluid>
                    <MapPin size={17} aria-hidden="true" />
                    Open in Maps
                  </Button>
                </div>
              </div>
            </Reveal>

            <RevealGroup className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {venueInfo.map((info) => {
                const Icon = ICONS[info.icon];
                return (
                  <RevealItem key={info.id}>
                    <div className="h-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-cream-deep)]/60 p-5">
                      <h3 className="flex items-center gap-2.5 font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold text-[var(--color-maroon)]">
                        <Icon size={18} className="text-[var(--color-emerald)]" aria-hidden="true" />
                        {info.title}
                      </h3>
                      <ul className="mt-2.5 space-y-1.5 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-ink-muted)]">
                        {info.lines.map((line) => (
                          <li key={line} className="flex gap-2">
                            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-gold)]" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </Section>
  );
}
