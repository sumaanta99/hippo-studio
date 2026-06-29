"use client";

import { useCallback, useEffect, useState } from "react";

import { trackSessionStart } from "@/lib/analytics-client";
import { SESSION_STORAGE_KEY } from "@/lib/constants";
import { generateId } from "@/lib/utils";

export function useSession() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) {
      const legacy = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (legacy) {
        localStorage.setItem(SESSION_STORAGE_KEY, legacy);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        stored = legacy;
      }
    }

    if (stored) {
      setSessionId(stored);
      return;
    }

    const id = `web-${generateId().slice(0, 12)}`;
    localStorage.setItem(SESSION_STORAGE_KEY, id);
    setSessionId(id);
  }, []);

  useEffect(() => {
    if (sessionId) {
      trackSessionStart(sessionId);
    }
  }, [sessionId]);

  const resetSession = useCallback(() => {
    const id = `web-${generateId().slice(0, 12)}`;
    localStorage.setItem(SESSION_STORAGE_KEY, id);
    setSessionId(id);
    trackSessionStart(id);
    return id;
  }, []);

  return { sessionId, resetSession, isReady: Boolean(sessionId) };
}
