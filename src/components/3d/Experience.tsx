"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ExperienceLoader from "@/components/3d/ExperienceLoader";
import { OrbitControls } from "@react-three/drei";
import Helmet from "@/components/3d/Helmet";

export default function Experience() {
  return (
    <Canvas>
      <Suspense fallback={<ExperienceLoader />}>
        <Helmet />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
