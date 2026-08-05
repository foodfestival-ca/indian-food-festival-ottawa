"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { vendors, VENDOR_CATEGORIES, type Vendor } from "@/content/vendors";
import { VendorCard } from "@/components/vendors/VendorCard";
import { VendorModal } from "@/components/vendors/VendorModal";

const FILTERS = ["All", ...VENDOR_CATEGORIES] as const;

/**
 * Search + cuisine filter + grid + "View Menu" modal — the interactive core
 * of the /vendor page. Everything above (hero) and below (highlights) this
 * component is static and lives directly in app/vendor/page.tsx as a Server
 * Component; only the parts that need state are client-side.
 *
 * Filtering is client-side over the ~23-vendor array in content/vendors.ts —
 * no debounce needed at this size, filters instantly with no page reload.
 */
export function VendorsShowcase() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Vendor | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return vendors.filter((v) => {
      const matchesFilter = filter === "All" || v.category === filter;
      const matchesQuery =
        q.length === 0 || v.name.toLowerCase().includes(q) || v.cuisine.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

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

      {/* Cuisine filter chips */}
      <div
        className="mt-6 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter vendors by cuisine"
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

      {/* Grid — 1 / 2 / 3 / 5 per row (mobile / small tablet / tablet / ≥1280px),
          denser gap to match the smaller cards, so a 1920×1080 desktop shows
          roughly two full rows (10+ vendors) without scrolling. */}
      {filtered.length > 0 ? (
        <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {filtered.map((vendor) => (
            <RevealItem key={vendor.id} className="h-full">
              <VendorCard vendor={vendor} onOpen={setActive} />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <p className="mt-16 text-center text-[length:var(--text-sm)] text-[var(--color-ink-muted)]">
          No vendors match &ldquo;{query}&rdquo;. Try a different search or filter.
        </p>
      )}

      <VendorModal vendor={active} onClose={() => setActive(null)} />
    </Container>
  );
}
