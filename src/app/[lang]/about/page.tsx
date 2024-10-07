import About from '@/components/pages/about/About';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata.titles' });

  return {
    title: t('about'),
  };
}

export default function Page() {
  return <About />;
}
