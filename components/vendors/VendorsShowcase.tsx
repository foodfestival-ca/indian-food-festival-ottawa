"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { vendors, VENDOR_CATEGORIES, NON_FOOD_CATEGORIES, isFoodVendor, type Vendor } from "@/content/vendors";
import { VendorCard } from "@/components/vendors/VendorCard";
import { VendorModal } from "@/components/vendors/VendorModal";

/** Cuisine filter chips only ever apply to the Food Vendors group — derived
 *  from `VENDOR_CATEGORIES` minus `NON_FOOD_CATEGORIES` (both from
 *  content/vendors.ts) rather than a hardcoded list, so a future category
 *  added to either array is reflected here automatically. */
const FOOD_CATEGORIES = VENDOR_CATEGORIES.filter((c) => !NON_FOOD_CATEGORIES.includes(c));
const FILTERS = ["All", ...FOOD_CATEGORIES] as const;

/**
 * Search + cuisine filter + two-section grid ("Food Vendors" and "Product &
 * Marketplace Vendors") + modal — the interactive core of the /vendor page.
 * Everything above (hero) and below (highlights) this component is static
 * and lives directly in app/vendor/page.tsx as a Server Component; only the
 * parts that need state are client-side.
 *
 * The Food/Product split is a hard partition driven entirely by
 * `isFoodVendor()` (content/vendors.ts, itself driven by `category` — never
 * a hardcoded vendor name or id), same principle as the Preview
 * Night/Kids Zone partitions in GalleryShowcase.tsx. Search is global (one
 * box, filters both groups by name/cuisine); the cuisine filter chips only
 * ever narrow the Food group — there's no equivalent chip row for Product &
 * Marketplace, since 5 vendors don't need one (per the Phase 4 brief).
 *
 * Filtering is client-side over the ~26-vendor array in content/vendors.ts —
 * no debounce needed at this size, filters instantly with no page reload.
 */
export function VendorsShowcase() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Vendor | null>(null);

  const matchesQuery = (v: Vendor, q: string) =>
    q.length === 0 || v.name.toLowerCase().includes(q) || v.cuisine.toLowerCase().includes(q);

  const foodVendors = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vendors.filter((v) => {
      if (!isFoodVendor(v)) return false;
      const matchesFilter = filter === "All" || v.category === filter;
      return matchesFilter && matchesQuery(v, q);
    });
  }, [query, filter]);

  const productVendors = useMemo(() => {
    const q = query.trim().toLowerCase();
    // No category filter here by design — the cuisine chips above only
    // ever apply to Food Vendors (see FOOD_CATEGORIES/FILTERS above).
    return vendors.filter((v) => !isFoodVendor(v) && matchesQuery(v, q));
  }, [query]);

  return (
    <Container className="!max-w-[100rem]">
      {/* Search */}
      <div className="mx-auto max-w-[32rem]">
        <label htmlFor="vendor-search" className="sr-only-focusable">
          Search vendors or cuisine
        </label>
        <div className="relative">
          <Search
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]/60"
          />
          <input
            id="vendor-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vendors or cuisine..."
            className="w-full rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-white py-3 pl-11 pr-4 text-[length:var(--text-sm)] text-[var(--color-ink)] shadow-[var(--shadow-sm)] outline-none transition-shadow placeholder:text-[var(--color-ink-muted)]/60 focus-visible:shadow-[var(--shadow-md)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-maroon)]"
          />
        </div>
      </div>

      {/* ---------- Food Vendors ---------- */}
      <section aria-labelledby="food-vendors-heading" className="mt-14">
        <SectionHeader
          id="food-vendors-heading"
          eyebrow="Restaurants & Kitchens"
          title="Food Vendors"
          align="center"
          className="!max-w-none"
        />

        {/* Cuisine filter chips — Food Vendors only, never applied to
            Product & Marketplace below. */}
        <div
          className="mt-6 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter food vendors by cuisine"
        >
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={cn(
                  "tap-target rounded-[var(--radius-pill)] px-4 text-[length:var(--text-sm)] font-medium transition-colors",
                  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-maroon)]",
                  isActive
                    ? "bg-[var(--color-maroon)] text-[var(--color-cream)]"
                    : "bg-white text-[var(--color-ink)] shadow-[var(--shadow-sm)] hover:bg-[var(--color-cream-deep)]"
                )}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Grid — 1 / 2 / 3 / 5 per row (mobile / small tablet / tablet / ≥1024px),
            denser gap to match the smaller cards, so a 1920×1080 desktop shows
            roughly two full rows without scrolling. 5-per-row triggers at `lg`
            (1024px) rather than `xl` (1280px) — at the old xl threshold, two
            people on browser windows just above and just below 1280px
            CSS-pixels wide (not screen resolution — actual browser viewport
            width, which shrinks with any non-maximized window, side panel, or
            OS scaling) would legitimately see a different column count. That's
            expected responsive behaviour, not a bug, but `lg` makes 5-per-row
            the common case on ordinary desktop windows instead of requiring a
            nearly-full-width one. */}
        {foodVendors.length > 0 ? (
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {foodVendors.map((vendor) => (
              <RevealItem key={vendor.id} className="h-full">
                <VendorCard vendor={vendor} onOpen={setActive} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <p className="mt-16 text-center text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
            No food vendors match &ldquo;{query}&rdquo;. Try a different search or filter.
          </p>
        )}
      </section>

      {/* ---------- Product & Marketplace Vendors ---------- */}
      {/* Rendered as its own labeled section, same card/grid styling as Food
          Vendors above, but deliberately no cuisine filter row — 5 vendors
          don't need one (and cuisine filtering never applied to them,
          conceptually — the chips above are a food-specific control). */}
      <section aria-labelledby="product-vendors-heading" className="mt-16">
        <SectionHeader
          id="product-vendors-heading"
          eyebrow="Beyond the Menu"
          title="Product & Marketplace Vendors"
          align="center"
          className="!max-w-none"
        />

        {productVendors.length > 0 ? (
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {productVendors.map((vendor) => (
              <RevealItem key={vendor.id} className="h-full">
                <VendorCard vendor={vendor} onOpen={setActive} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <p className="mt-16 text-center text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
            No product or marketplace vendors match &ldquo;{query}&rdquo;. Try a different search.
          </p>
        )}
      </section>

      <VendorModal vendor={active} onClose={() => setActive(null)} />
    </Container>
  );
}
