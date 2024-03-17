'use client';

import { Button } from '@/components/shared/button';
import { useMusicStore } from '@/stores/musicStore';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { useIntroStore } from '@/stores/homeStore';
import { useTranslations } from 'next-intl';

export default function HomeEntry() {
  const t = useTranslations('home.audioChoices');

  const playMusic = useMusicStore((state) => state.playMusic);
  const stopMusic = useMusicStore((state) => state.stopMusic);
  const hideOverlay = useIntroStore((state) => state.endIntro);

  function onClick(music: boolean) {
    hideOverlay();
    music ? playMusic() : stopMusic();
  }

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <Button className="text-xl" size="lg" onClick={() => onClick(true)}>
          {t('enterWithSound')}
          <ArrowTopRightIcon className="ml-2 h-6 w-6" />
        </Button>
        <div className="flex text-gray-500 items-center gap-4 w-8/12">
          <div className="h-px w-full bg-secondary-text"></div>
          <span className="text-lg font-normal text-secondary-text">or</span>
          <div className="h-px w-full bg-secondary-text"></div>
        </div>
        <Button className="text-xl" size="lg" variant="ghost" onClick={() => onClick(false)}>
          {t('enterWithoutSound')}
          <ArrowTopRightIcon className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </>
  );
}
