"use client";

import { GitHubIcon, LinkedInIcon } from "@/components/Icons";
import Link from "next/link";

import { LINKS, SITE } from "@/lib/constants";

export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900/80 bg-[#09090b]/80 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-6 py-3">
        <div>
          <Link
            href="#"
            className="text-sm font-medium text-zinc-200 transition-colors hover:text-white"
          >
            {SITE.name}
          </Link>
          <p className="mt-0.5 text-xs text-zinc-500">
            Built by{" "}
            <span className="text-zinc-400">{SITE.author}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-zinc-500 sm:hidden">
          <Link
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-200"
          >
            <GitHubIcon className="h-4 w-4" />
          </Link>
          <Link
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-200"
          >
            <LinkedInIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="hidden items-center gap-5 text-sm text-zinc-500 sm:flex">
          <Link
            href="#case-study"
            className="transition-colors hover:text-zinc-200"
          >
            Case study
          </Link>
          <Link
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-200"
          >
            GitHub
          </Link>
          <Link
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-200"
          >
            LinkedIn
          </Link>
          <Link
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-200"
          >
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function HeroSocialLinks() {
  return (
    <div className="flex items-center justify-center gap-5 text-sm text-zinc-500">
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
    </div>
  );
}
