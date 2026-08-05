"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Per-image graceful fallback — not a single global switch.
 *
 * Real photography lands in /public/media one file at a time (see
 * public/media/food/jigarthanda.jpg for the first one), not all at once, so
 * this can no longer be an all-or-nothing `MEDIA_READY` boolean covering
 * every MediaFrame on the site. Every frame now tries to render its real
 * `src`; only if that specific image actually fails to load (the file for
 * that dish/category/sponsor genuinely isn't there yet) does it fall back to
 * the warm placeholder, so the layout, aspect ratios and motion still read
 * correctly for anything that hasn't got a photo yet.
 *
 * An empty `src` (several placeholder entries — e.g. Gallery.tsx's
 * PLACEHOLDERS — still use `src: ""` for slots with no photo assigned yet)
 * is treated the same as "failed to load" up front, rather than ever handing
 * `next/image` an empty string: that's an invalid `src` Next.js warns about
 * loudly in the console, and it never fires `onError` since no request is
 * even attempted.
 */
interface MediaFrameProps {
  src: string;
  alt: string;
  /** Placeholder label — usually the dish or category name. */
  label?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
}

export function MediaFrame({
  src,
  alt,
  label,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
  rounded = true,
}: MediaFrameProps) {
  const [errored, setErrored] = useState(false);

  const shell = cn(
    "relative overflow-hidden bg-[var(--color-cream-deep)]",
    rounded && "rounded-[var(--radius-media)]",
    className
  );

  if (errored || !src) {
    return (
      <div className={shell} role="img" aria-label={alt}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#F3E4CE_0%,#E9D3B4_45%,#DFC49F_100%)]" />
        <svg viewBox="0 0 200 200" className="absolute -right-6 -bottom-8 h-40 w-40 text-[var(--color-maroon)] opacity-[0.10]" aria-hidden="true">
          <g stroke="currentColor" fill="none" strokeWidth="1.5">
            <circle cx="100" cy="100" r="80" />
            <circle cx="100" cy="100" r="56" />
            {Array.from({ length: 12 }).map((_, i) => (
              <path key={i} transform={`rotate(${i * 30} 100 100)`} d="M100 20 C110 44 110 66 100 84 C90 66 90 44 100 20Z" />
            ))}
          </g>
        </svg>
        {label && (
          <span className="absolute inset-x-0 bottom-0 p-3 text-[length:var(--text-xs)] font-medium uppercase tracking-[0.18em] text-[var(--color-maroon)]/55">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={shell}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
