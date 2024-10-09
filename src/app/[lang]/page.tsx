import Home from '@/components/pages/home/Home';
import ProjectPreloader from '@/components/pages/projects/ProjectPreloader';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Page({ params: { lang } }: Readonly<{ params: { lang: string } }>) {
  unstable_setRequestLocale(lang);

  return (
    <>
      <Home />
      <ProjectPreloader />
    </>
  );
}
