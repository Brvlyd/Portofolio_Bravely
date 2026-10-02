'use client';

import { useEffect, useRef } from 'react';
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
import { Button } from '@heroui/react';
import { MagneticButton } from '@/components/magnetic-button';
import { HeroBackdrop } from '@/components/hero-backdrop';
import { ProjectCardFan } from '@/components/project-card-fan';
import { Typewriter, WordReveal } from '@/components/text-animations';
import { Marquee } from '@/components/marquee';
import { profile } from '@/lib/data';
import { ease, spring } from '@/lib/motion';

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
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${smoothX}px ${smoothY}px, hsl(var(--brand-3) / 0.14), transparent 70%)`;

  // Same pointer, normalised to [-1, 1], nudges the backdrop for parallax.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const backdropX = useTransform(useSpring(tiltX, spring.soft), [-1, 1], [18, -18]);
  const backdropY = useTransform(useSpring(tiltY, spring.soft), [-1, 1], [12, -12]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const onMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      pointerX.set(e.clientX - rect.left);
      pointerY.set(e.clientY - rect.top);
      tiltX.set((e.clientX / window.innerWidth) * 2 - 1);
      tiltY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [pointerX, pointerY, tiltX, tiltY, shouldReduceMotion]);

  const scrollTo = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-12 pt-24"
    >
      {/* Blueprint grid */}
      <div aria-hidden className="bg-grid mask-fade absolute inset-0 opacity-[0.55]" />

      {/* Depth layer — star field, wireframe shells and glow orbs */}
      <HeroBackdrop
        parallaxX={shouldReduceMotion ? undefined : backdropX}
        parallaxY={shouldReduceMotion ? undefined : backdropY}
      />

      {/* Keeps the headline legible over the depth layer */}
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
        className="container relative z-10 mx-auto max-w-7xl"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
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
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-[13px] backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
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
            <h1 className="mb-4 font-display text-[clamp(2.4rem,5.3vw,4.8rem)] font-extrabold leading-[1.03] tracking-tight">
              <WordReveal
                text="Hi, I'm"
                animateOnMount
                delay={0.2}
                className="justify-center text-muted-foreground lg:justify-start"
              />
              <br />
              <WordReveal
                text={profile.name}
                animateOnMount
                delay={0.4}
                className="justify-center lg:justify-start"
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
              className="mb-5 flex min-h-[2rem] items-center text-lg font-medium text-muted-foreground sm:text-2xl"
            >
              <Typewriter words={profile.roles} className="text-foreground" />
            </motion.div>

            {/* One-line pitch — the long version lives in About */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: ease.out, delay: 0.85 },
                },
              }}
              className="mb-8 max-w-[29rem] text-pretty text-base leading-relaxed text-muted-foreground"
            >
              {profile.tagline}
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
              className="mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <MagneticButton strength={0.25}>
                <Button
                  size="lg"
                  onPress={() => scrollTo('#projects')}
                  endContent={
                    <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                  }
                  className="group h-11 rounded-full px-7 text-sm bg-foreground text-background transition-colors hover:bg-foreground/85"
                >
                  View My Work
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.25}>
                <Button
                  as="a"
                  href={profile.resume}
                  download={profile.resumeFilename}
                  size="lg"
                  variant="bordered"
                  startContent={<Download className="h-4 w-4" />}
                  className="h-11 rounded-full border-border/70 bg-card/60 px-7 text-sm backdrop-blur-md transition-colors hover:border-foreground/40 hover:bg-card/80"
                >
                  Download CV
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
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/60 text-muted-foreground backdrop-blur-md transition-colors hover:border-foreground/40 hover:text-foreground"
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                </MagneticButton>
              ))}
            </motion.div>
          </motion.div>

          {/* Live project screenshots, dealt out like a hand of cards */}
          <ProjectCardFan />
        </div>
      </motion.div>

    </section>

      {/* Tech stack ticker */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: ease.out }}
        className="relative z-10 w-full pb-4 pt-6 sm:pt-10"
      >
        <p className="mb-5 text-center text-sm font-medium uppercase tracking-[0.24em] text-foreground/70 sm:text-base">
          Tools I build with
        </p>
        <Marquee />
      </motion.div>
    </>
  );
}
