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

  const offsetPosZ1 = useTransform(positionZ, (value) => value - 0.25);
  const offsetPosZ2 = useTransform(positionZ, (value) => value - 0.5);

  const imageOpacities = [
    useTransform(positionZ, [3, 3.6, 4.25, 4.5], [0, 1, 1, 0]),
    useTransform(offsetPosZ1, [3, 3.6, 4.25, 4.5], [0, 1, 1, 0]),
    useTransform(offsetPosZ2, [3, 3.6, 4.25, 4.5], [0, 1, 1, 0]),
  ];

  const imageRefs = useRef<Mesh[]>([]);

  const isMobile = useIsMobile();

  useFrame(() => {
    imageRefs.current.forEach((imageRef, i) => {
      // @ts-ignore
      imageRef.material.uniforms.opacity.value = imageOpacities[i].get();
    });
  });

  const planeSize: [number, number] = !isMobile ? [0.96, 0.54] : [0.64, 0.36];
  const planeDistance = !isMobile ? 0.6 : 0.35;

  return (
    <motion.group position-z={positionZ}>
      <Float
        rotationIntensity={0.4}
        floatIntensity={0.4}
        speed={0.75}
        position={[project.images.length > 1 ? -planeDistance : 0, 0, 0]}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image ref={(el) => (imageRefs.current[0] = el!)} url={project?.images[0]} transparent>
          <planeGeometry args={planeSize} />
        </Image>
      </Float>

      {project.images.length > 1 && (
        <Float rotationIntensity={0.4} floatIntensity={0.4} speed={0.75} position={[planeDistance, 0, -0.25]}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image ref={(el) => (imageRefs.current[1] = el!)} url={project?.images[1]} transparent side={DoubleSide}>
            <planeGeometry args={planeSize} />
          </Image>
        </Float>
      )}

      {project.images.length > 2 && (
        <Float rotationIntensity={0.4} floatIntensity={0.4} speed={0.75} position={[-planeDistance, 0, -0.5]}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image ref={(el) => (imageRefs.current[2] = el!)} url={project?.images[2]} transparent>
            <planeGeometry args={planeSize} />
          </Image>
        </Float>
      )}
    </motion.group>
  );
}
