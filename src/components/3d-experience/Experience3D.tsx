'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import SkyClouds from '@/components/3d-experience/SkyClouds';
import Sky from '@/components/3d-experience/Sky';
import { usePathname } from 'next/navigation';
import Earth from '@/components/3d-experience/Earth';

export default function Experience3D() {
  const fullPathName = usePathname().split('/');
  const pathName = fullPathName.length > 2 ? fullPathName.pop() : 'home';

  return (
    <Canvas>
      <color attach="background" args={['#08131D']} />
      {/*<StatsGl />*/}
      <Suspense fallback={null}>
        <Sky />
        {pathName === 'home' && <SkyClouds />}
        {pathName === 'about' && <Earth />}
      </Suspense>
      {/*<OrbitControls />*/}
    </Canvas>
  );
}
