'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Cloud,
  Code2,
  Database,
  Palette,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { SpotlightCard } from '@/components/spotlight-card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import { certifications, skillGroups } from '@/lib/data';
import { ease, viewport } from '@/lib/motion';
import { cn } from '@/lib/utils';

const iconMap = {
  code: Code2,
  database: Database,
  shield: ShieldCheck,
  palette: Palette,
  cloud: Cloud,
  users: Users,
} as const;

function SkillMeter({ level, color }: { level: number; color: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Proficiency</span>
        <span className="font-mono">{level}%</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className={cn('h-full rounded-full bg-gradient-to-r', color)}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={viewport}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.1, delay: 0.15, ease: ease.out }
          }
          style={{ originX: 0 }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Skills"
            title="Technical"
            accent="expertise"
            description="The stack I build with, and the competencies I bring to a team."
            className="mb-16"
          />

          <StaggerContainer
            className="mb-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.08}
          >
            {skillGroups.map((group) => {
              const Icon = iconMap[group.icon as keyof typeof iconMap];
              return (
                <StaggerItem key={group.title}>
                  <SpotlightCard className="h-full p-6">
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.06, rotate: 4 }}
                      transition={{ duration: 0.3, ease: ease.out }}
                      className={cn(
                        'mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg',
                        group.color
                      )}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>

                    <h3 className="font-display text-lg font-semibold">
                      {group.title}
                    </h3>

                    <SkillMeter level={group.level} color={group.color} />

                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-border/60 bg-background/50 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-brand-1/40 hover:text-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Certifications */}
          <FadeIn>
            <div className="rounded-3xl border border-border/70 bg-card/60 p-8 backdrop-blur-sm sm:p-10">
              <div className="mb-8 text-center">
                <h3 className="font-display text-2xl font-bold">
                  Certifications &amp; <span className="text-gradient">Training</span>
                </h3>
              </div>

              <StaggerContainer
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                staggerDelay={0.06}
              >
                {certifications.map((cert) => (
                  <StaggerItem key={cert.name}>
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { y: -3 }}
                      transition={{ duration: 0.25, ease: ease.out }}
                      className="flex h-full items-start gap-3 rounded-xl border border-border/60 bg-background/50 p-4 transition-colors hover:border-brand-1/40"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-brand-1 to-brand-2" />
                      <div>
                        <p className="text-sm font-medium leading-snug">{cert.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {cert.issuer} · {cert.year}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
