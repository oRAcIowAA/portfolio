"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, MapPin, Coffee, Zap } from "lucide-react";

const techStack = [
  { name: "PHP", color: "#8b5cf6", icon: "🐘" },
  { name: "Laravel", color: "#ef4444", icon: "🔥" },
  { name: "Python", color: "#3b82f6", icon: "🐍" },
  { name: "Java", color: "#e2e8f0", icon: "☕" },
  { name: "C#", color: "#10b981", icon: "🎯" },
  { name: "Flutter", color: "#06b6d4", icon: "📱" },
  { name: "Dart", color: "#06b6d4", icon: "🎯" },
  { name: "HTML5", color: "#f97316", icon: "🌐" },
  { name: "CSS3", color: "#4f72ff", icon: "🎨" },
  { name: "JavaScript", color: "#f59e0b", icon: "⚡" },
  { name: "ASP.NET Core", color: "#6366f1", icon: "💻" },
  { name: "MySQL", color: "#4f72ff", icon: "💾" },
  { name: "Git & GitHub", color: "#e2e8f0", icon: "🐙" },
  { name: "VS Code", color: "#06b6d4", icon: "📝" },
];

// Duplicate for seamless loop
const marqueeItems = [...techStack, ...techStack];

interface CardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: CardProps) {
  return (
    <div className="glass-card rounded-xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-[#4f72ff]/10 flex items-center justify-center text-[#4f72ff] flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-text-muted font-medium uppercase tracking-wider">{label}</p>
        <p className="text-sm text-text-primary font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#4f72ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-[#4f72ff] text-sm">01.</span>
          <span className="text-sm font-medium text-text-muted uppercase tracking-widest">
            About Me
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-heading text-text-primary mb-12"
        >
          Crafting digital{" "}
          <span className="gradient-text">experiences</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p className="text-lg">
                I&apos;m a passionate{" "}
                <span className="text-text-primary font-medium">
                  IT Graduate & Developer
                </span>{" "}
                who specializes in building database systems and full-stack applications. I have solid experience designing and launching web and mobile systems during my on-the-job training (OJT) and freelance work.
              </p>
              <p>
                My main expertise is in{" "}
                <span className="text-[#4f72ff] font-medium">
                  web & mobile application development
                </span>{" "}
                using PHP, Laravel, and Flutter/Dart. I love developing clean databases, custom business workflows, and interactive administrative panels from scratch.
              </p>
              <p>
                Beyond software engineering, I have a strong foundation in IT systems administration, including{" "}
                <span className="text-text-primary font-medium">network configuration</span> (IP troubleshooting, cabling), system diagnostic administration, and hardware maintenance.
              </p>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <InfoCard icon={<MapPin size={18} />} label="Location" value="Naga City, PH 🇵🇭" />
              <InfoCard icon={<Coffee size={18} />} label="Status" value="Open to Work" />
              <InfoCard icon={<Zap size={18} />} label="Focus" value="Web, Mobile & IT" />
              <InfoCard icon={<User size={18} />} label="Experience" value="OJT / Freelance" />
            </div>
          </motion.div>

          {/* Right: Avatar + decoration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Avatar placeholder */}
            <div className="relative">
              <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-[#4f72ff]/10 to-[#8b5cf6]/10 border border-border flex items-center justify-center text-8xl shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4f72ff]/5 to-[#8b5cf6]/5" />
                <span className="relative z-10">👨‍💻</span>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 glass-card rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
                <span className="text-xs font-medium text-[#10b981]">Available</span>
              </div>
            </div>

            {/* Quick skills highlight */}
            <div className="w-full glass-card rounded-2xl p-5">
              <p className="text-xs font-mono text-[#4f72ff] mb-3 uppercase tracking-widest">
                Core Expertise
              </p>
              <div className="flex flex-wrap gap-2">
                {["Web Development", "Mobile Applications", "Database Management", "IP & Network Config", "Hardware Troubleshooting", "Systems Administration"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-[#4f72ff]/10 text-[#4f72ff] border border-[#4f72ff]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20"
        >
          <p className="text-center text-xs font-mono text-text-muted uppercase tracking-widest mb-6">
            Tech Stack & Tools
          </p>

          {/* Marquee */}
          <div className="marquee-container relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="marquee-track gap-4 py-2">
              {marqueeItems.map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  className="flex-shrink-0 glass-card rounded-xl px-5 py-3 flex items-center gap-3 mx-2"
                >
                  <span className="text-xl">{tech.icon}</span>
                  <span
                    className="text-sm font-medium whitespace-nowrap"
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
