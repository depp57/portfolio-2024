import { Plane, useTexture } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { NightSkyMaterial } from '@shader/nightSky/material';
import { DaySkyMaterial } from '@shader/daySky/material';
import moonTextureJpg from '@static/moon.jpg';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import { ShaderMaterial, Vector2, Vector3 } from 'three';
import { useFluid, usePointer } from '@funtech-inc/use-shader-fx';

extend({ NightSkyMaterial: NightSkyMaterial });
extend({ DaySkyMaterial: DaySkyMaterial });

export default function Sky() {
  const moonTexture = useTexture(moonTextureJpg.src);
  const { theme } = useTheme() as { theme: 'light' | 'dark' };
  const shaderRef = useRef<ShaderMaterial & { [key: string]: any }>(null!);

  const { size, dpr } = useThree((state) => ({ size: state.size, dpr: state.viewport.dpr }));
  const [updateFluid, setFluid, { output }] = useFluid({
    size,
    dpr,
  });

  setFluid({
    densityDissipation: 0.98,
    velocityDissipation: 0.99,
    velocityAcceleration: 7.0,
    pressureDissipation: 0.9,
    pressureIterations: 1,
    splatRadius: 0.0003,
    curlStrength: 25.0,
    fluidColor: new Vector3(1.0, 1.0, 1.0),
  });

  const updatePointer = usePointer();
  const refPointer = useRef(new Vector2(0, 0));

  const handlePointerMove = (e: any) => {
    refPointer.current = e.uv.multiplyScalar(2).subScalar(1);
  };

  useFrame((state, delta) => {
    shaderRef.current.uniforms.uTime.value += delta;
    updateFluid(state, {
      pointerValues: updatePointer(refPointer.current),
    });
  });

  return (
    <Plane args={[8, 8]} position={[0, -1.2, 3]} onPointerMove={handlePointerMove}>
      {theme === 'dark' ? (
        <nightSkyMaterial ref={shaderRef} attach="material" uTexture={moonTexture} uFxTexture={output} />
      ) : (
        <daySkyMaterial ref={shaderRef} attach="material" uFxTexture={output} />
      )}
    </Plane>
  );
}
