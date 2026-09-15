'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  BadgeCheck,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Languages,
  Layers,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { SpotlightCard } from '@/components/spotlight-card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import { credentials, languages, skillGroups, type Credential } from '@/lib/data';
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

const credentialGroups: {
  kind: Credential['kind'];
  label: string;
  icon: typeof GraduationCap;
  accent: string;
  labelColor: string;
}[] = [
  {
    kind: 'training',
    label: 'Training & Programs',
    icon: GraduationCap,
    accent: 'from-amber-500 to-orange-400',
    labelColor: 'text-amber-500',
  },
  {
    kind: 'certification',
    label: 'Certifications',
    icon: BadgeCheck,
    accent: 'from-brand-1 to-brand-3',
    labelColor: 'text-brand-2',
  },
];

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

          {/* Training & certifications — two groups, one card treatment, so
              nothing is singled out over the rest. */}
          <FadeIn>
            <div className="rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm sm:p-10">
              <div className="mb-8 text-center">
                <h3 className="font-display text-2xl font-bold">
                  Training &amp; <span className="text-gradient">Certifications</span>
                </h3>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {credentialGroups.map((group) => (
                  <div key={group.label}>
                    <div className="mb-4 flex items-center gap-2">
                      <group.icon className={cn('h-4 w-4', group.labelColor)} />
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {group.label}
                      </p>
                    </div>

                    <StaggerContainer className="grid gap-3" staggerDelay={0.06}>
                      {credentials
                        .filter((item) => item.kind === group.kind)
                        .map((item) => (
                          <StaggerItem key={item.name}>
                            <motion.div
                              whileHover={shouldReduceMotion ? {} : { y: -3 }}
                              transition={{ duration: 0.25, ease: ease.out }}
                              className="flex h-full items-start gap-3 rounded-xl border border-border/60 bg-background/50 p-4 transition-colors hover:border-brand-2/50"
                            >
                              <span
                                className={cn(
                                  'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm',
                                  group.accent
                                )}
                              >
                                <group.icon className="h-3.5 w-3.5 text-white" />
                              </span>
                              <div>
                                <p className="text-sm font-medium leading-snug">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {item.issuer} · {item.year}
                                </p>
                              </div>
                            </motion.div>
                          </StaggerItem>
                        ))}
                    </StaggerContainer>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
