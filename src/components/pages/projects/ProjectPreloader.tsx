import { getLocale } from 'next-intl/server';
import fs from 'node:fs/promises';
import { Project } from '@/components/pages/projects/ProjectPreview';
import InitProjectStore from '@/components/pages/projects/InitProjectStore';

export default async function ProjectPreloader() {
  const locale = (await getLocale()) as 'en' | 'fr';

  const file = await fs.readFile(process.cwd() + `/data.${locale}.json`, 'utf8');
  const data = JSON.parse(file) as { projects: Project[] };

  return <InitProjectStore data={data} />;
}
