"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Sunset, Sunrise, Sparkles } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TimeSlot = "morning" | "afternoon" | "evening";

interface Greeting {
  label: string;       // e.g. "Good morning"
  emoji: string;       // supplementary emoji (screen-reader hidden)
  slot: TimeSlot;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting(hour: number): Greeting {
  if (hour >= 5 && hour < 12)
    return { label: "Good morning", emoji: "🌅", slot: "morning" };
  if (hour >= 12 && hour < 17)
    return { label: "Good afternoon", emoji: "☀️", slot: "afternoon" };
  // Anything from 17:00 onward (including late night) → "Good evening"
  return { label: "Good evening", emoji: "🌇", slot: "evening" };
}

// Icon mapped to time slot
const SlotIcon: Record<TimeSlot, React.ElementType> = {
  morning:   Sunrise,
  afternoon: Sun,
  evening:   Sunset,
};

// Accent colour per time slot — all within the portfolio palette
const slotColour: Record<TimeSlot, string> = {
  morning:   "#f59e0b", // amber  — warm sunrise
  afternoon: "#4f72ff", // blue   — bright day
  evening:   "#8b5cf6", // purple — evening & late night
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * GreetingBadge
 *
 * Drop this **above** (or in place of) the existing "Available for
 * opportunities" pill inside Hero.tsx.  It uses the same `.glass` +
 * `rounded-full` + `border-[accent]/20` recipe so it blends seamlessly.
 *
 * ```tsx
 * // Hero.tsx — replace the static badge motion.div with:
 * <GreetingBadge />
 * ```
 *
 * The component is time-aware: it reads the visitor's local hour and shows
 * an appropriate greeting + icon.  The status dot pulses green to signal
 * availability.
 */
export default function GreetingBadge() {
  const [greeting, setGreeting] = useState<Greeting | null>(null);

  useEffect(() => {
    // Run only on the client to avoid hydration mismatch
    const update = () => setGreeting(getGreeting(new Date().getHours()));
    update();

    // Refresh every minute so the greeting stays accurate on long visits
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // During SSR / first paint render an invisible placeholder of the same
  // size so layout does not shift when the greeting loads.
  if (!greeting) {
    return (
      <div
        aria-hidden="true"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                   glass border border-[#4f72ff]/20 opacity-0 select-none"
        style={{ minWidth: "220px", height: "36px" }}
      />
    );
  }

  const Icon = SlotIcon[greeting.slot];
  const colour = slotColour[greeting.slot];

  return (
    <motion.div
      key={greeting.slot}                    // re-animate if slot changes
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                 glass border font-medium text-sm select-none w-fit"
      style={{
        borderColor: `${colour}33`,          // 20 % opacity border
        color: colour,
      }}
      aria-label={`${greeting.label} — Owen is available for opportunities`}
    >
      {/* Time-of-day icon */}
      <motion.span
        animate={{ rotate: [0, 12, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <Icon size={14} strokeWidth={2.25} />
      </motion.span>

      {/* Greeting text */}
      <span>{greeting.label} — I&apos;m</span>

      {/* Availability status with pulse dot */}
      <span className="inline-flex items-center gap-1.5">
        {/* Green pulse dot */}
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span
            className="animate-ping absolute inline-flex h-full w-full
                       rounded-full bg-emerald-400 opacity-75"
          />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-semibold" style={{ color: "#10b981" }}>
          available
        </span>
      </span>

      {/* Sparkle accent */}
      <motion.span
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <Sparkles size={12} />
      </motion.span>
    </motion.div>
  );
}
