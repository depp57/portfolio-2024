'use client';

import { useEffect, useRef } from 'react';
import Matter from '@depp57/matter-js';
import { motion } from 'framer-motion';
import { Skill } from '@/components/pages/about/skills/Skill';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/pages/about/SectionTitle';

function createWalls(containerElement: HTMLDivElement) {
  const canvasWidth = containerElement.getBoundingClientRect().width;
  const canvasHeight = containerElement.getBoundingClientRect().height;
  const THICKNESS = 200;

  const bottomWall = Matter.Bodies.rectangle(canvasWidth / 2, canvasHeight + THICKNESS / 2, canvasWidth, THICKNESS, {
    isStatic: true,
  });

  const leftWall = Matter.Bodies.rectangle(-THICKNESS / 2, canvasHeight / 2, THICKNESS, canvasHeight, {
    isStatic: true,
  });

  const rightWall = Matter.Bodies.rectangle(canvasWidth + THICKNESS / 2, canvasHeight / 2, THICKNESS, canvasHeight, {
    isStatic: true,
  });

  const topWall = Matter.Bodies.rectangle(canvasWidth / 2, -THICKNESS / 2, canvasWidth, THICKNESS, {
    isStatic: true,
  });

  const resizeWalls = () => {
    const newWidth = containerElement.getBoundingClientRect().width;
    const newHeight = containerElement.getBoundingClientRect().height;

    Matter.Body.setPosition(bottomWall, { x: newWidth / 2, y: newHeight + THICKNESS / 2 });
    Matter.Body.setPosition(leftWall, { x: -THICKNESS / 2, y: newHeight / 2 });
    Matter.Body.setPosition(rightWall, { x: newWidth + THICKNESS / 2, y: newHeight / 2 });
    Matter.Body.setPosition(topWall, { x: newWidth / 2, y: -THICKNESS / 2 });
  };

  return { walls: [topWall, rightWall, bottomWall, leftWall], resizeWalls };
}

function createBodies(containerElement: HTMLDivElement, elements: HTMLDivElement[]) {
  const elementSize = elements[0].getBoundingClientRect().width;
  const containerWidth = containerElement.getBoundingClientRect().width;

  const elementXMax = elementSize + elementSize * 0.9 * (elements.length - 1);
  const centerXOffset = Math.max((containerWidth - elementXMax) / 2, 0);

  const bodies = elements.map((currentElement, i) => ({
    body: Matter.Bodies.circle(
      centerXOffset + ((elementSize * 0.9 * i) % containerWidth),
      elementSize / 2 +
        Math.floor((elementSize * i) / containerWidth) * elementSize +
        (Math.random() * elementSize) / 2,
      elementSize / 2,
    ),
    element: currentElement,
    render() {
      const { x, y } = this.body.position;
      this.element.style.transform = `translate(${x - elementSize / 2}px, ${y - elementSize / 2}px)`;
    },
  }));

  const wakeUpBodies = () => {
    bodies.forEach(({ body }) => {
      Matter.Sleeping.set(body, false);
    });
  };

  return { bodies, wakeUpBodies };
}

const physics: { engine: Matter.Engine; bodies: { render: () => void }[] } = {
  engine: null!,
  bodies: [],
};

export default function SkillsSection() {
  const t = useTranslations('about.skills');
  const skills: string[] = t.raw('skillsList');

  const containerRef = useRef<HTMLDivElement>(null!);
  const requestRef = useRef<number>(null!);
  const divRefs = useRef<HTMLDivElement[]>([]);

  const animate = () => {
    let previousTime: number;

    requestAnimationFrame(firstFrame);

    function firstFrame(currentTime: number) {
      previousTime = currentTime;
      requestAnimationFrame(render);
    }

    function render(currentTime: number) {
      const deltaTime = currentTime - previousTime;

      physics.bodies.forEach((element) => element.render());
      Matter.Engine.update(physics.engine, deltaTime);

      previousTime = currentTime;

      requestRef.current = requestAnimationFrame(render);
    }
  };

  useEffect(() => {
    const { bodies, wakeUpBodies } = createBodies(containerRef.current, divRefs.current);
    physics.bodies = bodies;
    physics.engine = Matter.Engine.create({ enableSleeping: true });

    const mouseConstraint = Matter.MouseConstraint.create(physics.engine, {
      mouse: Matter.Mouse.create(containerRef.current),
      constraint: {
        stiffness: 1,
      },
    });

    const { walls, resizeWalls } = createWalls(containerRef.current);

    Matter.World.add(physics.engine.world, [...walls, ...bodies.map(({ body }) => body), mouseConstraint]);

    const handleResize = () => {
      resizeWalls();
      wakeUpBodies();
    };

    addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      removeEventListener('resize', handleResize);
      Matter.Engine.clear(physics.engine);
    };
  }, []);

  return (
    <>
      <SectionTitle title={t('title')} />

      <div className="border-2 border-tertiary-text rounded-xl w-full h-[80vh] pointer-events-auto">
        <motion.div
          ref={containerRef}
          className="w-full h-full relative overflow-hidden cursor-grab"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: 0.5 }}
          onViewportEnter={() => animate()}
          viewport={{ once: true }}
        >
          {skills.map((skill, i) => (
            <Skill key={skill} name={skill} ref={(el) => (divRefs.current[i] = el!)} />
          ))}
        </motion.div>
      </div>
    </>
  );
}
