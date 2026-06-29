"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/Button";
import {
  CASE_STUDY_META,
  CASE_STUDY_SECTIONS,
} from "@/lib/caseStudy";

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-7 text-zinc-400 sm:text-base">{children}</p>;
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5 text-sm leading-7 text-zinc-400 sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-violet-400/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CaseStudySection() {
  const navItems = CASE_STUDY_SECTIONS.map((section) => ({
    id: section.id,
    title: section.title,
  }));

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-violet-400/80">
            {CASE_STUDY_META.label}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {CASE_STUDY_META.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
            {CASE_STUDY_META.subtitle}
          </p>
          <div className="mt-8">
            <Link href="/#terminal">
              <Button>Try the terminal</Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
          <nav
            aria-label={`${CASE_STUDY_META.label} sections`}
            className="mb-10 lg:sticky lg:top-24 lg:mb-0 lg:self-start"
          >
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {navItems.map((item) => (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    className="flex min-h-9 items-center rounded-md px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-900/60 hover:text-zinc-300"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-14">
            {CASE_STUDY_SECTIONS.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-zinc-900 pt-10 first:border-t-0 first:pt-0"
              >
                <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.content.map((paragraph) => (
                    <Prose key={paragraph}>{paragraph}</Prose>
                  ))}
                  {"bullets" in section && section.bullets ? (
                    <BulletList items={section.bullets} />
                  ) : null}
                </div>
                {index === CASE_STUDY_SECTIONS.length - 1 ? (
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="/#terminal">
                      <Button>Try the terminal</Button>
                    </Link>
                    <Link href="/#contact">
                      <Button variant="secondary">Get in touch</Button>
                    </Link>
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
