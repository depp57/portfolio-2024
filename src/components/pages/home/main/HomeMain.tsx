import { Button } from '@/components/shared/button';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';

export default function HomeMain() {
  const t = useTranslations('home');

  return (
    <main className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-5xl 2xl:text-9xl font-bold text-primary-text">Sacha</h1>
      <h2 className="text-2xl 2xl:text-3xl text-center text-primary-text">
        {t('shortDescription.role')}
        <br />
        <b>⎈</b>
        <br />
        {t('shortDescription.catchPhrase')}
      </h2>
      <div>
        <Link href="/projects">
          <Button size="lg" className="text-lg 2xl:text-xl">
            {t('shortDescription.discoverWork')}
            <ArrowTopRightIcon className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
