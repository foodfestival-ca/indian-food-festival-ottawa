import type { Metadata } from "next";
import { Gallery } from "@/components/home/Gallery";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Gallery",
  description:
    "Photos from previous editions of the Indian Food Festival of Ottawa — the crowd, the food, the performances and the marketplace across 2024 and 2025.",
  path: "/gallery",
});

/**
 * Dedicated Gallery page. `<Gallery />` itself is unchanged (maroon ground,
 * same grid/lightbox) — only the wrapper differs from the other new pages:
 * Gallery's own section background is maroon, and rather than a plain
 * unstyled spacer (which would show a strip of the body's cream behind the
 * transparent nav — illegible against the nav's dark-ground cream text), this
 * wrapper carries the SAME maroon background so the colour reaches all the
 * way to the top of the page with no seam, exactly like Passport's own dark
 * hero. Nav.tsx already lists "/gallery" in DARK_HERO_ROUTES to match.
 *
 * `!pt-[var(--space-block)]` override on the top padding — see the matching
 * comment in app/schedule/page.tsx: without it, the section's own full
 * `section-y` padding stacks on top of this wrapper's nav clearance, leaving
 * a much bigger gap under the nav than Home/About/Passport show.
 */
export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <div className="bg-[var(--color-maroon)]" style={{ paddingTop: "calc(var(--nav-h) + var(--safe-top))" }}>
        <Gallery className="!pt-[var(--space-block)]" />
      </div>
    </>
  );
}
