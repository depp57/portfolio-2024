"use client";

import Box from "@/components/Box";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

type TestProps = {
  lang: string;
};

export default function Test({ lang }: TestProps) {
  return (
    <>
      <h1>Inside client: {lang}</h1>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <OrbitControls />
      </Canvas>
    </>
  );
}
