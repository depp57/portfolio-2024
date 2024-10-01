import Home from '@/components/pages/home/Home';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { pick } from '@/lib/utils';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Page({ params: { lang } }: Readonly<{ params: { lang: string } }>) {
  unstable_setRequestLocale(lang);

  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, 'home', 'menu')}>
      <Home />
    </NextIntlClientProvider>
  );
}
