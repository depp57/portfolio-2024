import { useProjectStore } from '@/stores/projectStore';
import { useThreeStore } from '@/stores/ThreeStore';
import { useEffect } from 'react';
import ProjectView from '@/components/3d-experience/projects/ProjectView';

export default function ProjectsView({ visible }: Readonly<{ visible: boolean }>) {
  const { projects, currentProjectIndex } = useProjectStore();
  const currentProject = projects[currentProjectIndex];

  useEffect(() => {
    if (!visible) return;

    useThreeStore.setState({ scrollPagesCount: projects.length });
    return () => {
      useThreeStore.setState({ scrollPagesCount: 4 });
    };
  }, [visible]);

  return <ProjectView visible={visible} project={currentProject} />;
}
