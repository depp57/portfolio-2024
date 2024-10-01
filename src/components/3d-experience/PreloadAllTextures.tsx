import { useTexture } from '@react-three/drei';
import earthDayTexture from '@static/earth/day.jpg';
import earthNightTexture from '@static/earth/night.jpg';
import earthSpecularCloudsTexture from '@static/earth/specularClouds.jpg';
import cloudTexture from '@static/cloud.png';
import moonTexture from '@static/moon.jpg';

export default function PreloadAllTextures() {
  useTexture([
    earthDayTexture.src,
    earthNightTexture.src,
    earthSpecularCloudsTexture.src,
    cloudTexture.src,
    moonTexture.src,
  ]);

  return <></>;
}
