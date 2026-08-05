"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface FounderPortraitProps {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "center 15%" — tunes face framing per photo. */
  position?: string;
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
 */
export function FounderPortrait({ src, alt, position = "center top", label, priority = false }: FounderPortraitProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div className="group relative h-72 w-full overflow-hidden rounded-t-[var(--radius-card)] sm:h-80 md:h-96 lg:h-[400px]">
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
          style={{ objectPosition: position }}
          className={cn(
            "object-cover transition-transform duration-300 ease-out",
            "group-hover:scale-[1.03]"
          )}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}
