import { API_BASE, SESSION_BUNDLE_KEY } from "@/lib/constants";

export type SessionBundle = {
  sessionId: string;
  token: string;
};

function readStoredSession(): SessionBundle | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(SESSION_BUNDLE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as SessionBundle;
    if (parsed.sessionId) {
      return {
        sessionId: parsed.sessionId,
        token: parsed.token ?? "",
      };
    }
  } catch {
    // ignore corrupt storage
  }

  return null;
}

function storeSession(bundle: SessionBundle): void {
  localStorage.setItem(SESSION_BUNDLE_KEY, JSON.stringify(bundle));
}

export function authHeaders(token: string): HeadersInit {
  if (!token) {
    return { "Content-Type": "application/json" };
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createSession(): Promise<SessionBundle> {
  const response = await fetch(`${API_BASE}/sessions`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Failed to create session (${response.status})`);
  }

  const payload = (await response.json()) as {
    session_id: string;
    token: string;
  };

  const bundle: SessionBundle = {
    sessionId: payload.session_id,
    token: payload.token ?? "",
  };
  storeSession(bundle);
  return bundle;
}

export async function ensureSession(): Promise<SessionBundle> {
  const stored = readStoredSession();
  if (stored?.sessionId) {
    return stored;
  }

  return createSession();
}

export async function resetStoredSession(): Promise<SessionBundle> {
  localStorage.removeItem(SESSION_BUNDLE_KEY);
  return createSession();
}
