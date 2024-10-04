'use client';

import { Canvas } from '@react-three/fiber';
import SkyClouds from '@/components/3d-experience/SkyClouds';
import Sky from '@/components/3d-experience/Sky';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useHomeStore } from '@/stores/homeStore';
import Earth from '@/components/3d-experience/Earth';
import { Suspense, useEffect, useRef } from 'react';
import TexturesPreloader from '@/components/3d-experience/TexturesPreloader';
import FluidFX from '@/components/3d-experience/waterSurface/FluidFX';
import WaterSurface from '@/components/3d-experience/waterSurface/WaterSurface';
import { useThreeStore } from '@/stores/ThreeStore';
import ProjectView from '@/components/3d-experience/ProjectView';
import { OrbitControls } from '@react-three/drei';

export default function Experience3D() {
  const pathSegments = usePathname().split('/');
  const lastPathSegment = pathSegments.length > 2 ? pathSegments.pop() : 'home';
  const isIntro = useHomeStore((state) => state.isIntro);

  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    useThreeStore.setState({ canvasRef });
  }, []);

  return (
    <Canvas ref={canvasRef}>
      <color attach="background" args={['#08131D']} />
      {/*<StatsGl />*/}
      <Suspense fallback={null}>
        {isIntro ? (
          <TexturesPreloader />
        ) : (
          <>
            <Sky />
            <AnimatePresence initial={false}>
              {(lastPathSegment === 'home' || lastPathSegment === 'projects') && <SkyClouds key="skyClouds" />}
              {lastPathSegment === 'about' && (
                <>
                  <Earth key="earth" />
                  <WaterSurface key="waterSurface">
                    <FluidFX key="fluidFx" />
                  </WaterSurface>
                </>
              )}
              {lastPathSegment === 'projects' && <ProjectView key="project" />}
            </AnimatePresence>
          </>
        )}
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
