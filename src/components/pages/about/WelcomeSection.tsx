import { useTranslations } from 'next-intl';

export default function WelcomeSection() {
  const t = useTranslations('about');

  return (
    <>
      <span className="text-7xl lg:text-[140px] leading-none font-semibold">{t('welcome')}</span>
      <p className="text-xl lg:text-2xl 2xl:text-3xl text-end lg:w-3/5 2xl:w-2/5 self-end">
        {t('namePrefix')} Sacha Thommet
        <br />
        <br />
        {t('catchPhrase')}
      </p>
    </>
  );
}
