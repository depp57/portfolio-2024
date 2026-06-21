import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { SpringOptions, useSpring, useTransform } from 'framer-motion';

type MouseMoveControlsProps = {
  springConfig?: SpringOptions;
  lookAtRange?: number;
};

export default function MouseMoveControls({
  springConfig = { stiffness: 230, damping: 100, mass: 1 },
  lookAtRange = 0.35,
}: MouseMoveControlsProps) {
  const { camera, pointer } = useThree();

  const lookAtPoint = useRef(new Vector3(0, 0, 0));

  const x = useSpring(0, { ...springConfig });
  const y = useSpring(0, { ...springConfig });

  const xTransform = useTransform(x, [-1, 1], [lookAtRange, -lookAtRange]);
  const yTransform = useTransform(y, [-1, 1], [lookAtRange, -lookAtRange]);

  useFrame(() => {
    x.set(pointer.x);
    y.set(pointer.y);
    lookAtPoint.current.x = xTransform.get();
    lookAtPoint.current.y = yTransform.get();

    camera.position.set(-xTransform.get() * 0.25, -yTransform.get() * 0.25, camera.position.z);
    camera.lookAt(lookAtPoint.current);
  });

  useEffect(() => {
    return () => {
      camera.lookAt(0, 0, 0);
      camera.position.set(0, 0, 5);
    };
  });

  return null;
}
