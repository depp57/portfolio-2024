import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type HomeState = {
  isIntro: boolean;
  endIntro: () => void;
};

export const useHomeStore = create<HomeState>()(
  devtools(
    (set) => ({
      isIntro: true,
      endIntro: () => set(() => ({ isIntro: false }), undefined, 'endIntro'),
    }),
    { name: 'homeStore', store: 'homeStore' },
  ),
);
