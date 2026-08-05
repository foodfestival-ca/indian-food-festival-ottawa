"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query. Returns false on the server and on first paint. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Scroll state for the nav and the floating CTA.
 *  Uses a passive listener with rAF coalescing — a raw scroll handler is one
 *  of the easiest ways to drop frames on a low-end Android device. */
export function useScrollState(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > threshold);
        setPastHero(y > window.innerHeight * 0.85);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);

  return { scrolled, pastHero };
}

/**
 * `useActiveSection` (single-observer scroll-spy) and
 * `useScrollToHashOnRouteChange` (cross-page hash jump) were removed here —
 * the site moved from a single scrolling homepage with `/#id` anchors to a
 * true multi-page architecture (see Nav.tsx). Every nav destination is now a
 * real route rendered by its own page, so "which section is active" is just
 * `pathname === href`, and Back/Forward already work correctly for real
 * routes with no extra code. Nothing else in the codebase used either hook.
 */
