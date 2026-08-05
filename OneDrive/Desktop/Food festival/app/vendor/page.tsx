import type { Metadata } from "next";
import { Marketplace } from "@/components/home/Marketplace";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Become a Vendor",
  description:
    "Apply for a food stall or marketplace booth at the Indian Food Festival of Ottawa 2026 — reach fifteen thousand visitors across three days.",
  path: "/vendor",
});

/**
 * Dedicated "Become a Vendor" page. Renders the same `<Marketplace />`
 * section that used to sit on the homepage — its "Become a vendor" CTA
 * button is unchanged, so the nav link and the in-section button both lead
 * here, not to two different places.
 *
 * `!pt-[var(--space-block)]` override on the top padding — see the matching
 * comment in app/schedule/page.tsx: without it, the section's own full
 * `section-y` padding stacks on top of this wrapper's nav clearance, leaving
 * a much bigger gap under the nav than Home/About/Passport show.
 */
export default function VendorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Become a Vendor", path: "/vendor" },
        ])}
      />
      <div style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top))" }}>
        <Marketplace className="!pt-[var(--space-block)]" />
      </div>
    </>
  );
}
