'use client';

import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { Skill } from '@/components/pages/about/skills/Skill';

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

function createBodies(elements: HTMLDivElement[]) {
  const bodies = elements.map((currentElement, i) => ({
    body: Matter.Bodies.circle(90 * i, 100, 80),
    element: currentElement,
    render() {
      const { x, y } = this.body.position;
      this.element.style.transform = `translate(${x - 80}px, ${y - 80}px)`;
    },
  }));

  const wakeUpBodies = () => {
    bodies.forEach(({ body }) => {
      Matter.Sleeping.set(body, false);
    });
  };

  return { bodies, wakeUpBodies };
}

export default function SkillsSection() {
  const skills = [
    'Java (Spring)',
    'Web (Node.js, Angular, React.js)',
    'Docker',
    'PostgreSQL',
    'Gitlab CI',
    'Kubernetes Openshift',
    'Terraform',
    'Ansible',
    'Linux',
    'Basic networking',
    'ArgoCD',
  ];
  const ref = useRef<HTMLDivElement>(null!);

  const requestRef = useRef<number>(null!);
  const divRefs = useRef<HTMLDivElement[]>([]);

  const animate = (engine: Matter.Engine, elements: { render: () => void }[]) => {
    let previousTime: number;

    requestAnimationFrame(firstFrame);

    function firstFrame(currentTime: number) {
      previousTime = currentTime;
      requestAnimationFrame(render);
    }

    function render(currentTime: number) {
      const deltaTime = currentTime - previousTime;

      elements.forEach((element) => element.render());
      Matter.Engine.update(engine, deltaTime);

      previousTime = currentTime;

      requestRef.current = requestAnimationFrame(render);
    }
  };

  useEffect(() => {
    const { bodies, wakeUpBodies } = createBodies(divRefs.current);
    const engine = Matter.Engine.create({ enableSleeping: true });

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: Matter.Mouse.create(ref.current),
      constraint: {
        stiffness: 0.2,
      },
    });

    const { walls, resizeWalls } = createWalls(ref.current);

    Matter.World.add(engine.world, [...walls, ...bodies.map(({ body }) => body), mouseConstraint]);

    animate(engine, bodies);

    ref.current.classList.remove('hidden');

    const handleResize = () => {
      resizeWalls();
      wakeUpBodies();
    };

    addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      removeEventListener('resize', handleResize);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={ref} className="w-full h-full cursor-grab relative overflow-hidden hidden">
      {skills.map((skill, i) => (
        <Skill key={skill} name={skill} ref={(el) => (divRefs.current[i] = el!)} />
      ))}
    </div>
  );
}
