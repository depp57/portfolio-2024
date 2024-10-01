import { Cloud, Clouds } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MeshBasicMaterial } from 'three';
import cloudTexture from '@static/cloud.png';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion-3d';

export default function SkyClouds() {
  const ref = useRef<Group>(null!);
  const ref2 = useRef<Group>(null!);
  const { theme } = useTheme() as { theme: 'light' | 'dark' };
  const speed = 0.1;
  const endZ = 5;
  const startZ = 2;

  // const { speed, startZ, endZ, color, x, r3, m3, g3, t3, y, x1, f2, y1, z1, x2, y2, z2, s2 } = useControls({
  //   speed: { value: 0.1, min: 0, max: 5 },
  //   startZ: { value: 2, min: -5, max: 10 },
  //   endZ: { value: 5, min: 0, max: 10 },
  //   color: '#212637',
  //   x: { value: 8, min: 0, max: 25, step: 0.25 },
  //   y: { value: 8, min: 0, max: 25, step: 0.25 },
  //   x1: { value: 0, min: -10, max: 10, step: 0.1 },
  //   y1: { value: -1.2, min: -10, max: 10, step: 0.1 },
  //   z1: { value: 3, min: -10, max: 10, step: 0.1 },
  //
  //   x2: { value: 0, min: -10, max: 10, step: 0.1 },
  //   y2: { value: -1.7, min: -10, max: 10, step: 0.1 },
  //   z2: { value: 2, min: -10, max: 10, step: 0.1 },
  //
  //   s2: { value: 0.5, min: 0, max: 1, step: 0.01 },
  //   f2: { value: 2.6, min: 0, max: 20, step: 0.1 },
  //
  //   r3: { value: 0.07, min: 0, max: 1, step: 0.01 },
  //   t3: { value: 0.1, min: 0, max: 1, step: 0.01 },
  //   m3: { value: 0.005, min: 0, max: 1, step: 0.01 },
  //   g3: { value: 0.8, min: 0, max: 1, step: 0.01 },
  // });

  // const materialProps: object = useControls('Sky', makeControls(nightSkyVertexShader, nightSkyFragmentShader))!;

  useFrame((_, delta) => {
    ref.current.position.z += delta * speed;
    ref2.current.position.z += delta * speed;

    if (ref.current.position.z >= endZ) {
      ref.current.position.z = startZ;
    }

    if (ref2.current.position.z >= endZ) {
      ref2.current.position.z = startZ;
    }
  });

  const cloudColors = {
    shadow: {
      dark: '#2d2e32',
      light: '#b2c5c5',
    },
    mid: {
      dark: '#3a3f4a',
      light: '#d1ecee',
    },
    highlight: {
      dark: '#394650',
      light: '#ddf5f1',
    },
  };

  return (
    <motion.group initial={{ y: 6 }} animate={{ y: 0 }} exit={{ y: 6 }} transition={{ duration: 1.3 }}>
      <Clouds material={MeshBasicMaterial} texture={cloudTexture.src}>
        <Cloud
          key={1}
          ref={ref}
          position={[0, -1.7, 2]}
          seed={2}
          speed={0.1}
          scale={0.5}
          color={cloudColors.mid[theme]}
          fade={2.6}
        />
        <Cloud
          key={2}
          ref={ref2}
          seed={5}
          speed={0.1}
          scale={0.5}
          position={[0, -1.7, 2 + 1.5]}
          color={cloudColors.mid[theme]}
          fade={2.6}
        />
      </Clouds>
    </motion.group>
  );
}
