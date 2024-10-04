import { ReactNode, useMemo, useRef } from 'react';
import { PlaneGeometry, Vector2 } from 'three';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { WaterMesh } from './WaterMesh';
import { WaterContext } from './WaterContext';
import { motion } from 'framer-motion-3d';
import waterSurfaceNormal1 from '@static/waterSurface/Water_1_M_Normal.jpg';
import waterSurfaceNormal2 from '@static/waterSurface/Water_2_M_Normal.jpg';

type WaterSurfaceProps = {
  children?: ReactNode;
  position?: [number, number, number];
  width?: number;
  length?: number;
  color?: number | string;
  scale?: number;
  flowDirection?: Vector2 | [number, number];
  flowSpeed?: number;
  dimensions?: number;
  reflectivity?: number;
  fxDistortionFactor?: number;
  fxDisplayColorAlpha?: number;
};

export default function WaterSurface({
  children,
  position = [0, -0.3, 4.05],
  width = 5,
  length = 1.2,
  color = '#fff',
  scale = 10,
  flowDirection = new Vector2(1.0, 0.5),
  flowSpeed = 0.02,
  dimensions = 1024,
  reflectivity = 1.2,
  fxDistortionFactor = 0.2,
  fxDisplayColorAlpha = 0.0,
}: Readonly<WaterSurfaceProps>) {
  const ref = useRef<any>();
  const refPointer = useRef(new Vector2(0, 0));

  const gl = useThree((state) => state.gl);
  const [waterNormals1, waterNormals2] = useTexture([waterSurfaceNormal1.src, waterSurfaceNormal2.src]);
  //waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping;
  const geom = useMemo(() => new PlaneGeometry(width, length), [length, width]);
  const config = useMemo(
    () => ({
      color: color,
      scale: scale,
      flowDirection: flowDirection as Vector2,
      flowSpeed: flowSpeed,
      textureWidth: dimensions,
      textureHeight: dimensions,
      normalMap0: waterNormals1,
      normalMap1: waterNormals2,
      reflectivity: reflectivity,
      encoding: (gl as any).encoding,
      fxDistortionFactor: fxDistortionFactor,
      fxDisplayColorAlpha: fxDisplayColorAlpha,
    }),
    [
      color,
      dimensions,
      flowDirection,
      flowSpeed,
      fxDisplayColorAlpha,
      fxDistortionFactor,
      gl,
      reflectivity,
      scale,
      waterNormals1,
      waterNormals2,
    ],
  );

  //const refPointer = useRef(new Vector2(0, 0));

  const waterObj = useMemo(() => new WaterMesh(geom, config), [geom, config]);

  const handlePointerMove = (e: any) => {
    refPointer.current = e.uv.multiplyScalar(2).subScalar(1);
  };

  return (
    <motion.group initial={{ y: -6 }} animate={{ y: 0 }} exit={{ y: -6 }} transition={{ duration: 1.3 }}>
      <WaterContext.Provider value={{ ref, refPointer }}>
        <primitive
          ref={ref}
          onPointerMove={handlePointerMove}
          object={waterObj}
          rotation-x={-Math.PI / 2}
          position={position}
        />

        {children}
      </WaterContext.Provider>
    </motion.group>
  );
}
