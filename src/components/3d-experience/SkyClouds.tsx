import { Cloud, Clouds } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MeshBasicMaterial } from 'three';
import cloudTexture from '@static/cloud.png';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion-3d';

export default function SkyClouds() {
  const { theme } = useTheme() as { theme: 'light' | 'dark' };

  const cloud1 = useRef<Group>(null!);
  const cloud2 = useRef<Group>(null!);

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

  const CLOUDS_SPEED = 0.25;
  const CLOUDS_FINAL_POSITION_Z = 5;
  const CLOUDS_START_POSITION_Z = 2;

  useFrame((_, delta) => {
    cloud1.current.position.z += delta * CLOUDS_SPEED;
    cloud2.current.position.z += delta * CLOUDS_SPEED;

    if (cloud1.current.position.z >= CLOUDS_FINAL_POSITION_Z) {
      cloud1.current.position.z = CLOUDS_START_POSITION_Z;
    }

    if (cloud2.current.position.z >= CLOUDS_FINAL_POSITION_Z) {
      cloud2.current.position.z = CLOUDS_START_POSITION_Z;
    }
  });

  return (
    <motion.group initial={{ y: 6 }} animate={{ y: 0 }} exit={{ y: 6 }} transition={{ duration: 1.3 }}>
      <Clouds material={MeshBasicMaterial} texture={cloudTexture.src}>
        <Cloud
          key={1}
          ref={cloud1}
          position={[0, -1.7, 2]}
          seed={2}
          speed={0.1}
          scale={0.5}
          color={cloudColors.mid[theme]}
          fade={2.6}
        />
        <Cloud
          key={2}
          ref={cloud2}
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
