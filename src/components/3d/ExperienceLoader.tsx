"use client";

import { Html, useProgress } from "@react-three/drei";
import { useRef } from "react";

const progressTexts = ["Connecting the cables ...", "Launching the servers ...", "Deploying the application ..."];

export default function ExperienceLoader() {
  const progress = useProgress((selector) => selector.progress);
  const progressTextRef = useRef<HTMLSpanElement>(null!);

  const progressInterpolation = Math.floor(progress / 20) * 20;

  const currentText = progressTexts[Math.floor((progressTexts.length * progressInterpolation) / 101)];

  return (
    <Html center className="flex flex-col items-center gap-5">
      <span className="text-8xl" ref={progressTextRef}>
        {progressInterpolation}%
      </span>
      <span className="text-2xl text-nowrap">{currentText}</span>
    </Html>
  );
}
