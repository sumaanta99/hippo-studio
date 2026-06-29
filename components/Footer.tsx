"use client";

import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import Link from "next/link";

import { LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row"
      >
        <p className="text-sm text-zinc-500">
          Built by{" "}
          <span className="text-zinc-300">{SITE.author}</span>
        </p>

        <div className="flex items-center gap-5 text-sm text-zinc-500">
          <Link
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-300"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </Link>
          <Link
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-300"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </Link>
          <Link
            href={LINKS.email}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-zinc-300"
          >
            <MailIcon className="h-4 w-4" />
            Email
          </Link>
        </div>
      </motion.div>
    </footer>
  );
}
