import { create } from 'zustand';
import { Project } from '@/components/pages/projects/ProjectPreview';

type ProjectStore = {
  projects: Project[];
  currentProjectIndex: number;
};

export const useProjectStore = create<ProjectStore>()((_) => ({
  projects: [],
  currentProjectIndex: null!,
}));
