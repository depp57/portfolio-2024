'use client';

import Intro from '@/components/pages/home/intro/Intro';
import Main from '@/components/pages/home/main/Main';
import { useHomeStore } from '@/stores/homeStore';

export default function Home() {
  const isIntro = useHomeStore((state) => state.isIntro);

  return <>{isIntro ? <Intro /> : <Main />}</>;
}
