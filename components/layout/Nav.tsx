"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Ticket } from "lucide-react";
import { cn } from "@/lib/cn";
import { lenisRef } from "@/lib/lenis";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { festival } from "@/content/festival";

/**
 * Navigation model — v6, true multi-page routing.
 *
 * The site was originally one long scrolling homepage with the nav jumping
 * to `/#id` anchors. It is now a proper multi-page site: every nav item is a
 * real route, rendered by its own file under `app/`. There is no more
 * scroll-spy, no more hash rewriting, no more cross-page "finish the jump
 * once the homepage mounts" logic — `isCurrent` is a plain `pathname ===
 * href` check, and the browser's native Back/Forward already does the right
 * thing for real routes with no extra code.
 *
 * "Vendors" routes to `/vendor`, which renders the same Marketplace section
 * (with its own "Become a vendor" CTA) that used to live on the homepage —
 * same destination, just its own page now, not a duplicate. "Sponsors"
 * follows the same pattern, routing to `/sponsors` (the Sponsors section,
 * with its own "Become a Sponsor" CTA), also moved off the homepage.
 *
 * Order: Home, then the routes in roughly the order a first-time visitor
 * would want them, ending in Passport → Venue → About.
 */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Vendors", href: "/vendor" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Gallery", href: "/gallery" },
  { label: "Schedule", href: "/schedule" },
  { label: "Passport", href: "/passport" },
  { label: "Venue", href: "/venue" },
  { label: "About", href: "/about" },
] as const;

