import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Ticket } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { MandalaCorner, GoldRule } from "@/components/ornament/Ornaments";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { bmoActivities, workshops, REGISTRATION_URL } from "@/content/activities";

export const metadata: Metadata = pageMeta({
  title: "Activities & Workshops",
  description:
    "More than food: free workshops and the BMO Activity Zone / Kids Zone at Navatara's Indian Food Festival of Ottawa. Free registration for one or multiple sessions.",
  path: "/activities",
});

/**
 * Activities & Workshops — one page, per the client's explicit "do NOT
 * create separate /kids-zone or /workshops routes" instruction.
 *
 * v2 — the page previously combined "Activities" and "Kids Zone" into one
 * shared section (both anchors landed on the BMO Activity Zone block). The
 * client corrected this: the two are now genuinely separate `<Section>`s
 * with their own grounds, so they read as visually distinct blocks, not
 * one section with two labels:
 *   - `#activities-workshops` — the free workshop schedule (this was
 *     already its own section, just renamed/re-anchored to match the
 *     client's exact requested id).
 *   - `#kids-zone` — the BMO Activity Zone, now fully separated from the
 *     workshops section rather than nested inside it, `ground="cream-deep"`
 *     so it's visually distinct from the workshops section's `cream`
 *     above it (Thali rule: adjacent sections never share a ground).
 *
 * The homepage Kids Zone button (content/whyVisit.ts,
 * `href: "/activities#kids-zone"`) is unaffected by this restructuring — it
 * still lands on `id="kids-zone"`, which still exists, just as its own
 * `<Section>` now instead of a `<div>` nested inside the workshops section.
 * Scrolling still needs no JS: the site's existing global
 * `scroll-behavior: smooth` + `scroll-padding-top` (globals.css) handles
 * both anchors on this route, on a fresh load, and on refresh.
 *
 * No client-side state anywhere on this page: nothing here filters, sorts
 * or searches, so nothing ever unmounts/remounts a card after first paint —
 * the exact condition that caused the vendor-grid opacity bug fixed
 * earlier. Reveal/RevealGroup/RevealItem are used in their ordinary
 * inherited-animation mode throughout.
 */
