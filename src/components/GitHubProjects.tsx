import { GitHubRepo } from "@/types";
import GitHubProjectsClient from "./GitHubProjectsClient";

const GITHUB_USERNAME = "oRAcIowAA";

// Robust fallback repos in case of API rate-limiting or network issues
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "CASURECO2ITASSETS",
    full_name: "oRAcIowAA/CASURECO2ITASSETS",
    description: "CASU RECO 2 ICT Asset - An information system that tracks the complete lifecycle of CASURECO II's IT equipment from computers and printers to network devices. Built from scratch with inventory management, assignment history logs, and QR code integration.",
    html_url: "https://github.com/oRAcIowAA/CASURECO2ITASSETS",
    homepage: "",
    language: "PHP",
    stargazers_count: 10,
    forks_count: 4,
    topics: ["laravel", "asset-tracking", "inventory-management", "php", "livewire", "qr-code", "database-design"],
    fork: false,
    updated_at: new Date().toISOString(),
    created_at: "2024-02-10T10:30:00Z",
    open_issues_count: 0,
    visibility: "public"
  },
  {
    id: 2,
    name: "FureverCare",
    full_name: "oRAcIowAA/FureverCare",
    description: "Veterinary Management and Pet Care System. Built as a Capstone project to help veterinary clinics and pet owners manage medical records, schedule appointments, send automated SMS reminders, and facilitate clinic messaging.",
    html_url: "https://github.com/oRAcIowAA/FureverCare",
    homepage: "",
    language: "PHP",
    stargazers_count: 8,
    forks_count: 2,
    topics: ["laravel", "veterinary-management", "pet-care", "sms-notifications", "appointment-scheduling", "mysql"],
    fork: false,
    updated_at: new Date().toISOString(),
    created_at: "2024-05-15T08:00:00Z",
    open_issues_count: 0,
    visibility: "public"
  },
  {
    id: 3,
    name: "ssc-automated-email-sender",
    full_name: "oRAcIowAA/ssc-automated-email-sender",
    description: "Automated Email Sender System for SSC members. A lightweight, automated notification utility designed to send announcements, updates, and meeting reminders to all registered email addresses.",
    html_url: "https://github.com/oRAcIowAA/ssc-automated-email-sender",
    homepage: "",
    language: "PHP",
    stargazers_count: 5,
    forks_count: 1,
    topics: ["php", "email-notifications", "automation", "phpmailer", "mysql", "web-application"],
    fork: false,
    updated_at: new Date().toISOString(),
    created_at: "2024-07-01T14:20:00Z",
    open_issues_count: 0,
    visibility: "public"
  },
  {
    id: 4,
    name: "casureco2-dms",
    full_name: "oRAcIowAA/casureco2-dms",
    description: "Document Management System for CASURECO II. A platform built to manage, track, and archive official department documents, featuring interactive reporting and employee history tracking.",
    html_url: "https://github.com/oRAcIowAA/casureco2-dms",
    homepage: "",
    language: "PHP",
    stargazers_count: 7,
    forks_count: 3,
    topics: ["laravel", "document-management", "php", "mysql", "bootstrap", "livewire"],
    fork: false,
    updated_at: new Date().toISOString(),
    created_at: "2024-01-15T08:00:00Z",
    open_issues_count: 0,
    visibility: "public"
  }
];

async function fetchRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Use GITHUB_TOKEN if available in environment (e.g. for high Vercel build rate limits)
          ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {})
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}. Using fallback repositories.`);
      return FALLBACK_REPOS;
    }

    const data: GitHubRepo[] = await res.json();

    if (!Array.isArray(data)) {
      console.warn("GitHub API did not return an array. Using fallback repositories.");
      return FALLBACK_REPOS;
    }

    // Filter out forks, sort by stars then updated
    const filtered = data
      .filter((repo) => !repo.fork)
      .sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 6);

    return filtered.length > 0 ? filtered : FALLBACK_REPOS;
  } catch (error) {
    console.error("Failed to fetch GitHub repos, returning fallbacks:", error);
    return FALLBACK_REPOS;
  }
}

export default async function GitHubProjects() {
  const repos = await fetchRepos();
  return <GitHubProjectsClient repos={repos} username={GITHUB_USERNAME} />;
}

