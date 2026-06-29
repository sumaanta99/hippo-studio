"use client";

import { useEffect } from "react";

import { Cursor } from "@/components/Terminal/Cursor";

interface PromptProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  disabled?: boolean;
}

export function Prompt({
  value,
  onChange,
  onKeyDown,
  inputRef,
  disabled,
}: PromptProps) {
  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [inputRef, value]);

  return (
    <div
      className="flex items-start gap-2"
      onMouseDown={(event) => {
        if (event.target === inputRef.current) return;
        event.preventDefault();
        inputRef.current?.focus({ preventScroll: true });
      }}
    >
      <span className="select-none text-violet-400/90">&gt;</span>
      <div className="relative min-w-0 flex-1">
        <textarea
          ref={inputRef}
          rows={1}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          autoFocus
          className="block w-full resize-none overflow-hidden bg-transparent p-0 text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-600 disabled:opacity-60"
          placeholder=""
        />
        {!value && !disabled ? (
          <div className="pointer-events-none absolute left-0 top-0">
            <Cursor />
          </div>
        ) : null}
      </div>
    </div>
  );
}
