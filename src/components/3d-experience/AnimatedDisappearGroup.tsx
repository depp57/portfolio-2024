'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';
import { useTransitionDisappear } from '@/hooks/use-transition-disappear';

const DURATION = 1;

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

type AnimatedDisappearGroupProps = {
  visible: boolean;
  hiddenY: number;
  children: ReactNode;
};

export default function AnimatedDisappearGroup({ visible, hiddenY, children }: Readonly<AnimatedDisappearGroupProps>) {
  const groupRef = useRef<Group>(null!);
  const { render, startTransition, endTransition } = useTransitionDisappear(visible);

  const tween = useRef<{ from: number; to: number; elapsed: number } | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const to = visible ? 0 : hiddenY;

    if (!initialized.current) {
      initialized.current = true;
      groupRef.current.position.y = to;
      return;
    }

    const from = groupRef.current.position.y;
    if (from === to) return;

    tween.current = { from, to, elapsed: 0 };
    startTransition();
  }, [visible, hiddenY, startTransition]);

  useFrame((_, delta) => {
    const animation = tween.current;
    if (!animation) return;

    animation.elapsed += delta;
    const progress = Math.min(animation.elapsed / DURATION, 1);
    groupRef.current.position.y = animation.from + (animation.to - animation.from) * easeInOut(progress);

    if (progress >= 1) {
      tween.current = null;
      if (animation.to === hiddenY) endTransition();
    }
  });

  return (
    <group ref={groupRef} visible={render}>
      {children}
    </group>
  );
}
