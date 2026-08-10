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

/** Ornamental peacock, redrawn as a compact filled illustration for the
 *  countdown card's lower corners — a squat fanned-tail bird perched at the
 *  base of the card, the way the reference invitation places its pair of
 *  peacocks flanking the bottom lotus rather than up near the crown. Unlike
 *  the rest of this file, this one carries its own fixed brand palette
 *  (emerald body, gold/maroon eye-spots, saffron beak) instead of
 *  `currentColor` — the reference peacock reads as a coloured illustration,
 *  not a monotone line icon, and that colour is what makes it recognizable
 *  at a glance rather than "a tiny generic flourish." Drawn perched at the
 *  bottom-left, tail fanning up and to the right; mirror with `-scale-x-100`
 *  for the bottom-right side so both birds face the centre lotus. */
export function PeacockOrnament({ className }: { className?: string }) {
  const feathers = [
    { rot: -58, len: 40 },
    { rot: -38, len: 47 },
    { rot: -18, len: 51 },
    { rot: 2, len: 49 },
    { rot: 22, len: 43 },
    { rot: 40, len: 35 },
  ];
  return (
    <svg
      viewBox="0 0 76 92"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      {/* Fanned tail — filled petal feathers pivoting from the tail base,
          alternating emerald/gold with a small maroon-and-saffron eye. */}
      {feathers.map((f, i) => (
        <g key={i} transform={`rotate(${f.rot} 26 78)`} opacity={0.95}>
          <path
            d={`M26 78 C ${26 - 7} ${78 - f.len * 0.55} ${26 - 3.5} ${78 - f.len} 26 ${78 - f.len - 5} C ${26 + 3.5} ${78 - f.len} ${26 + 7} ${78 - f.len * 0.55} 26 78 Z`}
            fill={i % 2 === 0 ? "var(--color-emerald)" : "var(--color-gold)"}
            opacity="0.88"
          />
          <circle cx="26" cy={78 - f.len - 1} r="3.1" fill="var(--color-maroon)" opacity="0.9" />
          <circle cx="26" cy={78 - f.len - 1} r="1.4" fill="var(--color-saffron)" />
        </g>
      ))}
      {/* Body. */}
      <ellipse cx="26" cy="80" rx="8.5" ry="10.5" fill="var(--color-emerald)" opacity="0.95" />
      <ellipse cx="24" cy="83" rx="6" ry="7.5" fill="var(--color-maroon)" opacity="0.22" />
      {/* Neck + head, curved forward and up. */}
      <path
        d="M30 74 C38 68 43 58 41 48"
        stroke="var(--color-emerald)"
        strokeWidth="6.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="42" cy="45" r="5" fill="var(--color-emerald)" />
      {/* Crest. */}
      <path
        d="M41 40 L39.5 34 M42.5 39.5 L43.5 33 M44.5 40.5 L48 35"
        stroke="var(--color-gold)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Beak. */}
      <path d="M46.5 45 L51 46 L46.5 48Z" fill="var(--color-saffron)" />
      {/* Legs. */}
      <path d="M23 89 L22 92 M28 89 L29 92" stroke="var(--color-maroon)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** Symmetrical gold filigree emblem for the apex of an arched card — a
 *  scrollwork crest with a small central gem, replacing a single finial
 *  where the brief calls for the top treatment to feel "designed," not a
 *  single dot. currentColor for the scrollwork, a fixed gold gem centre. */
export function CrownOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 92 34"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M46 32 C46 22 41 17 46 9" opacity="0.75" />
        <path d="M46 9 C35 9 31 3 23 5" opacity="0.6" />
        <path d="M46 9 C57 9 61 3 69 5" opacity="0.6" />
        <path d="M23 5 C17 5 13 9 9 7" opacity="0.5" />
        <path d="M69 5 C75 5 79 9 83 7" opacity="0.5" />
        <circle cx="9" cy="7" r="1.6" fill="currentColor" stroke="none" opacity="0.6" />
        <circle cx="83" cy="7" r="1.6" fill="currentColor" stroke="none" opacity="0.6" />
      </g>
      <path
        d="M46 1 L49.3 7.4 56.2 8.8 49.3 10.2 46 16.6 42.7 10.2 35.8 8.8 42.7 7.4Z"
        fill="var(--color-gold)"
        opacity="0.95"
      />
    </svg>
  );
}

/** Thin leaf-and-vine trace for a card's inner side edges — a repeating,
 *  alternating pair of small leaves off a central stem. `preserveAspectRatio
 *  ="none"` lets it stretch to whatever height its container renders at
 *  (the countdown card's height changes with its phase content), which
 *  distorts the leaves only slightly and keeps the vine reaching the full
 *  edge at every breakpoint rather than leaving a gap. currentColor stem,
 *  fixed emerald leaves — the one other spot of green the palette allows. */
export function VineBorder({ className }: { className?: string }) {
  const nodes = [16, 54, 92, 130, 168, 204];
  return (
    <svg
      viewBox="0 0 20 220"
      preserveAspectRatio="none"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="10" y1="2" x2="10" y2="218" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      {nodes.map((y, i) => (
        <g key={i} opacity="0.75">
          <path d={`M10 ${y} C 2 ${y - 7} 2 ${y + 5} 10 ${y + 11}`} fill="none" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="4.5" cy={y + 2} rx="3.2" ry="1.7" fill="var(--color-emerald)" opacity="0.6" transform={`rotate(-25 4.5 ${y + 2})`} />
          <path d={`M10 ${y + 16} C 18 ${y + 9} 18 ${y + 21} 10 ${y + 27}`} fill="none" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="15.5" cy={y + 18} rx="3.2" ry="1.7" fill="var(--color-emerald)" opacity="0.6" transform={`rotate(25 15.5 ${y + 18})`} />
        </g>
      ))}
    </svg>
  );
}

/** Full, filled lotus bloom for the base of the card — five saffron petals
 *  around a gold centre with a pair of emerald leaf strokes, considerably
 *  larger and more figurative than `LotusCap`'s thin bud, matching the
 *  reference's colourful bottom flower rather than a small line motif. */
export function LotusBloom({ className }: { className?: string }) {
  const petals = [-42, -21, 0, 21, 42];
  return (
    <svg
      viewBox="0 0 64 46"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
      focusable="false"
    >
      {petals.map((deg, i) => (
        <path
          key={deg}
          d="M32 40 C24 29 24 15 32 4 C40 15 40 29 32 40Z"
          fill={i === 2 ? "var(--color-saffron)" : "var(--color-saffron-deep)"}
          opacity={i === 2 ? 0.96 : 0.78}
          transform={`rotate(${deg} 32 40)`}
        />
      ))}
      <circle cx="32" cy="33" r="4.4" fill="var(--color-gold)" opacity="0.95" />
      <path d="M14 43 C21 39 27 39 32 43" stroke="var(--color-emerald)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />
      <path d="M50 43 C43 39 37 39 32 43" stroke="var(--color-emerald)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75" />
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
