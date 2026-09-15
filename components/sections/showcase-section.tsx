'use client';

import { Card, CardFooter, Chip } from '@heroui/react';
import { ArrowUpRight } from 'lucide-react';
import { BrowserFrame } from '@/components/browser-frame';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';

// Only the projects a real screenshot could be captured for, in a fixed
// order so the featured (biggest) tile stays the strongest visual.
const order = ['Bearion', 'RetenSYNC', 'SITOMAS Kresno', 'November Coffee'];
const showcased = order
  .map((title) => projects.find((p) => p.title === title))
  .filter((p): p is NonNullable<typeof p> => Boolean(p?.screenshot));

const chipColors = ['primary', 'secondary'] as const;

export function ShowcaseSection() {
  if (showcased.length === 0) return null;

  return (
    <section id="showcase" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-1 to-brand-3" />
              Live &amp; in production
            </span>
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              Not just slides —{' '}
              <span className="text-gradient">real, working products</span>
            </h2>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Screenshots straight from the deployed apps. Full write-ups are
              below in Projects.
            </p>
          </FadeIn>

          <StaggerContainer
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {showcased.map((project, index) => {
              const featured = index === 0;
              return (
                <StaggerItem
                  key={project.title}
                  className={cn(featured && 'sm:col-span-2')}
                >
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <Card className="h-full border border-border/60 bg-card/70 p-2 backdrop-blur-sm transition-shadow hover:shadow-xl hover:shadow-brand-1/10">
                      <BrowserFrame
                        url={project.screenshotUrl ?? ''}
                        src={project.screenshot!}
                        alt={`${project.title} screenshot`}
                        className="border-0"
                      />
                      <CardFooter className="flex items-center justify-between gap-3 px-2 pb-1 pt-3">
                        <div className="min-w-0">
                          <p className="truncate font-display text-sm font-semibold">
                            {project.title}
                          </p>
                          {project.kind && (
                            <p className="truncate text-xs text-muted-foreground">
                              {project.kind}
                            </p>
                          )}
                        </div>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={chipColors[index % chipColors.length]}
                          className="shrink-0"
                        >
                          <span className="inline-flex items-center gap-1">
                            Visit
                            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </Chip>
                      </CardFooter>
                    </Card>
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
