'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ease, viewport } from '@/lib/motion';

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: ReactNode;
  /** The trailing word rendered in the brand gradient. */
  accent?: string;
  description?: string;
  className?: string;
  align?: 'center' | 'left';
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: ease.out }}
        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-1 to-brand-2" />
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={viewport}
        transition={{ duration: 0.65, ease: ease.out, delay: 0.06 }}
        className="text-balance text-3xl font-bold sm:text-4xl md:text-5xl"
      >
        {title}
        {accent && <span className="text-gradient"> {accent}</span>}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: ease.out, delay: 0.12 }}
          className={cn(
            'text-pretty leading-relaxed text-muted-foreground',
            align === 'center' ? 'max-w-2xl' : 'max-w-xl'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
