"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Code2, Tag } from "lucide-react";
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
  const langColor = getLanguageColor(repo.language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-4 group h-full"
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
              className="p-2 rounded-lg glass text-[#8892a4] hover:text-[#4f72ff] hover:bg-[#4f72ff]/10 transition-all"
              title="Live Demo"
            >
              <ExternalLink size={14} />
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            id={`source-link-${repo.id}`}
            className="p-2 rounded-lg glass text-[#8892a4] hover:text-[#e2e8f0] hover:bg-white/5 transition-all"
            title="View Source"
          >
            <Code2 size={14} />
          </a>
        </div>
      </div>

      {/* Title */}
      <div>
        <h3 className="text-base font-bold text-[#e2e8f0] font-mono group-hover:text-white transition-colors truncate">
          {repo.name}
        </h3>
        {repo.description && (
          <p className="text-sm text-[#4a5568] mt-1.5 leading-relaxed line-clamp-3">
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
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-white/5 text-[#4a5568]">
              +{repo.topics.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-[#1e2235]/60 flex items-center justify-between">
        {/* Language */}
        <div className="flex items-center gap-1.5">
          {repo.language && (
            <>
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: langColor, boxShadow: `0 0 6px ${langColor}60` }}
              />
              <span className="text-xs text-[#4a5568] font-medium">
                {repo.language}
              </span>
            </>
          )}
        </div>

        {/* Stars & Forks */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#4a5568] hover:text-[#f59e0b] transition-colors">
            <Star size={13} />
            <span className="text-xs font-medium">{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#4a5568] hover:text-[#8892a4] transition-colors">
            <GitFork size={13} />
            <span className="text-xs font-medium">{repo.forks_count}</span>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#1e2235] text-[#8892a4] hover:border-[#4f72ff]/40 hover:text-[#4f72ff] hover:bg-[#4f72ff]/5 text-xs font-medium transition-all"
        >
          <Code2 size={13} />
          View Source
        </a>
        {repo.homepage ? (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#4f72ff] to-[#8b5cf6] text-white text-xs font-semibold hover:opacity-90 hover:shadow-[0_4px_15px_rgba(79,114,255,0.3)] transition-all"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1e2235]/50 text-[#4a5568] text-xs font-medium cursor-not-allowed">
            No Demo
          </div>
        )}
      </div>
    </motion.div>
  );
}
