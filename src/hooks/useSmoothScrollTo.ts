"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

export function useSmoothScrollTo() {
  const lenis = useLenis();

  return useCallback(
    (sectionId: string, offset = -100) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      lenis?.scrollTo(element, {
        offset,
        duration: 1.2,
      });
    },
    [lenis],
  );
}
