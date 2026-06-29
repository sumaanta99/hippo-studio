"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import { useChat } from "@/hooks/useChat";
import { useSession } from "@/hooks/useSession";
import {
  SESSION_GREETING,
  TERMINAL_HISTORY_KEY,
  TERMINAL_WELCOME,
} from "@/lib/constants";
import { generateId } from "@/lib/utils";
import type { TerminalLine } from "@/types";

const INPUT_HISTORY_LIMIT = 50;

function createWelcomeLines(includeGreeting = true): TerminalLine[] {
  const lines: TerminalLine[] = [
    {
      id: generateId(),
      type: "welcome",
      content: TERMINAL_WELCOME.title,
      timestamp: Date.now(),
    },
    {
      id: generateId(),
      type: "welcome",
      content: TERMINAL_WELCOME.tagline,
      timestamp: Date.now(),
    },
  ];

  if (includeGreeting) {
    lines.push({
      id: generateId(),
      type: "response",
      content: SESSION_GREETING,
      timestamp: Date.now(),
    });
  }

  return lines;
}

export function useTerminal() {
  const { sessionId, isReady } = useSession();
  const { sendMessage, isLoading, loadingStatus } = useChat({
    sessionId,
  });

  const [lines, setLines] = useState<TerminalLine[]>(createWelcomeLines);
  const [input, setInput] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef("");

  const scrollToBottom = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, []);

  const focusInput = useCallback(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, isLoading, loadingStatus, scrollToBottom]);

  useEffect(() => {
    const stored = sessionStorage.getItem(TERMINAL_HISTORY_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as TerminalLine[];
      if (parsed.length > 0) {
        setLines([...createWelcomeLines(false), ...parsed]);
        setHasInteracted(true);
      }
    } catch {
      // ignore corrupt history
    }
  }, []);

  useEffect(() => {
    const persistable = lines.filter((line) => line.type !== "welcome");
    sessionStorage.setItem(TERMINAL_HISTORY_KEY, JSON.stringify(persistable));
  }, [lines]);

  useEffect(() => {
    if (isReady) {
      focusInput();
    }
  }, [focusInput, isReady]);

  useEffect(() => {
    if (isReady && hasInteracted && !isLoading) {
      focusInput();
    }
  }, [focusInput, hasInteracted, isLoading, isReady]);

  const clearTerminal = useCallback(() => {
    setLines(createWelcomeLines());
    setInput("");
    setHasInteracted(false);
    setHistoryIndex(-1);
    sessionStorage.removeItem(TERMINAL_HISTORY_KEY);
    focusInput();
  }, [focusInput]);

  const submitMessage = useCallback(
    async (rawMessage: string) => {
      const message = rawMessage.trim();
      if (!message || isLoading || !sessionId) return;

      setHasInteracted(true);
      setInput("");
      setHistoryIndex(-1);
      draftRef.current = "";

      setInputHistory((prev) => {
        const next = prev.filter((item) => item !== message);
        return [message, ...next].slice(0, INPUT_HISTORY_LIMIT);
      });

      const userLine: TerminalLine = {
        id: generateId(),
        type: "user",
        content: message,
        timestamp: Date.now(),
      };

      setLines((prev) => [...prev, userLine]);

      try {
        const { result, error: chatError } = await sendMessage(message);
        if (!result?.response) {
          if (chatError) {
            setLines((prev) => [
              ...prev,
              {
                id: generateId(),
                type: "error",
                content: chatError,
                timestamp: Date.now(),
              },
            ]);
          }
          return;
        }

        const responseId = generateId();
        const fullResponse = result.response;
        setLines((prev) => [
          ...prev,
          {
            id: responseId,
            type: "response",
            content: fullResponse,
            timestamp: Date.now(),
          },
        ]);
      } finally {
        focusInput();
      }
    },
    [focusInput, isLoading, sendMessage, sessionId],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        void submitMessage(input);
        return;
      }

      if (event.key === "l" && event.ctrlKey) {
        event.preventDefault();
        clearTerminal();
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (inputHistory.length === 0) return;

        const nextIndex = Math.min(
          historyIndex + 1,
          inputHistory.length - 1,
        );

        if (historyIndex === -1) {
          draftRef.current = input;
        }

        setHistoryIndex(nextIndex);
        setInput(inputHistory[nextIndex] ?? "");
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyIndex <= -1) return;

        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(nextIndex === -1 ? draftRef.current : inputHistory[nextIndex] ?? "");
      }
    },
    [clearTerminal, historyIndex, input, inputHistory, submitMessage],
  );

  return {
    sessionId,
    lines,
    input,
    setInput,
    inputRef,
    scrollRef,
    isLoading,
    loadingStatus,
    submitMessage,
    clearTerminal,
    handleKeyDown,
  };
}
