import Menu from '@/components/shared/menu/Menu';
import Link from 'next/link';
import AboutFooter from '@/components/pages/about/AboutFooter';
import SkillsSection from '@/components/pages/about/skills/SkillsSection';
import WelcomeSection from '@/components/pages/about/WelcomeSection';
import ExperiencesSection from '@/components/pages/about/experiences/ExperiencesSection';
import ContactSection from '@/components/pages/about/ContactSection';
import { Toaster } from '@/components/shared/toaster';

export default function About() {
  return (
    <>
      <header className="absolute flex w-full justify-between items-center p-10 h-32">
        <Link href="/" className="text-3xl font-medium text-primary-text pointer-events-auto">
          Sacha
        </Link>

        <Menu />
      </header>

      <div className="flex flex-col overflow-y-auto pointer-events-auto p-36 pb-10 gap-24">
        <span className="min-h-[50vh]" />

        <main className="flex flex-col gap-52">
          <section className="flex justify-between">
            <WelcomeSection />
          </section>

          <section className="flex flex-col gap-8">
            <ExperiencesSection />
          </section>

          <section className="flex flex-col gap-8">
            <SkillsSection />
          </section>

          <section className="flex flex-col gap-8">
            <ContactSection />
          </section>
        </main>

        <footer className="flex gap-12 text-2xl">
          <AboutFooter />
        </footer>

        <Toaster />
      </div>
    </>
  );
}
