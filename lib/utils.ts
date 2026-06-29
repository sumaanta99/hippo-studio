import type { LoadingStatus } from "@/types";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function inferLoadingStatus(message: string): LoadingStatus {
  const lower = message.toLowerCase().trim();

  if (
    /\b(where|what|find|show|recall|know about|do you remember|tell me)\b/.test(
      lower,
    ) ||
    lower.endsWith("?")
  ) {
    return "Searching memories...";
  }

  if (/\b(buy|need|get|add|shopping|pick up)\b/.test(lower)) {
    return "Updating memory...";
  }

  if (
    /\b(is in|are in|remember|my .+ is|passport|number|keys|charger)\b/.test(
      lower,
    )
  ) {
    return "Saving memory...";
  }

  return "Thinking...";
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
