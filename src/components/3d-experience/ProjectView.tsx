import { Float, Image } from '@react-three/drei';
import { useProjectStore } from '@/stores/projectStore';

export default function ProjectView() {
  const { currentProject, currentScrollFactor } = useProjectStore();

  function handlePointerUp() {
    alert('You clicked on the project image!');
  }

  function interpolateY(x: number) {
    return -4 * Math.pow(x - 0.5, 2) + 1;
  }

  return (
    <group position={[0, 0, currentScrollFactor * 0.35]}>
      <Float rotationIntensity={0.15} floatIntensity={0.15} speed={0.5} floatingRange={[-0.05, 0.05]}>
        <Image
          url={currentProject.images[0]}
          position={[-0.7, 0, 3.8]}
          rotation={[0, 0.3, 0]}
          onClick={handlePointerUp}
          transparent
          opacity={interpolateY(currentScrollFactor)}
        >
          <planeGeometry args={[1, 0.625]} />
        </Image>
      </Float>

      <Float rotationIntensity={0.15} floatIntensity={0.15} speed={0.5} floatingRange={[-0.05, 0.05]}>
        <Image
          url={currentProject.images[1]}
          position={[0.7, 0, 3.8]}
          rotation={[0, -0.3, 0]}
          transparent
          opacity={interpolateY(currentScrollFactor)}
        >
          <planeGeometry args={[1, 0.625]} />
        </Image>
      </Float>
    </group>
  );
}
