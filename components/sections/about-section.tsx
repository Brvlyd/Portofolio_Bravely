'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Users } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { SpotlightCard } from '@/components/spotlight-card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import { highlights, profile, whatIDo } from '@/lib/data';
import { ease } from '@/lib/motion';

const iconMap = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  award: Award,
  users: Users,
} as const;

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="About"
            title="Get to know"
            accent="me"
            description="My background, education, and what drives the way I build."
            className="mb-16"
          />

          {/* Portrait + bio */}
          <div className="mb-16 grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <FadeIn direction="right">
              <div className="group relative mx-auto w-full max-w-md">
                {/* Gradient frame */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-1/40 via-brand-2/30 to-brand-3/40 opacity-60 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -6 }}
                  transition={{ duration: 0.4, ease: ease.out }}
                  className="relative overflow-hidden rounded-3xl border border-border/70 bg-card"
                >
                  <img
                    src="/images/Bravely.png"
                    alt={`Portrait of ${profile.name}`}
                    /* Matches the source image's native 5:7, so object-cover
                       shows the full frame instead of cropping the bottom. */
                    className="aspect-[5/7] w-full object-cover object-center"
                    loading="lazy"
                  />
                  {/* Bottom fade + caption */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
                    <p className="font-display text-lg font-semibold text-white">
                      {profile.name}
                    </p>
                    <p className="text-sm text-white/70">{profile.title}</p>
                  </div>
                </motion.div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <h3 className="mb-5 font-display text-2xl font-bold sm:text-3xl">
                Who <span className="text-gradient">I am</span>
              </h3>
              <div className="space-y-4 text-pretty leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m a Computer Engineering graduate from Diponegoro
                  University (GPA 3.77/4.00) with a constant motivation to learn
                  everything I can about technological advancement.
                </p>
                <p>
                  Most recently I spent six months at{' '}
                  <strong className="font-medium text-foreground">
                    PT. Toyota Motor Manufacturing Indonesia
                  </strong>{' '}
                  in the Infra-Security Standardization department, supporting a
                  company-wide MFA integration and writing secure coding
                  awareness material — experience that shapes how carefully I
                  build things today.
                </p>
                <p>
                  Outside of engineering I lead divisions in student
                  organizations, where I design programs end to end and keep
                  teams moving in the same direction.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {['Jakarta, Indonesia', 'Diponegoro University', 'Class of 2026'].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
                    >
                      {chip}
                    </span>
                  )
                )}
              </div>
            </FadeIn>
          </div>

          {/* What I do */}
          <div className="mb-16">
            <FadeIn className="mb-8 text-center">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">
                What <span className="text-gradient">I do</span>
              </h3>
            </FadeIn>

            <StaggerContainer className="grid gap-4 sm:grid-cols-2" staggerDelay={0.08}>
              {whatIDo.map((item, index) => (
                <StaggerItem key={item.title}>
                  <SpotlightCard className="h-full p-6">
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-background/60 font-mono text-xs font-semibold text-brand-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="mb-1.5 font-semibold">{item.title}</h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Highlight cards */}
          <StaggerContainer
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            staggerDelay={0.08}
          >
            {highlights.map((highlight) => {
              const Icon = iconMap[highlight.icon as keyof typeof iconMap];
              return (
                <StaggerItem key={highlight.title}>
                  <SpotlightCard className="h-full p-6">
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.06, rotate: -4 }}
                      transition={{ duration: 0.3, ease: ease.out }}
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-1 to-brand-3 shadow-lg shadow-brand-1/20"
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                    <h4 className="mb-1.5 font-semibold">{highlight.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {highlight.description}
                    </p>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
