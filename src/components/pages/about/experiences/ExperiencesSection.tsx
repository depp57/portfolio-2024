import InlineExperience from '@/components/pages/about/experiences/inline-experience';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/pages/about/SectionTitle';

export default function ExperiencesSection() {
  const t = useTranslations('about');

  return (
    <>
      <SectionTitle title={'Experiences'} />

      <InlineExperience
        company={t('experience.experience1.company')}
        role={t('experience.experience1.role')}
        date={t('experience.experience1.date')}
        description={t('experience.experience1.description')}
      >
        <li>{t('experience.experience1.mainTasks.task1')}</li>
        <li>{t('experience.experience1.mainTasks.task2')}</li>
        <li>{t('experience.experience1.mainTasks.task3')}</li>
        <li>{t('experience.experience1.mainTasks.task4')}</li>
      </InlineExperience>

      <InlineExperience
        company={t('experience.experience2.company')}
        role={t('experience.experience2.role')}
        date={t('experience.experience2.date')}
        description={t('experience.experience2.description')}
      >
        <li>{t('experience.experience2.mainTasks.task1')}</li>
        <li>{t('experience.experience2.mainTasks.task2')}</li>
        <li>{t('experience.experience2.mainTasks.task3')}</li>
      </InlineExperience>

      <InlineExperience
        company={t('experience.experience3.company')}
        role={t('experience.experience3.role')}
        date={t('experience.experience3.date')}
        description={t('experience.experience3.description')}
      >
        <li>{t('experience.experience3.mainTasks.task1')}</li>
        <li>{t('experience.experience3.mainTasks.task2')}</li>
        <li>{t('experience.experience3.mainTasks.task3')}</li>
      </InlineExperience>

      <InlineExperience
        company={t('experience.experience4.company')}
        role={t('experience.experience4.role')}
        date={t('experience.experience4.date')}
        description={t('experience.experience4.description')}
      >
        <li>{t('experience.experience4.mainTasks.task1')}</li>
        <li>
          {t('experience.experience4.mainTasks.task2.text1')}
          <Link
            href="https://www.researchgate.net/publication/358315478_Occupational_eye_protection_using_Augmented_Reality_a_proof_of_concept"
            className="underline decoration-gray-500"
          >
            {t('experience.experience4.mainTasks.task2.link')}
          </Link>
          {t('experience.experience4.mainTasks.task2.text2')}
        </li>
      </InlineExperience>
    </>
  );
}
