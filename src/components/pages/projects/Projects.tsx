import Link from 'next/link';
import Menu from '@/components/shared/menu/Menu';
import { Project } from '@/components/pages/projects/ProjectPreview';
import * as fs from 'node:fs/promises';
import ProjectMain from '@/components/pages/projects/ProjectMain';

export default async function Projects() {
  const file = await fs.readFile(process.cwd() + '/data.json', 'utf8');
  const data = JSON.parse(file) as { projects: Project[] };

  return (
    <>
      <header className="absolute flex w-full justify-between items-center p-10 2xl:p-10 lg:h-32">
        <Link href="/" className="text-3xl font-medium text-primary-text pointer-events-auto">
          Sacha
        </Link>

        <Menu />
      </header>

      <ProjectMain data={data.projects} />
    </>
  );
}
