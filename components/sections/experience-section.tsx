'use client';

import { motion } from 'framer-motion';
import { Accordion, AccordionItem } from '@heroui/react';
import { Building2, GraduationCap, Plus, Users } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { SpotlightCard } from '@/components/spotlight-card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import {
  additionalInvolvement,
  education,
  experiences,
  type Experience,
} from '@/lib/data';
import { ease, viewport } from '@/lib/motion';
import { cn } from '@/lib/utils';

const kindMeta: Record<
  Experience['kind'],
  { label: string; icon: typeof Building2; className: string }
> = {
  internship: {
    label: 'Internship',
    icon: Building2,
    className: 'from-brand-1 to-brand-3',
  },
  organization: {
    label: 'Leadership',
    icon: Users,
    className: 'from-emerald-500 to-teal-400',
  },
};

function TimelineEntry({ item, index }: { item: Experience; index: number }) {
  const meta = kindMeta[item.kind];
  const Icon = meta.icon;

  return (
    <motion.li
      initial={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={viewport}
      transition={{ duration: 0.6, ease: ease.out, delay: index * 0.05 }}
      className="relative pl-12"
    >
      {/* Node */}
      <span
        className={cn(
          'absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br shadow-md',
          meta.className
        )}
      >
        <Icon className="h-4 w-4 text-white" />
      </span>

      <div className="pb-10">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border/70 bg-card/60 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {meta.label}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {item.period}
          </span>
        </div>

        <h4 className="font-display text-lg font-semibold leading-snug">
          {item.role}
        </h4>
        <p className="mt-0.5 text-sm font-medium text-brand-1">
          {item.organization}
        </p>
        {item.note && (
          <p className="mt-0.5 text-sm italic text-muted-foreground">{item.note}</p>
        )}

        <PointsList points={item.points} />
      </div>
    </motion.li>
  );
}

/** Keeps the timeline scannable: only the first couple of bullets show up
 * front, the rest collapse into an accordion instead of a text wall. */
function PointsList({ points }: { points: string[] }) {
  const VISIBLE = 2;
  const shown = points.slice(0, VISIBLE);
  const rest = points.slice(VISIBLE);

  const renderPoint = (point: string) => (
    <li key={point} className="flex gap-2.5 text-sm text-muted-foreground">
      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
      <span className="leading-relaxed">{point}</span>
    </li>
  );

  if (rest.length === 0) {
    return <ul className="mt-3 space-y-2">{shown.map(renderPoint)}</ul>;
  }

  return (
    <div className="mt-3">
      <ul className="space-y-2">{shown.map(renderPoint)}</ul>
      <Accordion
        variant="light"
        className="-mx-1 px-0"
        itemClasses={{
          trigger: 'py-1.5 px-1 gap-2',
          title: 'text-xs font-medium text-brand-1',
          content: 'pb-1 pt-0',
          indicator: 'text-brand-1',
        }}
      >
        <AccordionItem
          key="more"
          aria-label={`${rest.length} more details`}
          title={`+${rest.length} more detail${rest.length > 1 ? 's' : ''}`}
        >
          <ul className="space-y-2">{rest.map(renderPoint)}</ul>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Journey"
            title="Experience &"
            accent="education"
            description="Professional work, leadership roles, and academic background."
            className="mb-16"
          />

          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            {/* Timeline */}
            <div>
              <FadeIn className="mb-8 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-1 to-brand-3 shadow-lg shadow-brand-1/20">
                  <Building2 className="h-5 w-5 text-white" />
                </span>
                <h3 className="font-display text-2xl font-bold">Experience</h3>
              </FadeIn>

              <ol className="relative">
                {/* Rail */}
                <span
                  aria-hidden
                  className="absolute bottom-10 left-[17px] top-10 w-px bg-gradient-to-b from-brand-1/40 via-border to-transparent"
                />
                {experiences.map((item, index) => (
                  <TimelineEntry key={item.role} item={item} index={index} />
                ))}
              </ol>

              {/* Smaller roles, grouped as on the CV */}
              <FadeIn className="pl-12">
                <div className="rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <Plus className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-semibold">Additional involvement</h4>
                  </div>
                  <ul className="space-y-2">
                    {additionalInvolvement.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm text-muted-foreground"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

            {/* Education — sticky so the short column tracks the long timeline
                instead of leaving a tall gap beside it. */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <FadeIn className="mb-8 flex items-center gap-3" direction="left">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/20">
                  <GraduationCap className="h-5 w-5 text-white" />
                </span>
                <h3 className="font-display text-2xl font-bold">Education</h3>
              </FadeIn>

              <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                {education.map((edu) => (
                  <StaggerItem key={edu.degree}>
                    <SpotlightCard className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-display font-semibold leading-snug">
                            {edu.institution}
                          </h4>
                          <p className="mt-1 text-sm font-medium text-emerald-500 dark:text-emerald-400">
                            {edu.degree}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {edu.location}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-border/70 bg-background/60 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                          {edu.period}
                        </span>
                      </div>

                      <p className="mt-4 inline-flex rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-400/10 px-3 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {edu.score}
                      </p>

                      {edu.project && (
                        <p className="mt-4 border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
                          {edu.project}
                        </p>
                      )}
                    </SpotlightCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
