'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Radius of the cursor glow in pixels. */
  radius?: number;
}

/**
 * Surface whose border and interior pick up a soft brand glow that tracks the
 * cursor. The effect is driven by motion values, so it never re-renders React.
 */
export function SpotlightCard({
  children,
  className,
  radius = 380,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const glow = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, hsl(var(--brand-1) / 0.16), transparent 72%)`;
  const border = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, hsl(var(--brand-2) / 0.55), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm transition-colors duration-300',
        className
      )}
    >
      {!shouldReduceMotion && (
        <>
          {/* Border highlight */}
          <motion.div
            aria-hidden
            className="mask-border pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: border }}
          />
          {/* Interior glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glow }}
          />
        </>
      )}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
