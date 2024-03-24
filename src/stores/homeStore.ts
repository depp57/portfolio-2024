import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type HomeState = {
  isIntro: boolean;
};

type SetHomeState = {
  endIntro: () => void;
};

export const useHomeStore = create(
  devtools(
    combine<HomeState, SetHomeState>({ isIntro: true }, (set) => ({
      endIntro: () => set({ isIntro: false }),
    })),
    { name: 'homeStore', store: 'homeStore' },
  ),
);
