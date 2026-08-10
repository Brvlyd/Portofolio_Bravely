'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  Code2,
  Cpu,
  Database,
  Languages,
  Layers,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { SpotlightCard } from '@/components/spotlight-card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import { certifications, languages, skillGroups } from '@/lib/data';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

const iconMap = {
  code: Code2,
  layers: Layers,
  database: Database,
  shield: ShieldCheck,
  wrench: Wrench,
  cpu: Cpu,
} as const;

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
            description="The stack I build with, from the browser down to the microcontroller."
            className="mb-16"
          />

          <StaggerContainer
            className="mb-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
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

                    <div className="mt-4 flex flex-wrap gap-2">
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

          {/* Languages */}
          <FadeIn className="mb-6">
            <SpotlightCard className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-sky-400 shadow-lg">
                    <Languages className="h-5 w-5 text-white" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {languages.map((lang) => (
                    <div key={lang.name}>
                      <p className="font-medium">{lang.name}</p>
                      <p className="text-sm text-muted-foreground">{lang.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </FadeIn>

          {/* Certifications & awards */}
          <FadeIn>
            <div className="rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm sm:p-10">
              <div className="mb-8 text-center">
                <h3 className="font-display text-2xl font-bold">
                  Certifications &amp; <span className="text-gradient">Awards</span>
                </h3>
              </div>

              <StaggerContainer
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                staggerDelay={0.06}
              >
                {certifications.map((cert) => (
                  <StaggerItem key={cert.name} className="h-full">
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { y: -3 }}
                      transition={{ duration: 0.25, ease: ease.out }}
                      className={cn(
                        'flex h-full items-start gap-3 rounded-xl border p-4 transition-colors',
                        cert.award
                          ? 'border-amber-500/40 bg-gradient-to-br from-amber-500/[0.08] to-transparent sm:col-span-2 lg:col-span-1'
                          : 'border-border/60 bg-background/50 hover:border-brand-1/40'
                      )}
                    >
                      {cert.award ? (
                        <Award className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      ) : (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-brand-1 to-brand-2" />
                      )}
                      <div>
                        <p className="text-sm font-medium leading-snug">{cert.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {cert.issuer} · {cert.year}
                        </p>
                        {cert.detail && (
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            {cert.detail}
                          </p>
                        )}
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
