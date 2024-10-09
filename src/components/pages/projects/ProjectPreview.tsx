import { Button } from '@/components/shared/button';
import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/shared/badge';
import { useTranslations } from 'next-intl';

export type Project = {
  title: string;
  description: string;
  keywords: string[];
  dateRange: string;
  link: string;
  images: string[];
};

export default function ProjectPreview({ project }: Readonly<{ project: Project }>) {
  const t = useTranslations('projects');

  return (
    <div className="z-10 flex flex-col items-center justify-center gap-2.5">
      <h1 className="text-8xl text-primary-text">{project.title}</h1>
      <div className="flex gap-3">
        {project.keywords.map((keyword) => (
          <Badge key={keyword}>{keyword}</Badge>
        ))}
      </div>

      <Link href={project.link} className="mt-4">
        <Button size="lg" className="text-lg 2xl:text-xl pointer-events-auto">
          {t('viewProject')}
          <ArrowTopRightIcon className="ml-2 h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
