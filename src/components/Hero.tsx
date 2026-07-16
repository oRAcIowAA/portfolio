"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, ChevronRight, Sparkles } from "lucide-react";

// Particle type
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid - dynamically colorized based on dark or light mode
      const isLight = document.documentElement.classList.contains("light");
      ctx.strokeStyle = isLight ? "rgba(79,114,255,0.06)" : "rgba(79,114,255,0.04)";
      ctx.lineWidth = 1;
      const gridSize = 64;
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79,114,255,${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79,114,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    // Listen for theme change events to redraw grid correctly
    const observer = new MutationObserver(() => {
      // Trigger canvas redraw
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

const codeLines = [
  "const developer = {",
  '  name: "OWEN CHRISTIAN T. ROBAS",',
  '  role: "Full-Stack Developer",',
  "  skills: [\"PHP\", \"Laravel\", \"Flutter\", \"MySQL\"],",
  "  passion: \"Developing reliable software\",",
  "};",
];

function FloatingCode() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 glass-card rounded-2xl p-5 font-mono text-sm w-80 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-text-muted text-xs">portfolio.ts</span>
      </div>
      {codeLines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.1 }}
          className="text-text-secondary leading-7"
        >
          {line.includes('"') ? (
            <>
              <span className="text-text-secondary">{line.split('"')[0]}</span>
              {line.split('"').slice(1).map((part, j) => (
                <span key={j}>
                  {j % 2 === 0 ? (
                    <span className="text-[#10b981]">&quot;{part}&quot;</span>
                  ) : (
                    <span className="text-text-secondary">{part}</span>
                  )}
                </span>
              ))}
            </>
          ) : (
            <span
              className={
                line.startsWith("const")
                  ? "text-[#4f72ff]"
                  : line === "};"
                  ? "text-text-secondary"
                  : "text-text-secondary"
              }
            >
              {line}
            </span>
          )}
        </motion.p>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-gradient-radial from-[rgba(79,114,255,0.08)] via-transparent to-transparent" style={{ backgroundPosition: "50% 0%", backgroundSize: "100% 60%" }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8b5cf6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#06b6d4]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Animated canvas background */}
      <AnimatedBackground />

      {/* Floating code snippet */}
      <FloatingCode />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#4f72ff]/20 text-sm text-[#4f72ff] font-medium mb-8"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>Available for opportunities</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          >
            <span className="text-text-primary">Hi, I&apos;m </span>
            <span className="gradient-text">Owen Christian</span>
            <span className="block text-text-primary mt-2">I build</span>
            <span className="block">
              <span className="gradient-text-emerald">reliable systems</span>
              <span className="text-text-primary"> &amp;</span>
            </span>
            <span className="text-text-primary">applications.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-text-secondary max-w-xl leading-relaxed mb-10"
          >
            I specialize in{" "}
            <span className="text-text-primary font-medium">
              PHP, Laravel, and Flutter
            </span>{" "}
            development, building database-driven applications and managing reliable IT and network infrastructures.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              id="hero-view-projects"
              className="btn-primary flex items-center gap-2"
            >
              View My Systems
              <ChevronRight size={16} />
            </a>
            <a
              href="/resume.pdf"
              download="Owen_Robas_Resume.pdf"
              id="hero-download-resume"
              className="btn-secondary flex items-center gap-2"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center gap-8 mt-14 pt-8 border-t border-border/60"
          >
            {[
              { value: "1+", label: "Year of Experience" },
              { value: "3+", label: "Core Systems Built" },
              { value: "12+", label: "Technologies Mastered" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-text-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
