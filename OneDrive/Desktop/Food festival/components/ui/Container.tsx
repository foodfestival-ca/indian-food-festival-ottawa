import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: Comp = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Comp className={cn("container-page", className)}>{children}</Comp>;
}

type Ground = "cream" | "cream-deep" | "maroon" | "white";

const grounds: Record<Ground, string> = {
  cream: "bg-[var(--color-cream)] text-[var(--color-ink)]",
  "cream-deep": "bg-[var(--color-cream-deep)] text-[var(--color-ink)]",
  maroon: "bg-[var(--color-maroon)] text-[var(--color-cream)]",
  white: "bg-white text-[var(--color-ink)]",
};

/**
 * Section wrapper.
 *
 * The Thali rule is enforced by convention here: adjacent sections must not
 * share a `ground`. `cv` enables content-visibility so off-screen sections
 * skip layout and paint — measurable on low-end Android with 16 sections.
 */
export function Section({
  children,
  id,
  ground = "cream",
  className,
  cv = true,
  labelledBy,
}: {
  children: ReactNode;
  id?: string;
  ground?: Ground;
  className?: string;
  cv?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("section-y relative overflow-hidden", grounds[ground], cv && "cv-auto", className)}
    >
      {children}
    </section>
  );
}
