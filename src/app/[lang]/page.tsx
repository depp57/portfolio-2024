import Home from '@/components/pages/home/Home';
import ProjectPreloader from '@/components/pages/projects/ProjectPreloader';
import { setRequestLocale } from 'next-intl/server';
import { fetchProjects } from '@/lib/projects';

export default async function Page({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);

  const projects = await fetchProjects(lang);

  return (
    <>
      <Home />
      <ProjectPreloader projects={projects} />
    </>
  );
}
