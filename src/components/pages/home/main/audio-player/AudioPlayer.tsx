'use client';

import styles from './AudioPlayer.module.css';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import ButtonCircle from '@/components/shared/button-circle';
import { useMusicStore } from '@/stores/musicStore';

export default function AudioPlayer() {
  const isPlaying = useMusicStore((state) => state.isPlaying);
  const toggleMusic = useMusicStore((state) => state.toggleMusic);

  const [audio, setAudio] = useState<HTMLAudioElement>(null!);

  useEffect(() => {
    setAudio(new Audio('/ambient.mp3'));
  }, []);

  if (isPlaying && audio) {
    void audio.play();
  } else if (audio) {
    audio.pause();
  }

  function onClick() {
    toggleMusic();
  }

  return (
    <ButtonCircle onClick={onClick}>
      <div className={styles.container}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={cn(styles.wave, { [styles.paused]: !isPlaying })} />
        ))}
      </div>
    </ButtonCircle>
  );
}
