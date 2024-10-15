import fs from 'node:fs/promises';
import { Project } from '@/components/pages/projects/ProjectPreview';
import { unstable_cache } from 'next/cache';

export const fetchProjects = unstable_cache(async (lang: string) => {
  const file = await fs.readFile(process.cwd() + `/data/project/projects.${lang}.json`, 'utf8');
  const data = JSON.parse(file) as { projects: Project[] };

  return data.projects;
});
