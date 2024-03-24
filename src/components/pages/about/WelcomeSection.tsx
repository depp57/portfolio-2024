import { useTranslations } from 'next-intl';

export default function WelcomeSection() {
  const t = useTranslations('about');

  return (
    <>
      <span className="text-[140px] leading-none font-semibold">{t('welcome')}</span>
      <p className="text-3xl text-end w-2/5">
        {t('namePrefix')} Sacha Thommet
        <br />
        <br />
        {t('catchPhrase')}
      </p>
    </>
  );
}
