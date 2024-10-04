import { Project } from '@/components/pages/projects/ProjectPreview';

export default function ProjectInfo({ project }: Readonly<{ project: Project }>) {
  return (
    <div className="pointer-events-auto flex flex-col gap-1 w-fit h-16">
      <p className="text-secondary-text text-lg font-light">{project.dateRange}</p>
      <p className="text-primary-text text-lg font-light">{project.description}</p>
    </div>
  );
}
