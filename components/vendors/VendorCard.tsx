"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Vendor } from "@/content/vendors";

/**
 * One vendor tile in the showcase grid.
 *
 * `image` is set for vendors with a supplied logo (see content/vendors.ts)
 * and empty for the rest, which renders the initials placeholder — a vendor
 * without artwork yet gets one automatically just by filling in `image` in
 * the data file, with no component change needed. Logos use `object-contain`
 * per spec (never crop/stretch a logo); real photography would use
 * `object-cover` — decided by whether `logo` mode applies, same convention
 * as `components/home/Sponsors.tsx`.
 */
export function VendorCard({ vendor, onOpen }: { vendor: Vendor; onOpen: (vendor: Vendor) => void }) {
  const initials = vendor.name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <button
      type="button"
      onClick={() => onOpen(vendor)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-white text-left shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-[280ms] ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
      aria-haspopup="dialog"
    >
      {/* Image / logo area — fixed height, never stretched or cropped.
          Sized down from h-40/h-44 to h-24/h-28 as part of the density pass
          that shrank the whole card; still a fixed band so grid rows stay
          perfectly aligned regardless of description length. */}
      <div className="relative flex h-24 w-full shrink-0 items-center justify-center bg-[linear-gradient(135deg,#F3E4CE_0%,#E9D3B4_45%,#DFC49F_100%)] sm:h-28">
        {vendor.image ? (
          <Image
            src={vendor.image}
            alt={vendor.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
            className="object-contain p-4"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/70 font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-bold text-[var(--color-maroon)]/60 shadow-[var(--shadow-sm)]"
          >
            {initials}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <span className="inline-flex w-fit items-center rounded-[var(--radius-pill)] bg-[var(--color-emerald)]/10 px-2 py-0.5 text-[length:var(--text-xs)] font-medium uppercase tracking-[0.06em] text-[var(--color-emerald)]">
          {vendor.category}
        </span>

        <h3 className="mt-2 font-[family-name:var(--font-display)] text-[length:var(--text-base)] font-bold leading-tight text-[var(--color-maroon)]">
          {vendor.name}
        </h3>
        <p className="mt-0.5 text-[length:var(--text-xs)] font-medium uppercase tracking-[0.04em] text-[var(--color-ink-muted)]/70">
          {vendor.cuisine}
        </p>
        {/* Hard 2-line cap — card height never grows with description length. */}
        <p className="mt-2 flex-1 line-clamp-2 text-[length:var(--text-xs)] leading-relaxed text-[var(--color-ink-muted)]">
          {vendor.description}
        </p>

        <span className="mt-3 inline-flex items-center gap-1.5 text-[length:var(--text-xs)] font-semibold text-[var(--color-saffron-deep)] transition-[gap] duration-300 group-hover:gap-2.5">
          View Menu
          <ArrowRight size={13} aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}
