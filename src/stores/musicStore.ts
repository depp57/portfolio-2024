import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type MusicState = {
  isPlaying: boolean;
  playMusic: () => void;
  stopMusic: () => void;
  toggleMusic: () => void;
};

export const useMusicStore = create<MusicState>()(
  devtools(
    (set) => ({
      isPlaying: false,
      playMusic: () => set(() => ({ isPlaying: true }), undefined, 'playMusic'),
      stopMusic: () => set(() => ({ isPlaying: false }), undefined, 'stopMusic'),
      toggleMusic: () => set((state) => ({ isPlaying: !state.isPlaying }), undefined, 'toggleMusic'),
    }),
    { name: 'musicStore', store: 'musicStore' },
  ),
);
