'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { techIcons, type TechIcon } from '@/lib/tech-icons';
import { cn } from '@/lib/utils';

function TechPill({ icon }: { icon: TechIcon }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-lg bg-card/90 px-4 py-2.5 sm:px-5 sm:py-3">
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 shrink-0 sm:h-6 sm:w-6">
        {/* Brand colours, with the dark variant swapped in by theme so brand
            blacks (Next.js, GitHub, Vercel) stay visible without a JS read. */}
        <path d={icon.path} className="dark:hidden" fill={icon.hex} />
        <path d={icon.path} className="hidden dark:block" fill={icon.darkHex} />
      </svg>
      <span className="whitespace-nowrap text-sm font-medium tracking-tight sm:text-base">
        {icon.title}
      </span>
    </div>
  );
}

/** Copies rendered per row — enough that the strip never runs out mid-drag. */
const COPIES = 3;

/**
 * One self-scrolling strip. Driven by a motion value rather than a CSS
 * keyframe so it can be grabbed and flung: the drag writes straight to the
 * offset, release velocity carries on as momentum, and the auto-scroll takes
 * over again once that decays.
 */
function Row({
  items,
  direction,
  speed,
}: {
  items: TechIcon[];
  /** -1 scrolls left, 1 scrolls right. */
  direction: 1 | -1;
  /** Auto-scroll speed in px/s. */
  speed: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const copyRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const copyWidth = useRef(0);
  const hovered = useRef(false);
  const drag = useRef<{ startX: number; startOffset: number; lastX: number; lastT: number } | null>(null);
  const velocity = useRef(0);

  // Keeps the offset inside one copy's width so the loop is seamless.
  const wrap = (value: number) => {
    const w = copyWidth.current;
    if (!w) return value;
    return (((value % w) + w) % w) - w;
  };

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const measure = () => {
      copyWidth.current = el.offsetWidth;
      x.set(wrap(x.get()));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimationFrame((_, delta) => {
    if (drag.current) return;
    const dt = Math.min(delta, 64) / 1000;

    // Momentum left over from a fling, decaying smoothly back to zero.
    let move = velocity.current * dt;
    velocity.current *= Math.pow(0.04, dt);
    if (Math.abs(velocity.current) < 5) velocity.current = 0;

    if (!shouldReduceMotion && !hovered.current) move += direction * speed * dt;
    if (move) x.set(wrap(x.get() + move));
  });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    velocity.current = 0;
    drag.current = { startX: e.clientX, startOffset: x.get(), lastX: e.clientX, lastT: e.timeStamp };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) velocity.current = ((e.clientX - d.lastX) / dt) * 1000;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    x.set(wrap(d.startOffset + e.clientX - d.startX));
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    // A pointer that stopped before letting go shouldn't fling.
    if (e.timeStamp - drag.current.lastT > 80) velocity.current = 0;
    velocity.current = Math.max(-2500, Math.min(2500, velocity.current));
    drag.current = null;
  };

  return (
    <div
      className="cursor-grab touch-pan-y select-none bg-foreground/[0.04] py-3 active:cursor-grabbing sm:py-4"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') hovered.current = true;
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') hovered.current = false;
      }}
    >
      <motion.div style={{ x }} className="flex w-max will-change-transform">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div
            key={copy}
            ref={copy === 0 ? copyRef : undefined}
            // Trailing padding (not flex gap) so one copy's width is exactly
            // the distance the loop has to travel.
            className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
            aria-hidden={copy > 0}
          >
            {items.map((icon) => (
              <TechPill key={`${copy}-${icon.title}`} icon={icon} />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Two strips scrolling in opposite directions, the second running the list
 * back to front so the rows never mirror each other. Pauses under the mouse,
 * and either strip can be dragged.
 */
export function Marquee({ className }: { className?: string }) {
  const bottom = [...techIcons].reverse();

  return (
    <div className={cn('mask-fade-x relative flex flex-col gap-3 overflow-hidden', className)}>
      <Row items={techIcons} direction={-1} speed={34} />
      <Row items={bottom} direction={1} speed={28} />
    </div>
  );
}
