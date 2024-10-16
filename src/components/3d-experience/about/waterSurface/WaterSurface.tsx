import { ReactNode, useMemo, useRef } from 'react';
import { PlaneGeometry, Vector2 } from 'three';
import { useTexture } from '@react-three/drei';
import { WaterMesh } from './WaterMesh';
import { WaterContext } from './WaterContext';
import waterSurfaceNormal1 from '@static/3d/waterSurface/water_1_normal.jpg';
import waterSurfaceNormal2 from '@static/3d/waterSurface/water_2_normal.jpg';

export default function WaterSurface({ children }: Readonly<{ children: ReactNode }>) {
  const ref = useRef<any>();
  const refPointer = useRef(new Vector2(0, 0));

  const [waterNormals1, waterNormals2] = useTexture([waterSurfaceNormal1.src, waterSurfaceNormal2.src]);

  const PLANE_WIDTH = 5;
  const PLANE_LENGTH = 1.2;

  const geom = useMemo(() => new PlaneGeometry(PLANE_WIDTH, PLANE_LENGTH), [PLANE_LENGTH, PLANE_WIDTH]);
  const config = useMemo(
    () => ({
      color: '#fff',
      scale: 10,
      flowDirection: new Vector2(1.0, 0.5),
      flowSpeed: 0.02,
      textureWidth: 1024,
      textureHeight: 1024,
      normalMap0: waterNormals1,
      normalMap1: waterNormals2,
      reflectivity: 1.2,
      fxDistortionFactor: 0.2,
      fxDisplayColorAlpha: 0.0,
    }),
    [waterNormals1, waterNormals2],
  );

  const waterObj = useMemo(() => new WaterMesh(geom, config), [geom, config]);

  const handlePointerMove = (e: any) => {
    refPointer.current = e.uv.multiplyScalar(2).subScalar(1);
  };

  return (
    <WaterContext.Provider value={{ ref, refPointer }}>
      <primitive
        ref={ref}
        onPointerMove={handlePointerMove}
        object={waterObj}
        rotation-x={-Math.PI / 2}
        position={[0, -0.3, 4.05]}
      />

      {children}
    </WaterContext.Provider>
  );
}
