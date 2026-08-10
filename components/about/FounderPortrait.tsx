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
 * Frame height: 320px on desktop, stepping down at smaller breakpoints.
 * Was pushed up to 420–460px for a more spacious "leadership page" feel,
 * but on a fixed-width card that just means more crop, not more photo —
 * with object-cover, a taller frame zooms in harder rather than showing
 * more of the subject. Pulled back down to a size that reads as a portrait
 * rather than a close-up. Hover zoom stays at 1.02.
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
    <div className="group relative h-56 w-full overflow-hidden rounded-t-[var(--radius-card)] sm:h-64 md:h-72 lg:h-80">
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
