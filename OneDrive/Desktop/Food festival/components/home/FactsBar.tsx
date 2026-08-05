import { ChefHat, Music, Users, CalendarDays, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/motion/Counter";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { festival } from "@/content/festival";

const ICONS = [ChefHat, Music, Users, CalendarDays] as const;
const TINTS = [
  "bg-[var(--color-saffron)]/12 text-[var(--color-saffron-deep)]",
  "bg-[var(--color-emerald)]/12 text-[var(--color-emerald)]",
  "bg-[var(--color-gold)]/18 text-[#8A6D0B]",
  "bg-[var(--color-maroon)]/10 text-[var(--color-maroon)]",
];

/**
 * MOBILE   2 columns — 4 across at 360px would crush the labels
 * TABLET+  4 columns, then 5 with the "Countless Memories" card on lg
 */
export function FactsBar() {
  return (
    <section
      aria-label="Festival at a glance"
      className="border-y border-[var(--color-border)] bg-white/70 py-10 sm:py-12"
    >
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-5">
          {festival.stats.map((stat, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <RevealItem key={stat.label} className="text-center">
                <span
                  aria-hidden="true"
                  className={`mx-auto grid h-12 w-12 place-items-center rounded-full sm:h-14 sm:w-14 ${TINTS[i % TINTS.length]}`}
                >
                  <Icon size={22} />
                </span>
                <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-maroon)]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-0.5 text-[length:var(--text-sm)] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink)]">
                  {stat.label}
                </p>
                <p className="text-[length:var(--text-xs)] text-[var(--color-ink-muted)]">{stat.sub}</p>
                <span aria-hidden="true" className="mx-auto mt-3 block h-0.5 w-8 rounded-full bg-[var(--color-gold)]/50" />
              </RevealItem>
            );
          })}

          <RevealItem className="col-span-2 text-center md:col-span-4 lg:col-span-1">
            <span aria-hidden="true" className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--color-burgundy)]/10 text-[var(--color-burgundy)] sm:h-14 sm:w-14">
              <Heart size={22} />
            </span>
            <p className="mt-3 font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-maroon)]">
              Countless
            </p>
            <p className="mt-0.5 text-[length:var(--text-sm)] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink)]">
              Memories
            </p>
            <p className="text-[length:var(--text-xs)] text-[var(--color-ink-muted)]">To Cherish Forever</p>
            <span aria-hidden="true" className="mx-auto mt-3 block h-0.5 w-8 rounded-full bg-[var(--color-gold)]/50" />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
