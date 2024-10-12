import { shaderMaterial } from '@react-three/drei';
import { Color, ShaderMaterial } from 'three';
import { Object3DNode } from '@react-three/fiber';
import auroraVertexShader from '@shader/aurora/vertex.glsl';
import auroraFragmentShader from '@shader/aurora/fragment.glsl';

export const AuroraMaterial = shaderMaterial(
  {
    uColorA: new Color('#2e90ff'),
    uColorB: new Color('#14f86f'),
    uColorMix: 1,
    uSpeed: 0.4,
    uNoiseScale: 1.8,
    uVerticesRandomFactor: [0, 0.03, 0],
    uOpacity: 0.07,
    uTime: 0,
  },
  auroraVertexShader,
  auroraFragmentShader,
);

// Typescript types for the custom shader material
declare module '@react-three/fiber' {
  interface ThreeElements {
    auroraMaterial: Object3DNode<
      ShaderMaterial & { [key: string]: any },
      typeof ShaderMaterial & { [key: string]: any }
    >;
  }
}
