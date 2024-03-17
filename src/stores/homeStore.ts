import create from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type IntroState = {
  isIntro: boolean;
};

type setIntroState = {
  endIntro: () => void;
};

export const useIntroStore = create(
  devtools(
    combine<IntroState, setIntroState>({ isIntro: true }, (set) => ({
      endIntro: () => set({ isIntro: false }),
    })),
    { anonymousActionType: 'introStore' },
  ),
);
