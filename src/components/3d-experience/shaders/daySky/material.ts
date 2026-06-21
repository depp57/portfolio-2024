import { shaderMaterial } from '@react-three/drei';
import { ShaderMaterial, Vector3 } from 'three';
import { ThreeElement } from '@react-three/fiber';
import daySkyVertexShader from '@shader/daySky/vertex.glsl';
import daySkyFragmentShader from '@shader/daySky/fragment.glsl';

export const DaySkyMaterial = shaderMaterial(
  {
    uTime: 0,
    sunPosition: new Vector3(0.8, 0.75, -2),
    rayleigh: 0.09,
    turbidity: 0.09,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.8,
    up: new Vector3(0, 1, 0),
    uFxTexture: null,
  },
  daySkyVertexShader,
  daySkyFragmentShader,
);

// Typescript types for the custom shader material
declare module '@react-three/fiber' {
  interface ThreeElements {
    daySkyMaterial: ThreeElement<typeof ShaderMaterial> & { [key: string]: any };
  }
}
