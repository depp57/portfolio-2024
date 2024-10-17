import { create } from 'zustand';

type MusicState = {
  isPlaying: boolean;
  playMusic: () => void;
  stopMusic: () => void;
  toggleMusic: () => void;
};

export const useMusicStore = create<MusicState>()((set) => ({
  isPlaying: false,
  playMusic: () => set(() => ({ isPlaying: true })),
  stopMusic: () => set(() => ({ isPlaying: false })),
  toggleMusic: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
