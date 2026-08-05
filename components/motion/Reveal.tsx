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

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} variants={reduced ? staticVariants : fadeUp}>
      {children}
    </motion.div>
  );
}
