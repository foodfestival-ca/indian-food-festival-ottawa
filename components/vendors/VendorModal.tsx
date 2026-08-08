"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, UtensilsCrossed, Sparkles } from "lucide-react";
import { isFoodVendor, type Vendor } from "@/content/vendors";

/**
 * "View Menu" modal — one vendor's signature dishes for food vendors, or
 * whatever supported detail exists for non-food festival vendors (henna,
 * fashion/jewelry, tarot).
 *
 * Structurally the same accessible-dialog pattern as `components/gallery/
 * Lightbox.tsx` (portal, focus trap, Escape to close, body-scroll lock,
 * focus restoration) trimmed down to a single static panel — no
 * prev/next/swipe, since a menu card has nothing to page through.
 *
 * Every optional field (`cuisine`, `description`, `menuItems`) is rendered
 * conditionally: several vendors only have a confirmed name + logo, and an
 * empty eyebrow / empty paragraph / empty "Signature Menu Items" heading
 * with nothing under it would look like a bug rather than a vendor we
 * simply don't have more confirmed detail for yet. `isFoodVendor()` (from
 * content/vendors.ts, driven by `category` — never a hardcoded vendor name)
 * decides the menu section's heading and icon: "Signature Menu Items" for
 * food vendors, "Vendor Details" for everyone else, and the whole section
 * only renders at all when `menuItems` actually has content.
 */
export function VendorModal({ vendor, onClose }: { vendor: Vendor | null; onClose: () => void }) {
  const open = vendor !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && vendor && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--color-ink)]/60 p-4 backdrop-blur-sm"
          style={{ paddingTop: "calc(var(--safe-top) + 1rem)", paddingBottom: "calc(var(--safe-bottom) + 1rem)" }}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="vendor-modal-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-[30rem] overflow-y-auto rounded-[var(--radius-card)] bg-white p-6 shadow-[var(--shadow-lg)] outline-none sm:p-8"
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="tap-target absolute right-3 top-3 rounded-full text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-maroon)]"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {vendor.cuisine && <p className="eyebrow">{vendor.cuisine}</p>}
            <h3
              id="vendor-modal-title"
              className={`font-[family-name:var(--font-display)] text-[length:var(--text-2xl)] font-bold text-[var(--color-maroon)] ${vendor.cuisine ? "mt-2" : ""}`}
            >
              {vendor.name}
            </h3>
            {vendor.description && (
              <p className="mt-3 text-[length:var(--text-sm)] leading-relaxed text-[var(--color-ink-muted)]">
                {vendor.description}
              </p>
            )}

            {vendor.menuItems.length > 0 && (
              <div className="mt-6 border-t border-[var(--color-border)] pt-5">
                <h4 className="flex items-center gap-2 text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.14em] text-[var(--color-maroon)]">
                  {isFoodVendor(vendor) ? (
                    <UtensilsCrossed size={15} aria-hidden="true" />
                  ) : (
                    <Sparkles size={15} aria-hidden="true" />
                  )}
                  {isFoodVendor(vendor) ? "Signature Menu Items" : "Vendor Details"}
                </h4>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {vendor.menuItems.map((item) => (
                    <li
                      key={item}
                      className="rounded-[var(--radius-chip)] bg-[var(--color-cream)] px-3 py-2 text-[length:var(--text-sm)] text-[var(--color-ink)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