/* Contact merged into /about (Get In Touch, at the end of that page) and
 * FAQs merged into /venue (Frequently Asked Questions, at the end of that
 * page) — both routes were removed as standalone nav items. */

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  const isCurrent = (href: string) => pathname === href;

  /** Home doubles as "back to top" when you're already on "/" — a plain
   *  route link to the current page is otherwise a no-op click. Goes
   *  through Lenis's own `scrollTo` (see lib/lenis.ts) when it's running,
   *  since a native `window.scrollTo` gets silently overwritten by Lenis's
   *  next animation frame; falls back to native scrolling on touch/
   *  reduced-motion devices, where Lenis is never instantiated. */
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: !!reduced });
      } else {
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }
    }
  };

  // Lock body scroll behind the drawer, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only-focusable">
        Skip to content
      </a>

      {/* Always a solid, opaque cream bar — never transparent/glassy over
          whatever sits below it. This used to switch to transparent at the
          very top of the page (fine when the hero underneath was cream, but
          it let dark hero grounds — Passport, Gallery — and now the
          full-bleed homepage hero artwork show straight through behind the
          logo/links). One unconditional style now, identical on every
          route, so the header reads as the same shared component
          everywhere rather than a homepage-specific variant. */}
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-cream)] shadow-[var(--shadow-sm)]"
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <nav
          aria-label="Primary"
          className="container-page flex flex-nowrap items-center justify-between gap-3"
          style={{ height: "var(--nav-h)" }}
        >
          <Link
            href="/"
            onClick={handleHomeClick}
            className="-ml-1 flex shrink-0 items-center rounded-[var(--radius-chip)] py-1 pl-1 pr-2 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-maroon)]"
            aria-label={`${festival.name} — home`}
          >
            {/* Clear space: py-1/pr-2 keeps the mark off the nav edge and the
                links. Height steps up with the nav so it never dominates.
                Always the orange lockup now that the header is always the
                cream ground it was designed for (cream is 11.48:1; orange
                only clears 3.31:1, which is why a cream variant existed at
                all — for the header's old transparent-over-dark moment,
                which no longer happens). */}
            <Logo variant="orange" height={44} priority className="lg:!h-[64px] lg:!w-[59px]" />
          </Link>

          {/*
            Desktop navigation — permanent horizontal row, visible from `lg`
            (1024px) up; no hamburger and no drawer at this width or above.
            `flex-nowrap` plus `whitespace-nowrap` on each label are the
            explicit no-wrap guarantee; `min-w-0` on the row lets the flexbox
            actually shrink logo/CTA space instead of forcing an overflow if
            the viewport is ever right at the 1024px edge.
          */}
          <ul className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const current = isCurrent(link.href);
              const isHome = link.href === "/";
              return (
                <li key={link.href} className="shrink-0">
                  <Link
                    href={link.href}
                    onClick={isHome ? handleHomeClick : undefined}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "tap-target relative block whitespace-nowrap rounded-[var(--radius-pill)] px-4 text-[length:var(--text-sm)] font-medium transition-colors",
                      "focus-visible:outline-3 focus-visible:outline-offset-2",
                      // Verified against cream #FDF8F0.
                      "text-[var(--color-ink)]", //          15.77:1
                      "hover:text-[var(--color-maroon)]", // 11.48:1
                      "focus-visible:outline-[var(--color-maroon)]",
                      current && "font-semibold text-[var(--color-maroon)]"
                    )}
                  >
                    {link.label}
                    {/* Current-item indicator.
                        Colour lives in a non-text underline (needs only 3:1)
                        rather than the label itself — orange fails AA as TEXT
                        on cream (2.76:1). Current is therefore signalled by
                        weight AND colour, not colour alone (WCAG 1.4.1). */}
                    {current && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-[var(--color-saffron-deep)]" // 4.05:1 on cream
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            {/* Passport CTA is present from pixel one — the primary conversion
                sits well down the page, so it must also live permanently up
                here. Always the solid secondary (maroon) variant now that
                the header is always cream underneath it. */}
            <Button
              href="/passport"
              size="sm"
              variant="secondary"
              className="hidden sm:inline-flex"
            >
              <Ticket size={16} aria-hidden="true" />
              Get Passport
            </Button>

            {/* Hamburger — desktop (≥1024px) never sees this; lg:hidden. */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="tap-target rounded-[var(--radius-pill)] text-[var(--color-maroon)] transition-colors hover:text-[var(--color-burgundy)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-maroon)] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile / tablet drawer — unchanged in behaviour, lg:hidden as before. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            className="fixed inset-0 z-40 lg:hidden"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="absolute inset-0 bg-[var(--color-ink)]/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              tabIndex={-1}
            />
            <motion.div
              className="absolute inset-x-0 top-0 max-h-[100dvh] overflow-y-auto bg-[var(--color-cream)] shadow-[var(--shadow-lg)]"
              initial={reduced ? false : { y: "-100%" }}
              animate={{ y: 0 }}
              exit={reduced ? undefined : { y: "-100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                paddingTop: "calc(var(--safe-top) + var(--nav-h))",
                paddingBottom: "calc(var(--safe-bottom) + 1.5rem)",
              }}
            >
              {/* The drawer panel is always cream, so it is always "light" —
                  the orange lockup and maroon links are correct here. */}
              <div className="container-page pb-4 pt-1">
                <Logo variant="orange" height={72} decorative />
              </div>
              <ul className="container-page flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const current = isCurrent(link.href);
                  const isHome = link.href === "/";
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          if (isHome) handleHomeClick(e);
                          setOpen(false); // close the drawer on every tap
                        }}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "flex min-h-[56px] items-center gap-3 border-b border-[var(--color-border)]",
                          "font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold",
                          "text-[var(--color-maroon)] transition-colors hover:text-[var(--color-burgundy)]",
                          "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-maroon)]"
                        )}
                      >
                        {current && (
                          <span
                            aria-hidden="true"
                            className="h-5 w-1 shrink-0 rounded-full bg-[var(--color-saffron-deep)]"
                          />
                        )}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="container-page mt-6">
                <Button href="/passport" size="lg" fluid onClick={() => setOpen(false)}>
                  <Ticket size={18} aria-hidden="true" />
                  Get Passport
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
