import { ContactSection } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { RoadmapSection } from "@/components/Roadmap";
import { TechStackSection } from "@/components/TechStack";
import { Terminal } from "@/components/Terminal/Terminal";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="mx-auto max-w-6xl px-6">
        <Hero />
        <Terminal />
        <TechStackSection />
        <RoadmapSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
