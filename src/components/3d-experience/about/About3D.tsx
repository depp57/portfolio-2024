import Earth from '@/components/3d-experience/about/Earth';
import WaterSurface from '@/components/3d-experience/about/waterSurface/WaterSurface';
import FluidFX from '@/components/3d-experience/about/waterSurface/FluidFX';
import { motion } from 'framer-motion-3d';
import { useTransitionDisappear } from '@/hooks/use-transition-disappear';
import useIsMobile from '@/hooks/use-is-mobile';

export default function About3D({ visible }: Readonly<{ visible: boolean }>) {
  const { render, startTransition, endTransition } = useTransitionDisappear(visible);
  const isMobile = useIsMobile();

  return (
    <motion.group
      visible={render}
      animate={{ y: visible ? 0 : -5 }}
      transition={{ duration: 1 }}
      onAnimationStart={() => {
        startTransition();
      }}
      onAnimationComplete={(definition: { y: number }) => {
        if (definition.y === -5) {
          endTransition();
        }
      }}
    >
      <Earth key="earth" />
      <WaterSurface key="waterSurface">{!isMobile && <FluidFX key="fluidFx" visible={visible} />}</WaterSurface>
    </motion.group>
  );
}
