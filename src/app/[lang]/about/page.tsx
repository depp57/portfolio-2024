import About from '@/components/pages/about/About';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'metadata.titles' });

  return {
    title: t('about'),
  };
}

export default function Page() {
  return <About />;
}
