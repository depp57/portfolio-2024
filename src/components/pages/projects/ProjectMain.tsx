'use client';

import ProjectPreview, { Project } from '@/components/pages/projects/ProjectPreview';
import ProgressIndicator from '@/components/pages/projects/ProgressIndicator';
import ProjectInfo from '@/components/pages/projects/ProjectInfo';
import { useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { useThreeStore } from '@/stores/ThreeStore';

export default function ProjectMain({ projects }: Readonly<{ projects: Project[] }>) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  useProjectStore.setState({ projects, currentProjectIndex });

  const { currentScrollProgress } = useThreeStore();
  const currentProjectIndexComputed = Math.min(
    projects.length - 1,
    Math.floor(currentScrollProgress * projects.length),
  );
  if (currentProjectIndex !== currentProjectIndexComputed) {
    setCurrentProjectIndex(currentProjectIndexComputed);
  }

  return (
    <>
      <main className="w-full h-dvh flex flex-col justify-between p-10">
        <span className="h-16" />

        <div className="flex justify-between items-center">
          <span />
          <ProjectPreview project={projects[currentProjectIndex]} />
          <ProgressIndicator currentProjectIndex={currentProjectIndex} projectCount={projects.length} />
        </div>

        <ProjectInfo project={projects[currentProjectIndex]} />
      </main>

      {/*<div*/}
      {/*  ref={scrollContainer}*/}
      {/*  className="absolute w-full h-full overflow-x-hidden overflow-y-hidden top-0 left-0 pointer-events-none"*/}
      {/*>*/}
      {/*  <div className="sticky top-0 left-0 w-full h-full overflow-hidden" />*/}
      {/*  <div ref={overflowDiv} className="w-full pointer-events-none" />*/}
      {/*</div>*/}
    </>
  );
}
