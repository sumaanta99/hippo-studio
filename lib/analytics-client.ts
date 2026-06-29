import type { ChatResponse } from "@/types";
import type { AnalyticsPayload } from "@/types/analytics";

import { API_BASE } from "@/lib/constants";
import { authHeaders } from "@/lib/session-api";

const SESSION_TRACKED_KEY = "hippo-analytics-session-tracked";

function send(payload: AnalyticsPayload, sessionToken: string): void {
  void fetch(`${API_BASE}/analytics`, {
    method: "POST",
    headers: authHeaders(sessionToken),
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Analytics must never interrupt the product experience.
  });
}

export function trackSessionStart(sessionId: string, sessionToken = ""): void {
  if (!sessionId || typeof window === "undefined") return;

  const trackedKey = `${SESSION_TRACKED_KEY}:${sessionId}`;
  if (localStorage.getItem(trackedKey)) return;

  localStorage.setItem(trackedKey, "1");
  send({ type: "session_start", sessionId }, sessionToken);
}

export function trackChatSuccess(
  sessionId: string,
  sessionToken: string,
  message: string,
  result: ChatResponse,
): void {
  send(
    {
      type: "chat_success",
      sessionId,
      intent: result.intent,
      confidence: result.confidence,
      latencyMs: result.latency_ms,
      messageLength: message.trim().length,
      memoriesCreated: result.memories_created.length,
      memoriesUpdated: result.memories_updated.length,
      memoriesDeleted: result.memories_deleted.length,
      searchResultCount: result.search_results.length,
    },
    sessionToken,
  );
}

export function trackChatError(
  sessionId: string,
  sessionToken: string,
  message: string,
): void {
  send(
    {
      type: "chat_error",
      sessionId,
      messageLength: message.trim().length,
    },
    sessionToken,
  );
}
