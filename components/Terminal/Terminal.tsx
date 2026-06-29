"use client";

import { motion } from "framer-motion";

import { Prompt } from "@/components/Terminal/Prompt";
import { Response } from "@/components/Terminal/Response";
import { UseCasesPanel } from "@/components/Terminal/UseCasesPanel";
import { Window } from "@/components/Terminal/Window";
import { useTerminal } from "@/hooks/useTerminal";
import { SESSION_NOTICE } from "@/lib/constants";

export function Terminal() {
  const {
    lines,
    input,
    setInput,
    inputRef,
    scrollRef,
    isLoading,
    loadingStatus,
    submitMessage,
    handleKeyDown,
  } = useTerminal();

  return (
    <section id="terminal" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]"
      >
        <div>
        <Window>
          <div
            ref={scrollRef}
            className="max-h-[min(70vh,560px)] min-h-[360px] overflow-y-auto px-5 py-5 font-mono text-sm leading-6 sm:px-6 sm:py-6"
          >
            <div className="space-y-4">
              {lines.map((line) => {
                if (line.type === "welcome") {
                  return (
                    <p key={line.id} className="text-zinc-400">
                      {line.content}
                    </p>
                  );
                }

                if (line.type === "user") {
                  return (
                    <div key={line.id} className="flex gap-2 text-zinc-500">
                      <span className="select-none text-zinc-600">&gt;</span>
                      <span className="text-zinc-300">{line.content}</span>
                    </div>
                  );
                }

                if (line.type === "status") {
                  return (
                    <p key={line.id} className="text-zinc-500">
                      {line.content}
                    </p>
                  );
                }

                if (line.type === "error") {
                  return (
                    <p key={line.id} className="text-red-400/90">
                      {line.content}
                    </p>
                  );
                }

                return (
                  <Response
                    key={line.id}
                    content={line.content}
                    animating={line.animating}
                  />
                );
              })}

              {isLoading && loadingStatus ? (
                <p className="animate-pulse text-zinc-500">{loadingStatus}</p>
              ) : null}
            </div>

            <div className="sticky bottom-0 mt-4 bg-[#0c0c0e] pt-2">
              <Prompt
                value={input}
                onChange={setInput}
                onKeyDown={handleKeyDown}
                inputRef={inputRef}
              />
            </div>
          </div>
        </Window>

        <p className="mt-3 text-center text-xs text-zinc-600">
          ↑↓ history · Ctrl+L clear · Enter send
        </p>
        <div className="mx-auto mt-4 max-w-lg space-y-1 text-center text-xs leading-5 text-zinc-600 lg:mx-0 lg:max-w-none lg:text-left">
          {SESSION_NOTICE.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        </div>

        <UseCasesPanel onSelect={submitMessage} disabled={isLoading} />
      </motion.div>
    </section>
  );
}
