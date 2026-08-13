import type { Metadata } from "next";
import { Venue } from "@/components/home/Venue";
import { Faq } from "@/components/home/Faq";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Venue",
  description:
    "Clarke Fields Park, Nepean — directions, parking and accessibility for the Indian Food Festival of Ottawa 2026, August 21-23. Free admission, free parking, level access throughout. Plus frequently asked questions.",
  path: "/venue",
});

/**
 * Venue page. `faqJsonLd()` moved here from the former standalone /faqs
 * route — FAQPage structured data should sit alongside the visible FAQ
 * content it describes, which now lives at the end of this page.
 *
 * Venue gets a `!pt-[var(--space-block)]` override on its own top padding —
 * see the matching comment in app/schedule/page.tsx for why: without it, the
 * page-top section stacks its own full `section-y` padding on top of this
 * wrapper's nav clearance, leaving a much bigger gap under the nav than
 * Home/About/Passport show. Faq (further down the page) keeps normal spacing.
 */
export default function VenuePage() {
  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Venue", path: "/venue" },
          ]),
        ]}
      />
      <div style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top))" }}>
        <Venue className="!pt-[var(--space-block)]" />
        {/* Venue's own ground is cream; Faq's ground is white — Thali rule
            (no two adjacent same-ground sections) holds. */}
        <Faq />
      </div>
    </>
  );
}
