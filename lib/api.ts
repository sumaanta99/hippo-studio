import { API_BASE } from "@/lib/constants";
import { authHeaders } from "@/lib/session-api";
import type { ChatRequest, ChatResponse } from "@/types";

export class ChatApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ChatApiError";
  }
}

export async function sendChatMessage(
  payload: ChatRequest,
  sessionToken: string,
  signal?: AbortSignal,
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: authHeaders(sessionToken),
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    throw new ChatApiError(
      `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return response.json() as Promise<ChatResponse>;
}
