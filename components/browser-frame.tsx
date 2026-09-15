'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface BrowserFrameProps {
  /** Domain shown in the mock address bar, e.g. "bearions.store". */
  url: string;
  src: string;
  alt: string;
  className?: string;
  /** Zooms the screenshot slightly on hover. Off for dense grids. */
  hoverZoom?: boolean;
}

/**
 * Wraps a project screenshot in a fake browser chrome (traffic lights + URL
 * bar) so a plain image reads as "a real, live page" rather than a stray
 * picture dropped into a card.
 */
export function BrowserFrame({
  url,
  src,
  alt,
  className,
  hoverZoom = true,
}: BrowserFrameProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm',
        className
      )}
    >
      {/* Chrome */}
      <div className="flex items-center gap-3 border-b border-border/60 bg-muted/60 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-1.5 truncate rounded-full bg-background/70 px-3 py-1 text-[11px] text-muted-foreground">
          <Lock className="h-2.5 w-2.5 shrink-0" />
          <span className="truncate">{url}</span>
        </div>
      </div>

      {/* Screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted/40">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top"
          whileHover={!shouldReduceMotion && hoverZoom ? { scale: 1.04 } : {}}
          transition={{ duration: 0.5, ease: ease.out }}
        />
      </div>
    </div>
  );
}
