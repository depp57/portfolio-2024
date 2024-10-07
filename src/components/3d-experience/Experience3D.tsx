'use client';

import { Canvas } from '@react-three/fiber';
import Sky from '@/components/3d-experience/Sky';
import { usePathname } from 'next/navigation';
import { Suspense, useRef } from 'react';
import { useThreeStore } from '@/stores/ThreeStore';
import { ScrollControls } from '@react-three/drei';
import SkyClouds from '@/components/3d-experience/SkyClouds';
import ScrollListener from '@/components/3d-experience/ScrollListener';
import ProjectsView from '@/components/3d-experience/projects/ProjectsView';
import About3D from '@/components/3d-experience/about/About3D';

export default function Experience3D() {
  const pathSegments = usePathname().split('/');
  const lastPathSegment = pathSegments.length > 2 ? pathSegments.pop() : 'home';

  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const scrollPagesCount = useThreeStore((state) => state.scrollPagesCount);

  return (
    <Canvas ref={canvasRef}>
      <color attach="background" args={['#08131D']} />
      {/*<Perf />*/}
      <ScrollControls
        pages={scrollPagesCount}
        distance={0.5}
        infinite={true}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <ScrollListener />

        <Suspense fallback={null}>
          <Sky />
          <SkyClouds key="skyClouds" visible={lastPathSegment === 'home' || lastPathSegment === 'projects'} />
          <About3D key="about" visible={lastPathSegment === 'about'} />
          <ProjectsView key="project" visible={lastPathSegment === 'projects'} />
        </Suspense>
      </ScrollControls>
      {/*<OrbitControls />*/}
    </Canvas>
  );
}
