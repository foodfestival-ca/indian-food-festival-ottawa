"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling — desktop and tablet only.
 *
 * Deliberately disabled on touch devices: mobile browsers already have
 * excellent native scroll physics, and hijacking them costs frames on low-end
 * Android while breaking pull-to-refresh and browser-chrome auto-hide.
 * Also fully disabled under prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
