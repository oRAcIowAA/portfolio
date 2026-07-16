"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, Code2, FileText, Image, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GitHubRepo } from "@/types";

// Language color map
const languageColors: Record<string, string> = {
  TypeScript: "#4f72ff",
  JavaScript: "#f59e0b",
  Python: "#3b82f6",
  Go: "#06b6d4",
  Rust: "#f97316",
  Java: "#ef4444",
  PHP: "#8b5cf6",
  Ruby: "#ec4899",
  "C#": "#10b981",
  "C++": "#6366f1",
  HTML: "#f97316",
  CSS: "#4f72ff",
  Shell: "#10b981",
  Dockerfile: "#2563eb",
  Dart: "#00b4ab",
  Default: "#8892a4",
};

function getLanguageColor(lang: string | null): string {
  if (!lang) return languageColors.Default;
  return languageColors[lang] ?? languageColors.Default;
}

export default function ProjectCard({
  repo,
  index,
}: {
  repo: GitHubRepo;
  index: number;
}) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const langColor = getLanguageColor(repo.language);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (repo.screenshots) {
      setActiveImgIndex((prev) => (prev === 0 ? repo.screenshots!.length - 1 : prev - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (repo.screenshots) {
      setActiveImgIndex((prev) => (prev === repo.screenshots!.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="glass-card rounded-2xl p-6 flex flex-col gap-4 group h-full relative"
        id={`project-card-${repo.id}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4f72ff]/10 border border-[#4f72ff]/20 flex items-center justify-center text-[#4f72ff] flex-shrink-0 group-hover:bg-[#4f72ff]/20 transition-colors">
            <Code2 size={18} />
          </div>
          <div className="flex gap-2">
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                id={`demo-link-${repo.id}`}
                className="p-2 rounded-lg glass text-text-secondary hover:text-[#4f72ff] hover:bg-[#4f72ff]/10 transition-all animate-fade-in"
                title="Live Demo"
              >
                <ExternalLink size={14} />
              </a>
            )}
            {repo.html_url && (
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                id={`source-link-${repo.id}`}
                className="p-2 rounded-lg glass text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-all"
                title="View Source"
              >
                <Code2 size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base font-bold text-text-primary font-mono group-hover:text-[#4f72ff] transition-colors truncate">
            {repo.name}
          </h3>
          {repo.description && (
            <p className="text-sm text-text-secondary mt-1.5 leading-relaxed line-clamp-3">
              {repo.description}
            </p>
          )}
        </div>

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#4f72ff]/10 text-[#4f72ff] border border-[#4f72ff]/15 hover:bg-[#4f72ff]/20 transition-colors cursor-default"
              >
                {topic}
              </span>
            ))}
            {repo.topics.length > 5 && (
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-surface text-text-secondary border border-border">
                +{repo.topics.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Footer info (Language, Stars, Forks) */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          {/* Language */}
          <div className="flex items-center gap-1.5">
            {repo.language && (
              <>
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: langColor, boxShadow: `0 0 6px ${langColor}60` }}
                />
                <span className="text-xs text-text-secondary font-medium">
                  {repo.language}
                </span>
              </>
            )}
          </div>

          {/* Stars & Forks */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-text-secondary hover:text-amber-500 transition-colors">
              <Star size={13} />
              <span className="text-xs font-medium">{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
              <GitFork size={13} />
              <span className="text-xs font-medium">{repo.forks_count}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-2">
          {repo.html_url && (
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[110px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border text-text-secondary hover:border-[#4f72ff]/40 hover:text-[#4f72ff] hover:bg-[#4f72ff]/5 text-xs font-medium transition-all"
            >
              <Code2 size={13} />
              Source Code
            </a>
          )}

          {repo.screenshots && (
            <button
              onClick={() => { setIsGalleryOpen(true); setActiveImgIndex(0); }}
              className="flex-1 min-w-[110px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#4f72ff] to-[#8b5cf6] text-white text-xs font-semibold hover:opacity-90 hover:shadow-[0_4px_15px_rgba(79,114,255,0.3)] transition-all cursor-pointer"
            >
              <Image size={13} />
              Screenshots
            </button>
          )}

          {repo.paperUrl && (
            <a
              href={repo.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[110px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold hover:opacity-90 hover:shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-all"
            >
              <FileText size={13} />
              View Paper
            </a>
          )}
        </div>
      </motion.div>

      {/* Lightbox / Modal for Screenshots */}
      <AnimatePresence>
        {isGalleryOpen && repo.screenshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setIsGalleryOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Slider container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full aspect-video bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <img
                src={repo.screenshots[activeImgIndex]}
                alt={`${repo.name} Screenshot ${activeImgIndex + 1}`}
                className="w-full h-full object-contain select-none"
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-105 transition-all border border-white/10 z-10 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-105 transition-all border border-white/10 z-10 cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Counter / Page Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 border border-white/10 text-white text-xs font-mono">
                {activeImgIndex + 1} / {repo.screenshots.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
