import { Project } from '@/components/pages/projects/ProjectPreview';

export default function ProjectInfo({ project }: Readonly<{ project: Project }>) {
  return (
    <div className="pointer-events-auto flex flex-col gap-1 w-3/4 sm:w-fit h-fit lg:h-16 text-sm sm:text-lg">
      <p className="text-secondary-text font-light">{project.dateRange}</p>
      <p className="text-justify whitespace-pre-line text-primary-text font-light">{project.description}</p>
    </div>
  );
}
