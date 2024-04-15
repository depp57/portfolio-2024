import { shaderMaterial } from '@react-three/drei';
import { Color, ShaderMaterial, Vector3 } from 'three';
import { Object3DNode } from '@react-three/fiber';
import earthVertexShader from '@shader/earth/vertex.glsl';
import earthFragmentShader from '@shader/earth/fragment.glsl';

export const EarthMaterial = shaderMaterial(
  {
    uDayTexture: null,
    uNightTexture: null,
    uSpecularCloudsTexture: null,
    uSunDirection: new Vector3(0.674, 0.736, 0.061),
    uAtmosphereDayColor: new Color(0x00aaff),
    uAtmosphereNightColor: new Color(0xff6600),
  },
  earthVertexShader,
  earthFragmentShader,
);

// Typescript types for the custom shader material
declare module '@react-three/fiber' {
  interface ThreeElements {
    earthMaterial: Object3DNode<
      ShaderMaterial & { [key: string]: any },
      typeof ShaderMaterial & { [key: string]: any }
    >;
  }
}
