import { Navigation } from '@/components/navigation';
import { AuroraBackground } from '@/components/aurora-background';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <AuroraBackground />
      <Navigation />
      {/*
        overflow-x-clip contains the horizontal offsets that scroll reveals start
        from (they'd otherwise widen the page on small screens). `clip` rather
        than `hidden` so no nested scroll container is created.
      */}
      <main className="relative overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
