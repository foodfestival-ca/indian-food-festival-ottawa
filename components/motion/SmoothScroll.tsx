"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { lenisRef } from "@/lib/lenis";

/**
 * Momentum scrolling — desktop and tablet only.
 *
 * Deliberately disabled on touch devices: mobile browsers already have
 * excellent native scroll physics, and hijacking them costs frames on low-end
 * Android while breaking pull-to-refresh and browser-chrome auto-hide.
 * Also fully disabled under prefers-reduced-motion.
 *
 * `<SmoothScroll />` is mounted once in the root layout (`app/layout.tsx`),
 * outside `{children}` — in the App Router that means it persists across
 * every client-side navigation; only the page content underneath swaps.
 * Lenis owns the *real* scroll position from then on: it keeps its own
 * internal scroll target and drives `window.scrollTo` itself every
 * animation frame. Next.js's built-in "scroll to top on navigate" only
 * touches the native `window.scrollTo` once, and Lenis's very next frame
 * silently overwrites that with its stale pre-navigation target — which is
 * the entire bug (a new page opening mid-scroll). The fix has to go
 * through Lenis's own `scrollTo` API on every route change, not just reset
 * `window.scrollY`, or Lenis fights the reset straight back.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /**
   * Reset Lenis's scroll target on every route change, keyed on the path
   * so it fires for every kind of navigation — nav-bar clicks, Back/
   * Forward, programmatic `router.push`, all of it. `{ immediate: true }`
   * snaps rather than re-animates, so navigating never produces a visible
   * "scroll back up" flourish.
   *
   * If the destination carries a hash (e.g. Footer's `/about#get-involved`
   * link), scroll to that element instead of the top, so anchor links keep
   * landing in the right place. On touch/reduced-motion devices Lenis is
   * never instantiated (see guard above); those already get the browser's
   * own native top-of-page / anchor-scroll behaviour for free.
   */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const { hash } = window.location;
    const anchor = hash ? (document.querySelector(hash) as HTMLElement | null) : null;
    lenis.scrollTo(anchor ?? 0, { immediate: true });
  }, [pathname]);

  return null;
}
