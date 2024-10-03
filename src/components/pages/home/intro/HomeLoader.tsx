import { useProgress } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function HomeLoader({ onLoaded }: Readonly<{ onLoaded: () => void }>) {
  const t = useTranslations('home.progressExpressions');

  const progress = useProgress((selector) => selector.progress);
  const progressTextRef = useRef<HTMLSpanElement>(null!);

  const progressInterpolation = Math.floor(progress / 20) * 20;

  const progressTexts = [t('expression1'), t('expression2'), t('expression3')];

  const currentText = progressTexts[Math.floor((progressTexts.length * progressInterpolation) / 101)];

  useEffect(() => {
    if (progressInterpolation === 100) {
      onLoaded();
    }
  });

  return (
    <>
      <span
        className="text-primary-text text-4xl sm:text-5xl lg:text-6xl text-center w-full block"
        ref={progressTextRef}
      >
        {progressInterpolation}%
      </span>
      <br />
      <span className="text-primary-text text-lg sm:text-xl lg:text-2xl text-nowrap">{currentText}</span>
    </>
  );
}
