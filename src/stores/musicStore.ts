import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type MusicState = {
  isPlaying: boolean;
};

type SetMusicState = {
  playMusic: () => void;
  stopMusic: () => void;
  toggleMusic: () => void;
};

export const useMusicStore = create(
  devtools(
    combine<MusicState, SetMusicState>({ isPlaying: false }, (set) => ({
      playMusic: () => set({ isPlaying: true }),
      stopMusic: () => set({ isPlaying: false }),
      toggleMusic: () => set((state) => ({ isPlaying: !state.isPlaying })),
    })),
    { anonymousActionType: "musicStore" },
  ),
);
