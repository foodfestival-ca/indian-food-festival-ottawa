import type { Metadata } from "next";
import { Section, Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { GoldRule, MandalaCorner } from "@/components/ornament/Ornaments";
import { VendorsShowcase } from "@/components/vendors/VendorsShowcase";
import { VendorHighlights } from "@/components/vendors/VendorHighlights";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { vendorsHero } from "@/content/vendors";

export const metadata: Metadata = pageMeta({
  title: "Meet Our Festival Vendors",
  description:
    "Meet the restaurants of the Indian Food Festival of Ottawa 2026 — over twenty vendors spanning South Indian, Hyderabadi, Himalayan, Gujarati, Maharashtrian and more, each with its own signature menu.",
  path: "/vendor",
});

/**
 * Food Vendors showcase — replaces the old category-based Marketplace
 * layout (Local Businesses, Apparel, Accessories, Community Vendors) with a
 * premium restaurant directory driven entirely by content/vendors.ts.
 *
 * Structure:
 *  - Hero (this file, Server Component, static — matches the About page's
 *    hero pattern: MandalaCorner ornament, eyebrow, GoldRule, display title).
 *  - VendorsShowcase (client) — search, cuisine filter chips, card grid,
 *    "View Menu" modal.
 *  - VendorHighlights (Server Component, static) — closing "A Culinary
 *    Journey Across India" section.
 *
 * `!pt-[var(--space-block)]` on the hero's own padding-top override, same
 * as every other dedicated page — see the matching comment previously on
 * this file: without it the first section's full `section-y` padding stacks
 * on top of the wrapper's nav clearance.
 */
export default function VendorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Festival Vendors", path: "/vendor" },
        ])}
      />

      <div style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top))" }}>
        {/* Hero */}
        <section
          className="relative overflow-hidden bg-[var(--color-cream)]"
          style={{ paddingTop: "var(--space-block)", paddingBottom: "var(--space-block)" }}
        >
          <MandalaCorner className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 text-[var(--color-gold)] opacity-[0.08] lg:h-96 lg:w-96" />
          <Container className="relative text-center">
            <Reveal>
              <p className="eyebrow">{vendorsHero.eyebrow}</p>
              <GoldRule className="mx-auto mt-3 mb-6 max-w-[12rem]" />
              <h1 className="mx-auto max-w-[24ch] font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] font-extrabold leading-[var(--leading-display)] text-[var(--color-maroon)]">
                {vendorsHero.title}
              </h1>
              <p className="mx-auto mt-3 max-w-[32ch] font-[family-name:var(--font-display)] text-[length:var(--text-xl)] italic text-[var(--color-saffron-deep)]">
                {vendorsHero.subtitle}
              </p>
              <p className="mx-auto mt-6 max-w-[56ch] text-[length:var(--text-lg)] leading-[var(--leading-body)] text-[var(--color-ink-muted)]">
                {vendorsHero.description}
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Showcase — search, filters, grid, modal */}
        <Section id="vendors" ground="cream-deep" labelledBy="vendors-heading" cv={false}>
          <h2 id="vendors-heading" className="sr-only-focusable">
            Festival vendors
          </h2>
          <VendorsShowcase />
        </Section>

        {/* Highlights */}
        <Section id="vendor-highlights" ground="cream">
          <VendorHighlights />
        </Section>
      </div>
    </>
  );
}
