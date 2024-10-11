import fs from 'node:fs/promises';
import { Project } from '@/components/pages/projects/ProjectPreview';
import { cache } from 'react';

export const fetchProjects = cache(async (lang: string) => {
  const file = await fs.readFile(process.cwd() + `/data/projects.${lang}.json`, 'utf8');
  const data = JSON.parse(file) as { projects: Project[] };

  return data.projects;
});
