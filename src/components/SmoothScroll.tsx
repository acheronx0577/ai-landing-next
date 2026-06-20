"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore, type ReactNode } from "react";

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribe,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  if (reducedMotion) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
