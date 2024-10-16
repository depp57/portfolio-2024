import { useBlending, useFluid, usePointer } from '@funtech-inc/use-shader-fx';
import { useFrame, useThree } from '@react-three/fiber';
import { useContext } from 'react';
import { Vector2, Vector3 } from 'three';
import { WaterContext } from './WaterContext';

const fluidColorFn = (velocity: Vector2) => {
  const rCol = 0.005;
  const gCol = Math.max(0.1, Math.abs(velocity.x) * 90);
  const bCol = Math.max(0.3, Math.abs(velocity.y) * 100);
  return new Vector3(rCol * 8.0, gCol * 8.0, bCol * 8.0);
};

export type FXFluidProps = {
  densityDissipation?: number;
  velocityDissipation?: number;
  velocityAcceleration?: number;
  pressureDissipation?: number;
  splatRadius?: number;
  curlStrength?: number;
  pressureIterations?: number;
  fluidColor?: (velocity: Vector2) => Vector3;
  visible: boolean;
};

export default function FluidFX({
  densityDissipation = 0.977,
  velocityDissipation = 0.99,
  velocityAcceleration = 20.0,
  pressureDissipation = 0.5,
  splatRadius = 0.0002,
  curlStrength = 7.0,
  pressureIterations = 2,
  fluidColor = fluidColorFn,
  visible,
}: FXFluidProps) {
  const { ref: materialRef, refPointer } = useContext(WaterContext);

  const { size, dpr } = useThree((state) => {
    return { size: state.size, dpr: state.viewport.dpr };
  });

  const [updateFluid, setFluid] = useFluid({
    size,
    dpr,
  });
  const [updateBlending] = useBlending({ size, dpr });

  setFluid({
    densityDissipation: densityDissipation,
    velocityDissipation: velocityDissipation,
    velocityAcceleration: velocityAcceleration,
    pressureDissipation: pressureDissipation,
    splatRadius: splatRadius,
    curlStrength: curlStrength,
    pressureIterations: pressureIterations,
    fluidColor: fluidColor,
  });

  const updatePointer = usePointer();

  useFrame((props) => {
    if (!visible) return;

    const fluid = updateFluid(props, {
      pointerValues: updatePointer(refPointer.current),
    });
    materialRef.current!.material.uniforms.u_fx.value = updateBlending(props, {
      //texture: bgTexture,
      map: fluid,
      alphaMap: false,
    });
  });

  return null;
}
