"use client";

import { useEffect, useState } from "react";

export type CountdownPhase = "counting" | "live" | "ended";

export interface CountdownState {
  phase: CountdownPhase;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** False until the client has mounted. Render a static snapshot until then
   *  so the server and client markup match exactly (no hydration mismatch). */
  ready: boolean;
}

function diff(target: number, now: number) {
  const ms = Math.max(0, target - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

function resolve(startMs: number, endMs: number, now: number): Omit<CountdownState, "ready"> {
  if (now >= endMs) return { phase: "ended", days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (now >= startMs) return { phase: "live", days: 0, hours: 0, minutes: 0, seconds: 0 };
  return { phase: "counting", ...diff(startMs, now) };
}

/**
 * Countdown locked to an absolute instant.
 *
 * `startsAt` / `endsAt` must carry an explicit UTC offset (e.g. "-04:00").
 * Date.parse then yields the same instant for every visitor, so someone in
 * Mumbai counts down to Ottawa's 4 PM rather than their own.
 *
 * Ticks once per second while counting; once per minute under reduced motion.
 * Pauses entirely while the tab is hidden.
 */
export function useCountdown(startsAt: string, endsAt: string): CountdownState {
  const startMs = Date.parse(startsAt);
  const endMs = Date.parse(endsAt);

  // Deterministic first render: identical on server and client.
  const [state, setState] = useState<Omit<CountdownState, "ready">>(() =>
    resolve(startMs, endMs, startMs)
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tickMs = reduced ? 60_000 : 1_000;
    let timer: ReturnType<typeof setInterval> | undefined;

    const update = () => setState(resolve(startMs, endMs, Date.now()));

    const start = () => {
      update();
      timer = setInterval(update, tickMs);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };

    setReady(true);
    start();

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [startMs, endMs]);

  return { ...state, ready };
}
