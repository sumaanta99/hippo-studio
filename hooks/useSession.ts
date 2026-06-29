"use client";

import { useCallback, useEffect, useState } from "react";

import { trackSessionStart } from "@/lib/analytics-client";
import {
  createSession,
  ensureSession,
  resetStoredSession,
  type SessionBundle,
} from "@/lib/session-api";

export function useSession() {
  const [sessionId, setSessionId] = useState("");
  const [sessionToken, setSessionToken] = useState("");
  const [isReady, setIsReady] = useState(false);

  const applyBundle = useCallback((bundle: SessionBundle) => {
    setSessionId(bundle.sessionId);
    setSessionToken(bundle.token);
    setIsReady(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    void ensureSession()
      .then((bundle) => {
        if (!cancelled) {
          applyBundle(bundle);
        }
      })
      .catch(async () => {
        try {
          const bundle = await createSession();
          if (!cancelled) {
            applyBundle(bundle);
          }
        } catch {
          if (!cancelled) {
            setIsReady(true);
          }
        }
      });

    return () => {
      cancelled = true;
    };
  }, [applyBundle]);

  useEffect(() => {
    if (sessionId) {
      trackSessionStart(sessionId, sessionToken);
    }
  }, [sessionId, sessionToken]);

  const resetSession = useCallback(async () => {
    const bundle = await resetStoredSession();
    applyBundle(bundle);
    trackSessionStart(bundle.sessionId, bundle.token);
    return bundle.sessionId;
  }, [applyBundle]);

  return { sessionId, sessionToken, resetSession, isReady };
}
