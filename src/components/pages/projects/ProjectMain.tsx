'use client';

import ProjectPreview, { Project } from '@/components/pages/projects/ProjectPreview';
import ProgressIndicator from '@/components/pages/projects/ProgressIndicator';
import ProjectInfo from '@/components/pages/projects/ProjectInfo';
import { Fragment, useMemo, useState } from 'react';
import { useThreeStore } from '@/stores/ThreeStore';
import { useProjectStore } from '@/stores/projectStore';
import { AnimatePresence, motion } from 'framer-motion';

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

  const currentProject = useMemo(() => {
    return projects[currentProjectIndex];
  }, [projects, currentProjectIndex]);

  return (
    <main className="w-full h-dvh flex flex-col justify-between p-10">
      <span className="h-16" />

      <AnimatePresence mode="wait">
        {projects.map((_, index) => {
          if (index !== currentProjectIndex) return null;
          return (
            <Fragment key={index}>
              <div className="flex justify-between items-center">
                <span />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <ProjectPreview project={currentProject} />
                </motion.div>
                <ProgressIndicator currentProjectIndex={currentProjectIndex} projectCount={projects.length} />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <ProjectInfo project={currentProject} />
              </motion.div>
            </Fragment>
          );
        })}
      </AnimatePresence>
    </main>
  );
}
