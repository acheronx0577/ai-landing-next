"use client";

import { useLenis } from "lenis/react";
import type Lenis from "lenis";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

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

type UseScrollLinkedMarqueeOptions = {
  /** Multiplier on scroll delta — higher = faster left → right on scroll down. */
  scrollSpeed?: number;
  /** Pixels per second when idle (flows left → right). */
  idleSpeed?: number;
  idleDelayMs?: number;
};

export function useScrollLinkedMarquee({
  scrollSpeed = 1.15,
  idleSpeed = 28,
  idleDelayMs = 160,
}: UseScrollLinkedMarqueeOptions = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const lastScrollRef = useRef<number | null>(null);
  const lastScrollTimeRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribe,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useLenis((lenis) => {
    lenisRef.current = lenis;
  });

  const wrapOffset = useCallback(() => {
    const loopWidth = loopWidthRef.current;
    if (loopWidth <= 0) return;

    offsetRef.current =
      ((((offsetRef.current % loopWidth) + loopWidth) % loopWidth) - loopWidth);
  }, []);

  const applyTransform = useCallback(() => {
    wrapOffset();
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  }, [wrapOffset]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2;
      applyTransform();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [applyTransform]);

  useEffect(() => {
    if (reducedMotion) return;

    let frame = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 32);
      lastTime = now;

      const lenis = lenisRef.current;
      if (lenis) {
        if (lastScrollRef.current === null) {
          lastScrollRef.current = lenis.scroll;
        }

        const delta = lenis.scroll - lastScrollRef.current;
        lastScrollRef.current = lenis.scroll;

        if (Math.abs(delta) > 0.001) {
          // Scroll down (delta > 0) accelerates left → right; scroll up reverses.
          offsetRef.current += delta * scrollSpeed;
          lastScrollTimeRef.current = now;
        } else if (now - lastScrollTimeRef.current >= idleDelayMs) {
          offsetRef.current += (idleSpeed * dt) / 1000;
        }
      }

      applyTransform();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, scrollSpeed, idleSpeed, idleDelayMs, applyTransform]);

  useEffect(() => {
    if (!reducedMotion) return;

    const track = trackRef.current;
    if (track) {
      track.style.transform = "translate3d(0, 0, 0)";
    }
  }, [reducedMotion]);

  return { trackRef, reducedMotion };
}
