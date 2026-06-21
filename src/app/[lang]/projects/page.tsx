import { getTranslations, setRequestLocale } from 'next-intl/server';
import Projects from '@/components/pages/projects/Projects';
import { fetchProjects } from '@/lib/projects';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'metadata.titles' });

  return {
    title: t('projects'),
  };
}

export default async function Page({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);

  const projects = await fetchProjects(lang);

  return <Projects projects={projects} />;
}
