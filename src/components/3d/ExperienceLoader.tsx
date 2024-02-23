import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";

const progressTexts = ["Connecting the cables ...", "Launching the servers ...", "Deploying the application ..."];

export default function ExperienceLoader({ onLoaded }: { onLoaded: () => void }) {
  const progress = useProgress((selector) => selector.progress);
  const progressTextRef = useRef<HTMLSpanElement>(null!);

  const progressInterpolation = Math.floor(progress / 20) * 20;

  const currentText = progressTexts[Math.floor((progressTexts.length * progressInterpolation) / 101)];

  useEffect(() => {
    if (progressInterpolation === 100) {
      onLoaded();
    }
  });

  return (
    <>
      <span className="text-6xl text-center w-full block" ref={progressTextRef}>
        {progressInterpolation}%
      </span>
      <br />
      <span className="text-2xl text-nowrap">{currentText}</span>
    </>
  );
}
