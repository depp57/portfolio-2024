import create from "zustand";
import { combine, devtools } from "zustand/middleware";

type HomeState = {
  isOverlayDisplayed: boolean;
};

type SetHomeState = {
  hideOverlay: () => void;
};

export const useHomeStore = create(
  devtools(
    combine<HomeState, SetHomeState>({ isOverlayDisplayed: true }, (set) => ({
      hideOverlay: () => set({ isOverlayDisplayed: false }),
    })),
    { anonymousActionType: "homeStore" },
  ),
);
