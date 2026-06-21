import Home from '@/components/pages/home/Home';
import { setRequestLocale } from 'next-intl/server';

export default async function Page({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <Home />;
}
