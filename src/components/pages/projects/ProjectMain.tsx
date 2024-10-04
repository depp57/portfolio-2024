'use client';

import ProjectPreview, { Project } from '@/components/pages/projects/ProjectPreview';
import ProgressIndicator from '@/components/pages/projects/ProgressIndicator';
import ProjectInfo from '@/components/pages/projects/ProjectInfo';
import { useScroll } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';

export default function ProjectMain({ data }: Readonly<{ data: Project[] }>) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  useProjectStore.setState({ currentProject: data[currentProjectIndex] });

  const overflowDiv = useRef<HTMLDivElement>(null!);
  const scrollContainer = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    overflowDiv.current.style.height = `${data.length * 50}%`;
  }, [data]);

  const { scrollY } = useScroll({ container: scrollContainer });
  scrollY.on('change', (y) => {
    useProjectStore.setState({ currentScrollFactor: ((y / overflowDiv.current.clientHeight) * data.length) % 1 });

    const currentProjectIndexComputed = Math.min(
      data.length - 1,
      Math.floor((y / overflowDiv.current.clientHeight) * data.length),
    );
    if (currentProjectIndex !== currentProjectIndexComputed) {
      setCurrentProjectIndex(currentProjectIndexComputed);
    }

    const EPSILON = 0.1;
    if (y > overflowDiv.current.clientHeight - EPSILON) {
      scrollContainer.current.scrollTo(0, 1);
    }

    if (y < EPSILON) {
      scrollContainer.current.scrollTo(0, overflowDiv.current.clientHeight - 1);
    }
  });

  return (
    <>
      <main className="w-full h-dvh bg-blue-900/20 flex flex-col justify-between p-10">
        <span className="h-16" />

        <div className="flex justify-between items-center">
          <span />
          <ProjectPreview project={data[currentProjectIndex]} />
          <ProgressIndicator currentProjectIndex={currentProjectIndex} projectCount={data.length} />
        </div>

        <ProjectInfo project={data[currentProjectIndex]} />
      </main>

      <div
        ref={scrollContainer}
        className="absolute w-full h-full overflow-x-hidden overflow-y-auto top-0 left-0 pointer-events-auto"
      >
        <div className="sticky top-0 left-0 w-full h-full overflow-hidden" />
        <div ref={overflowDiv} className="w-full pointer-events-none" />
      </div>
    </>
  );
}
