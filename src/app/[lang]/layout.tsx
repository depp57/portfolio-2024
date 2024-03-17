import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { ReactNode } from 'react';
import Experience3D from '@/components/3d-experience/Experience3D';
import { Providers } from '@/app/[lang]/Providers';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

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

type RootLayoutParams = {
  children: ReactNode;
  params: {
    lang: string;
  };
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }];
}

export default function RootLayout({ children, params: { lang } }: RootLayoutParams) {
  unstable_setRequestLocale(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="background-canvas">
            <Experience3D />
          </div>
          <div className="html-overlay">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
