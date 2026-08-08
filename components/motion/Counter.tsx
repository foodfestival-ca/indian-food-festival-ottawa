"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up once, when scrolled into view.
 * Under reduced motion it renders the final value immediately.
 * The accessible name is always the final value, so a screen reader never
 * hears a stream of intermediate numbers.
 */
export function Counter({ value, suffix = "", duration = 1600, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo — fast start, settled finish
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  const formatted = display.toLocaleString("en-CA");
  const final = value.toLocaleString("en-CA");

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true" className="tabular">
        {formatted}
        {suffix}
      </span>
      <span className="sr-only-focusable">{`${final}${suffix}`}</span>
    </span>
  );
}
