"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { MediaFrame } from "@/components/ui/MediaFrame";

export interface LightboxItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  meta?: string;
  /** Defaults to "image". "video" renders a native <video> with controls
   *  instead of MediaFrame — see the render branch below. */
  type?: "image" | "video";
  /** Poster frame for videos; ignored for images. */
  poster?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

/**
 * Simple, accessible lightbox — Phase 1 scope.
 *
 * Included: keyboard (←/→/Esc/Home/End), swipe, focus trap, body-scroll lock,
 * aria-modal, focus restoration on close.
 * Deliberately NOT included (Phase 2): pinch-zoom, pan, deep-linking,
 * shared-layout transitions.
 */
export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          go(1);
          break;
        case "ArrowLeft":
          go(-1);
          break;
        case "Home":
          onIndexChange(0);
          break;
        case "End":
          onIndexChange(items.length - 1);
          break;
        case "Tab": {
          // Focus trap
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
          break;
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus();
    };
  }, [open, go, onClose, onIndexChange, items.length]);

  if (!mounted) return null;
  const item = index !== null ? items[index] : undefined;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${(index ?? 0) + 1} of ${items.length}: ${item.caption}`}
          tabIndex={-1}
          className="fixed inset-0 z-[70] flex flex-col bg-[var(--color-ink)]/95 backdrop-blur-sm outline-none"
          style={{ paddingTop: "var(--safe-top)", paddingBottom: "var(--safe-bottom)" }}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <span className="tabular text-[length:var(--text-sm)] text-white/70">
              {(index ?? 0) + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="tap-target rounded-full text-white/80 transition-colors hover:text-white"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <motion.div
            key={item.id}
            className="flex flex-1 items-center justify-center px-3 pb-2"
            drag={reduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {item.type === "video" ? (
              <video
                key={item.id}
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                className="max-h-full w-full max-w-[64rem] rounded-[var(--radius-media)] bg-[var(--color-ink)]"
              >
                Sorry, your browser doesn&rsquo;t support embedded video.
              </video>
            ) : (
              <MediaFrame
                src={item.src}
                alt={item.alt}
                label={item.caption}
                sizes="100vw"
                className="max-h-full w-full max-w-[64rem] aspect-[4/3]"
              />
            )}
          </motion.div>

          <div className="flex items-center justify-between gap-3 px-4 pb-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="tap-target shrink-0 rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>

            <p className="min-w-0 flex-1 text-center text-[length:var(--text-sm)] text-white/85">
              {item.caption}
              {item.meta && <span className="ml-2 text-white/50">{item.meta}</span>}
            </p>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="tap-target shrink-0 rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
