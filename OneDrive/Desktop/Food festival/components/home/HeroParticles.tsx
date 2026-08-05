/**
 * Decorative floating particles over the hero image only — marigold petals
 * and warm dust motes. Fixed, hand-tuned config rather than runtime-random:
 * no JS, no hydration mismatch (server and client render identically), and
 * a designer can eyeball-tune the result instead of hoping a random seed
 * looks good. 13 particles — within the requested 10–15 range.
 *
 * Each is a plain div animated via the `.hero-particle` CSS class (transform
 * + opacity only, see globals.css) with per-particle duration/delay/opacity
 * supplied as CSS custom properties. `display: none` under reduced motion is
 * handled entirely in CSS, so this component needs no JS branching.
 */

type Particle = {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  petal?: boolean;
};

const PARTICLES: Particle[] = [
  { left: "58%", top: "78%", size: 5, duration: 13, delay: 0, opacity: 0.55, color: "var(--color-gold)" },
  { left: "72%", top: "62%", size: 7, duration: 16, delay: 1.2, opacity: 0.45, color: "var(--color-saffron)", petal: true },
  { left: "65%", top: "40%", size: 4, duration: 11, delay: 2.4, opacity: 0.6, color: "var(--color-gold-soft)" },
  { left: "84%", top: "70%", size: 6, duration: 18, delay: 0.6, opacity: 0.4, color: "var(--color-saffron)", petal: true },
  { left: "90%", top: "35%", size: 4, duration: 14, delay: 3.1, opacity: 0.5, color: "var(--color-gold)" },
  { left: "78%", top: "85%", size: 5, duration: 12, delay: 1.8, opacity: 0.5, color: "var(--color-gold-soft)" },
  { left: "62%", top: "20%", size: 4, duration: 15, delay: 4, opacity: 0.4, color: "var(--color-saffron)" },
  { left: "95%", top: "55%", size: 6, duration: 17, delay: 2.2, opacity: 0.35, color: "var(--color-gold)", petal: true },
  { left: "70%", top: "90%", size: 4, duration: 13.5, delay: 0.9, opacity: 0.5, color: "var(--color-gold-soft)" },
  { left: "55%", top: "55%", size: 5, duration: 16.5, delay: 3.6, opacity: 0.4, color: "var(--color-saffron)" },
  { left: "88%", top: "18%", size: 4, duration: 11.5, delay: 1.4, opacity: 0.55, color: "var(--color-gold)" },
  { left: "60%", top: "12%", size: 5, duration: 19, delay: 2.8, opacity: 0.35, color: "var(--color-gold-soft)", petal: true },
  { left: "82%", top: "48%", size: 4, duration: 14.5, delay: 0.3, opacity: 0.5, color: "var(--color-saffron)" },
];

export function HeroParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="hero-particle absolute block"
          style={
            {
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.petal ? "0 60% 0 60%" : "50%",
              "--particle-duration": `${p.duration}s`,
              "--particle-delay": `${p.delay}s`,
              "--particle-opacity": p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
