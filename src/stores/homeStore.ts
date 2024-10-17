import { create } from 'zustand';

type HomeState = {
  isIntro: boolean;
  endIntro: () => void;
};

export const useHomeStore = create<HomeState>()((set) => ({
  isIntro: true,
  endIntro: () => set(() => ({ isIntro: false })),
}));
