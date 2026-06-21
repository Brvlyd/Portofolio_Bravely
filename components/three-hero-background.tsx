'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

type ShapeConfig = {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
};

const shapes: ShapeConfig[] = [
  { position: [-3.5, 1.4, -3], color: '#3b82f6', scale: 1.1, speed: 1.4 },
  { position: [3.2, -1.1, -4], color: '#06b6d4', scale: 1.5, speed: 1.1 },
  { position: [0, 2.2, -5], color: '#8b5cf6', scale: 0.9, speed: 1.7 },
  { position: [-2.2, -2, -4], color: '#ec4899', scale: 0.7, speed: 1.3 },
];

function FloatingShape({ position, color, scale, speed }: ShapeConfig) {
  return (
    <Float speed={speed} rotationIntensity={1.2} floatIntensity={1.5}>
      <Sphere args={[1, 48, 48]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.3}
          transparent
          opacity={0.45}
        />
      </Sphere>
    </Float>
  );
}

export function ThreeHeroBackground() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#60a5fa" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#a78bfa" />
      <Suspense fallback={null}>
        {shapes.map((shape, i) => (
          <FloatingShape key={i} {...shape} />
        ))}
      </Suspense>
    </Canvas>
  );
}
