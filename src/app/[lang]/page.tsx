import Home from '@/components/pages/home/Home';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { pick } from '@/lib/utils';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Page({ params: { lang } }: { params: { lang: string } }) {
  unstable_setRequestLocale(lang);

  const messages = useMessages() as Messages;

  return (
    <NextIntlClientProvider messages={pick(messages, 'home')}>
      <Home />
    </NextIntlClientProvider>
  );
}
