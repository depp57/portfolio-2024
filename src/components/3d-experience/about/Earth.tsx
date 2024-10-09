import { Sphere, useTexture } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { EarthMaterial } from '@shader/earth/material';
import { BackSide, SRGBColorSpace } from 'three';
import { EarthAtmosphereMaterial } from '@shader/earth/atmosphere/material';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import earthDayTextureJpg from '@static/earth/day.jpg';
import earthNightTextureJpg from '@static/earth/night.jpg';
import earthSpecularCloudsTextureJpg from '@static/earth/specularClouds.jpg';

extend({ EarthMaterial: EarthMaterial });
extend({ EarthAtmosphereMaterial: EarthAtmosphereMaterial });

function useMoveEarthToTopWhileScrolling(initialPositionY: number) {
  const { scrollYProgress } = useScroll({ offset: ['start', 'end 1.01'] }); // 1.01 to avoid strange behavior where the first value emitted is 1 (while no scroll has been done)

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
    <motion.group position={[-0.35, positionY, 3.7]} rotation-y={rotationY}>
      <Sphere args={[0.5, 32, 32]} rotation={[0, -0.1, -0.9]}>
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
