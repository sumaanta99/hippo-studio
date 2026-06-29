"use client";

import { motion } from "framer-motion";

import { ROADMAP } from "@/lib/constants";

export function RoadmapSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-xl px-6 py-20 text-center"
    >
      <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
        Where Hippo is going
      </h2>
      <ul className="mt-8 space-y-3 text-left">
        {ROADMAP.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 rounded-lg border border-zinc-900 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-400"
          >
            <span className="w-5 shrink-0 text-center">
              {item.status === "done" ? "✅" : "⏳"}
            </span>
            <span
              className={
                item.status === "done" ? "text-zinc-300" : "text-zinc-500"
              }
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
