"use client";

import { motion } from "framer-motion";

import { TECH_STACK } from "@/lib/constants";

export function TechStackSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl px-6 py-12"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        {TECH_STACK.map((tech) => (
          <span
            key={tech}
            className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-3 py-2 text-xs text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
