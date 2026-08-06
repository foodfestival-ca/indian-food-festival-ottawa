import type Lenis from "lenis";

/**
 * Shared handle to the single Lenis instance `components/motion/SmoothScroll`
 * owns (mounted once, in the root layout). Anything that needs to move the
 * page — the route-change scroll reset in SmoothScroll itself, Nav's "Home"
 * back-to-top click — has to go through Lenis's own `scrollTo` API rather
 * than the native `window.scrollTo`, or Lenis's next animation frame just
 * overwrites the native call with its own stale scroll target.
 *
 * `current` is `null` on touch devices and under `prefers-reduced-motion`:
 * SmoothScroll never instantiates Lenis there, and callers should fall back
 * to native scrolling in that case (see Nav.tsx's `handleHomeClick`).
 */
export const lenisRef: { current: Lenis | null } = { current: null };
