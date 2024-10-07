import { getTranslations } from 'next-intl/server';
import Projects from '@/components/pages/projects/Projects';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata.titles' });

  return {
    title: t('projects'),
  };
}

export default function Page() {
  return <Projects />;
}
