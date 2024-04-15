import { shaderMaterial } from '@react-three/drei';
import { ShaderMaterial, Vector3 } from 'three';
import { Object3DNode } from '@react-three/fiber';
import daySkyVertexShader from '@shader/daySky/vertex.glsl';
import daySkyFragmentShader from '@shader/daySky/fragment.glsl';

export const DaySkyMaterial = shaderMaterial(
  {
    uTime: 0,
    sunPosition: new Vector3(1, 1, -2),
    rayleigh: 0.07,
    turbidity: 0.1,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    up: new Vector3(0, 1, 0),
  },
  daySkyVertexShader,
  daySkyFragmentShader,
);

// Typescript types for the custom shader material
declare module '@react-three/fiber' {
  interface ThreeElements {
    daySkyMaterial: Object3DNode<
      ShaderMaterial & { [key: string]: any },
      typeof ShaderMaterial & { [key: string]: any }
    >;
  }
}
