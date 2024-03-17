'use client';

import styles from './AudioPlayer.module.css';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMusicStore } from '@/stores/musicStore';

export default function AudioPlayer() {
  const isPlaying = useMusicStore((state) => state.isPlaying);
  const toggleMusic = useMusicStore((state) => state.toggleMusic);

  const [audio, setAudio] = useState<HTMLAudioElement>(null!);

  useEffect(() => {
    setAudio(new Audio('/ambient.mp3'));
  }, []);

  if (isPlaying && audio) {
    audio.play();
  } else if (audio) {
    audio.pause();
  }

  function onClick() {
    toggleMusic();
  }

  return (
    <div className={styles.container} onClick={onClick}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={cn(styles.wave, { [styles.paused]: !isPlaying })} />
      ))}
    </div>
  );
}
