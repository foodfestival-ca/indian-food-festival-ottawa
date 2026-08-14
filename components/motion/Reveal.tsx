"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode, ElementType } from "react";
import { fadeUp, fadeIn, scaleIn, staticVariants, stagger, VIEWPORT } from "@/lib/motion";

type Preset = "fadeUp" | "fadeIn" | "scaleIn";

const presets: Record<Preset, Variants> = { fadeUp, fadeIn, scaleIn };

interface RevealProps {
  children: ReactNode;
  preset?: Preset;
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Scroll reveal. Honours prefers-reduced-motion by collapsing to a no-op
 * rather than merely shortening the duration — the element is simply present.
 */
export function Reveal({ children, preset = "fadeUp", delay = 0, className, as }: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[(as ?? "div") as "div"];

  return (
    <Comp
      className={className}
      variants={reduced ? staticVariants : presets[preset]}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={reduced ? undefined : { delay }}
    >
      {children}
    </Comp>
  );
}

/** Staggered container. Wrap RevealItem children. */
export function RevealGroup({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? staticVariants : stagger(delayChildren, staggerChildren)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/**
 * `standalone` — opt-in, off by default. Normal `RevealItem`s have no
 * `initial`/`whileInView` of their own; they only declare `variants` and
 * inherit their animation state from the parent `RevealGroup`'s single
 * `whileInView` trigger. That's correct for static lists that mount once.
 *
 * It breaks for lists that are filtered client-side (e.g. vendor search):
 * when an item is filtered out, React unmounts its `RevealItem`; when it
 * matches again, React mounts a brand-new instance. That new instance
 * doesn't reliably inherit the parent's already-resolved "show" state —
 * confirmed live on /vendor, where clearing the search left ~27 of 28
 * vendor cards permanently stuck at their `hidden` variant (opacity 0,
 * y: 24) even though the underlying vendor data/state was correct and all
 * 28 cards were genuinely in the DOM. The parent's `viewport={{ once: true }}`
 * had already fired once and doesn't re-broadcast to children that mount
 * later.
 *
 * `standalone` gives the item its own `whileInView` trigger instead, so
 * every mount — first paint or a later remount after a filter change —
 * independently observes its own entry into the viewport and animates in.
 * Items that stay mounted across a filter change (React keeps the same
 * key) are unaffected and never re-animate. Only used on the /vendor grids;
 * every other `RevealItem` on the site keeps the original inherited-only
 * behaviour untouched.
 */
export function RevealItem({
  children,
  className,
  standalone = false,
}: {
  children: ReactNode;
  className?: string;
  standalone?: boolean;
}) {
  const reduced = useReducedMotion();

  if (standalone) {
    return (
      <motion.div
        className={className}
        variants={reduced ? staticVariants : fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div className={className} variants={reduced ? staticVariants : fadeUp}>
      {children}
    </motion.div>
  );
}
