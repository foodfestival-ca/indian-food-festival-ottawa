import type { Variants, Transition } from "framer-motion";

/** Shared easing and durations. Mirrors the CSS tokens in globals.css. */
export const EASE_BRAND = [0.22, 1, 0.36, 1] as const;

export const DUR = { micro: 0.2, reveal: 0.5, hero: 0.8 } as const;

export const transition: Transition = { duration: DUR.reveal, ease: EASE_BRAND };

/** Every scroll reveal uses this. `once` prevents re-animation on scroll-back,
 *  which is both distracting and expensive on low-end devices. */
export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition },
};

/** Stagger container. Children should use `fadeUp`. */
export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/** Applied when the user prefers reduced motion: no transform, no delay. */
export const staticVariants: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};