export default function ActivitiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Activities & Workshops", path: "/activities" },
        ])}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-[var(--color-maroon)] text-[var(--color-cream)]"
        style={{
          paddingTop: "calc(var(--nav-h) + var(--safe-top) + 3rem)",
          paddingBottom: "var(--space-section)",
        }}
      >
        <MandalaCorner className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 text-[var(--color-gold)] opacity-[0.08] lg:h-96 lg:w-96" />
        <Container className="relative text-center">
          <Reveal>
            <p className="eyebrow text-[var(--color-gold-soft)]">Beyond the Food</p>
            <GoldRule className="mx-auto mt-3 mb-6 max-w-[12rem]" />
            <h1 className="mx-auto max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-extrabold leading-[var(--leading-display)]">
              Activities &amp; Workshops
            </h1>
            <p className="mx-auto mt-5 max-w-[56ch] text-[length:var(--text-lg)] leading-[var(--leading-body)] text-[var(--color-cream)]/85">
              The festival isn&rsquo;t just food — there&rsquo;s a full weekend of free workshops for kids and
              adults alike, plus the BMO Activity Zone and a dedicated Kids Zone. Here&rsquo;s everything you can
              do, create, play and experience while you&rsquo;re here.
            </p>
          </Reveal>

          {/* In-page nav — two distinct destinations, matching the two
              distinct sections below. Smooth scroll comes from the site's
              existing global `scroll-behavior: smooth` +
              `scroll-padding-top` (globals.css), same mechanism every other
              anchor link on the site already relies on. No JS needed. */}
          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <a
              href="#activities-workshops"
              className="tap-target inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--color-cream)]/40 px-5 text-[length:var(--text-sm)] font-medium text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-maroon)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
            >
              Activities &amp; Workshops
            </a>
            <a
              href="#kids-zone"
              className="tap-target inline-flex items-center rounded-[var(--radius-pill)] border border-[var(--color-cream)]/40 px-5 text-[length:var(--text-sm)] font-medium text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-maroon)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]"
            >
              Kids Zone
            </a>
          </Reveal>
        </Container>
      </section>

      {/* SECTION A — Free Workshops */}
      <Section id="activities-workshops" ground="cream" labelledBy="workshops-heading">
        <Container>
          <SectionHeader id="workshops-heading" eyebrow="Free Workshops" title="Free Workshops" />

          <Reveal delay={0.05} className="mx-auto mt-6 max-w-[52rem] text-center">
            <p className="text-[length:var(--text-base)] leading-[var(--leading-body)] text-[var(--color-ink-muted)]">
              We&rsquo;re excited to bring you a variety of FREE workshops and activities throughout the festival
              weekend. Registration is completely free and is simply to help our team estimate attendance and plan
              accordingly. You can register for one or multiple activities. Open for Kids and adults.
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-semibold text-[var(--color-maroon)]">
              🌿 Here&rsquo;s what you can experience:
            </p>
          </Reveal>

          {/* v3 — image containers now size themselves to each photo's real
              aspect ratio (content/activities.ts `width`/`height`, the same
              convention content/gallery.ts's masonry grid already uses)
              instead of a fixed `h-32` band with `object-cover`. A fixed
              band forced every photo — portrait or landscape — into the
              same crop, zooming into whichever portraits didn't natively
              fit; sizing the box to the photo's own shape means the full,
              natural composition always shows, uncropped, with no
              letterboxing, and cards simply vary in height per photo. A
              shared `max-height` keeps any one card from towering over its
              row on an unusually tall/narrow source photo. */}
          <RevealGroup className="mx-auto mt-10 grid max-w-[72rem] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {workshops.map((workshop) => (
              <RevealItem key={workshop.id} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-white shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]">
                  {workshop.image ? (
                    <div
                      className="relative w-full shrink-0 max-h-56 bg-[linear-gradient(135deg,#F3E4CE_0%,#E9D3B4_45%,#DFC49F_100%)]"
                      style={{
                        aspectRatio: workshop.width && workshop.height ? `${workshop.width} / ${workshop.height}` : "4 / 3",
                      }}
                    >
                      <Image
                        src={workshop.image}
                        alt={workshop.alt ?? workshop.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-full shrink-0 items-center justify-center bg-[linear-gradient(135deg,#F3E4CE_0%,#E9D3B4_45%,#DFC49F_100%)]">
                      <span aria-hidden="true" className="text-[length:var(--text-3xl)]">
                        {workshop.emoji}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-3.5">
                    <h3 className="font-[family-name:var(--font-display)] text-[length:var(--text-sm)] font-bold leading-tight text-[var(--color-maroon)]">
                      <span aria-hidden="true">{workshop.emoji} </span>
                      {workshop.name}
                    </h3>
                    <p className="mt-1 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.06em] text-[var(--color-saffron-deep)]">
                      {workshop.date} · {workshop.time}
                    </p>
                    <p className="mt-2 flex-1 text-[length:var(--text-xs)] leading-relaxed text-[var(--color-ink-muted)]">
                      {workshop.description}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Registration — kept in this section (not a separate block
              lower on the page), immediately after the schedule, so the
              free/multi-activity/kids-and-adults facts and the CTA that
              acts on them stay together. */}
          <Reveal delay={0.1} className="mx-auto mt-10 max-w-[38rem]">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-gold)]/30 bg-white px-6 py-7 text-center shadow-[var(--shadow-sm)]">
              <p className="text-[length:var(--text-base)] font-medium text-[var(--color-maroon)]">
                ✨ All activities are FREE. Registration is only to help us take the count and prepare accordingly.
                You are welcome to register for multiple activities!
              </p>
              <div className="mt-5">
                <Button href={REGISTRATION_URL} size="lg" aria-label="Register for a workshop (opens in a new tab)">
                  <Ticket size={18} aria-hidden="true" />
                  Register for a Workshop
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* SECTION B — BMO Activity Zone / Kids Zone. Fully separate from the
          workshops section above: its own <Section>, its own ground
          (cream-deep, differs from the workshops section's cream), its own
          heading. `id="kids-zone"` sits directly on this section so the
          homepage Kids Zone button lands exactly here. */}
      <Section id="kids-zone" ground="cream-deep" labelledBy="kids-zone-heading">
        <Container>
          {/* No eyebrow here — "Kids Zone" is the primary heading, with
              "BMO Activity Zone" as a smaller supporting subheading directly
              underneath (SectionHeader's `subheading` prop), rather than an
              eyebrow-above-title. The BMO logo right below still carries the
              brand visually. */}
          <SectionHeader
            id="kids-zone-heading"
            title="Kids Zone"
            subheading="BMO Activity Zone"
            intro="Fun activities for kids and families, all included with festival admission."
          />

          {/* BMO branding — official logo already used for the Sponsors
              page (public/sponsors/bmo.png), reused here rather than
              recreated. Clear space via padding on the frame, not a crop
              or stretch of the artwork itself. */}
          <Reveal delay={0.05} className="mx-auto mt-8 flex max-w-[20rem] justify-center">
            <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white px-6 py-4 shadow-[var(--shadow-sm)]">
              <Image
                src="/sponsors/bmo.png"
                alt="BMO logo"
                width={900}
                height={458}
                className="h-10 w-auto object-contain"
              />
            </div>
          </Reveal>

          {/* v4 — grid stays matched to the Workshop cards' own breakpoints
              (1/2/3/4 per row). Image containers now use the same
              per-image `aspect-ratio` sizing as the workshop cards above
              (real width/height from content/activities.ts) instead of a
              fixed h-32 band — the object-contain-in-a-fixed-band fix from
              the previous round still letterboxed portrait photos into a
              too-short band. Sizing the box to each photo's real shape
              gives every image the same size/proportion/prominence as a
              workshop card, border-radius and spacing untouched, with the
              90s Games icon-only card keeping its square icon treatment. */}
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {bmoActivities.map((activity) => (
              <RevealItem key={activity.id} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-white text-center shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]">
                  {activity.image ? (
                    <div
                      className="relative w-full shrink-0 max-h-56 bg-[linear-gradient(135deg,#F3E4CE_0%,#E9D3B4_45%,#DFC49F_100%)]"
                      style={{
                        aspectRatio: activity.width && activity.height ? `${activity.width} / ${activity.height}` : "4 / 3",
                      }}
                    >
                      <Image
                        src={activity.image}
                        alt={activity.alt ?? activity.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] w-full shrink-0 items-center justify-center bg-[linear-gradient(135deg,#F3E4CE_0%,#E9D3B4_45%,#DFC49F_100%)]">
                      <span aria-hidden="true" className="text-[length:var(--text-4xl)]">
                        {activity.emoji}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-center p-3.5">
                    <p className="text-[length:var(--text-sm)] font-semibold leading-snug text-[var(--color-maroon)]">
                      <span aria-hidden="true">{activity.emoji} </span>
                      {activity.name}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}
