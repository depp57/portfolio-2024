import { Button } from '@/components/shared/button';
import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export type Project = {
  title: string;
  description: string;
  keywords: string[];
  dateRange: string;
  link: string;
  images: string[];
};

export default function ProjectPreview({ project }: Readonly<{ project: Project }>) {
  return (
    <div className="z-10 flex flex-col items-center justify-center gap-2.5">
      <h1 className="text-8xl text-primary-text">{project.title}</h1>
      <p className="text-2xl text-primary-text">{project.keywords.map((keyword) => keyword).join(' · ')}</p>
      <Link href={project.link} className="mt-4">
        <Button size="lg" className="text-lg 2xl:text-xl pointer-events-auto">
          View project
          <ArrowTopRightIcon className="ml-2 h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
