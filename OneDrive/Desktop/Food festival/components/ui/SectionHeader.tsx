import { cn } from "@/lib/cn";
import { GoldRule } from "@/components/ornament/Ornaments";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  /** Word or phrase inside `title` to render in the accent colour, matching
   *  the mixed-weight split in the design reference. */
  accent?: string;
  intro?: string;
  align?: "left" | "center";
  onDark?: boolean;
  id?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  intro,
  align = "center",
  onDark = false,
  id,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  let head: React.ReactNode = title;
  if (accent && title.includes(accent)) {
    const [before, after] = title.split(accent) as [string, string];
    head = (
      <>
        {before}
        <span className={onDark ? "text-[var(--color-gold)]" : "text-[var(--color-saffron)]"}>{accent}</span>
        {after}
      </>
    );
  }

  return (
    <header
      className={cn(
        "mx-auto max-w-[46rem]",
        centered ? "text-center" : "text-left mx-0",
        className
      )}
    >
      {eyebrow && (
        <Reveal preset="fadeIn">
          <p className={cn("eyebrow", onDark && "text-[var(--color-gold-soft)]")}>{eyebrow}</p>
          <GoldRule className={cn("mt-3 mb-5", centered ? "mx-auto max-w-[13rem]" : "max-w-[9rem]")} />
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 id={id} className="text-[length:var(--text-4xl)] font-bold">
          {head}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 text-[length:var(--text-lg)] leading-[var(--leading-body)]",
              onDark ? "text-[var(--color-cream)]/80" : "text-[var(--color-ink-muted)]"
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
