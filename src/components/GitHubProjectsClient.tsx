"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, ExternalLink, Inbox } from "lucide-react";
import type { GitHubRepo } from "@/types";
import ProjectCard from "./ProjectCard";

interface Props {
  repos: GitHubRepo[];
  username: string;
}

function EmptyState({ username }: { username: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-surface-2 flex items-center justify-center mb-4">
        <Inbox size={32} className="text-text-muted" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        No public repositories found
      </h3>
      <p className="text-sm text-text-muted max-w-sm">
        No repositories are available for{" "}
        <span className="text-[#4f72ff] font-mono">@{username}</span>.
      </p>
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 btn-secondary flex items-center gap-2 text-sm"
      >
        <Code2 size={16} />
        Visit GitHub Profile
      </a>
    </div>
  );
}

export default function GitHubProjectsClient({ repos, username }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-[#4f72ff] text-sm">02.</span>
          <span className="text-sm font-medium text-text-muted uppercase tracking-widest">
            Systems &amp; Projects
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-heading text-text-primary"
          >
            Things I&apos;ve{" "}
            <span className="gradient-text">Built</span>
          </motion.h2>

          <motion.a
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-repos"
            className="flex items-center gap-2 text-sm text-[#4f72ff] hover:text-[#8b5cf6] font-medium transition-colors flex-shrink-0"
          >
            <Code2 size={16} />
            View All on GitHub
            <ExternalLink size={12} />
          </motion.a>
        </div>

        {/* Grid */}
        {repos.length === 0 ? (
          <EmptyState username={username} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-14"
          >
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
              id="github-profile-cta"
            >
              <Code2 size={16} />
              See More on GitHub
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
