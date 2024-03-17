import { Cloud, Clouds, Stars } from '@react-three/drei';
import { useRef } from 'react';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';

export default function Test() {
  const cloudRef = useRef<Group>(null!);
  const clouds = 0; // TODO change to 10

  useFrame((_, delta) => {
    cloudRef.current.position.z += delta;

    if (cloudRef.current.position.z > 8) {
      cloudRef.current.position.z = 0;
    }
  });

  return (
    <>
      <Stars fade depth={100} />
      <Clouds ref={cloudRef}>
        {Array.from({ length: clouds }).map((_, i) => (
          <Cloud
            color="orange"
            key={i}
            position={[Math.random() * 15 - 7.5, Math.random() * 15 - 7.5, Math.random() * 15 - 7.5]}
          />
        ))}
      </Clouds>
    </>
  );
}
