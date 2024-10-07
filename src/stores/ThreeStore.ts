import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ThreeStore = {
  currentScrollProgress: number;
  scrollPagesCount: number;
};

export const useThreeStore = create<ThreeStore>()(
  devtools(
    (_) => ({
      currentScrollProgress: 0,
      scrollPagesCount: 3,
    }),
    { name: 'threeStore', store: 'threeStore' },
  ),
);
