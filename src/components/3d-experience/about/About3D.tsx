import Earth from '@/components/3d-experience/about/Earth';
import WaterSurface from '@/components/3d-experience/about/waterSurface/WaterSurface';
import FluidFX from '@/components/3d-experience/about/waterSurface/FluidFX';
import AnimatedDisappearGroup from '@/components/3d-experience/AnimatedDisappearGroup';
import useIsMobile from '@/hooks/use-is-mobile';

export default function About3D({ visible }: Readonly<{ visible: boolean }>) {
  const isMobile = useIsMobile();

  return (
    <AnimatedDisappearGroup visible={visible} hiddenY={-5}>
      <Earth key="earth" />
      <WaterSurface key="waterSurface">{!isMobile && <FluidFX key="fluidFx" visible={visible} />}</WaterSurface>
    </AnimatedDisappearGroup>
  );
}
