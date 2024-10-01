import LinkHover from '@/components/shared/link-hover';
import { useTranslations } from 'next-intl';

export default function AboutFooter() {
  const t = useTranslations('about');

  return (
    <div className="w-full flex flex-col gap-3 lg:flex-row lg:gap-12">
      <p className="text-lg lg:text-2xl">{t('socialLinksDescription')}</p>
      <div className="w-full flex justify-between lg:contents">
        <LinkHover text="LinkedIn" href="https://linkedin.com/in/sacha-thommet" />
        <LinkHover text="GitHub" href="https://github.com/depp57" />
        <LinkHover text="Dev.to" href="https://dev.to/depp57" />
        <LinkHover text="Email" href="mailto:sacha.thommet5@orange.fr" />
      </div>
    </div>
  );
}
