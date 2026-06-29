export type AnalyticsEventType = "session_start" | "chat_success" | "chat_error";

export interface AnalyticsPayload {
  type: AnalyticsEventType;
  sessionId: string;
  timestamp?: string;
  intent?: string;
  confidence?: number;
  latencyMs?: number;
  messageLength?: number;
  memoriesCreated?: number;
  memoriesUpdated?: number;
  memoriesDeleted?: number;
  searchResultCount?: number;
  error?: string;
}

export interface SessionMetrics {
  firstSeen: string;
  lastSeen: string;
  messageCount: number;
  errorCount: number;
  intents: Record<string, number>;
  totalLatencyMs: number;
  memoriesCreated: number;
  memoriesUpdated: number;
  memoriesDeleted: number;
}

export interface UsageStore {
  version: 1;
  updatedAt: string;
  sessions: Record<string, SessionMetrics>;
}

export interface UsageReport {
  updatedAt: string;
  summary: {
    uniqueUsers: number;
    totalMessages: number;
    totalErrors: number;
    avgLatencyMs: number;
    totalMemoriesCreated: number;
    intentBreakdown: Record<string, number>;
  };
  sessions: Record<string, SessionMetrics>;
}
