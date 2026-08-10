import { cn } from "@/lib/cn";

/** Decorative SVGs. All are aria-hidden — they carry no information.
 *  Rule: at most one ornamental element per viewport. */

export function GoldRule({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-gold)]/60" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
        <path d="M8 0.5 10.2 5.8 15.5 8 10.2 10.2 8 15.5 5.8 10.2 0.5 8 5.8 5.8Z" fill="var(--color-gold)" opacity="0.85" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-gold)]/60" />
    </div>
  );
}

export function MandalaCorner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" fill="none" strokeWidth="1">
        <circle cx="100" cy="100" r="92" opacity="0.5" />
        <circle cx="100" cy="100" r="70" opacity="0.7" />
        <circle cx="100" cy="100" r="44" opacity="0.5" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16;
          return (
            <g key={i} transform={`rotate(${(i * 360) / 16} 100 100)`}>
              <path d="M100 8 C112 32 112 56 100 78 C88 56 88 32 100 8Z" opacity="0.55" />
              <circle cx={100 + 84 * Math.cos(a)} cy={100 + 84 * Math.sin(a)} r="1.6" fill="currentColor" opacity="0.6" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** A single paisley-leaf corner flourish, anchored top-left. Rotate with a
 *  Tailwind rotate utility to reuse at the other three corners of a card —
 *  see Countdown.tsx. currentColor-driven, same thin-stroke language as
 *  MandalaCorner and GoldRule's diamond, so all three read as one family. */
export function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" fill="none" strokeWidth="1.1" strokeLinecap="round">
        <path d="M2 16 C2 8 8 2 16 2" opacity="0.65" />
        <path d="M2 9 C2 5 5 2 9 2" opacity="0.45" />
        <path d="M2 2 C8 2 8 9 3 10 C1 6 1 4 2 2Z" fill="currentColor" stroke="none" opacity="0.5" />
      </g>
    </svg>
  );
}

/** The ticket-notch panel edge used by the countdown, per the design reference. */
export function TicketNotch({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[var(--color-cream)]",
        side === "left" ? "-left-3" : "-right-3"
      )}
    />
  );
}

/** Small gem/finial marking the apex of an arched shape — sits astride the
 *  top edge of the countdown card's dome, half on/half off. currentColor
 *  for the outer facets, a fixed cream core so it reads as a "set stone"
 *  rather than a flat diamond. */
export function PeakGem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 1 L15.2 8.2 22.5 12 15.2 15.8 12 23 8.8 15.8 1.5 12 8.8 8.2Z" fill="currentColor" opacity="0.92" />
      <circle cx="12" cy="12" r="2.6" fill="var(--color-cream)" opacity="0.95" />
    </svg>
  );
}

/** Small lotus-bud flourish that hangs beneath the countdown card's lower
 *  edge — the "pointed drop" cue an arched invitation card usually closes
 *  on. currentColor for the petal line-work, a single saffron accent dot
 *  at the bud's centre (the one spot of warm colour allowed this low on
 *  the card, per the "restrained, not clip-art" brief). */
export function LotusCap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 24"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeWidth="1.1" strokeLinecap="round">
        <path d="M20 1 C23 6 25 9 20 15 C15 9 17 6 20 1Z" fill="currentColor" stroke="none" opacity="0.85" />
        <path d="M20 5 C25 8 30 9 35 6" stroke="currentColor" opacity="0.45" />
        <path d="M20 5 C15 8 10 9 5 6" stroke="currentColor" opacity="0.45" />
        <circle cx="20" cy="13" r="1.8" fill="var(--color-saffron)" opacity="0.9" />
      </g>
    </svg>
  );
}

/** Stylized ornamental peacock, Rajasthani/Mughal-invitation style rather
 *  than a literal illustration — a curved body/neck line, a small crested
 *  head, and a fanned tail of teardrop feathers each tipped with a small
 *  concentric "eye" (the one place fixed brand accent colours — emerald,
 *  gold, saffron — are used, everything else is `currentColor` line-work so
 *  the bird recolors with its parent like the rest of the ornament family).
 *  Drawn facing right; mirror with a `-scale-x-100` utility to face left. */
export function PeacockOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 110 130"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        {/* Tail fan, five feathers radiating from the tail base. */}
        {[
          { d: "M34 96 C22 70 18 40 30 12", eye: [30, 12] },
          { d: "M36 98 C28 74 28 46 42 18", eye: [42, 18] },
          { d: "M40 100 C38 78 42 52 56 28", eye: [56, 28] },
          { d: "M45 101 C48 82 58 60 70 40", eye: [70, 40] },
          { d: "M50 100 C58 86 72 70 82 54", eye: [82, 54] },
        ].map((f, i) => (
          <g key={i} opacity={0.85 - i * 0.06}>
            <path d={f.d} />
            <circle cx={f.eye[0]} cy={f.eye[1]} r="4.2" opacity="0.9" />
            <circle
              cx={f.eye[0]}
              cy={f.eye[1]}
              r="2.1"
              fill={i % 2 === 0 ? "var(--color-emerald)" : "var(--color-saffron)"}
              stroke="none"
              opacity="0.85"
            />
            <circle cx={f.eye[0]} cy={f.eye[1]} r="0.8" fill="var(--color-gold)" stroke="none" />
          </g>
        ))}
        {/* Body + arched neck. */}
        <path d="M34 98 C30 106 34 114 44 116 C54 118 60 112 58 104" opacity="0.9" />
        <path d="M44 116 C50 108 54 92 66 78 C74 68 78 56 76 46" opacity="0.9" />
        {/* Head + small crest. */}
        <circle cx="77" cy="42" r="5" fill="currentColor" stroke="none" opacity="0.9" />
        <path d="M76 36 L74 30 M78 35 L79 29 M80 37 L84 32" opacity="0.8" />
        {/* Legs. */}
        <path d="M46 116 L44 126 M52 117 L52 127" opacity="0.6" />
      </g>
    </svg>
  );
}

/** Larger, more detailed paisley than `CornerFlourish` — a filled comma body
 *  with an inner curl and a trailing dot, the classic Indian "mango" motif.
 *  Used where the ornament needs more presence than a corner accent (flanking
 *  the bottom finial, mid-card). currentColor-driven. */
export function PaisleyMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 56"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 2 C34 2 36 20 26 30 C18 38 20 44 30 46 C24 52 10 52 6 42 C2 32 8 26 14 22 C22 16 22 8 20 2Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M20 8 C28 10 29 20 22 26"
        fill="none"
        stroke="var(--color-cream)"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle cx="30" cy="46" r="1.6" fill="var(--color-saffron)" opacity="0.85" />
    </svg>
  );
}

/** Small five-petal flower with two leaves — fills a gap near the bottom
 *  finial or a corner without repeating the paisley motif. Petals and leaf
 *  keep to the brand's saffron/emerald accents; the rest is currentColor. */
export function FloralSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M16 20 C12 24 8 24 5 27" />
        <path d="M16 20 C10 21 7 18 4 19" />
      </g>
      <ellipse cx="7" cy="24" rx="3.4" ry="1.8" fill="var(--color-emerald)" opacity="0.6" transform="rotate(-30 7 24)" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="16"
          cy="12"
          rx="3.2"
          ry="6"
          fill="var(--color-saffron)"
          opacity="0.75"
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="2.4" fill="var(--color-gold)" opacity="0.95" />
    </svg>
  );
}

export function DottedArc({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={cn("w-full", className)} aria-hidden="true" focusable="false">
      <path
        d="M2 22 Q120 -8 238 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1 7"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
