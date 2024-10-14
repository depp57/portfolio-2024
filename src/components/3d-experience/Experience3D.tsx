'use client';

import { Canvas } from '@react-three/fiber';
import { usePathname } from 'next/navigation';
import { Suspense, useRef } from 'react';
import { useThreeStore } from '@/stores/ThreeStore';
import { ScrollControls } from '@react-three/drei';
import ScrollListener from '@/components/3d-experience/ScrollListener';
import { useHomeStore } from '@/stores/homeStore';
import useIsMobile from '@/hooks/use-is-mobile';
import Sky from '@/components/3d-experience/Sky';
import Aurora from '@/components/3d-experience/Aurora';
import SkyClouds from '@/components/3d-experience/SkyClouds';
import About3D from '@/components/3d-experience/about/About3D';
import ProjectsView from '@/components/3d-experience/projects/ProjectsView';

let messageAlreadyShowed = false;

function showBannerInConsole() {
  if (messageAlreadyShowed) return;
  messageAlreadyShowed = true;

  console.log('%cHello there, developer!', 'color: #32ffce');
  console.log(
    '%cIf you’d like to get in touch, please feel free to reach out via the contact section.',
    'color: #32ffce',
  );
  console.log('%c— Sacha', 'color: #777777');
}

export default function Experience3D() {
  const pathSegments = usePathname().split('/');
  const lastPathSegment = (pathSegments.length > 2 ? pathSegments.pop() : 'home') as string;

  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const scrollPagesCount = useThreeStore((state) => state.scrollPagesCount);

  const isMobile = useIsMobile();

  if (lastPathSegment !== 'home') {
    useHomeStore.setState({ isIntro: false });
  }

  showBannerInConsole();

  if (!['home', 'projects', 'about'].includes(lastPathSegment)) {
    return null;
  }

  return (
    <div className="background-canvas">
      <Canvas ref={canvasRef} gl={{ powerPreference: isMobile ? 'high-performance' : 'default' }}>
        <color attach="background" args={['#08131D']} />
        {/*<Perf />*/}
        <ScrollControls
          pages={scrollPagesCount}
          distance={0.75}
          infinite={true}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <ScrollListener />

          <Suspense fallback={null}>
            <Aurora />
            <Sky />
            <SkyClouds key="skyClouds" visible={lastPathSegment === 'home' || lastPathSegment === 'projects'} />
            <About3D key="about" visible={lastPathSegment === 'about'} />
            <ProjectsView key="project" visible={lastPathSegment === 'projects'} />
          </Suspense>
        </ScrollControls>
        {/*<OrbitControls />*/}
      </Canvas>
    </div>
  );
}
