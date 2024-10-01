import { Plane, useTexture } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { NightSkyMaterial } from '@shader/nightSky/material';
import { DaySkyMaterial } from '@shader/daySky/material';
import moonTextureJpg from '@static/moon.jpg';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import { ShaderMaterial } from 'three';

extend({ NightSkyMaterial: NightSkyMaterial });
extend({ DaySkyMaterial: DaySkyMaterial });

export default function Sky() {
  const moonTexture = useTexture(moonTextureJpg.src);
  const { theme } = useTheme() as { theme: 'light' | 'dark' };
  const shaderRef = useRef<ShaderMaterial & { [key: string]: any }>(null!);

  useFrame((_, delta) => {
    shaderRef.current.uniforms.uTime.value += delta;
  });

  return (
    <Plane args={[8, 8]} position={[0, -1.2, 3]}>
      {theme === 'dark' ? (
        <nightSkyMaterial ref={shaderRef} attach="material" uTexture={moonTexture} />
      ) : (
        <daySkyMaterial ref={shaderRef} attach="material" />
      )}
    </Plane>
  );
}
