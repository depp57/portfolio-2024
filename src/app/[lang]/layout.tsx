import type { Viewport } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import '../globals.css';
import { ReactNode } from 'react';
import Experience3D from '@/components/3d-experience/Experience3D';
import { Providers } from '@/app/[lang]/Providers';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { routing } from '@/lib/i18n/routing';

const bricolageGrotesque = Bricolage_Grotesque({ subsets: ['latin'] });

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
  const t = await getTranslations({ locale: lang, namespace: 'metadata' });

  return {
    title: {
      template: 'Sacha Thommet • %s',
      default: 'Sacha Thommet • Portfolio',
    },
    description: t('description'),
    keywords: [`Portfolio, Sacha Thommet, ${t('keywords.role')}, DevOps`],
    authors: [{ name: 'Sacha Thommet', url: 'https://sachathommet.dev' }],
  };
}

export const viewport: Viewport = {
  themeColor: '#1c1c22',
};

type RootLayoutProps = {
  children: ReactNode;
  params: {
    lang: string;
  };
};

export async function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export default function RootLayout({ children, params: { lang } }: Readonly<RootLayoutProps>) {
  unstable_setRequestLocale(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={bricolageGrotesque.className}>
        <Providers lang={lang}>
          <Experience3D />

          <div className="html-overlay">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
