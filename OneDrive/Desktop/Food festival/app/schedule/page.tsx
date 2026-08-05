import type { Metadata } from "next";
import { Schedule } from "@/components/home/Schedule";
import { Performances } from "@/components/home/Performances";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Schedule",
  description:
    "The full three-day schedule for the Indian Food Festival of Ottawa 2026 — performances, stage times and what's on each day, August 21-23 at Clarke Fields Park.",
  path: "/schedule",
});

/**
 * Dedicated Schedule page. `<Schedule />` is unchanged from its homepage
 * version (same section, same design) — it's just rendered on its own route
 * now instead of scrolled to via `#schedule`. The wrapping div only adds the
 * top clearance the fixed nav needs; it carries no visual styling of its own.
 *
 * `<Performances />` moved here from the homepage — the stage lineup belongs
 * next to the schedule that says when each act is on, not on the landing
 * page. Schedule's own ground is cream-deep and Performances is maroon, so
 * the Thali rule (no two adjacent same-ground sections) still holds.
 *
 * Schedule gets a `!pt-[var(--space-block)]` override: every Section normally
 * carries its own `section-y` padding (`--space-section`, up to 10rem) on
 * both top and bottom, which is right for spacing BETWEEN sections but stacks
 * on top of this wrapper's own nav clearance for whichever section is first
 * on the page — leaving a much bigger gap under the nav than Home, About or
 * Passport show (their own first blocks use the smaller `--space-block`
 * directly, once, with nothing stacked on top). Only the first section on
 * the page needs the override; Performances keeps its normal spacing.
 */
export default function SchedulePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Schedule", path: "/schedule" },
        ])}
      />
      <div style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top))" }}>
        <Schedule className="!pt-[var(--space-block)]" />
        <Performances />
      </div>
    </>
  );
}
