"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface FounderPortraitProps {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "center 22%" — tunes framing per photo. */
  objectPosition?: string;
  label: string;
  priority?: boolean;
}

/**
 * Founder headshot for the "Meet the Organisers" cards on /about.
 *
 * A bespoke block rather than the shared `MediaFrame` because this needs
 * behaviour MediaFrame doesn't do: a fixed height band (not an aspect
 * ratio), a per-photo `object-position` so each face is framed on its own
 * terms, and a hover zoom. Still keeps MediaFrame's one genuinely important
 * property — an image that never fails to render, even if the file is
 * missing — via the same onError-to-placeholder pattern.
 *
 * `object-contain` on a neutral card-tinted background, not `object-cover`:
 * the source photos are different aspect ratios (a couple near-square, one
 * portrait), and `cover` on a fixed-height band was cropping into faces —
 * more so the taller the band, but even at a smaller size it still cuts
 * off headroom or chins on whichever photos don't match the band's ratio.
 * `contain` guarantees the entire photo is always visible, letterboxed
 * where the aspect ratio doesn't fill the box, which reads as a deliberate
 * framed portrait rather than a crop. `objectPosition` still nudges the
 * photo within that box per-image.
 *
 * Frame height: 192px on desktop, stepping down at smaller breakpoints —
 * slightly smaller than the previous 208px cover-cropped version, since
 * `contain` no longer needs the extra height to keep faces from being cut
 * off. Hover zoom stays at 1.02.
 */
export function FounderPortrait({
  src,
  alt,
  objectPosition = "center top",
  label,
  priority = false,
}: FounderPortraitProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="group relative h-36 w-full overflow-hidden rounded-t-[var(--radius-card)] bg-[var(--color-cream-deep)] sm:h-40 md:h-44 lg:h-48">
      {errored || !src ? (
        <div className="absolute inset-0 flex items-end bg-[linear-gradient(135deg,#F3E4CE_0%,#E9D3B4_45%,#DFC49F_100%)] p-4">
          <span className="text-[length:var(--text-xs)] font-medium uppercase tracking-[0.18em] text-[var(--color-maroon)]/55">
            {label}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectPosition }}
          className={cn(
            "object-contain transition-transform duration-300 ease-out",
            "group-hover:scale-[1.02]"
          )}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
