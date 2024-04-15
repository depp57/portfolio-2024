import { shaderMaterial } from '@react-three/drei';
import { Color, ShaderMaterial, Vector3 } from 'three';
import { Object3DNode } from '@react-three/fiber';
import earthAtmosphereVertexShader from '@shader/earth/atmosphere/vertex.glsl';
import earthAtmosphereFragmentShader from '@shader/earth/atmosphere/fragment.glsl';

export const EarthAtmosphereMaterial = shaderMaterial(
  {
    uSunDirection: new Vector3(0.674, 0.736, 0.061),
    uAtmosphereDayColor: new Color(0x00aaff),
    uAtmosphereNightColor: new Color(0xff6600),
  },
  earthAtmosphereVertexShader,
  earthAtmosphereFragmentShader,
);

// Typescript types for the custom shader material
declare module '@react-three/fiber' {
  interface ThreeElements {
    earthAtmosphereMaterial: Object3DNode<
      ShaderMaterial & { [key: string]: any },
      typeof ShaderMaterial & { [key: string]: any }
    >;
  }
}
