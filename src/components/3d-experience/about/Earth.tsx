import { Sphere, useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { EarthMaterial } from '@shader/earth/material';
import { BackSide, Group, SRGBColorSpace } from 'three';
import { EarthAtmosphereMaterial } from '@shader/earth/atmosphere/material';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import earthDayTextureJpg from '@static/3d/earth/day.jpg';
import earthNightTextureJpg from '@static/3d/earth/night.jpg';
import earthSpecularCloudsTextureJpg from '@static/3d/earth/specular_clouds.jpg';

extend({ EarthMaterial });
extend({ EarthAtmosphereMaterial });

function useMoveEarthToTopWhileScrolling(initialPositionY: number) {
  const { scrollYProgress } = useScroll({ offset: ['start', 'end 1.01'] }); // 1.01 to avoid strange behavior where the first value emitted is 1 (while no scroll has been done)

  return {
    positionY: useTransform(scrollYProgress, [0, 1], [initialPositionY, 5.3]),
    rotationY: useTransform(scrollYProgress, [0, 1], [Math.PI * 1.62, Math.PI * 3]),
  };
}

export default function Earth() {
  const [earthDayTexture, earthNightTexture, earthSpecularCloudsTexture] = useTexture(
    [earthDayTextureJpg.src, earthNightTextureJpg.src, earthSpecularCloudsTextureJpg.src],

    ([dayTexture, nightTexture, specularTexture]) => {
      dayTexture.anisotropy = nightTexture.anisotropy = specularTexture.anisotropy = 4;
      dayTexture.colorSpace = nightTexture.colorSpace = SRGBColorSpace;
    },
  );

  const INITIAL_POSITION_Y = 0.2;
  const { positionY, rotationY } = useMoveEarthToTopWhileScrolling(INITIAL_POSITION_Y);

  const groupRef = useRef<Group>(null!);
  useFrame(() => {
    groupRef.current.position.y = positionY.get();
    groupRef.current.rotation.y = rotationY.get();
  });

  return (
    <group ref={groupRef} position={[-0.35, INITIAL_POSITION_Y, 3.7]}>
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
    </group>
  );
}
