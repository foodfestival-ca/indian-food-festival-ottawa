import Link from "next/link";
import { Mail, MapPin, Calendar } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ornament/BrandIcons";
import { festival } from "@/content/festival";
import { Container } from "@/components/ui/Container";
import { GoldRule } from "@/components/ornament/Ornaments";
import { Logo } from "@/components/ui/Logo";

const socials = [
  {
    label: "Instagram",
    href: festival.social.instagram,
    Icon: InstagramIcon,
    ariaLabel: "Visit our Instagram profile",
  },
  { label: "Facebook", href: festival.social.facebook, Icon: FacebookIcon },
  { label: "YouTube", href: festival.social.youtube, Icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer
      // Hairline top border: on routes where the section right above the
      // footer is also maroon (the homepage's PassportCTA, now that Sponsors
      // no longer sits between them), there'd otherwise be zero visual
      // separation between "end of page content" and "start of footer" —
      // same solid colour, no boundary. This border is the fix; it's
      // invisible against any other ground colour so it costs nothing
      // elsewhere.
      className="border-t border-[var(--color-cream)]/12 bg-[var(--color-maroon)] text-[var(--color-cream)]"
      style={{ paddingBottom: "calc(var(--safe-bottom) + 5rem)" }}
    >
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-3 lg:gap-14">
          <div>
            {/* Cream colourway on the maroon ground: 10.9:1 contrast.
                Marked decorative — the festival name follows in text below. */}
            <Logo variant="cream" height={92} decorative className="sm:!h-[108px] sm:!w-[99px]" />
            <p className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold leading-tight">
              {festival.name}
            </p>
            <p className="mt-1.5 text-[length:var(--text-sm)] text-[var(--color-cream)]/70">
              {festival.themeLine}
            </p>
            <GoldRule className="mt-5 max-w-[10rem]" />
          </div>

          <div>
            <h2 className="eyebrow text-[var(--color-gold-soft)]">Festival</h2>
            <ul className="mt-4 space-y-3 text-[length:var(--text-sm)] text-[var(--color-cream)]/85">
              <li className="flex items-start gap-2.5">
                <Calendar size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" aria-hidden="true" />
                <span>{festival.dateLabel}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" aria-hidden="true" />
                <span>{festival.venue.name}, Nepean</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" aria-hidden="true" />
                <a className="underline-offset-4 hover:underline" href={`mailto:${festival.organizer.email}`}>
                  {festival.organizer.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-[var(--color-gold-soft)]">Explore</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-[length:var(--text-sm)] md:grid-cols-1">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Get Involved", href: "/about#get-involved" },
                { label: "Passport", href: "/passport" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex min-h-[var(--touch-min)] items-center text-[var(--color-cream)]/85 transition-colors hover:text-[var(--color-cream)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-2">
              {socials.map(({ label, href, Icon, ariaLabel }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel ?? label}
                  className="tap-target rounded-full border border-[var(--color-cream)]/25 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-cream)]/15 pt-6 text-[length:var(--text-xs)] text-[var(--color-cream)]/55">
          <p>
            © {new Date().getFullYear()} {festival.organizer.legalName}. Founded by{" "}
            {festival.organizer.founders.map((name, i) => (
              <span key={name}>
                {i > 0 && " & "}
                <Link
                  href="/about#co-founders"
                  className="underline decoration-transparent underline-offset-2 transition-colors hover:text-[var(--color-cream)] hover:decoration-current"
                >
                  {name}
                </Link>
              </span>
            ))}
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
