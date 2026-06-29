export type TerminalLineType = "welcome" | "user" | "status" | "response" | "error";

export interface TerminalLine {
  id: string;
  type: TerminalLineType;
  content: string;
  timestamp: number;
  /** When true, response text is still animating in */
  animating?: boolean;
}

export interface ChatRequest {
  message: string;
  session_id: string;
}

export interface MemorySnapshot {
  id: string;
  session_id: string;
  title: string;
  content: string;
  memory_type: string;
  category: string;
  timestamp: string;
  version_number: number;
}

export interface ChatResponse {
  response: string;
  intent: string;
  session_id: string;
  confidence: number;
  memories_created: MemorySnapshot[];
  memories_updated: MemorySnapshot[];
  memories_deleted: MemorySnapshot[];
  search_results: MemorySnapshot[];
  latency_ms: number;
}

