import { Sphere, useTexture } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { EarthMaterial } from '@shader/earth/material';
import { BackSide, SRGBColorSpace } from 'three';
import { EarthAtmosphereMaterial } from '@shader/earth/atmosphere/material';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { useRef } from 'react';
import earthDayTextureJpg from '@static/earth/day.jpg';
import earthNightTextureJpg from '@static/earth/night.jpg';
import earthSpecularCloudsTextureJpg from '@static/earth/specularClouds.jpg';

extend({ EarthMaterial: EarthMaterial });
extend({ EarthAtmosphereMaterial: EarthAtmosphereMaterial });

function useMoveEarthToTopWhileScrolling(initialPositionY: number) {
  const scrollContainer = document.getElementById('scroll-container');
  const ref = useRef(scrollContainer);
  const { scrollYProgress } = useScroll({ container: ref });

  return {
    positionY: useTransform(scrollYProgress, [0, 1], [initialPositionY, 5.3]),
    rotationY: useTransform(scrollYProgress, [0, 1], [Math.PI * 1.62, Math.PI * 3]),
  };
}

export default function Earth() {
  const [earthDayTexture, earthNightTexture, earthSpecularCloudsTexture] = useTexture([
    earthDayTextureJpg.src,
    earthNightTextureJpg.src,
    earthSpecularCloudsTextureJpg.src,
  ]);
  earthDayTexture.anisotropy = earthNightTexture.anisotropy = earthSpecularCloudsTexture.anisotropy = 4;
  earthDayTexture.colorSpace = earthNightTexture.colorSpace = SRGBColorSpace;

  const INITIAL_POSITION_Y = 0.2;
  const { positionY, rotationY } = useMoveEarthToTopWhileScrolling(INITIAL_POSITION_Y);

  return (
    <motion.group
      initial={{ y: -6 }}
      animate={{ y: INITIAL_POSITION_Y }}
      exit={{ y: -6 }}
      transition={{ duration: 1.3 }}
      position={[-0.35, positionY, 3.7]}
      rotation={[0.4, rotationY, -0.2]}
    >
      <Sphere args={[0.5, 32, 32]}>
        <earthMaterial
          attach="material"
          uDayTexture={earthDayTexture}
          uNightTexture={earthNightTexture}
          uSpecularCloudsTexture={earthSpecularCloudsTexture}
        />
      </Sphere>

      <Sphere args={[0.52, 32, 32]}>
        <earthAtmosphereMaterial attach="material" transparent={true} side={BackSide} />
      </Sphere>
    </motion.group>
  );
}
