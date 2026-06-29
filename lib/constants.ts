export const SITE = {
  name: "hippo",
  wordmark: "hippo.",
  tagline: "Everything you forget, remembered.",
  description:
    "hippo is a memory assistant for work and life; follow-ups, meeting notes, where you put things, and everything in between.",
  author: "Sumaanta Munde",
  email: "sumaantamunde@gmail.com",
  phone: "9550614763",
} as const;

export const LINKS = {
  github: "https://github.com/sumaanta99/hippo",
  linkedin: "https://www.linkedin.com/in/sumaanta-munde-97a751157/",
  email: "mailto:sumaantamunde@gmail.com",
  phone: "tel:+919550614763",
} as const;

export const SESSION_GREETING = "Hi, how can I help you today?";

export const LOADING_STATUS = "checking with the ducks...";

export const TERMINAL_WELCOME = {
  title: SITE.name,
  tagline: "Everything you forget, remembered.",
  hints: [
    "message Angela about the Q3 budget",
    "my passport is in the blue drawer",
    "follow up with Sarah on the design review",
  ],
} as const;

export const USE_CASES = [
  {
    category: "Work",
    title: "Save a follow-up",
    description: "Track who to message and about what.",
    prompt: "Remind me to message Angela about the Q3 budget",
  },
  {
    category: "Work",
    title: "Set a deadline",
    description: "Remember when something is due.",
    prompt: "Send the client deck by Friday EOD",
  },
  {
    category: "Life",
    title: "Remember where something is",
    description: "No more hunting for important items.",
    prompt: "My passport is in the blue drawer",
  },
  {
    category: "Life",
    title: "Build a shopping list",
    description: "Add items as you think of them.",
    prompt: "I need milk, eggs, and bread",
  },
  {
    category: "Recall",
    title: "Ask naturally",
    description: "Retrieve anything you saved before.",
    prompt: "Where did I put my passport?",
  },
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
