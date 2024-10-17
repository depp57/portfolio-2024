import { Button } from '@/components/shared/button';
import { Link } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';

export default function PostNotFound() {
  const t = useTranslations('blog');

  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 justify-center items-center">
      <h1 className="text-2xl lg:text-6xl">{t('postNotFound')}</h1>
      <Link href="/blog">
        <Button className="text-xl" size="lg">
          {t('returnToBlog')}
        </Button>
      </Link>
    </div>
  );
}
