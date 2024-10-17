import { create } from 'zustand';

type ThreeStore = {
  currentScrollProgress: number;
  scrollPagesCount: number;
};

export const useThreeStore = create<ThreeStore>()((_) => ({
  currentScrollProgress: 0,
  scrollPagesCount: 3,
}));
