import Image from 'next/image';
import scrollAnimation from '@static/scroll.webp';
import { useTranslations } from 'next-intl';

export default function ScrollHint() {
  const t = useTranslations('home');

  return (
    <div className="flex gap-2 flex-col items-center ml-auto mr-auto p-6 absolute bottom-0 left-0 right-0">
      <Image
        unoptimized
        priority
        className="opacity-40 mix-blend-screen"
        src={scrollAnimation}
        alt="mouse scroll animation gif"
      />
      <span className="text-secondary-text text-nowrap w-max">{t('scrollHint')}</span>
    </div>
  );
}
