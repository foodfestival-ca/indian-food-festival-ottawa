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
  // `stackedLabel` — desktop-only compact presentation for this one item
  // (see the desktop `<ul>` render below). `label` is still the full
  // string and is what the mobile drawer renders — untouched there.
  { label: "Activities & Workshops", href: "/activities", stackedLabel: ["Activities", "&", "Workshops"] },
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
            (1024px) up, same as the original arrangement. A v7 attempt at
            fixing 9-link crowding by bumping this to `xl` (1280px) and
            tightening every link's padding/gap changed how the whole bar
            looked and sat at ordinary desktop widths too, not just the
            narrow 1024-1279px edge — reverted per client feedback ("prefer
            the previous navigation arrangement"). Back to `lg:flex`,
            `gap-1`, `px-4` — the original spacing. The actual fit fix now
            lives entirely in the "Claim your passport" CTA below (made
            slightly more compact), which the client asked to try first
            rather than changing the breakpoint or the links' own spacing.
            `flex-nowrap` plus `whitespace-nowrap` on each label are the
            explicit no-wrap guarantee; `min-w-0` on the row lets the flexbox
            actually shrink logo/CTA space instead of forcing an overflow if
            the viewport is ever right at the breakpoint edge.
          */}
          <ul className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const current = isCurrent(link.href);
              const isHome = link.href === "/";
              // Only "Activities & Workshops" declares this — every other
              // item falls through to the plain single-line label below.
              const stacked = "stackedLabel" in link ? link.stackedLabel : null;
              return (
                <li key={link.href} className="shrink-0">
                  <Link
                    href={link.href}
                    onClick={isHome ? handleHomeClick : undefined}
                    aria-current={current ? "page" : undefined}
                    // Only set when stacked: the visual 3-line block below is
                    // marked aria-hidden, so the accessible name has to come
                    // from here instead — screen readers still hear
                    // "Activities & Workshops", exactly the mobile wording,
                    // not "Activities Workshops" with the "&" dropped.
                    aria-label={stacked ? link.label : undefined}
                    className={cn(
                      "tap-target relative flex items-center justify-center whitespace-nowrap rounded-[var(--radius-pill)] px-4 font-medium transition-colors",
                      stacked ? "py-1" : "text-[length:var(--text-sm)]",
                      "focus-visible:outline-3 focus-visible:outline-offset-2",
                      // Verified against cream #FDF8F0.
                      "text-[var(--color-ink)]", //          15.77:1
                      "hover:text-[var(--color-maroon)]", // 11.48:1
                      "focus-visible:outline-[var(--color-maroon)]",
                      current && "font-semibold text-[var(--color-maroon)]"
                    )}
                  >
                    {stacked ? (
                      // Compact 3-line stack — reduces this item's
                      // horizontal footprint from "Activities & Workshops"
                      // (22 characters) down to the width of "Workshops"
                      // (its longest line), recovering the row space that
                      // made the desktop nav feel crowded. Tight leading
                      // (`leading-[1.15]`) and a smaller size than the rest
                      // of the row (`text-[length:var(--text-xs)]`) keep the
                      // whole stack well under the nav's own height so the
                      // bar never grows taller for this one item; `<ul>`'s
                      // `items-center` centers it vertically like every
                      // other link.
                      <span aria-hidden="true" className="flex flex-col items-center text-[length:var(--text-xs)] leading-[1.15]">
                        <span>{stacked[0]}</span>
                        <span>{stacked[1]}</span>
                        <span>{stacked[2]}</span>
                      </span>
                    ) : (
                      link.label
                    )}
                    {/* Current-item indicator.
                        Colour lives in a non-text underline (needs only 3:1)
                        rather than the label itself — orange fails AA as TEXT
                        on cream (2.76:1). Current is therefore signalled by
                        weight AND colour, not colour alone (WCAG 1.4.1). */}
                    {current && (
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-4 h-0.5 rounded-full bg-[var(--color-saffron-deep)]", // 4.05:1 on cream
                          // The stacked 3-line "Activities & Workshops" label
                          // is taller than every other (single-line) nav
                          // item's own box, so the same `bottom-1.5` offset
                          // that sits cleanly below one line of text lands
                          // inside the stacked block's last line ("Workshops")
                          // instead — the underline needs to sit further
                          // below this item's own box (into the row's
                          // existing vertical-centering space) to clear it.
                          // Only this item's underline changes; every other
                          // link keeps the original `bottom-1.5`.
                          stacked ? "-bottom-2" : "bottom-1.5"
                        )}
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
            {/* Text colour forced to pure white — the client flagged the
                default `variant="secondary"` cream-on-maroon as hard to
                read. Background/shape/size/typography/position all
                untouched; this is a colour-only override.
                v8 — trimmed slightly more compact (`!px-3.5` instead of the
                `sm` size's default `px-4`, icon 16→15px, `gap-1.5` instead
                of the base component's `gap-2`) to buy the 9-item desktop
                row a little breathing room at `lg` without touching the
                nav links themselves or the breakpoint — the first fix the
                client asked to try, ahead of any link-level change. */}
            <Button
              href="/passport"
              size="sm"
              variant="secondary"
              className="hidden !gap-1.5 !px-3.5 text-white hover:text-white sm:inline-flex"
            >
              <Ticket size={15} aria-hidden="true" />
              Claim your passport
            </Button>

            {/* Hamburger — desktop (≥1024px) never sees this; lg:hidden,
                matching the desktop row's own lg: breakpoint above. */}
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

      {/* Mobile / tablet drawer — unchanged in behaviour, lg:hidden, matching
          the desktop row's breakpoint above. */}
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
                  Claim your passport
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
