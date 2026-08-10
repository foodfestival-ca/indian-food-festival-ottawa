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
 * Frame height: 208px on desktop, stepping down at smaller breakpoints.
 * Was pushed up to 420–460px for a more spacious "leadership page" feel,
 * then pulled back to 320px, but the photos were still dominating the
 * card next to the name/role/bio text below. Sized down again so the
 * portrait reads as a supporting element of the card rather than the
 * headline — same 3-column grid, same object-position per photo, just a
 * smaller fixed band. Hover zoom stays at 1.02.
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
    <div className="group relative h-40 w-full overflow-hidden rounded-t-[var(--radius-card)] sm:h-44 md:h-48 lg:h-52">
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
            "object-cover transition-transform duration-300 ease-out",
            "group-hover:scale-[1.02]"
          )}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
