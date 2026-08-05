"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Ticket, X } from "lucide-react";
import Link from "next/link";
import { useScrollState } from "@/lib/hooks";

/**
 * Floating "Get Passport" CTA — mobile only, appears once the hero is gone.
 *
 * Lucide `Ticket` rather than the 🎟 emoji: emoji render differently on every
 * OS, at different optical weights, which undermines a premium build.
 *
 * Dismissible once per session, hidden entirely on /passport (the ask is
 * already the page), and inset above the iPhone home indicator.
 */
export function StickyMobileCTA() {
  const { pastHero } = useScrollState();
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const show = pastHero && !dismissed && pathname !== "/passport";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 z-40 flex justify-center px-4 lg:hidden"
          style={{ bottom: "calc(var(--safe-bottom) + 1rem)" }}
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex w-full max-w-[380px] items-center gap-1 rounded-[var(--radius-pill)] bg-[var(--color-maroon)]/96 p-1 pl-1.5 shadow-[var(--shadow-lg)] backdrop-blur-md">
            <Link
              href="/passport"
              className="flex min-h-[var(--touch-min)] flex-1 items-center justify-center gap-2 rounded-[var(--radius-pill)] px-4 text-[length:var(--text-sm)] font-medium text-[var(--color-cream)]"
            >
              <Ticket size={17} className="text-[var(--color-gold)]" aria-hidden="true" />
              Get Passport
            </Link>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss passport prompt"
              className="tap-target shrink-0 rounded-[var(--radius-pill)] text-[var(--color-cream)]/70 transition-colors hover:text-[var(--color-cream)]"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
