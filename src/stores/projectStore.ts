import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Project } from '@/components/pages/projects/ProjectPreview';

type ProjectStore = {
  currentProject: Project;
  currentScrollFactor: number;
};

export const useProjectStore = create<ProjectStore>()(
  devtools(
    (_) => ({
      currentProject: null!,
      currentScrollFactor: 0,
    }),
    { name: 'projectStore', store: 'projectStore' },
  ),
);
