import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Projects from '@/components/pages/projects/Projects';
import { fetchProjects } from '@/lib/projects';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata.titles' });

  return {
    title: t('projects'),
  };
}

export default async function Page({ params: { lang } }: Readonly<{ params: { lang: string } }>) {
  unstable_setRequestLocale(lang);

  const projects = await fetchProjects(lang);

  return <Projects projects={projects} />;
}
