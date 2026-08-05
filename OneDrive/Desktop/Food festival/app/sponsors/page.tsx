import type { Metadata } from "next";
import { Sponsors } from "@/components/home/Sponsors";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Become a Sponsor",
  description:
    "Sponsorship packages for the Indian Food Festival of Ottawa 2026 — reach fifteen thousand visitors across three days. Meet our presenting, gold and community partners.",
  path: "/sponsors",
});

/**
 * Dedicated "Become a Sponsor" page — same treatment as "Become a Vendor"
 * (/vendor renders Marketplace on its own route). Renders the same
 * `<Sponsors />` section that used to sit at the bottom of the homepage;
 * its "Become a Sponsor" CTA button is unchanged, so the nav link and the
 * in-section button both lead here, not to two different places.
 *
 * `!pt-[var(--space-block)]` override on the top padding — see the matching
 * comment in app/schedule/page.tsx: without it, the section's own full
 * `section-y` padding stacks on top of this wrapper's nav clearance, leaving
 * a much bigger gap under the nav than Home/About/Passport show.
 */
export default function SponsorsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Become a Sponsor", path: "/sponsors" },
        ])}
      />
      <div style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top))" }}>
        <Sponsors className="!pt-[var(--space-block)]" />
      </div>
    </>
  );
}
