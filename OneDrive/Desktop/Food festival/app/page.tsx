import { Hero } from "@/components/home/Hero";
import { FactsBar } from "@/components/home/FactsBar";
import { WhyVisit } from "@/components/home/WhyVisit";
import { PassportCTA } from "@/components/home/PassportCTA";
import { JsonLd, eventJsonLd } from "@/lib/jsonld";

/**
 * HOME — the landing page and festival overview, in a true multi-page site.
 *
 * Marketplace, Gallery, Schedule and Venue each moved to their own route
 * (`/vendor`, `/gallery`, `/schedule`, `/venue`) — see Nav.tsx and each page
 * under app/. Contact was later merged into `/about` and FAQ was merged
 * into `/venue` (their own former standalone routes now just redirect
 * there); `faqJsonLd()` moved along with the FAQ section to
 * app/venue/page.tsx, since FAQPage structured data belongs alongside the
 * content it actually describes. Performances later moved to `/schedule`
 * (see components/home/Performances.tsx and app/schedule/page.tsx) — stage
 * content belongs next to the schedule that tells you when it's on. Sponsors
 * later moved to `/sponsors`, matching the same "Become a Vendor" pattern
 * (see components/home/Sponsors.tsx and app/sponsors/page.tsx) — its own
 * "Become a Sponsor" CTA button is unchanged, so the nav link and the
 * in-section button both lead to the same place, not two different ones.
 *
 * Narrative order (what's left, in its original relative order):
 *   DESIRE    Hero · FactsBar · WhyVisit
 *   ACT       PassportCTA
 *
 * Featured Flavours (the five-dish showcase) was removed from the homepage
 * entirely, along with its "Five States on One Plate" bento card in WhyVisit
 * (see content/whyVisit.ts) — not moved to its own route, just taken out.
 *
 * Thali rule — no two adjacent sections share a ground:
 *   cream → white → cream-deep → MAROON
 * PassportCTA (maroon) is now the last section on the page, directly above
 * the Footer (also maroon, by brand design — see Footer.tsx) — the one
 * seam that can't be resolved by reordering since nothing else is left to
 * put between them. Footer now carries a hairline top border for exactly
 * this case, so the two maroon blocks still read as separate sections
 * rather than merging into one.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={[eventJsonLd()]} />
      <Hero />
      <FactsBar />
      <WhyVisit />
      <PassportCTA />
    </>
  );
}
