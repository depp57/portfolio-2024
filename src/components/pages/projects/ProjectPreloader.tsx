'use client';

import { Project } from '@/components/pages/projects/ProjectPreview';
import { useProjectStore } from '@/stores/projectStore';

export default function ProjectPreloader({ projects }: Readonly<{ projects: Project[] }>) {
  useProjectStore.setState({ projects: projects, currentProjectIndex: 0 });

  return null;
}
