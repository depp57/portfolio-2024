import { Plane, useTexture } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { NightSkyMaterial } from '@shader/nightSky/material';
import { DaySkyMaterial } from '@shader/daySky/material';
import moonTextureJpg from '@static/moon.jpg';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import { ShaderMaterial, Vector2 } from 'three';
import SkyFluidFX from '@/components/3d-experience/SkyFluidFX';
import { useFluid } from '@funtech-inc/use-shader-fx';
import useIsMobile from '@/hooks/use-is-mobile';

extend({ NightSkyMaterial: NightSkyMaterial });
extend({ DaySkyMaterial: DaySkyMaterial });

export default function Sky() {
  const moonTexture = useTexture(moonTextureJpg.src);
  const { theme } = useTheme() as { theme: 'light' | 'dark' };
  const shaderRef = useRef<ShaderMaterial & { [key: string]: any }>(null!);

  const refPointer = useRef(new Vector2(0, 0));

  const handlePointerMove = (e: any) => {
    refPointer.current = e.uv.multiplyScalar(2).subScalar(1);
  };

  const { size, dpr } = useThree((state) => ({ size: state.size, dpr: state.viewport.dpr }));
  const [updateFluid, setFluid, { output }] = useFluid({
    size,
    dpr,
  });

  useFrame((_, delta) => {
    shaderRef.current.uniforms.uTime.value += delta;
  });

  const isMobile = useIsMobile();

  return (
    <Plane args={[8, 8]} position={[!isMobile ? 0 : -0.3, -1.2, 3]} onPointerMove={handlePointerMove}>
      {theme === 'dark' ? (
        <nightSkyMaterial ref={shaderRef} attach="material" uTexture={moonTexture} uFxTexture={output} />
      ) : (
        <daySkyMaterial ref={shaderRef} attach="material" uFxTexture={output} />
      )}

      {!isMobile && <SkyFluidFX refPointer={refPointer} updateFluid={updateFluid} setFluid={setFluid} />}
    </Plane>
  );
}
