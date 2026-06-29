"use client";

import { CheckIcon, CopyIcon } from "@/components/Icons";
import { useState } from "react";

import { copyToClipboard } from "@/lib/utils";

interface ResponseProps {
  content: string;
  animating?: boolean;
}

export function Response({ content, animating }: ResponseProps) {
  const [copied, setCopied] = useState(false);

  if (!content && !animating) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (!success) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group flex items-start gap-2 text-zinc-300">
      <span className="select-none text-violet-400/80">✓</span>
      <span className="flex-1 whitespace-pre-wrap break-words">{content}</span>
      {content && !animating ? (
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy response"
          className="mt-0.5 shrink-0 rounded p-1 text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-zinc-800 hover:text-zinc-300"
        >
          {copied ? (
            <CheckIcon className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <CopyIcon className="h-3.5 w-3.5" />
          )}
        </button>
      ) : null}
    </div>
  );
}
