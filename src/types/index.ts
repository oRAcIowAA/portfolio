// ─── GitHub API Types ───────────────────────────────────────────────────────

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  updated_at: string;
  created_at: string;
  open_issues_count: number;
  visibility: string;
}

// ─── Component Prop Types ────────────────────────────────────────────────────

export interface ProjectCardProps {
  repo: GitHubRepo;
  index: number;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
  type: "work" | "education" | "achievement";
}

export interface TechItem {
  name: string;
  icon: string;
  color: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}
