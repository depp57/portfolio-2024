import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Project } from '@/components/pages/projects/ProjectPreview';

type ProjectStore = {
  projects: Project[];
  currentProjectIndex: number;
};

export const useProjectStore = create<ProjectStore>()(
  devtools(
    (_) => ({
      projects: [],
      currentProjectIndex: null!,
    }),
    { name: 'projectStore', store: 'projectStore' },
  ),
);
