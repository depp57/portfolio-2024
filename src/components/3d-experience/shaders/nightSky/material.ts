import { shaderMaterial } from '@react-three/drei';
import { ThreeElement } from '@react-three/fiber';
import nightSkyVertexShader from '@shader/nightSky/vertex.glsl';
import nightSkyFragmentShader from '@shader/nightSky/fragment.glsl';
import { ShaderMaterial } from 'three';

export const NightSkyMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uFxTexture: null,
    uGlowBrightness: 0.9,
  },
  nightSkyVertexShader,
  nightSkyFragmentShader,
);

// Typescript types for the custom shader material
declare module '@react-three/fiber' {
  interface ThreeElements {
    nightSkyMaterial: ThreeElement<typeof ShaderMaterial> & { [key: string]: any };
  }
}
