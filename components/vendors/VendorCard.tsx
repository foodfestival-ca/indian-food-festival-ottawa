"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Vendor } from "@/content/vendors";

/**
 * One vendor tile in the showcase grid.
 *
 * `image` is empty for every vendor in content/vendors.ts (the source
 * document had no photography), so in practice this always renders the
 * initials placeholder — but the `Image` branch is kept live so a vendor
 * can get real artwork later just by filling in `image` in the data file,
 * with no component change needed. Placeholder logos use `object-contain`
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
      {/* Image / logo area — fixed height, never stretched or cropped. */}
      <div className="relative flex h-40 w-full shrink-0 items-center justify-center bg-[linear-gradient(135deg,#F3E4CE_0%,#E9D3B4_45%,#DFC49F_100%)] sm:h-44">
        {vendor.image ? (
          <Image
            src={vendor.image}
            alt={vendor.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-16 w-16 place-items-center rounded-full bg-white/70 font-[family-name:var(--font-display)] text-[length:var(--text-xl)] font-bold text-[var(--color-maroon)]/60 shadow-[var(--shadow-sm)]"
          >
            {initials}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit items-center rounded-[var(--radius-pill)] bg-[var(--color-emerald)]/10 px-2.5 py-1 text-[length:var(--text-xs)] font-medium uppercase tracking-[0.08em] text-[var(--color-emerald)]">
          {vendor.category}
        </span>

        <h3 className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold leading-tight text-[var(--color-maroon)]">
          {vendor.name}
        </h3>
        <p className="mt-1 text-[length:var(--text-xs)] font-medium uppercase tracking-[0.06em] text-[var(--color-ink-muted)]/70">
          {vendor.cuisine}
        </p>
        <p className="mt-3 flex-1 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-ink-muted)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
          {vendor.description}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-[length:var(--text-sm)] font-semibold text-[var(--color-saffron-deep)] transition-[gap] duration-300 group-hover:gap-2.5">
          View Menu
          <ArrowRight size={15} aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}
