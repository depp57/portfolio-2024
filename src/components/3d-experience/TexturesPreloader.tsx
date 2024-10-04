import { useTexture } from '@react-three/drei';
import earthDayTexture from '@static/earth/day.jpg';
import earthNightTexture from '@static/earth/night.jpg';
import earthSpecularCloudsTexture from '@static/earth/specularClouds.jpg';
import cloudTexture from '@static/cloud.png';
import moonTexture from '@static/moon.jpg';
import waterSurfaceNormal1 from '@static/waterSurface/Water_1_M_Normal.jpg';
import waterSurfaceNormal2 from '@static/waterSurface/Water_2_M_Normal.jpg';

export default function TexturesPreloader() {
  useTexture([
    earthDayTexture.src,
    earthNightTexture.src,
    earthSpecularCloudsTexture.src,
    cloudTexture.src,
    moonTexture.src,
    waterSurfaceNormal1.src,
    waterSurfaceNormal2.src,
  ]);

  return <></>;
}
