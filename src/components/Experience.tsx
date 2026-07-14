"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Trophy, Calendar } from "lucide-react";
import type { TimelineItem } from "@/types";

const timelineData: TimelineItem[] = [
  {
    year: "2022 – 2026",
    title: "Bachelor of Science in Information Technology",
    company: "STI College - Naga",
    description:
      "Focusing on software development, systems administration, database management, and network engineering. Developed 'FureverCare' (Veterinary Management and Pet Care System) as a capstone project.",
    tags: ["Laravel", "MySQL", "Flutter", "Capston Project", "SMS Automation"],
    type: "education",
  },
  {
    year: "2024 (OJT)",
    title: "On-the-Job Trainee (IT & System Developer)",
    company: "CASURECO II (CORPLAN-IT Division)",
    description:
      "Developed the 'CASU RECO 2 ICT Asset' system from scratch. Built a complete web system to track inventory, allocation, and audit logs of IT devices (PC units, printers, and network devices) with QR/UUID scanning features.",
    tags: ["Laravel", "MySQL", "Bootstrap", "QR Scanning", "Inventory Management"],
    type: "work",
  },
  {
    year: "2024",
    title: "Freelance System Developer",
    company: "Self-Employed",
    description:
      "Designed and developed the 'SSC Automated Email Sender System', an automated notification utility that distributes announcements and meeting reminders to registered members' emails.",
    tags: ["PHP", "JavaScript", "PHPMailer", "MySQL", "Automation"],
    type: "work",
  },
  {
    year: "October 2024",
    title: "Professional Certifications",
    company: "USAID-IPOP Program",
    description:
      "Earned certifications in: Natural Language Processing, Fundamentals of AI Ethics and Governance, Artificial Intelligence/Machine Learning, and 5G Mobile Networks.",
    tags: ["NLP", "AI Ethics", "Machine Learning", "5G Networks"],
    type: "achievement",
  },
  {
    year: "2019 – 2021",
    title: "Pre-Baccalaureate Maritime",
    company: "Mariners Polytechnic Colleges",
    description:
      "Completed secondary education under the Pre-Baccalaureate Maritime academic strand.",
    tags: ["Maritime Academic", "Senior High School"],
    type: "education",
  },
  {
    year: "2015 – 2019",
    title: "Junior High School",
    company: "Ateneo de Naga University High School",
    description:
      "Acquired a solid academic foundation in mathematics, science, and communication.",
    tags: ["Secondary Education"],
    type: "education",
  },
];

const typeConfig = {
  work: {
    icon: Briefcase,
    color: "#4f72ff",
    bg: "bg-[#4f72ff]/10",
    border: "border-[#4f72ff]/30",
  },
  education: {
    icon: GraduationCap,
    color: "#10b981",
    bg: "bg-[#10b981]/10",
    border: "border-[#10b981]/30",
  },
  achievement: {
    icon: Trophy,
    color: "#f59e0b",
    bg: "bg-[#f59e0b]/10",
    border: "border-[#f59e0b]/30",
  },
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0f1120]/40" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#1e2235] to-transparent" />

      <div className="max-w-4xl mx-auto relative" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-[#4f72ff] text-sm">03.</span>
          <span className="text-sm font-medium text-[#4a5568] uppercase tracking-widest">
            Experience
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#1e2235] to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-heading text-white mb-16"
        >
          My <span className="gradient-text">Journey</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#4f72ff] via-[#8b5cf6] to-transparent opacity-40 -translate-x-1/2" />

          <div className="space-y-10">
            {timelineData.map((item, i) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Mobile/Desktop dot */}
                  <div
                    className={`absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full ${config.bg} border-2 ${config.border} flex items-center justify-center z-10 flex-shrink-0`}
                    style={{ boxShadow: `0 0 20px ${config.color}30` }}
                  >
                    <Icon size={16} style={{ color: config.color }} />
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-14 md:ml-0 w-full md:w-[45%] ${
                      isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-[55%]"
                    }`}
                  >
                    <div className="glass-card rounded-2xl p-5 group">
                      {/* Date */}
                      <div
                        className={`flex items-center gap-1.5 mb-2 ${
                          isEven
                            ? "md:justify-end"
                            : "justify-start"
                        }`}
                      >
                        <Calendar size={12} style={{ color: config.color }} />
                        <span
                          className="text-xs font-mono font-medium"
                          style={{ color: config.color }}
                        >
                          {item.year}
                        </span>
                      </div>

                      {/* Title & Company */}
                      <h3 className="text-base font-bold text-[#e2e8f0] leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#4a5568] font-medium mb-3">
                        {item.company}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-[#8892a4] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div
                        className={`flex flex-wrap gap-1.5 ${
                          isEven ? "md:justify-end" : "justify-start"
                        }`}
                      >
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 text-xs font-medium rounded-full"
                            style={{
                              backgroundColor: `${config.color}15`,
                              color: config.color,
                              border: `1px solid ${config.color}25`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
