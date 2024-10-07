import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export async function Providers({ children, lang }: Readonly<{ children: ReactNode; lang: string }>) {
  const messages = await getMessages({ locale: lang });

  return (
    <ThemeProvider disableTransitionOnChange>
      <NextIntlClientProvider locale={lang} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
