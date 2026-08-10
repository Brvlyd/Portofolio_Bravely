'use client';

import { techIcons, type TechIcon } from '@/lib/tech-icons';
import { cn } from '@/lib/utils';

function TechPill({ icon }: { icon: TechIcon }) {
  return (
    <div
      className={cn(
        'group/pill flex shrink-0 items-center gap-2.5 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 backdrop-blur-sm',
        'transition-colors duration-300 hover:border-[var(--tech)]/60 sm:gap-3 sm:px-5 sm:py-3.5'
      )}
      style={
        {
          // Per-item brand colour, swapped for the dark-mode-safe variant below.
          '--tech': icon.hex,
        } as React.CSSProperties
      }
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 shrink-0 sm:h-6 sm:w-6">
        {/* Two fills swapped by theme, so no runtime theme read is needed. */}
        <path d={icon.path} className="dark:hidden" fill={icon.hex} />
        <path d={icon.path} className="hidden dark:block" fill={icon.darkHex} />
      </svg>
      <span className="whitespace-nowrap text-sm font-semibold sm:text-base">
        {icon.title}
      </span>
    </div>
  );
}

function Row({
  items,
  reverse = false,
  duration,
}: {
  items: TechIcon[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div
      className={cn('flex w-max gap-3 sm:gap-4', reverse ? 'animate-marquee-reverse' : 'animate-marquee')}
      style={{ animationDuration: duration }}
    >
      {/* Rendered twice so the -50% translate loops seamlessly. */}
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 gap-3 sm:gap-4" aria-hidden={copy === 1}>
          {items.map((icon) => (
            <TechPill key={`${copy}-${icon.title}`} icon={icon} />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Two-row brand ticker scrolling in opposite directions. Pauses on hover so
 * the logos are actually readable when someone looks at them.
 */
export function Marquee({ className }: { className?: string }) {
  // Each row carries the full set so a single copy is wider than even a 1920px
  // viewport — otherwise the duplicate used for looping shows up on screen.
  // The second row starts from the midpoint so the two never line up.
  const half = Math.ceil(techIcons.length / 2);
  const top = techIcons;
  const bottom = [...techIcons.slice(half), ...techIcons.slice(0, half)];

  return (
    <div
      className={cn(
        'mask-fade-x group relative flex flex-col gap-3 overflow-hidden sm:gap-4',
        className
      )}
    >
      <Row items={top} duration="55s" />
      <Row items={bottom} reverse duration="62s" />
    </div>
  );
}
