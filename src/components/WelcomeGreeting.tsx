"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Sunset, Sunrise, Sparkles } from "lucide-react";

type TimeSlot = "morning" | "afternoon" | "evening";

interface GreetingConfig {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
}

function getGreetingConfig(hour: number): GreetingConfig {
  if (hour >= 5 && hour < 12) {
    return {
      title: "Good Morning",
      subtitle: "Welcome to my portfolio. Let's build something great today.",
      icon: Sunrise,
      color: "#f59e0b",
    };
  }
  if (hour >= 12 && hour < 17) {
    return {
      title: "Good Afternoon",
      subtitle: "Welcome to my portfolio. Hope your day is going fantastic.",
      icon: Sun,
      color: "#4f72ff",
    };
  }
  // 17:00 onward — including late night — shows Good Evening
  return {
    title: "Good Evening",
    subtitle: "Welcome to my portfolio. Let's design and connect.",
    icon: Sunset,
    color: "#8b5cf6",
  };
}

export default function WelcomeGreeting() {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<GreetingConfig | null>(null);

  useEffect(() => {
    // Run only once per session
    const hasSeenGreeting = sessionStorage.getItem("seen-welcome-greeting");

    if (!hasSeenGreeting) {
      const hour = new Date().getHours();
      setConfig(getGreetingConfig(hour));
      setVisible(true);

      // Keep visible for 2.8 seconds, then fade out
      const timer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("seen-welcome-greeting", "true");
      }, 2800);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible || !config) return null;

  const IconComponent = config.icon;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#090b13] overflow-hidden select-none pointer-events-none"
        >
          {/* Subtle background glow */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 transition-all duration-1000"
            style={{
              background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
            }}
          />

          {/* Decorative floating sparkles */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  scale: Math.random() * 0.4 + 0.3,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  y: ["0%", "-10%", "0%"],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles size={16} style={{ color: config.color }} />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
            {/* Animated Time-of-day Icon */}
            <motion.div
              initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.1,
              }}
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl relative"
              style={{
                background: `linear-gradient(135deg, ${config.color}20, ${config.color}05)`,
                border: `1px solid ${config.color}30`,
              }}
            >
              <IconComponent size={38} style={{ color: config.color }} strokeWidth={1.5} />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  boxShadow: `0 0 30px ${config.color}20`,
                }}
              />
            </motion.div>

            {/* Greeting Headline */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white"
            >
              {config.title}, <span className="gradient-text">Visitor</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-base text-gray-400 font-medium max-w-md leading-relaxed"
            >
              {config.subtitle}
            </motion.p>

            {/* Subtle animated loader line */}
            <div className="w-48 h-0.5 bg-gray-800 rounded-full mt-10 overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-y-0 w-2/3 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
