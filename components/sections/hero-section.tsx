'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/magnetic-button';
import { Typewriter, WordReveal } from '@/components/text-animations';
import { Marquee } from '@/components/marquee';
import { profile } from '@/lib/data';
import { ease, spring } from '@/lib/motion';

const ThreeHeroBackground = dynamic(
  () => import('@/components/three-hero-background').then((m) => m.ThreeHeroBackground),
  { ssr: false }
);

const socials = [
  { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: profile.github, icon: Github, label: 'GitHub' },
  { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // Cursor spotlight driven by motion values so it never re-renders React.
  const pointerX = useMotionValue(-9999);
  const pointerY = useMotionValue(-9999);
  const smoothX = useSpring(pointerX, spring.soft);
  const smoothY = useSpring(pointerY, spring.soft);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${smoothX}px ${smoothY}px, hsl(var(--brand-2) / 0.14), transparent 70%)`;

  useEffect(() => {
    if (shouldReduceMotion) return;

    const onMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      pointerX.set(e.clientX - rect.left);
      pointerY.set(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [pointerX, pointerY, shouldReduceMotion]);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-28"
    >
      {/* Blueprint grid */}
      <div aria-hidden className="bg-grid mask-fade absolute inset-0 opacity-[0.55]" />

      {/* 3D depth layer — particles, wireframe shells and distorted orbs */}
      {!shouldReduceMotion && (
        <div aria-hidden className="absolute inset-0 opacity-80">
          <ThreeHeroBackground />
        </div>
      )}

      {/* Keeps the headline legible over the 3D layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,hsl(var(--background)/0.75),transparent_75%)]"
      />

      {/* Cursor spotlight */}
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight }}
        />
      )}

      <motion.div
        style={
          shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
        className="container relative z-10 mx-auto max-w-5xl"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          className="flex flex-col items-center text-center"
        >
          {/* Availability badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.6, ease: ease.out },
              },
            }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-sm backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="font-medium text-muted-foreground">
              Open to opportunities
            </span>
            <span className="h-3.5 w-px bg-border" />
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {profile.location}
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="mb-5 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight">
            <WordReveal
              text="Hi, I'm"
              animateOnMount
              delay={0.2}
              className="justify-center text-muted-foreground"
            />
            <br />
            <WordReveal
              text={profile.name}
              animateOnMount
              delay={0.4}
              className="justify-center"
              wordClassName="text-gradient-animate"
            />
          </h1>

          {/* Role typewriter */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: ease.out, delay: 0.75 },
              },
            }}
            className="mb-6 flex min-h-[2rem] items-center justify-center text-lg font-medium text-muted-foreground sm:text-xl md:text-2xl"
          >
            <Typewriter words={profile.roles} className="text-foreground" />
          </motion.div>

          {/* Summary */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: ease.out, delay: 0.85 },
              },
            }}
            className="mb-10 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: ease.out, delay: 0.95 },
              },
            }}
            className="mb-10 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton strength={0.25}>
              <Button
                size="lg"
                onClick={() => scrollTo('#projects')}
                className="group h-12 rounded-full bg-gradient-to-r from-brand-1 to-brand-3 px-7 text-white shadow-lg shadow-brand-1/20 transition-shadow hover:shadow-xl hover:shadow-brand-1/30"
              >
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Button>
            </MagneticButton>

            <MagneticButton strength={0.25}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 rounded-full border-border/70 bg-card/60 px-7 backdrop-blur-md transition-colors hover:border-brand-1/50 hover:bg-card/80"
              >
                <a href={profile.resume} download={profile.resumeFilename}>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: ease.out, delay: 1.05 },
              },
            }}
            className="flex items-center gap-3"
          >
            {socials.map((social) => (
              <MagneticButton key={social.label} strength={0.35}>
                <motion.a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
                  transition={{ duration: 0.2, ease: ease.out }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-card/60 text-muted-foreground backdrop-blur-md transition-colors hover:border-brand-1/50 hover:text-brand-1"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              </MagneticButton>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Tech stack ticker */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.15, ease: ease.out }}
        className="relative z-10 mt-16 w-full sm:mt-20"
      >
        <p className="mb-5 text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Tools I build with
        </p>
        <Marquee />
      </motion.div>
    </section>
  );
}
