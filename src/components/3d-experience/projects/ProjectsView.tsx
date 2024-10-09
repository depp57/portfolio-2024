import { useProjectStore } from '@/stores/projectStore';
import { useThreeStore } from '@/stores/ThreeStore';
import { useEffect } from 'react';
import MouseMoveControls from '@/components/3d-experience/projects/MouseMoveControls';
import { useMotionValue } from 'framer-motion';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import ProjectView from '@/components/3d-experience/projects/ProjectView';
import useIsMobile from '@/hooks/use-is-mobile';

export default function ProjectsView({ visible }: Readonly<{ visible: boolean }>) {
  const { projects } = useProjectStore();

  useEffect(() => {
    if (!visible) return;

    useThreeStore.setState({ scrollPagesCount: projects.length });
    return () => {
      useThreeStore.setState({ scrollPagesCount: 4 });
    };
  }, [visible]);

  const DEFAULT_Z = 3.05;
  const carrouselZ = useMotionValue(DEFAULT_Z);
  const scroll = useScroll();

  const OFFSET_Z = 1.9;
  const LENGTH = OFFSET_Z * projects.length;
  const Z_END = DEFAULT_Z + (OFFSET_Z * projects.length - 1);

  useFrame(() => {
    if (!visible) return;

    carrouselZ.set(DEFAULT_Z + ((scroll.range(0, 1) * LENGTH) % Z_END));
  });

  const isMobile = useIsMobile();

  return (
    <group visible={visible}>
      {projects.map((project, index) => (
        <ProjectView key={index} index={index} project={project} positionReferenceZ={carrouselZ} />
      ))}

      {!isMobile && visible && <MouseMoveControls />}
    </group>
  );
}
