import { GitHubRepo } from "@/types";
import GitHubProjectsClient from "./GitHubProjectsClient";

const GITHUB_USERNAME = "oRAcIowAA";

const STATIC_PROJECTS: GitHubRepo[] = [
  {
    id: 1,
    name: "CASURECO2ITASSETS",
    full_name: "oRAcIowAA/CASURECO2ITASSETS",
    description: "An advanced IT asset tracking and management system built for CASURECO II. Tracks the entire lifecycle of computers, printers, and network devices, including branches, department assignments, maintenance logs, and QR code integration.",
    html_url: "https://github.com/oRAcIowAA/CASURECO2ITASSETS",
    homepage: null,
    language: "PHP",
    stargazers_count: 12,
    forks_count: 4,
    topics: ["Laravel", "MySQL", "Livewire", "QR Codes", "Asset Tracking", "Bootstrap"],
    fork: false,
    updated_at: "2024-02-10T10:30:00Z",
    created_at: "2024-02-10T10:30:00Z",
    open_issues_count: 0,
    visibility: "public",
    screenshots: [
      "/casureco-screenshots/Screenshot 2026-07-16 021310.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021339.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021354.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021402.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021413.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021421.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021430.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021438.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021451.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021458.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021512.png",
      "/casureco-screenshots/Screenshot 2026-07-16 021527.png"
    ]
  },
  {
    id: 2,
    name: "FureverCare",
    full_name: "oRAcIowAA/FureverCare",
    description: "Veterinary Management and Pet Care Mobile Application built with Flutter. Handles medical records, appointment scheduling, automated SMS reminders (via Semaphore API), and clinic messaging to connect vets and pet owners.",
    html_url: "",
    homepage: null,
    language: "Dart",
    stargazers_count: 10,
    forks_count: 2,
    topics: ["Flutter", "Dart", "Mobile Application", "Veterinary Management", "SMS Automation", "Capstone Project"],
    fork: false,
    updated_at: "2024-05-15T08:00:00Z",
    created_at: "2024-05-15T08:00:00Z",
    open_issues_count: 0,
    visibility: "public",
    paperUrl: "/furevercare capstone pt.pdf"
  },
  {
    id: 3,
    name: "JumpQuest",
    full_name: "oRAcIowAA/JumpQuest",
    description: "An interactive, educational platformer game built as a Capstone project designed to teach logic, basic programming fundamentals, and algorithmic thinking concepts using engaging level designs and game mechanics.",
    html_url: "",
    homepage: null,
    language: "C#",
    stargazers_count: 8,
    forks_count: 1,
    topics: ["Unity", "C#", "Game Design", "Educational Games", "Logic Building", "Game Development", "Capstone Project"],
    fork: false,
    updated_at: "2023-11-20T12:00:00Z",
    created_at: "2023-11-20T12:00:00Z",
    open_issues_count: 0,
    visibility: "public",
    paperUrl: "/Jumpquest game paper.pdf",
    screenshots: [
      "/jumpquest-screenshots/Screenshot 2025-11-25 132537.png",
      "/jumpquest-screenshots/Screenshot 2025-11-25 132544.png",
      "/jumpquest-screenshots/Screenshot 2025-11-25 132628.png",
      "/jumpquest-screenshots/Screenshot 2025-11-25 132635.png",
      "/jumpquest-screenshots/Screenshot 2025-11-25 132641.png",
      "/jumpquest-screenshots/Screenshot 2025-11-25 132734.png",
      "/jumpquest-screenshots/Screenshot 2025-11-25 132756.png"
    ]
  }
];

export default function GitHubProjects() {
  return <GitHubProjectsClient repos={STATIC_PROJECTS} username={GITHUB_USERNAME} />;
}
