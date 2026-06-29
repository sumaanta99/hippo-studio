import { API_BASE } from "@/lib/constants";
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
  signal?: AbortSignal,
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new ChatApiError(
      detail || `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return response.json() as Promise<ChatResponse>;
}
