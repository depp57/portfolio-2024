'use client';

import { Canvas } from '@react-three/fiber';
import SkyClouds from '@/components/3d-experience/SkyClouds';
import Sky from '@/components/3d-experience/Sky';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { useHomeStore } from '@/stores/homeStore';
import Earth from '@/components/3d-experience/Earth';
import { Suspense } from 'react';
import PreloadAllTextures from '@/components/3d-experience/PreloadAllTextures';

export default function Experience3D() {
  const fullPathName = usePathname().split('/');
  const pathName = fullPathName.length > 2 ? fullPathName.pop() : 'home';
  const isIntro = useHomeStore((state) => state.isIntro);

  return (
    <Canvas>
      <color attach="background" args={['#08131D']} />
      {/*<StatsGl />*/}
      <Suspense fallback={null}>
        {isIntro && <PreloadAllTextures />}

        {!isIntro && (
          <>
            <Sky />
            <AnimatePresence initial={false}>
              {pathName === 'home' && <SkyClouds key="clouds" />}
              {pathName === 'about' && <Earth key="earth" />}
            </AnimatePresence>
          </>
        )}
      </Suspense>
      {/*<OrbitControls />*/}
    </Canvas>
  );
}
