import type { Metadata } from "next";

import { CaseStudySection } from "@/components/CaseStudy";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { CASE_STUDY_META } from "@/lib/caseStudy";
import { SITE } from "@/lib/constants";

const shareTitle = `${CASE_STUDY_META.title} — ${SITE.name}`;
const shareDescription = CASE_STUDY_META.subtitle;

export const metadata: Metadata = {
  title: shareTitle,
  description: shareDescription,
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: shareTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
    images: ["/opengraph-image"],
  },
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
