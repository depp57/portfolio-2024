import Home from '@/components/pages/home/Home';
import ProjectPreloader from '@/components/pages/projects/ProjectPreloader';
import { unstable_setRequestLocale } from 'next-intl/server';
import { fetchProjects } from '@/lib/projects';

export default async function Page({ params: { lang } }: Readonly<{ params: { lang: string } }>) {
  unstable_setRequestLocale(lang);

  const projects = await fetchProjects(lang);

  return (
    <>
      <Home />
      <ProjectPreloader projects={projects} />
    </>
  );
}
