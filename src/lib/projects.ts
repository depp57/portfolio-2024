import fs from 'node:fs/promises';
import { Project } from '@/components/pages/projects/ProjectPreview';
import { unstable_cache } from 'next/cache';
import { routing } from '@/lib/i18n/routing';
import { hasLocale } from 'next-intl';
import { redirect } from 'next/navigation';

export const fetchProjects = unstable_cache(async (lang: string) => {
  if (!hasLocale(routing.locales, lang)) redirect('/');

  const file = await fs.readFile(process.cwd() + `/data/project/projects.${lang}.json`, 'utf8');
  const data = JSON.parse(file) as { projects: Project[] };

  return data.projects;
});
