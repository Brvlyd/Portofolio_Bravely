'use client';

import { motion, type MotionValue } from 'framer-motion';

/**
 * Hero depth layer. Replaces the old react-three-fiber scene and reads the
 * same way — drifting star field, tilted wireframe shells, glow orbs — but is
 * pure CSS: no WebGL context, no per-frame JS, and ~0 KB of extra bundle.
 *
 * Everything animates on `transform`/`opacity` only, so the compositor owns it
 * and the main thread stays free for hydration.
 */

type Orb = {
  className: string;
  color: string;
  duration: string;
  delay: string;
};

const ORBS: Orb[] = [
  {
    className: 'left-[8%] top-[18%] h-72 w-72',
    color: 'hsl(var(--brand-1) / 0.5)',
    duration: '19s',
    delay: '0s',
  },
  {
    className: 'right-[10%] top-[30%] h-96 w-96',
    color: 'hsl(var(--brand-2) / 0.45)',
    duration: '24s',
    delay: '-6s',
  },
  {
    className: 'left-[38%] top-[6%] h-64 w-64',
    color: 'hsl(var(--brand-3) / 0.45)',
    duration: '21s',
    delay: '-12s',
  },
  {
    className: 'left-[18%] bottom-[14%] h-56 w-56',
    color: 'hsl(var(--brand-2) / 0.4)',
    duration: '17s',
    delay: '-3s',
  },
];

export function HeroBackdrop({
  parallaxX,
  parallaxY,
}: {
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
}) {
  return (
    <motion.div
      aria-hidden
      style={{ x: parallaxX, y: parallaxY }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Star field — an oversized dot grid turning slowly reads as depth
          without needing individual particles. */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="animate-shell-spin bg-dots mask-fade h-[190%] w-[190%] opacity-40 dark:opacity-55" />
      </div>

      {/* Wireframe shells — tilted rings echoing the old icosahedron + torus.
          The tilt sits on the wrapper so the spin animation owns `transform`. */}
      <div className="absolute inset-0 grid place-items-center [perspective:1000px]">
        <div className="[transform:rotateX(74deg)]">
          <div className="animate-shell-spin-reverse h-[34rem] w-[34rem] rounded-full border border-brand-1/25 sm:h-[44rem] sm:w-[44rem]" />
        </div>
      </div>
      <div className="absolute inset-0 grid place-items-center [perspective:1000px]">
        <div className="[transform:rotateX(66deg)_rotateZ(18deg)]">
          <div className="animate-shell-spin h-[26rem] w-[26rem] rounded-full border border-brand-2/20 sm:h-[33rem] sm:w-[33rem]" />
        </div>
      </div>

      {/* Glow orbs */}
      {ORBS.map((orb) => (
        <div
          key={orb.className}
          className={`animate-orb-float absolute rounded-full blur-3xl ${orb.className}`}
          style={{
            background: `radial-gradient(circle, ${orb.color}, transparent 68%)`,
            animationDuration: orb.duration,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </motion.div>
  );
}
