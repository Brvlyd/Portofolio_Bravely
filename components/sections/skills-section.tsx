'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import {
  ClipboardCheck,
  Cpu,
  Database,
  Monitor,
  Network,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import {
  alsoUsed,
  credentials,
  languages,
  stackLayers,
  type Credential,
} from '@/lib/data';

const credentialGroups: { kind: Credential['kind']; label: string }[] = [
  { kind: 'training', label: 'Training & programs' },
  { kind: 'certification', label: 'Certifications' },
];

const layerIcons = {
  monitor: Monitor,
  database: Database,
  shield: ShieldCheck,
  testing: ClipboardCheck,
  delivery: Rocket,
  network: Network,
  cpu: Cpu,
} as const;

/**
 * Each layer shades from near-white at the top (the part users touch) toward
 * navy at the bottom (the metal), so the colour itself says "depth".
 */
function layerBackground(index: number, total: number) {
  const t = index / (total - 1);
  const left = (0.07 - t * 0.04).toFixed(3);
  const right = (0.04 + t * 0.2).toFixed(3);
  return `linear-gradient(100deg, hsl(var(--foreground) / ${left}), hsl(var(--brand-3) / ${right}))`;
}

/** Marks one end of the rail: a small node plus what that end stands for. */
function RailCap({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`relative pl-16 ${className ?? ''}`}>
      <span
        aria-hidden
        className="absolute left-[15px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-background"
      />
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const stackRef = useRef<HTMLDivElement>(null);

  // The rail fills as the section scrolls past, tracing the path from the
  // interface down to the hardware.
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start 70%', 'end 60%'],
  });

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Skills"
            title="From screen"
            accent="to silicon"
            description="A full stack in the literal sense: the interface at the top, the hardware at the bottom, and the layers I've worked in between."
            className="mb-14"
          />

          <div ref={stackRef} className="relative">
            {/* Rail — a faint track with a white-to-navy fill drawn over it */}
            <span aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-border" />
            <motion.span
              aria-hidden
              style={{ scaleY: shouldReduceMotion ? 1 : scrollYProgress }}
              className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-foreground to-brand-3"
            />

            <RailCap label="Closest to the user" className="mb-4" />

            <StaggerContainer className="flex flex-col gap-3" staggerDelay={0.06}>
              {stackLayers.map((layer, index) => {
                const Icon = layerIcons[layer.icon];
                return (
                  <StaggerItem key={layer.title}>
                    <div className="relative pl-16">
                      {/* Node on the rail */}
                      <span className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-sm">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </span>

                      <div
                        style={{
                          backgroundImage: layerBackground(index, stackLayers.length),
                        }}
                        className="rounded-2xl border border-border/70 p-5 sm:p-6"
                      >
                        <div className="mb-4 flex items-baseline justify-between gap-4">
                          <div>
                            <h3 className="font-display text-lg font-semibold">
                              {layer.title}
                            </h3>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                              {layer.summary}
                            </p>
                          </div>
                          <span className="hidden font-mono text-xs text-muted-foreground sm:block">
                            L{String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <ul className="flex flex-wrap gap-2">
                          {layer.tools.map((tool) => (
                            <li
                              key={tool}
                              className="rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm text-foreground/90 backdrop-blur-sm"
                            >
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <RailCap label="Closest to the metal" className="mt-4" />
          </div>

          <FadeIn className="mt-10">
            <div className="flex flex-wrap items-center gap-2 pl-16">
              <span className="mr-1 text-sm font-medium">Also used</span>
              {alsoUsed.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-border/60 px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Languages + credentials share one quiet panel. */}
          <FadeIn className="mt-16">
            <div className="grid gap-10 border-t border-border pt-10 md:grid-cols-3">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Languages
                </p>
                <ul className="space-y-3">
                  {languages.map((lang) => (
                    <li key={lang.name}>
                      <p className="text-sm font-medium">{lang.name}</p>
                      <p className="text-sm text-muted-foreground">{lang.level}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {credentialGroups.map((group) => (
                <div key={group.kind}>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {group.label}
                  </p>
                  <ul className="space-y-3">
                    {credentials
                      .filter((item) => item.kind === group.kind)
                      .map((item) => (
                        <li key={item.name}>
                          <p className="text-sm font-medium leading-snug">{item.name}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {item.issuer} · {item.year}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
