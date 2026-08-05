import Image from "next/image";
import { festival } from "@/content/festival";
import { cn } from "@/lib/cn";

/**
 * Official festival lockup — Navatara's Indian Food Festival of Ottawa.
 *
 * Two supplied colourways plus one derived:
 *   orange #EE4D2C  → light grounds (cream, cream-deep, white)
 *   amber  #ED8D0B  → supplied alternate, kept available
 *   cream  #FDF8F0  → DERIVED from the orange master by alpha recolour.
 *                     Used on the maroon footer: 10.9:1 against #6B1028,
 *                     versus 4.7:1 for amber and 3.3:1 for orange.
 *
 * Intrinsic ratio is 442×483 (0.9151). Width is always computed from height
 * so the mark can never be stretched, and both dimensions are passed to
 * next/image so the box is reserved before load — zero CLS.
 */

const VARIANTS = {
  orange: "/brand/logo-orange.png",
  amber: "/brand/logo-amber.png",
  cream: "/brand/logo-cream.png",
} as const;

const INTRINSIC = { w: 442, h: 483 } as const;
const RATIO = INTRINSIC.w / INTRINSIC.h;

export type LogoVariant = keyof typeof VARIANTS;

interface LogoProps {
  /** Pick by ground: light → "orange", maroon → "cream". */
  variant?: LogoVariant;
  /** Rendered height in px. Width is derived, never set independently. */
  height?: number;
  className?: string;
  priority?: boolean;
  /** True when the logo is decorative because adjacent text already names
   *  the festival (e.g. the footer, which repeats the name beneath it). */
  decorative?: boolean;
}

export function Logo({
  variant = "orange",
  height = 52,
  className,
  priority = false,
  decorative = false,
}: LogoProps) {
  const width = Math.round(height * RATIO);

  return (
    <Image
      src={VARIANTS[variant]}
      alt={decorative ? "" : `${festival.name} — Navatara Inc.`}
      aria-hidden={decorative || undefined}
      width={width}
      height={height}
      priority={priority}
      quality={90}
      className={cn("h-auto w-auto select-none", className)}
      style={{ height, width }}
      sizes={`${width}px`}
    />
  );
}
