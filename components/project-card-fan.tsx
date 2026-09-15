'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';
import { ease } from '@/lib/motion';

/**
 * The hero's visual anchor: real project screenshots dealt out like a hand of
 * playing cards. Each card pivots from a shared point at the bottom, so the
 * spread reads as a fan rather than a stack, and lifts out of the fan on hover.
 */

// Ordered so the two strongest screenshots land in the middle, where the fan
// overlaps least and the most of each card stays visible.
const FAN_ORDER = ['SITOMAS Kresno', 'Bearion', 'RetenSYNC', 'November Coffee'];

const fanned = FAN_ORDER.map((title) =>
  projects.find((project) => project.title === title)
).filter((project): project is NonNullable<typeof project> =>
  Boolean(project?.screenshot)
);

/**
 * Per-card fan placement. Rotation alone barely separates the cards — the
 * horizontal offset is what actually opens the hand up, and the outer cards
 * drop a little so the arc reads as a curve rather than a straight row.
 */
const LAYOUT = [
  { x: -134, rotate: -17, y: 20 },
  { x: -45, rotate: -6, y: 0 },
  { x: 45, rotate: 6, y: 0 },
  { x: 134, rotate: 17, y: 20 },
];

export function ProjectCardFan() {
  const shouldReduceMotion = useReducedMotion();

  return (
    /* The fan is laid out at one fixed size and scaled down on small screens —
       simpler than making every pixel offset responsive. */
    <div className="relative mx-auto h-[200px] w-full max-w-[540px] sm:h-[300px]">
      <div className="absolute inset-x-0 bottom-0 h-[290px] origin-bottom scale-[0.62] sm:scale-100">
        {/* Glow pooled under the fan */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-1/2 h-64 w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--brand-2)/0.35),transparent_70%)] blur-2xl"
        />

      {fanned.map((project, index) => {
        const { x, rotate, y } = LAYOUT[index] ?? { x: 0, rotate: 0, y: 0 };

        return (
          <motion.a
            key={project.title}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} — open live site`}
            /* -ml centres the card on the container's midline so framer-motion's
               `x` is free to carry the fan offset in plain pixels. */
            className="group absolute bottom-0 left-1/2 -ml-[86px] block w-[172px] overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-black/40"
            style={{ originX: 0.5, originY: 1 }}
            initial={
              shouldReduceMotion
                ? { x, rotate, y }
                : { x: 0, rotate: 0, y: 70, opacity: 0 }
            }
            animate={{ x, rotate, y, opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: ease.out,
              delay: shouldReduceMotion ? 0 : 0.5 + index * 0.12,
            }}
            whileHover={
              shouldReduceMotion ? {} : { y: y - 30, scale: 1.07, zIndex: 30 }
            }
          >
            {/* Browser chrome — signals these are live pages, not mockups */}
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/60 px-2.5 py-1.5">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="truncate text-[9px] text-muted-foreground">
                {project.screenshotUrl}
              </span>
            </div>

            {/* Portrait crop keeps the playing-card proportions; every one of
                these pages is centre-composed, so a centre crop reads well. */}
            <img
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top"
            />

            {/* Name rides on the image instead of a text block underneath, so
                the card behind it isn't hidden by a row of truncated labels. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-3 pb-2.5 pt-8">
              <p className="truncate text-[12px] font-semibold text-white">
                {project.title}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-white/70">
                Live
                <ArrowUpRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </motion.a>
        );
      })}
      </div>
    </div>
  );
}
