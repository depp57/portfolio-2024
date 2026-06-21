import { getTranslations, setRequestLocale } from 'next-intl/server';
import Blog from '@/components/pages/blog/Blog';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'metadata.titles' });

  return {
    title: t('blog'),
  };
}

export default async function Page({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}>) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <Blog lang={lang} searchParams={await searchParams} />;
}
