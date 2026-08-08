'use client';

import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial, Torus } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

type Pointer = MutableRefObject<{ x: number; y: number }>;

/**
 * Light and dark need genuinely different material settings, not just colours:
 * additive blending is invisible on white, and a metallic semi-transparent
 * sphere reads as a muddy grey disc rather than a glow.
 */
const PALETTE = {
  dark: {
    particles: '#7dd3fc',
    knot: '#60a5fa',
    orbA: '#3b82f6',
    orbB: '#22d3ee',
    orbC: '#a78bfa',
    lightA: '#60a5fa',
    lightB: '#a78bfa',
    particleOpacity: 0.75,
    wireOpacity: 0.22,
    orbOpacity: 0.4,
    orbMetalness: 0.35,
    orbRoughness: 0.15,
    additive: true,
  },
  light: {
    particles: '#2563eb',
    knot: '#3b82f6',
    orbA: '#60a5fa',
    orbB: '#22d3ee',
    orbC: '#a78bfa',
    lightA: '#dbeafe',
    lightB: '#ede9fe',
    particleOpacity: 0.55,
    wireOpacity: 0.14,
    orbOpacity: 0.15,
    orbMetalness: 0,
    orbRoughness: 0.85,
    additive: false,
  },
};

/** Soft round sprite so points render as glows rather than hard squares. */
function useParticleSprite() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

/** Drifting depth field — the layer that sells the sense of space. */
function ParticleField({
  color,
  opacity,
  additive,
  pointer,
  count = 1400,
}: {
  color: string;
  opacity: number;
  additive: boolean;
  pointer: Pointer;
  count?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const sprite = useParticleSprite();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Even distribution through a spherical shell around the camera.
      const radius = 5 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useEffect(() => () => sprite.dispose(), [sprite]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.018;
    ref.current.rotation.x += delta * 0.006;
    // Counter-drift against the camera for a subtle parallax depth cue.
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      pointer.current.x * -0.4,
      0.04
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      pointer.current.y * -0.4,
      0.04
    );
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        map={sprite}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

/** Slow wireframe shells that give the composition a technical edge. */
function WireShells({ color, opacity }: { color: string; opacity: number }) {
  const outer = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (outer.current) {
      outer.current.rotation.y += delta * 0.05;
      outer.current.rotation.x -= delta * 0.02;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.08;
      inner.current.rotation.z += delta * 0.03;
    }
  });

  return (
    <>
      <group ref={outer} position={[0, 0, -2]}>
        <Icosahedron args={[4.4, 1]}>
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={opacity}
            depthWrite={false}
          />
        </Icosahedron>
      </group>

      <group ref={inner} position={[0, 0, -2]}>
        <Torus args={[3.1, 0.02, 8, 90]} rotation={[Math.PI / 2.6, 0, 0]}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity * 1.6}
            depthWrite={false}
          />
        </Torus>
      </group>
    </>
  );
}

type OrbConfig = {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
};

function GlowOrbs({ colors }: { colors: typeof PALETTE.dark }) {
  const orbs: OrbConfig[] = [
    { position: [-4.2, 1.6, -3], color: colors.orbA, scale: 1.15, speed: 1.3 },
    { position: [4.0, -1.3, -4], color: colors.orbB, scale: 1.55, speed: 1.05 },
    { position: [0.4, 2.6, -5], color: colors.orbC, scale: 0.95, speed: 1.6 },
    { position: [-2.6, -2.3, -4], color: colors.orbB, scale: 0.7, speed: 1.35 },
  ];

  return (
    <>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={1.1} floatIntensity={1.4}>
          <mesh position={orb.position} scale={orb.scale}>
            <sphereGeometry args={[1, 48, 48]} />
            <MeshDistortMaterial
              color={orb.color}
              distort={0.42}
              speed={1.4}
              roughness={colors.orbRoughness}
              metalness={colors.orbMetalness}
              transparent
              opacity={colors.orbOpacity}
              depthWrite={false}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** Eases the camera toward the pointer so the scene has gentle parallax. */
function CameraRig({ pointer }: { pointer: Pointer }) {
  useFrame((state, delta) => {
    const damp = 1 - Math.pow(0.001, delta);
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      pointer.current.x * 0.9,
      damp
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      pointer.current.y * 0.55,
      damp
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function ThreeHeroBackground() {
  const { resolvedTheme } = useTheme();
  const colors = resolvedTheme === 'light' ? PALETTE.light : PALETTE.dark;

  // Tracked on window rather than through r3f events, because the canvas is
  // pointer-events:none so clicks pass through to the page beneath it.
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[6, 6, 6]} intensity={1.1} color={colors.lightA} />
      <pointLight position={[-6, -5, 4]} intensity={0.85} color={colors.lightB} />

      <Suspense fallback={null}>
        <CameraRig pointer={pointer} />
        <ParticleField
          color={colors.particles}
          opacity={colors.particleOpacity}
          additive={colors.additive}
          pointer={pointer}
        />
        <WireShells color={colors.knot} opacity={colors.wireOpacity} />
        <GlowOrbs colors={colors} />
      </Suspense>
    </Canvas>
  );
}
