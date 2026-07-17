"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Stage = "video" | "greeting" | "done";

interface GreetingConfig {
  title: string;       // e.g. "Good Evening"
  color: string;       // accent hex for glow + cursor
}

// ─── Time helper ───────────────────────────────────────────────────────────────
// No "Good Night" — anything after 18:00 stays "Good Evening" per spec.
function getGreeting(hour: number): GreetingConfig {
  if (hour >= 5 && hour < 12)
    return { title: "Good Morning",   color: "#f59e0b" }; // amber
  if (hour >= 12 && hour < 18)
    return { title: "Good Afternoon", color: "#4f72ff" }; // blue
  return   { title: "Good Evening",   color: "#8b5cf6" }; // purple
}

// ─── Terminal typing hook ──────────────────────────────────────────────────────
function useTypewriter(text: string, active: boolean, speed = 55) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone]           = useState(false);

  useEffect(() => {
    if (!active) { setDisplayed(""); setDone(false); return; }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const tick = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(tick); setDone(true); }
    }, speed);
    return () => clearInterval(tick);
  }, [text, active, speed]);

  return { displayed, done };
}

// ─── Session key ───────────────────────────────────────────────────────────────
const SESSION_KEY = "intro-sequence-seen";

// ─── Main component ────────────────────────────────────────────────────────────
export default function IntroSequence() {
  const [stage,   setStage]   = useState<Stage | null>(null); // null = not yet decided
  const [greeting, setGreeting] = useState<GreetingConfig | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();

  // ── Initialise on mount (client-only) ─────────────────────────────────────
  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen || prefersReduced) {
      setStage("done");
      return;
    }

    const hour = new Date().getHours();
    setGreeting(getGreeting(hour));
    setStage("video");
  }, [prefersReduced]);

  // ── Advance: video → greeting ──────────────────────────────────────────────
  const handleVideoEnd = useCallback(() => {
    setStage("greeting");
  }, []);

  // Skip hotkey (Escape or Space) during video stage
  useEffect(() => {
    if (stage !== "video") return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") handleVideoEnd();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [stage, handleVideoEnd]);

  // ── Typewriter for the greeting ────────────────────────────────────────────
  const greetingText = greeting ? `${greeting.title}, visitor.` : "";
  const { displayed, done: typeDone } = useTypewriter(
    greetingText,
    stage === "greeting"
  );

  // After typing finishes, hold 1.8 s then move to done
  useEffect(() => {
    if (!typeDone) return;
    const t = setTimeout(() => {
      setStage("done");
      sessionStorage.setItem(SESSION_KEY, "true");
    }, 1800);
    return () => clearTimeout(t);
  }, [typeDone]);

  // Nothing to render once done (or while deciding)
  if (stage === "done" || stage === null) return null;

  return (
    // Full-screen overlay — pointer-events-auto so click-to-skip works
    <div className="fixed inset-0 z-[99999] bg-[#090b13] overflow-hidden">
      {/* ───────────── STAGE 1 — VIDEO ───────────── */}
      <AnimatePresence>
        {stage === "video" && (
          <motion.div
            key="video-stage"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {/* Video — object-contain on mobile, cover on desktop */}
            <video
              ref={videoRef}
              src="/intro.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="
                w-full h-full
                object-contain sm:object-cover
              "
            />

            {/* Skip hint */}
            <button
              onClick={handleVideoEnd}
              className="
                absolute bottom-8 right-8
                px-4 py-2 rounded-full text-xs font-mono font-medium
                text-white/50 border border-white/10
                hover:text-white/80 hover:border-white/30
                transition-colors duration-200 cursor-pointer
                select-none backdrop-blur-sm
              "
              style={{ background: "rgba(9,11,19,0.6)" }}
            >
              Skip ↩
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────── STAGE 2 — GREETING ───────────── */}
      <AnimatePresence>
        {stage === "greeting" && greeting && (
          <motion.div
            key="greeting-stage"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            {/* Purple ambient glow pulsing behind text */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.18, 0.30, 0.18] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute w-[420px] h-[420px] rounded-full blur-[100px]"
              style={{
                background: `radial-gradient(circle, ${greeting.color} 0%, transparent 70%)`,
              }}
            />

            {/* Terminal card */}
            <div
              className="relative z-10 w-full max-w-xl glass-card rounded-2xl p-6 sm:p-8 font-mono shadow-2xl"
              style={{ borderColor: `${greeting.color}25` }}
            >
              {/* macOS dots + filename */}
              <div className="flex items-center gap-1.5 mb-5 select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"    aria-hidden />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" aria-hidden />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70"  aria-hidden />
                <span className="ml-2 text-[11px] text-text-muted">greeting.ts</span>
              </div>

              {/* Typed greeting line */}
              <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-text-primary leading-snug min-h-[2.5rem]">
                {/* comment prefix */}
                <span style={{ color: greeting.color }} className="mr-1">›</span>
                {displayed}
                {/* Blinking cursor — hides once typing is done */}
                {!typeDone && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block ml-0.5 w-[2px] h-6 align-middle rounded-sm"
                    style={{ background: greeting.color }}
                  />
                )}
              </p>

              {/* Subtext — fades in after typing finishes */}
              <AnimatePresence>
                {typeDone && (
                  <motion.p
                    key="subtext"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="mt-4 text-sm text-text-muted"
                  >
                    <span style={{ color: greeting.color }}>// </span>
                    thanks for stopping by.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Progress bar beneath card — sweeps across over ~type + hold duration */}
            <div className="relative z-10 w-full max-w-xl h-0.5 bg-border/40 rounded-full mt-5 overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: greetingText.length * 0.055 + 1.8,
                  ease: "linear",
                }}
                className="absolute inset-y-0 w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${greeting.color}, transparent)`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
