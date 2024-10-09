'use client';

import AboutFooter from '@/components/pages/about/AboutFooter';
import SkillsSection from '@/components/pages/about/skills/SkillsSection';
import WelcomeSection from '@/components/pages/about/WelcomeSection';
import ExperiencesSection from '@/components/pages/about/experiences/ExperiencesSection';
import ContactSection from '@/components/pages/about/ContactSection';
import { Toaster } from '@/components/shared/toaster';
import Menu from '@/components/shared/menu/Menu';
import { Link } from '@/lib/i18n/routing';
import ReactLenis from 'lenis/react';
import { cn } from '@/lib/utils';
import styles from './About.module.css';

export default function About() {
  return (
    <ReactLenis root options={{ syncTouch: true, touchInertiaMultiplier: 15 }}>
      <header className="fixed flex w-full justify-between items-center p-10 2xl:p-10 lg:h-32">
        <Link href="/" className="text-3xl font-medium text-primary-text pointer-events-auto" scroll={false}>
          Sacha
        </Link>

        <Menu />
      </header>

      <div
        className={cn(
          'text-primary-text flex flex-col p-3 lg:p-28 2xl:p-36 pointer-events-none pb-10 gap-24',
          styles.contrastBackground,
        )}
      >
        <span className="lg:min-h-[50vh] 2xl:min-h-[55vh] 3xl:min-h-[65vh]" />

        <main className="flex flex-col gap-12 lg:gap-40">
          <section className="flex justify-between flex-col lg:flex-row gap-96 lg:gap-0">
            <WelcomeSection />
          </section>

          <section className="flex flex-col gap-4 lg:gap-8">
            <ExperiencesSection />
          </section>

          <section className="flex flex-col gap-4 lg:gap-8">
            <SkillsSection />
          </section>

          <section className="flex flex-col gap-4 lg:gap-8">
            <ContactSection />
          </section>
        </main>

        <footer className="-mt-12 lg:mt-auto flex gap-12 text-2xl">
          <AboutFooter />
        </footer>
      </div>

      <Toaster />
    </ReactLenis>
  );
}
