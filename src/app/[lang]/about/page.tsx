import { pick } from '@/lib/utils';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import About from '@/components/pages/about/About';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata.titles' });

  return {
    title: t('about'),
  };
}

export default function Page({ params: { lang } }: Readonly<{ params: { lang: string } }>) {
  unstable_setRequestLocale(lang);

  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, 'about', 'menu')}>
      <About />
    </NextIntlClientProvider>
  );
}
