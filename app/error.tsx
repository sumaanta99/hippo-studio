"use client";

import { Button } from "@/components/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.18em] text-zinc-600">Error</p>
      <h1 className="mt-3 text-2xl font-medium text-white">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-zinc-400">
        The page hit an unexpected error. Try again, or return home.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="secondary" onClick={() => (window.location.href = "/")}>
          Go home
        </Button>
      </div>
    </main>
  );
}
