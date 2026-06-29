"use client";

import { USE_CASES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface UseCasesPanelProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

const categoryStyles: Record<string, string> = {
  Work: "text-violet-300/90 bg-violet-500/10 border-violet-500/20",
  Life: "text-sky-300/90 bg-sky-500/10 border-sky-500/20",
  Recall: "text-emerald-300/90 bg-emerald-500/10 border-emerald-500/20",
};

export function UseCasesPanel({ onSelect, disabled }: UseCasesPanelProps) {
  return (
    <aside className="self-center">
      <div className="mb-4">
        <h2 className="text-sm font-medium text-zinc-200">Try it yourself</h2>
        <p className="mt-1 text-xs leading-5 text-zinc-500">
          Click an example to send it to the terminal. Mix work and personal —
          hippo handles both the same way.
        </p>
      </div>

      <ul className="space-y-2">
        {USE_CASES.map((useCase) => (
          <li key={useCase.prompt}>
            <button
              type="button"
              disabled={disabled}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onSelect(useCase.prompt)}
              className={cn(
                "w-full rounded-lg border border-zinc-900 bg-zinc-950/50 px-3.5 py-3 text-left transition-colors",
                "hover:border-zinc-800 hover:bg-zinc-900/60",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-zinc-200">
                  {useCase.title}
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase",
                    categoryStyles[useCase.category],
                  )}
                >
                  {useCase.category}
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 text-zinc-500">
                {useCase.description}
              </p>
              <p className="mt-2 font-mono text-xs leading-5 text-zinc-400">
                &gt; {useCase.prompt}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
