"use client";

import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/musicStore";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { useHomeStore } from "@/stores/homeStore";

export default function SoundSettings() {
  const playMusic = useMusicStore((state) => state.playMusic);
  const stopMusic = useMusicStore((state) => state.stopMusic);
  const hideOverlay = useHomeStore((state) => state.hideOverlay);

  function onClick(music: boolean) {
    hideOverlay();
    music ? playMusic() : stopMusic();
  }

  return (
    <>
      <div className="flex flex-col gap-3 items-center">
        <Button className="text-xl" size="lg" onClick={() => onClick(true)}>
          Enter with sound
          <ArrowTopRightIcon className="ml-2 h-6 w-6" />
        </Button>
        <div className="flex text-gray-500 items-center gap-4 w-8/12">
          <div className="h-px w-full bg-gray-500"></div>
          <span className="text-lg font-normal">or</span>
          <div className="h-px w-full bg-gray-500"></div>
        </div>
        <Button className="text-xl" size="lg" variant="ghost" onClick={() => onClick(false)}>
          Enter without sound
          <ArrowTopRightIcon className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </>
  );
}
