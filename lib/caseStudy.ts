export const CASE_STUDY_META = {
  label: "Why hippo",
  title: "Why should hippo exist?",
  subtitle:
    "hippo is a memory assistant for work and life. Save a detail once, ask for it later.",
} as const;

export const CASE_STUDY_SECTIONS = [
  {
    id: "why",
    title: "Why",
    content: [
      "We forget small things constantly: where the passport is, who to follow up with, a number someone mentioned, whether milk is already on the list. The information is tiny, but losing it is immediately annoying.",
      "Most apps assume you'll stop, open a note, give it a title, pick a folder, and remember how you wrote it days later. That's not how memory works in real life. hippo exists because capture should be as fast as saying it out loud and recall should work even when you ask differently than you saved.",
    ],
  },
  {
    id: "what",
    title: "What",
    content: [
      "hippo remembers operational details through natural conversation. You talk; it stores, finds, updates, or deletes; then answers in plain language.",
    ],
    bullets: [
      "Save — \"My passport is in the blue drawer\" or \"Remind me to message Angela about the Q3 budget\"",
      "Recall — \"Where did I put my passport?\" even if you saved it differently",
      "Update — \"It's in the drawer now\" without creating a duplicate",
      "Delete — \"Forget the passport location\"",
      "Lists — \"I need milk and eggs\" · \"What's on my shopping list?\"",
    ],
  },
  {
    id: "who",
    title: "Who it's for",
    content: [
      "Anyone juggling life's small details at work and at home without wanting to maintain a personal knowledge base.",
    ],
    bullets: [
      "People who remember where things are, not project plans",
      "People who want conversation, not taxonomy",
      "People who'd rather message a detail than file a note",
      "Not for teams, shared wikis, or long-form writing",
    ],
  },
  {
    id: "how",
    title: "How it works",
    content: [
      "You send a message. hippo figures out whether you're saving, asking, updating, or managing a list, then does the right thing. Memories live in a local database with semantic search, so you don't need to match exact wording when you ask back.",
      "The same engine powers the CLI, this web terminal, and (soon) WhatsApp. One memory layer, multiple surfaces.",
    ],
  },
  {
    id: "different",
    title: "Why not just use Notes?",
    content: [
      "Notes apps are great for documents. hippo is for the stuff that never feels worth a document.",
    ],
    bullets: [
      "Notes — need titles and folders; search breaks when you phrase it differently",
      "Reminders — built for deadlines, not \"passport is in the locker\"",
      "Notion / PKM — high setup cost; organization becomes the product",
      "Voice assistants — answers in the moment, but nothing durable to query later",
    ],
  },
  {
    id: "live",
    title: "What's live today",
    content: [
      "The MVP is shipped and usable now. Try the terminal on the home page or clone the repo and run the CLI.",
    ],
    bullets: [
      "CLI — full save / recall / update / delete / shopping flows",
      "Web terminal — live demo wired to the real API",
      "Semantic memory search with natural-language input",
      "Coming next — WhatsApp, then voice and photo memories",
    ],
  },
  {
    id: "next",
    title: "What's next",
    content: [
      "WhatsApp is the priority — meet people where capture already happens. After that: voice notes for zero-friction input, and photo memories for object identification.",
      "If this resonates, try the terminal or get in touch. I'd love to know what you'd use hippo for.",
    ],
  },
] as const;
