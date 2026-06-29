export const CASE_STUDY_META = {
  title: "Why Hippo exists",
  subtitle:
    "A case study on building a personal memory product for information that note apps were never designed to hold.",
  role: "Product & Engineering",
  timeline: "2026-present",
  status: "MVP shipped (CLI + web terminal)",
  platform: "CLI · Web · WhatsApp (planned)",
} as const;

export const CASE_STUDY_SECTIONS = [
  {
    id: "summary",
    title: "Executive summary",
    content: [
      "People lose hours each week to low-stakes forgetfulness: where they put a passport, a phone number from a conversation, or whether they already bought milk. The information is small, but the cost of losing it is immediate and frustrating.",
      "Existing tools assume you will organize, title, and retrieve information like a document. Hippo assumes you will speak naturally once and ask naturally later. One engine handles save, recall, update, delete, and shopping — across any interface.",
    ],
  },
  {
    id: "problem",
    title: "Problem",
    content: [
      "Working memory fails for details we encounter in passing. We do not decide to 'create a note' when someone says a locker code or when we stash keys in an unusual place. By the time we need the information, the context is gone.",
      "The failure mode is not storage — phones have plenty of apps for that. The failure mode is capture friction plus retrieval mismatch. Users either never record the detail, or record it in a place they cannot find when the question is phrased differently from how they wrote it.",
    ],
    bullets: [
      "Capture happens mid-task, not at a desk",
      "Queries are semantic ('where's my passport?'), not keyword-exact",
      "Most forgotten items have no natural folder or title",
      "Updates are common ('it's in the drawer now') but painful in static notes",
    ],
  },
  {
    id: "user",
    title: "Target user",
    content: [
      "Primary: individuals who manage life's operational details like locations, contacts, preferences, lists without wanting to maintain a personal knowledge base.",
      "Not targeting teams, shared wikis, or long-form writing. Not targeting power users who enjoy building Notion dashboards.",
    ],
    bullets: [
      "Remembers object locations, not project plans",
      "Uses conversation, not taxonomy",
      "Values speed over structure",
      "Wants recall from a phone message, not a filing system",
    ],
  },
  {
    id: "jobs",
    title: "Jobs to be done",
    items: [
      {
        when: "When I put something somewhere unusual",
        want: "I want to record it in one sentence",
        so: "So I can find it days later without tearing the house apart",
      },
      {
        when: "When someone gives me a number or detail",
        want: "I want to store it without creating a contact or note",
        so: "So I can retrieve it when I actually need it",
      },
      {
        when: "When I'm shopping",
        want: "I want to add and remove items in plain language",
        so: "So the list stays current without a separate app workflow",
      },
      {
        when: "When I need something back",
        want: "I want to ask a question, not search",
        so: "So retrieval works even if I phrased it differently when saving",
      },
    ],
  },
  {
    id: "alternatives",
    title: "Alternatives & gaps",
    rows: [
      {
        option: "Notes (Apple Notes, Keep)",
        gap: "Requires titles, folders, and keyword recall. 'Blue drawer' vs 'passport location' breaks search.",
      },
      {
        option: "Reminders / Tasks",
        gap: "Built for deadlines, not persistent facts or object locations.",
      },
      {
        option: "Notion / PKM tools",
        gap: "High setup cost. Overkill for atomic facts. Organization becomes the product.",
      },
      {
        option: "Voice assistants",
        gap: "Ephemeral answers. No durable, queryable personal memory with update/delete semantics.",
      },
      {
        option: "Spreadsheets / lists",
        gap: "Manual maintenance. No natural-language input or semantic retrieval.",
      },
    ],
  },
  {
    id: "insight",
    title: "Product insight",
    content: [
      "The unit of value is the memory atom: a fact, location, contact snippet, or list item with a lifecycle (create, recall, update, delete).",
      "LLMs make this viable now because they can classify intent, extract structured memory from unstructured input, and rerank search results, removing the need for user-defined schema.",
      "Interfaces should be thin. WhatsApp, CLI, and web terminal are adapters on one engine. Duplicating logic across surfaces guarantees drift and doubles maintenance.",
    ],
  },
  {
    id: "solution",
    title: "Solution",
    content: [
      "Hippo is a reusable memory engine with natural-language I/O. Users talk; the system classifies intent, executes the right handler, persists to SQLite, and responds concisely.",
    ],
    bullets: [
      "Save: extract and store memories from free text",
      "Query: semantic search with embeddings + LLM reranking",
      "Update / delete: mutate existing memories without duplicates",
      "Shopping: separate list domain with add, remove, show",
      "General chat: conversational responses without polluting memory",
    ],
  },
  {
    id: "mvp",
    title: "MVP scope",
    inScope: [
      "Nine intent types via LLM classification",
      "SQLite persistence with versioned memory updates",
      "Semantic retrieval (embeddings + rerank threshold)",
      "Session-scoped multi-turn chat",
      "CLI and FastAPI-backed web terminal",
    ],
    outOfScope: [
      "Multi-user accounts and auth",
      "Cross-device sync",
      "WhatsApp (next interface, engine-ready)",
      "Voice and photo capture",
      "Offline LLM inference",
    ],
  },
  {
    id: "decisions",
    title: "Key decisions",
    items: [
      {
        decision: "Conversation-first input, no folders or tags",
        rationale: "Organization is the main reason people abandon note apps for this use case.",
        tradeoff: "Depends on classification accuracy; misroutes require retry or correction.",
      },
      {
        decision: "Single HippoEngine shared by all interfaces",
        rationale: "One source of truth for business logic, search, and persistence.",
        tradeoff: "Engine API must stay stable as surfaces multiply.",
      },
      {
        decision: "SQLite, local-first storage",
        rationale: "Personal data stays on device; no infra for v1; fast reads for recall.",
        tradeoff: "No sync until a later phase; device-bound memories.",
      },
      {
        decision: "LLM for intent + extraction, not rule-based parsing",
        rationale: "Natural language varies too much for brittle regex or keyword routes.",
        tradeoff: "Latency, cost, and API key dependency on every message.",
      },
    ],
  },
  {
    id: "why-order",
    title: "Why this order",
    content: [
      "CLI and web terminal shipped before WhatsApp because the riskiest unknown was the engine — not the interface. I needed a fast loop to test classification, retrieval, and memory lifecycle before adding Twilio, webhooks, and message formatting.",
      "Shopping landed in v1 because testers consistently tried list commands in the same session as location memories. Splitting lists into a separate intent domain prevented shopping items from polluting semantic recall ('where's milk' returning a grocery item instead of a location).",
    ],
    cutBullets: [
      "Accounts & auth — single-user local MVP; session ID is enough to prove the loop",
      "Cross-device sync — premature before recall accuracy is validated on one device",
      "Voice & photo input — high build cost; doesn't de-risk core save/recall",
      "Shared memories / family mode — different trust model; not the primary JTBD",
      "Custom categories or tags — contradicts the conversation-first thesis",
    ],
  },
  {
    id: "validation",
    title: "Validation",
    content: [
      "Informal task testing with 3 people (including me) across 8 scripted scenarios. Each person completed save → recall → update → delete on object locations, plus two shopping flows. No facilitator script beyond the task card.",
    ],
    tasks: [
      { task: "Save an object location in one sentence", result: "3/3 passed", note: "Avg. 4s to confirmation" },
      { task: "Recall with a paraphrased query", result: "3/3 passed", note: "e.g. saved 'passport in locker', asked 'where's my passport?'" },
      { task: "Update a stored memory", result: "2/3 passed", note: "One tester needed a second attempt after ambiguous phrasing" },
      { task: "Delete a memory", result: "3/3 passed", note: "'forget passport' worked consistently" },
      { task: "Add items to shopping list", result: "3/3 passed", note: "'buy eggs and milk' parsed correctly" },
      { task: "Show shopping list", result: "3/3 passed", note: "No false positives from memory search" },
      { task: "General chat without saving", result: "2/3 passed", note: "'hi hippo' occasionally triggered low-confidence save attempts early on" },
      { task: "Complete full flow without instructions", result: "2/3 passed", note: "Overall task success: 21/24 (88%)" },
    ],
    misclassifications: [
      {
        input: "need milk",
        expected: "SHOPPING_ADD",
        got: "SAVE_MEMORY (early build)",
        fix: "Tightened classification prompt; shopping verbs now prioritized for list items",
      },
      {
        input: "remove eggs",
        expected: "SHOPPING_REMOVE",
        got: "DELETE_MEMORY",
        fix: "Added shopping context to classifier examples; disambiguation via list state",
      },
      {
        input: "passport",
        expected: "QUERY_MEMORY",
        got: "UNKNOWN",
        fix: "Single-entity queries now route to recall when a matching memory exists",
      },
    ],
    quote: {
      text: "I stopped opening Notes for where I put things. I just type it once and ask later — that's the whole thing.",
      attribution: "Early tester, after 4 days of CLI use",
    },
  },
  {
    id: "outcomes",
    title: "Outcomes",
    content: [
      "Results from the same informal test round plus 22 scripted recall queries run against a seeded memory set of 15 items.",
    ],
    stats: [
      {
        label: "Recall accuracy",
        value: "19/22 (86%)",
        detail: "Correct memory returned in top result for paraphrased queries",
      },
      {
        label: "Avg. capture time",
        value: "3.8s",
        detail: "From keystroke to confirmation, measured across 24 save actions",
      },
      {
        label: "Classification accuracy",
        value: "88%",
        detail: "21/24 task steps routed to the correct intent handler",
      },
      {
        label: "Zero-structure usage",
        value: "100%",
        detail: "No tester created folders, titles, or tags in any session",
      },
    ],
    changes: [
      "Lowered rerank confidence threshold after missed recalls on short queries like 'passport' and 'keys'",
      "Separated shopping into its own handler so list items don't appear in memory search results",
      "Added explicit fallback copy when the LLM fails instead of silent errors",
      "Built the web terminal as a portfolio surface only after CLI flows stabilized — same engine, no duplicated logic",
      "Removed input disable-during-loading on web; testers lost focus between messages and stopped mid-session",
    ],
  },
  {
    id: "metrics",
    title: "Success metrics",
    items: [
      {
        metric: "Capture time",
        target: "< 5 seconds from thought to confirmation",
        why: "If saving feels slower than remembering mentally, users won't save.",
      },
      {
        metric: "Recall success",
        target: "Correct memory in top result for paraphrased queries",
        why: "Semantic retrieval is the core differentiator vs notes search.",
      },
      {
        metric: "Zero-structure usage",
        target: "No folders, tags, or titles required for any flow",
        why: "Validates the product thesis against PKM tools.",
      },
      {
        metric: "Return usage",
        target: "2+ sessions in 7 days for active testers",
        why: "Memory products only matter if they become the default capture path.",
      },
    ],
  },
  {
    id: "risks",
    title: "Risks & open questions",
    bullets: [
      "Classification errors on ambiguous input — mitigated by confidence thresholds and explicit update/delete flows",
      "OpenAI cost at scale — needs usage caps or smaller models for classification vs generation",
      "Single-device limitation until sync ships — does WhatsApp become the sync layer?",
      "Privacy narrative — local SQLite helps; cloud LLM calls need clear disclosure",
      "Will users trust a new tool for passport-level facts before brand exists?",
    ],
  },
  {
    id: "next",
    title: "What's next",
    content: [
      "Ship WhatsApp as the primary daily interface — meet users where capture already happens.",
      "Run a structured test with 10–20 external users using the same 8-task protocol from validation.",
      "Add voice capture for zero-friction input; photo memories for object identification later.",
    ],
  },
] as const;
