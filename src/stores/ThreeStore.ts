import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { MutableRefObject } from 'react';

type ThreeStore = {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
};

export const useThreeStore = create<ThreeStore>()(
  devtools(
    (_) => ({
      canvasRef: null!,
    }),
    { name: 'threeStore', store: 'threeStore' },
  ),
);
