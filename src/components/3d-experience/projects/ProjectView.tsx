import { Float, Image } from '@react-three/drei';
import { Project } from '@/components/pages/projects/ProjectPreview';
import projectImage1 from '@static/projects/1.jpg';

export default function ProjectView({ project, visible }: Readonly<{ project: Project; visible: boolean }>) {
  function handlePointerUp() {
    if (!visible) return;
    alert('You clicked on the project image!');
  }

  return (
    <group visible={visible}>
      <Float rotationIntensity={0.15} floatIntensity={0.15} speed={0.5} floatingRange={[-0.05, 0.05]}>
        <Image
          url={project?.images[0] ?? projectImage1.src}
          position={[-0.7, 0, 3.8]}
          rotation={[0, 0.3, 0]}
          onClick={handlePointerUp}
        >
          <planeGeometry args={[1, 0.625]} />
        </Image>
      </Float>

      <Float rotationIntensity={0.15} floatIntensity={0.15} speed={0.5} floatingRange={[-0.05, 0.05]}>
        <Image url={project?.images[1] ?? projectImage1.src} position={[0.7, 0, 3.8]} rotation={[0, -0.3, 0]}>
          <planeGeometry args={[1, 0.625]} />
        </Image>
      </Float>
    </group>
  );
}
