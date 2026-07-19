"use client";

/**
 * ExperienceCanvas — ambient backdrop for the Experience timeline.
 *
 * Previous implementation used its own <Canvas>, which created a second
 * WebGL rendering context on the page (alongside ScrollLaptop's canvas and
 * the IntroSequence canvas), exhausting the browser's WebGL context limit and
 * causing "THREE.WebGLRenderer: Context Lost" on all canvases.
 *
 * This version replaces the R3F canvas with a lightweight CSS-animated
 * backdrop that achieves the same visual effect — drifting geometric shapes
 * that shift colour when the user hovers a timeline card — with zero WebGL
 * context overhead.
 */

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useDevice } from "@/hooks/useDevice";

interface ExperienceCanvasProps {
  hoveredType: "work" | "education" | "achievement" | null;
  scrollValRef: React.RefObject<number>; // kept for API compatibility
}

const SHAPE_COUNT = 16;

const typeColors: Record<string, string> = {
  work: "#4f72ff",
  education: "#10b981",
  achievement: "#f59e0b",
};
const defaultColor = "#4f46e5";

export default function ExperienceCanvas({ hoveredType }: ExperienceCanvasProps) {
  const { isMobile, isMounted } = useDevice();

  // Generate stable random shape descriptors once per mount
  const shapes = useMemo(() => {
    return Array.from({ length: SHAPE_COUNT }).map((_, i) => {
      const typeKeys = ["work", "education", "achievement"] as const;
      const type = typeKeys[i % 3];
      return {
        id: i,
        type,
        // Spread across the full area via percentage positions
        left: `${5 + (i * 93) % 90}%`,
        top: `${3 + (i * 67 + 13) % 92}%`,
        size: 8 + (i * 17) % 22, // px
        // Unique drift animation (y bounce + rotation)
        driftY: [-8, 8, -8],
        rotateDeg: [0, (i % 2 === 0 ? 90 : -90), 0],
        duration: 4 + (i * 1.3) % 5,
        delay: (i * 0.4) % 3,
        shape: i % 3, // 0: square, 1: diamond, 2: circle
      };
    });
  }, []);

  // Don't render on mobile to save paint cost
  if (!isMounted || isMobile) return null;

  const activeColor = hoveredType ? typeColors[hoveredType] : defaultColor;

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden
    >
      {shapes.map((s) => {
        const shapeColor = hoveredType ? activeColor : typeColors[s.type];
        return (
          <motion.div
            key={s.id}
            style={{
              position: "absolute",
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              borderRadius: s.shape === 2 ? "50%" : s.shape === 1 ? "0" : "2px",
              rotate: s.shape === 1 ? "45deg" : "0deg",
              backgroundColor: "transparent",
              border: `1.5px solid ${shapeColor}`,
              opacity: 0,
            }}
            animate={{
              opacity: [0.12, 0.35, 0.12],
              y: s.driftY,
              rotate: s.shape === 1
                ? ["45deg", `${45 + s.rotateDeg[1]}deg`, "45deg"]
                : s.rotateDeg.map((r) => `${r}deg`),
              borderColor: shapeColor,
            }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
