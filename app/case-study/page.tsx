import type { Metadata } from "next";

import { CaseStudySection } from "@/components/CaseStudy";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { CASE_STUDY_META } from "@/lib/caseStudy";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${CASE_STUDY_META.title} — ${SITE.name}`,
  description: CASE_STUDY_META.subtitle,
};

export default function CaseStudyPage() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-6xl px-6">
        <CaseStudySection />
      </main>
      <Footer />
    </>
  );
}
