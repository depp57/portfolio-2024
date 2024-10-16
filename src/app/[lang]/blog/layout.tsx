import Menu from '@/components/shared/menu/Menu';
import { ReactNode } from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

type BlogLayoutProps = {
  children: ReactNode;
  params: {
    lang: string;
  };
};

export default async function BlogLayout({ children, params: { lang } }: Readonly<BlogLayoutProps>) {
  const t = await getTranslations({ locale: lang, namespace: 'blog' });

  return (
    <div className="bg-blogBackground">
      <header className="fixed flex w-full justify-between items-center p-10 2xl:p-10 lg:h-32 z-10">
        <Link href="/" className="text-3xl font-medium text-primary-text pointer-events-auto">
          Sacha
        </Link>

        <Menu />
      </header>

      <main className="mt-20 lg:mt-32 mx-auto w-full max-w-screen-xl px-2.5 md:px-20 pointer-events-auto">
        {children}
      </main>

      <footer className="pointer-events-auto">
        <div className="text-primary-text mt-6 p-4 text-center">
          <p>{t('footerMessage')}</p>
        </div>
      </footer>
    </div>
  );
}
