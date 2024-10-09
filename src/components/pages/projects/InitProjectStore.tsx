'use client';

import { Project } from '@/components/pages/projects/ProjectPreview';
import { useProjectStore } from '@/stores/projectStore';

export default function InitProjectStore({ data }: Readonly<{ data: { projects: Project[] } }>) {
  useProjectStore.setState({ projects: data.projects, currentProjectIndex: 0 });

  return null;
}
