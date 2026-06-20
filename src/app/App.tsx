"use client";

import { useEffect, useState } from "react";
import FooterSection from "@/components/landing/FooterSection";
import LandingEdgeDecorations from "@/components/landing/LandingEdgeDecorations";
import LandingBackgrounds from "@/components/landing/LandingBackgrounds";
import {
  DESIGN_CANVAS_HEIGHT,
  DESIGN_PAGE_HEIGHT,
  DESIGN_WIDTH,
} from "@/components/landing/layout";
import AiLandingPage from "@/imports/AiLandingPage1/index";

export default function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      setScale(Math.min(window.innerWidth / DESIGN_WIDTH, 1));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scaledFooterHeight = (DESIGN_PAGE_HEIGHT - DESIGN_CANVAS_HEIGHT) * scale;

  return (
    <div className="w-full overflow-x-clip bg-[#010101]">
      <div
        className="relative w-full"
        style={{ height: DESIGN_PAGE_HEIGHT * scale }}
      >
        <LandingBackgrounds scale={scale} />
        <LandingEdgeDecorations scale={scale} />

        <div
          className="relative z-1 mx-auto bg-transparent"
          style={{
            width: DESIGN_WIDTH * scale,
            height: DESIGN_CANVAS_HEIGHT * scale,
          }}
        >
          <div
            style={{
              width: DESIGN_WIDTH,
              height: DESIGN_CANVAS_HEIGHT,
              transformOrigin: "top left",
              transform: `scale(${scale})`,
            }}
          >
            <AiLandingPage />
          </div>
        </div>

        <FooterSection scale={scale} style={{ minHeight: scaledFooterHeight }} />
      </div>
    </div>
  );
}
