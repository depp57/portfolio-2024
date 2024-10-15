import { pick } from '@/lib/utils';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Blog from '@/components/pages/blog/Blog';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata.titles' });

  return {
    title: t('blog'),
  };
}

export default function Page({
  params: { lang },
  searchParams,
}: Readonly<{ params: { lang: string }; searchParams?: { [key: string]: string | undefined } }>) {
  unstable_setRequestLocale(lang);

  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, 'blog', 'menu')}>
      <Blog searchParams={searchParams} />
    </NextIntlClientProvider>
  );
}
