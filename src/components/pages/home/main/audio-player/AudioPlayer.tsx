'use client';

import styles from './AudioPlayer.module.css';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import ButtonCircle from '@/components/shared/button-circle';
import { useMusicStore } from '@/stores/musicStore';

export default function AudioPlayer() {
  const isPlaying = useMusicStore((state) => state.isPlaying);
  const toggleMusic = useMusicStore((state) => state.toggleMusic);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music.webm');
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      void audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

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
