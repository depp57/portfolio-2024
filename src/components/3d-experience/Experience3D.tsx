'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import Test from '@/components/3d-experience/Test';

export default function Experience3D() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        {/*<Helmet />*/}
        <Test />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
