"use client";

import { useGLTF } from "@react-three/drei";

export default function Helmet() {
  const { nodes } = useGLTF("https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf");

  return <primitive object={nodes["node_damagedHelmet_-6514"]} />;
}
