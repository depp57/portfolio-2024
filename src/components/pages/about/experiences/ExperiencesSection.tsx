import InlineExperience from '@/components/pages/about/experiences/inline-experience';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/pages/about/SectionTitle';

type Experience = {
  company: string;
  role: string;
  date: string;
  description: string;
  tasks: string[];
};

export default function ExperiencesSection() {
  const t = useTranslations('about');
  const experiences = t.raw('experiences') as Experience[];

  return (
    <>
      <SectionTitle title={'Experiences'} />

      {experiences.map((experience, index) => (
        <InlineExperience
          key={index}
          company={experience.company}
          role={experience.role}
          date={experience.date}
          description={experience.description}
          tasks={experience.tasks}
        />
      ))}
    </>
  );
}
