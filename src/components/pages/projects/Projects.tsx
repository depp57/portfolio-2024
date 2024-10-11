'use server';

import Link from 'next/link';
import Menu from '@/components/shared/menu/Menu';
import ProjectMain from '@/components/pages/projects/ProjectMain';
import { Project } from '@/components/pages/projects/ProjectPreview';

export default async function Projects({ projects }: Readonly<{ projects: Project[] }>) {
  return (
    <>
      <header className="fixed flex w-full justify-between items-center p-10 2xl:p-10 lg:h-32">
        <Link href="/" className="text-3xl font-medium text-primary-text pointer-events-auto">
          Sacha
        </Link>

        <Menu />
      </header>

      <ProjectMain projects={projects} />
    </>
  );
}
