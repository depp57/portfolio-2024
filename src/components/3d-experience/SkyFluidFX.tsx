import { RootState, useFrame } from '@react-three/fiber';
import { FluidParams, usePointer } from '@funtech-inc/use-shader-fx';
import { Vector2, Vector3 } from 'three';
import { MutableRefObject } from 'react';

export default function SkyFluidFX({
  refPointer,
  updateFluid,
  setFluid,
}: Readonly<{
  refPointer: MutableRefObject<Vector2>;
  updateFluid: (state: RootState, fluidParams: FluidParams) => void;
  setFluid: (fluidsParams: FluidParams) => void;
}>) {
  const updatePointer = usePointer();

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

  useFrame((state) => {
    updateFluid(state, {
      pointerValues: updatePointer(refPointer.current),
    });
  });

  return null;
}
