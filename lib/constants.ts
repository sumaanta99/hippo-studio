export const SITE = {
  name: "🦛 Hippo",
  tagline: "Everything you forget, remembered.",
  description:
    "Hippo is a personal memory assistant that remembers life's small details through natural conversation.",
  author: "Sumaanta Munde",
  email: "sumaantamunde@gmail.com",
} as const;

export const LINKS = {
  github: "https://github.com/sumaanta99/hippo",
  linkedin: "https://www.linkedin.com/in/sumaanta-munde-97a751157/",
  resume: "https://www.linkedin.com/in/sumaanta-munde-97a751157/",
  email: "mailto:sumaantamunde@gmail.com",
} as const;

export const TERMINAL_WELCOME = {
  title: SITE.name,
  tagline: "Everything you forget, remembered.",
  hints: [
    "my passport is in the blue drawer",
    "buy milk and eggs",
    "where are my keys?",
  ],
} as const;

export const SUGGESTED_PROMPTS = [
  "My charger is in the study",
  "I need milk",
  "My passport is in the office locker",
  "What do you know about me?",
] as const;

export const TECH_STACK = [
  "Python",
  "FastAPI",
  "SQLite",
  "OpenAI",
  "Next.js",
  "React",
  "Tailwind CSS",
  "TypeScript",
] as const;

export const ROADMAP = [
  { label: "CLI", status: "done" as const },
  { label: "Interactive Web Terminal", status: "done" as const },
  { label: "WhatsApp", status: "pending" as const },
  { label: "Voice Notes", status: "pending" as const },
  { label: "Photo Memories", status: "pending" as const },
];

export const SESSION_STORAGE_KEY = "hippo-session-id";
export const TERMINAL_HISTORY_KEY = "hippo-terminal-history";

export const SESSION_NOTICE = {
  lines: [
    "Your session is saved in this browser — same profile, same memories across tabs.",
    "It clears when you clear site data. Chat history in this tab only.",
    "Usage is measured privately to improve the product. Nothing is shown on this site.",
  ],
} as const;

export const API_BASE =
  process.env.NEXT_PUBLIC_HIPPO_API_URL?.replace(/\/$/, "") || "/backend";
