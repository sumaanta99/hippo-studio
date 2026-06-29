"use client";

import { cn } from "@/lib/utils";

interface PromptChipProps {
  label: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export function PromptChip({ label, onSelect, disabled }: PromptChipProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onSelect(label)}
      className={cn(
        "rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-400 transition-colors",
        "hover:border-violet-500/30 hover:bg-zinc-900 hover:text-zinc-200",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      {label}
    </button>
  );
}
