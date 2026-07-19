"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
import { useDevice } from "@/hooks/useDevice";

// Dynamic import of WebGL sub-components to prevent server-side rendering issues
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });
const WebGLLaptop = dynamic(() => import("./WebGLLaptop"), { ssr: false });

export default function ScrollLaptop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isMobile, hasWebgl, isMounted } = useDevice();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Track scroll value in a ref for fast, non-rerendering WebGL useFrame access
  const scrollValRef = useRef(0);
  
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollValRef.current = v;
  });

  // CSS 3D fallback transform configurations for mobile or non-WebGL devices
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-35, 35]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [8, -4]
  );
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [0, 0, 0] : [30, 0, 30]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] w-full flex items-center justify-center overflow-hidden"
    >
      {/* ── Desktop WebGL 3D Canvas Scene ── */}
      {isMounted && !isMobile && hasWebgl ? (
        <div className="absolute inset-0 w-full h-full">
          <SceneCanvas>
            <WebGLLaptop scrollValRef={scrollValRef} />
          </SceneCanvas>
        </div>
      ) : (
        /* ── Mobile/Fallback CSS 3D Scene ── */
        <div className="relative w-full h-full flex items-center justify-center [perspective:1200px]">
          {/* Ambient backdrop */}
          <div
            className="pointer-events-none absolute w-64 h-64 rounded-full blur-3xl
                       bg-purple-500/25 dark:bg-purple-500/25
                       opacity-100 dark:opacity-100
                       [background:radial-gradient(circle,theme(colors.purple.300/40),transparent_70%)]
                       dark:[background:radial-gradient(circle,theme(colors.purple.600/30),transparent_70%)]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 80 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          >
            <motion.div
              style={{ rotateY, rotateX, y: translateY }}
              className="relative w-[280px] h-[190px] [transform-style:preserve-3d]"
            >
              {/* Screen / chassis */}
              <div
                className="absolute inset-x-0 top-0 h-[170px] rounded-t-lg p-3
                           bg-gradient-to-br from-slate-700 to-slate-900
                           dark:from-slate-800 dark:to-slate-950
                           border border-slate-600/40 dark:border-purple-500/30
                           shadow-[0_25px_40px_-15px_rgba(0,0,0,0.35)]
                           dark:shadow-[0_0_50px_rgba(139,92,246,0.25)]
                           flex items-center justify-center"
              >
                <div
                  className="w-full h-full rounded-md flex flex-col justify-center px-3 overflow-hidden
                             bg-gradient-to-br from-slate-950 to-black
                             dark:from-indigo-950 dark:to-slate-950"
                >
                  <div className="flex gap-1.5 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <code className="text-[10px] leading-relaxed font-mono text-emerald-400">
                    <span className="text-purple-400">const</span> build ={" "}
                    <span className="text-blue-400">await</span> deploy();
                    <br />
                    <span className="text-slate-500">✓</span> compiled successfully
                  </code>
                </div>
              </div>

              {/* Base / keyboard deck */}
              <div
                className="absolute -inset-x-2.5 -bottom-3.5 h-4 rounded-b-lg
                           bg-gradient-to-r from-slate-600 to-slate-500
                           dark:from-slate-700 dark:to-slate-800
                           shadow-md dark:shadow-lg"
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-4
                           w-16 h-1.5 rounded-full bg-slate-400/50 dark:bg-slate-500/40"
              />

              {/* Grounding shadow */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-40 h-4 rounded-full blur-md
                           bg-slate-900/20 dark:bg-black/0"
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
