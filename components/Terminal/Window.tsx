"use client";

import { cn } from "@/lib/utils";

interface WindowProps {
  children: React.ReactNode;
  className?: string;
}

export function Window({ children, className }: WindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0c0c0e] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.75)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-950/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto text-xs text-zinc-600">hippo — zsh</div>
      </div>
      {children}
    </div>
  );
}
