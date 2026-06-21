import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { hasLocale } from 'next-intl';
import { redirect } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!hasLocale(routing.locales, locale)) redirect('/');

  return {
    locale,
    messages: (await import(`../../../i18n-messages/${locale}.json`)).default,
  };
});
