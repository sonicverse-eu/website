import {
  ContributionSection,
  CtaSection,
  FaqSection,
  FeaturesSection,
  Footer,
  HeroSection,
  Navbar,
  ProjectsSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-hidden">
        <HeroSection />
        <FeaturesSection />
        <ProjectsSection />
        <ContributionSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
