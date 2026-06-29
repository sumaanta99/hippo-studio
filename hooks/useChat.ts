"use client";

import { useCallback, useRef, useState } from "react";

import { ChatApiError, sendChatMessage } from "@/lib/api";
import { trackChatError, trackChatSuccess } from "@/lib/analytics-client";
import { inferLoadingStatus } from "@/lib/utils";
import type { ChatResponse, LoadingStatus } from "@/types";

interface UseChatOptions {
  sessionId: string;
}

export function useChat({ sessionId }: UseChatOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (
      message: string,
    ): Promise<{ result: ChatResponse | null; error: string | null }> => {
      if (!sessionId || !message.trim()) {
        return { result: null, error: null };
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setLoadingStatus(inferLoadingStatus(message));
      setError(null);

      try {
        const result = await sendChatMessage(
          { message: message.trim(), session_id: sessionId },
          controller.signal,
        );
        trackChatSuccess(sessionId, message, result);
        return { result, error: null };
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return { result: null, error: null };
        }

        trackChatError(sessionId, message);

        const messageText =
          err instanceof ChatApiError
            ? err.status === 502 || err.status === 503 || err.status === 504
              ? "Hippo is waking up — the API can take up to 30 seconds on cold start. Try again."
              : err.status === 404
                ? "Hippo API not found. Check that HIPPO_API_URL is set correctly."
                : err.message
            : "Something went wrong. Please try again.";

        setError(messageText);
        return { result: null, error: messageText };
      } finally {
        setIsLoading(false);
        setLoadingStatus(null);
      }
    },
    [sessionId],
  );

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
    setLoadingStatus(null);
  }, []);

  return {
    sendMessage,
    cancel,
    isLoading,
    loadingStatus,
    error,
  };
}
