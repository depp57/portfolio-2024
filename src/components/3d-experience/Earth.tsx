import { Sphere, useTexture } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { EarthMaterial } from '@shader/earth/material';
import { BackSide, SRGBColorSpace } from 'three';
import { EarthAtmosphereMaterial } from '@shader/earth/atmosphere/material';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { useRef } from 'react';

extend({ EarthMaterial: EarthMaterial });
extend({ EarthAtmosphereMaterial: EarthAtmosphereMaterial });

export default function Earth() {
  const textures = useTexture(['/earth/day.jpg', '/earth/night.jpg', '/earth/specularClouds.jpg']);
  textures[0].anisotropy = textures[1].anisotropy = textures[2].anisotropy = 4;
  textures[0].colorSpace = textures[1].colorSpace = SRGBColorSpace;

  const scrollContainer = document.getElementById('scroll-container');
  const ref = useRef(scrollContainer);

  const { scrollYProgress } = useScroll({ container: ref });

  const positionY = useTransform(scrollYProgress, [0, 1], [0, 5.3]);
  const rotationY = useTransform(scrollYProgress, [0, 1], [Math.PI * 1.62, Math.PI * 3]);

  return (
    <>
      <motion.group position={[-0.35, positionY, 3.7]} rotation={[0.4, rotationY, -0.2]}>
        <Sphere args={[0.55, 64, 64]}>
          <earthMaterial
            attach="material"
            uDayTexture={textures[0]}
            uNightTexture={textures[1]}
            uSpecularCloudsTexture={textures[2]}
          />
        </Sphere>

        <Sphere args={[0.57, 64, 64]}>
          <earthAtmosphereMaterial attach="material" transparent={true} side={BackSide} />
        </Sphere>
      </motion.group>
    </>
  );
}
