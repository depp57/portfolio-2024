import { Float, Image } from '@react-three/drei';
import { Project } from '@/components/pages/projects/ProjectPreview';
import { motion } from 'framer-motion-3d';
import { MotionValue, useTransform } from 'framer-motion';
import { DoubleSide, Mesh } from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useIsMobile from '@/hooks/use-is-mobile';

export default function ProjectView({
  index,
  project,
  positionReferenceZ,
}: Readonly<{ index: number; project: Project; positionReferenceZ: MotionValue<number> }>) {
  const OFFSET_Z = 1.9;
  const positionZ = useTransform(() => positionReferenceZ.get() - index * OFFSET_Z);

  const adjustedPositionZ = useTransform(positionZ, (value) => value + 0.25);
  const adjustedPositionZ2 = useTransform(positionZ, (value) => value - 0.25);
  const opacity1 = useTransform(adjustedPositionZ, [3, 3.6, 4.2, 4.4], [0, 1, 1, 0]);
  const opacity2 = useTransform(positionZ, [3, 3.6, 4.2, 4.4], [0, 1, 1, 0]);
  const opacity3 = useTransform(adjustedPositionZ2, [3, 3.6, 4.2, 4.4], [0, 1, 1, 0]);

  const imageRef1 = useRef<Mesh>(null!);
  const imageRef2 = useRef<Mesh>(null!);
  const imageRef3 = useRef<Mesh>(null!);

  const isMobile = useIsMobile();

  useFrame(() => {
    // @ts-ignore
    imageRef1.current.material.uniforms.opacity.value = opacity1.get();
    // @ts-ignore
    imageRef2.current.material.uniforms.opacity.value = opacity2.get();

    if (project.images.length === 3) {
      // @ts-ignore
      imageRef3.current.material.uniforms.opacity.value = opacity3.get();
    }
  });

  const planeSize: [number, number] = !isMobile ? [0.96, 0.54] : [0.64, 0.36];
  const planeDistance = !isMobile ? 0.6 : 0.35;

  return (
    <motion.group position-z={positionZ}>
      <Float rotationIntensity={0.4} floatIntensity={0.4} speed={0.75} position={[-planeDistance, 0, 0.25]}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image ref={imageRef1} url={project?.images[0]} transparent>
          <planeGeometry args={planeSize} />
        </Image>
      </Float>

      <Float rotationIntensity={0.4} floatIntensity={0.4} speed={0.75} position={[planeDistance, 0, 0]}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image ref={imageRef2} url={project?.images[1]} transparent side={DoubleSide}>
          <planeGeometry args={planeSize} />
        </Image>
      </Float>

      {project.images.length === 3 && (
        <Float rotationIntensity={0.4} floatIntensity={0.4} speed={0.75} position={[-planeDistance, 0, -0.25]}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image ref={imageRef3} url={project?.images[2]} transparent>
            <planeGeometry args={planeSize} />
          </Image>
        </Float>
      )}
    </motion.group>
  );
}
