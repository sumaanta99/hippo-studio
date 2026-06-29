"use client";

import { motion } from "framer-motion";

import {
  CASE_STUDY_META,
  CASE_STUDY_SECTIONS,
} from "@/lib/caseStudy";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.14em] text-zinc-600">{label}</dt>
      <dd className="mt-1 text-sm text-zinc-300">{value}</dd>
    </div>
  );
}

function SectionBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-zinc-900 pt-10 first:border-t-0 first:pt-0">
      <h3 className="text-lg font-medium tracking-tight text-white">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-7 text-zinc-400">{children}</p>;
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-7 text-zinc-400">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400/70" />
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
      id="case-study"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="border-t border-zinc-900 py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-violet-400/80">
            Case study
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">
            {CASE_STUDY_META.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-400">
            {CASE_STUDY_META.subtitle}
          </p>
        </div>

        <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetaItem label="Role" value={CASE_STUDY_META.role} />
          <MetaItem label="Timeline" value={CASE_STUDY_META.timeline} />
          <MetaItem label="Status" value={CASE_STUDY_META.status} />
          <MetaItem label="Platform" value={CASE_STUDY_META.platform} />
        </dl>

        <div className="mt-14 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
          <nav
            aria-label="Case study sections"
            className="mb-10 lg:sticky lg:top-24 lg:mb-0 lg:self-start"
          >
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {navItems.map((item) => (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`#${item.id}`}
                    className="block rounded-md px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:bg-zinc-900/60 hover:text-zinc-300 lg:text-sm"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 space-y-10">
            {CASE_STUDY_SECTIONS.map((section) => {
              if (section.id === "jobs" && "items" in section) {
                return (
                  <SectionBlock key={section.id} id={section.id} title={section.title}>
                    <div className="space-y-3">
                      {section.items.map((job) => (
                        <div
                          key={job.when}
                          className="rounded-lg border border-zinc-900 bg-zinc-950/40 p-4"
                        >
                          <p className="text-xs uppercase tracking-[0.12em] text-zinc-600">
                            When
                          </p>
                          <p className="mt-1 text-sm text-zinc-300">{job.when}</p>
                          <p className="mt-3 text-xs uppercase tracking-[0.12em] text-zinc-600">
                            Want
                          </p>
                          <p className="mt-1 text-sm text-zinc-400">{job.want}</p>
                          <p className="mt-3 text-xs uppercase tracking-[0.12em] text-zinc-600">
                            So that
                          </p>
                          <p className="mt-1 text-sm text-zinc-400">{job.so}</p>
                        </div>
                      ))}
                    </div>
                  </SectionBlock>
                );
              }

              if (section.id === "alternatives" && "rows" in section) {
                return (
                  <SectionBlock key={section.id} id={section.id} title={section.title}>
                    <div className="overflow-x-auto rounded-lg border border-zinc-900">
                      <table className="w-full min-w-[480px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-zinc-900 bg-zinc-950/60">
                            <th className="px-4 py-3 font-medium text-zinc-300">
                              Alternative
                            </th>
                            <th className="px-4 py-3 font-medium text-zinc-300">
                              Gap
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.rows.map((row) => (
                            <tr
                              key={row.option}
                              className="border-b border-zinc-900/80 last:border-b-0"
                            >
                              <td className="px-4 py-3 align-top text-zinc-300">
                                {row.option}
                              </td>
                              <td className="px-4 py-3 align-top text-zinc-400">
                                {row.gap}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SectionBlock>
                );
              }

              if (section.id === "mvp" && "inScope" in section) {
                return (
                  <SectionBlock key={section.id} id={section.id} title={section.title}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-emerald-400/80">
                          In scope
                        </p>
                        <BulletList items={section.inScope} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-zinc-600">
                          Out of scope (v1)
                        </p>
                        <BulletList items={section.outOfScope} />
                      </div>
                    </div>
                  </SectionBlock>
                );
              }

              if (section.id === "decisions" && "items" in section) {
                return (
                  <SectionBlock key={section.id} id={section.id} title={section.title}>
                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <div
                          key={item.decision}
                          className="rounded-lg border border-zinc-900 bg-zinc-950/40 p-4"
                        >
                          <p className="text-sm font-medium text-zinc-200">
                            {item.decision}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-zinc-400">
                            <span className="text-zinc-500">Why: </span>
                            {item.rationale}
                          </p>
                          <p className="mt-1 text-sm leading-7 text-zinc-400">
                            <span className="text-zinc-500">Tradeoff: </span>
                            {item.tradeoff}
                          </p>
                        </div>
                      ))}
                    </div>
                  </SectionBlock>
                );
              }

              if (section.id === "why-order" && "cutBullets" in section) {
                return (
                  <SectionBlock key={section.id} id={section.id} title={section.title}>
                    {"content" in section &&
                      section.content?.map((paragraph) => (
                        <Prose key={paragraph}>{paragraph}</Prose>
                      ))}
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-zinc-600">
                        Deliberately cut from v1
                      </p>
                      <BulletList items={section.cutBullets} />
                    </div>
                  </SectionBlock>
                );
              }

              if (section.id === "validation" && "tasks" in section) {
                return (
                  <SectionBlock key={section.id} id={section.id} title={section.title}>
                    {"content" in section &&
                      section.content?.map((paragraph) => (
                        <Prose key={paragraph}>{paragraph}</Prose>
                      ))}
                    <div className="overflow-x-auto rounded-lg border border-zinc-900">
                      <table className="w-full min-w-[520px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-zinc-900 bg-zinc-950/60">
                            <th className="px-4 py-3 font-medium text-zinc-300">Task</th>
                            <th className="px-4 py-3 font-medium text-zinc-300">Result</th>
                            <th className="px-4 py-3 font-medium text-zinc-300">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.tasks.map((row) => (
                            <tr
                              key={row.task}
                              className="border-b border-zinc-900/80 last:border-b-0"
                            >
                              <td className="px-4 py-3 align-top text-zinc-300">{row.task}</td>
                              <td className="px-4 py-3 align-top text-violet-300/90">{row.result}</td>
                              <td className="px-4 py-3 align-top text-zinc-400">{row.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-zinc-600">
                        Misclassification examples
                      </p>
                      <div className="mt-3 space-y-3">
                        {section.misclassifications.map((item) => (
                          <div
                            key={item.input}
                            className="rounded-lg border border-zinc-900 bg-zinc-950/40 p-4 text-sm"
                          >
                            <p className="font-mono text-zinc-300">&quot;{item.input}&quot;</p>
                            <p className="mt-2 text-zinc-400">
                              <span className="text-zinc-500">Expected: </span>
                              {item.expected}
                            </p>
                            <p className="mt-1 text-zinc-400">
                              <span className="text-zinc-500">Got: </span>
                              {item.got}
                            </p>
                            <p className="mt-1 text-zinc-400">
                              <span className="text-zinc-500">Fix: </span>
                              {item.fix}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <blockquote className="rounded-lg border border-violet-500/20 bg-violet-500/5 px-4 py-4">
                      <p className="text-sm leading-7 text-zinc-300">
                        &ldquo;{section.quote.text}&rdquo;
                      </p>
                      <footer className="mt-3 text-xs text-zinc-500">
                        — {section.quote.attribution}
                      </footer>
                    </blockquote>
                  </SectionBlock>
                );
              }

              if (section.id === "outcomes" && "stats" in section) {
                return (
                  <SectionBlock key={section.id} id={section.id} title={section.title}>
                    {"content" in section &&
                      section.content?.map((paragraph) => (
                        <Prose key={paragraph}>{paragraph}</Prose>
                      ))}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {section.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-lg border border-zinc-900 bg-zinc-950/40 p-4"
                        >
                          <p className="text-xs uppercase tracking-[0.12em] text-zinc-600">
                            {stat.label}
                          </p>
                          <p className="mt-2 text-2xl font-medium tracking-tight text-white">
                            {stat.value}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-zinc-500">
                            {stat.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-zinc-600">
                        What changed after testing
                      </p>
                      <BulletList items={section.changes} />
                    </div>
                  </SectionBlock>
                );
              }

              if (section.id === "metrics" && "items" in section) {
                return (
                  <SectionBlock key={section.id} id={section.id} title={section.title}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {section.items.map((item) => (
                        <div
                          key={item.metric}
                          className="rounded-lg border border-zinc-900 bg-zinc-950/40 p-4"
                        >
                          <p className="text-sm font-medium text-zinc-200">
                            {item.metric}
                          </p>
                          <p className="mt-2 text-sm text-violet-300/90">
                            {item.target}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-zinc-500">
                            {item.why}
                          </p>
                        </div>
                      ))}
                    </div>
                  </SectionBlock>
                );
              }

              return (
                <SectionBlock key={section.id} id={section.id} title={section.title}>
                  {"content" in section &&
                    section.content?.map((paragraph) => (
                      <Prose key={paragraph}>{paragraph}</Prose>
                    ))}
                  {"bullets" in section && section.bullets ? (
                    <BulletList items={section.bullets} />
                  ) : null}
                </SectionBlock>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
