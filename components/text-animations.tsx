'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ease, viewport } from '@/lib/motion';

/* -------------------------------------------------------------------------- */
/*                                 Typewriter                                  */
/* -------------------------------------------------------------------------- */

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export function Typewriter({
  words,
  className = '',
  typingSpeed = 75,
  deletingSpeed = 35,
  delayBetweenWords = 1800,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setText(words[0]);
      return;
    }

    const word = words[wordIndex];
    let delay = isDeleting ? deletingSpeed : typingSpeed;

    // Pause at the end of a fully typed word before deleting it.
    if (!isDeleting && text === word) delay = delayBetweenWords;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text === word) {
          setIsDeleting(true);
        } else {
          setText(word.slice(0, text.length + 1));
        }
      } else if (text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setText(text.slice(0, -1));
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
    shouldReduceMotion,
  ]);

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span>{shouldReduceMotion ? words[0] : text}</span>
      {!shouldReduceMotion && (
        <span className="typewriter-cursor ml-1 inline-block h-[1.1em] w-[2px] translate-y-[0.1em] bg-gradient-to-b from-brand-1 to-brand-2" />
      )}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Word reveal                                  */
/* -------------------------------------------------------------------------- */

interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  /** Animate on mount instead of on scroll into view. */
  animateOnMount?: boolean;
}

// Blur-lift rather than a clipped mask reveal: no overflow-hidden means the
// blur halo isn't cut off and descenders never clip at tight line-heights.
const wordVariants: Variants = {
  hidden: { opacity: 0, y: '0.3em', filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: '0em',
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: ease.out },
  },
};

/** Reveals a headline word-by-word with a blur lift. */
export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  animateOnMount = false,
}: WordRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const motionProps = animateOnMount
    ? { initial: 'hidden' as const, animate: 'visible' as const }
    : { initial: 'hidden' as const, whileInView: 'visible' as const, viewport };

  return (
    <motion.span
      {...motionProps}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
      className={cn('inline-flex flex-wrap gap-x-[0.28em]', className)}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block">
          <motion.span
            variants={wordVariants}
            className={cn('inline-block', wordClassName)}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Kept for compatibility with the previous API. */
export function TextReveal({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return <WordReveal text={text} className={className} delay={delay} />;
}

/* -------------------------------------------------------------------------- */
/*                              Animated counter                               */
/* -------------------------------------------------------------------------- */

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

/** Counts up once the element scrolls into view. */
export function AnimatedCounter({
  value,
  duration = 1.6,
  className = '',
  suffix = '',
  prefix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!started) return;

    if (shouldReduceMotion) {
      setDisplay(value);
      return;
    }

    let frame: number;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      // Ease-out cubic so the count decelerates into its final value.
      setDisplay(value * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, duration, shouldReduceMotion]);

  return (
    <motion.span
      ref={ref}
      className={className}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, margin: '-40px' }}
    >
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}
