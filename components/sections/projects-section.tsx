'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CircuitBoard, Github } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { SpotlightCard } from '@/components/spotlight-card';
import { StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import { Button } from '@/components/ui/button';
import { projects, type Project } from '@/lib/data';
import { ease } from '@/lib/motion';
import { cn } from '@/lib/utils';

function ProjectCard({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SpotlightCard className="flex h-full flex-col">
      {/* Media */}
      <div className="p-3 pb-0">
        <div
          className={cn(
            'relative aspect-[16/10] overflow-hidden rounded-xl border border-border/50',
            project.imageBg ??
              'bg-gradient-to-br from-muted/80 to-muted/40'
          )}
        >
          {project.image ? (
            <motion.img
              src={project.image}
              alt={`${project.title} logo`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain p-8"
              whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
              transition={{ duration: 0.45, ease: ease.out }}
            />
          ) : (
            /* Hardware project with no logo — a mark stands in for one. */
            <motion.div
              className="flex h-full w-full items-center justify-center"
              whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
              transition={{ duration: 0.45, ease: ease.out }}
            >
              <CircuitBoard className="h-16 w-16 text-brand-1/70" strokeWidth={1.2} />
            </motion.div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 font-mono text-[11px] font-medium text-white backdrop-blur-sm">
            {project.year}
          </span>

          {project.demo && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 pt-5">
        <h3 className="font-display text-xl font-bold transition-colors group-hover:text-brand-1">
          {project.title}
        </h3>
        {project.kind && (
          <p className="mt-1 text-sm font-medium text-brand-2">{project.kind}</p>
        )}

        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <ul className="mt-4 space-y-2">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5 text-sm text-muted-foreground">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-2" />
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border/60 bg-background/50 px-2 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions pinned to the bottom so cards line up */}
        <div className="mt-6 flex gap-2 pt-1">
          {project.github && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 rounded-lg border-border/70 bg-background/50 transition-colors hover:border-brand-1/50"
            >
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-1.5 h-3.5 w-3.5" />
                Code
              </a>
            </Button>
          )}
          {project.demo && (
            <Button
              size="sm"
              asChild
              className="group/btn flex-1 rounded-lg bg-gradient-to-r from-brand-1 to-brand-3 text-white shadow-sm transition-shadow hover:shadow-md hover:shadow-brand-1/25"
            >
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                Visit
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Projects"
            title="Featured"
            accent="work"
            description="Production software in daily commercial use, plus embedded hardware — from a gold jewelry POS to an engine data logger."
            className="mb-16"
          />

          <StaggerContainer
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {projects.map((project) => (
              <StaggerItem key={project.title} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
