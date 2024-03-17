'use client';

import { useIntroStore } from '@/stores/homeStore';
import Intro from '@/components/pages/home/intro/Intro';
import Main from '@/components/pages/home/main/Main';

export default function Home() {
  const isIntro = useIntroStore((state) => state.isIntro);

  return <>{isIntro ? <Intro /> : <Main />}</>;
}
