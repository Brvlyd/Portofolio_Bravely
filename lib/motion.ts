import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language for the whole site.
 * Keeping easings/durations in one place is what makes the animations feel
 * like one system instead of a pile of one-off tweens.
 */

type Bezier = [number, number, number, number];

export const ease = {
  /** Default expressive ease — quick out, long settle. */
  out: [0.16, 1, 0.3, 1] as Bezier,
  /** Symmetrical, for loops and background drifts. */
  inOut: [0.65, 0, 0.35, 1] as Bezier,
  /** Slight overshoot for playful accents. */
  spring: [0.34, 1.56, 0.64, 1] as Bezier,
};

export const spring = {
  soft: { type: 'spring', stiffness: 120, damping: 20, mass: 0.6 },
  snappy: { type: 'spring', stiffness: 320, damping: 30 },
  magnetic: { type: 'spring', stiffness: 150, damping: 15, mass: 0.5 },
} satisfies Record<string, Transition>;

export const duration = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
};

/** Viewport config used by every scroll-triggered reveal. */
export const viewport = { once: true, margin: '-80px' } as const;

/** Blur + rise reveal — the signature entrance used across sections. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.base, ease: ease.out },
  },
};

export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});
