"use client";

import { motion } from "framer-motion";
import { ArrowIcon, TerminalIcon, WhatsAppIcon } from "@/components/Icons";
import Link from "next/link";

import { Button } from "@/components/Button";
import { HippoMark } from "@/components/HippoMark";
import { HeroSocialLinks } from "@/components/Navigation";
import { LINKS, SITE } from "@/lib/constants";

export function Hero() {
  const scrollToTerminal = () => {
    document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        <p className="mb-4 text-sm tracking-[0.2em] text-zinc-500 uppercase sm:mb-6">
        I remember life's loose ends.
        </p>

        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <HippoMark size="sm" className="shrink-0" />
          <h1 className="text-5xl leading-none font-semibold tracking-tight text-white sm:text-7xl">
            {SITE.wordmark}
          </h1>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-zinc-200 sm:text-2xl">
          {SITE.tagline}
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400 sm:mt-6 sm:text-lg">
          Remember where you kept your passport. Jot a follow-up for Angela.
          Save a phone number or keep a shopping list. Recall anything instantly.
        </p>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-500 sm:mt-4">
          {SITE.description} No folders, tags or commands. Just talk naturally.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-400 sm:mt-8">
          <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-medium text-violet-300">
            Coming Soon
          </span>
          <span className="inline-flex items-center gap-1.5">
            <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
            WhatsApp support is on the way.
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
          <Button onClick={scrollToTerminal}>Start Remembering</Button>
          <Link href={LINKS.github} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="w-full sm:w-auto">
              <TerminalIcon className="h-4 w-4" />
              Try the CLI
              <ArrowIcon className="h-4 w-4 opacity-60" />
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          <HeroSocialLinks />
        </div>
      </motion.div>
    </section>
  );
}
