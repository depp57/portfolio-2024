"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Helmet from "@/components/3d/Helmet";

export default function Experience() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Helmet />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
