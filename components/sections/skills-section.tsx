'use client';

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

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Skills"
            title="From screen"
            accent="to silicon"
            description="A full stack in the literal sense: the interface at the top, the hardware at the bottom, and the layers I've worked in between."
            className="mb-12"
          />

          <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-8 bg-border" />
            Closest to the user
          </p>

          <StaggerContainer className="flex flex-col gap-2.5" staggerDelay={0.06}>
            {stackLayers.map((layer, index) => (
              <StaggerItem key={layer.title}>
                <div
                  style={{ backgroundImage: layerBackground(index, stackLayers.length) }}
                  className="grid gap-3 rounded-2xl border border-border/70 p-5 sm:p-6 md:grid-cols-[15rem_minmax(0,1fr)] md:items-center md:gap-8"
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold">{layer.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {layer.summary}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[15px] text-foreground/90">
                    {layer.tools.map((tool) => (
                      <li
                        key={tool}
                        className="after:ml-4 after:text-muted-foreground/40 after:content-['/'] last:after:hidden"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <p className="mt-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-8 bg-border" />
            Closest to the metal
          </p>

          <FadeIn className="mt-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Also used: </span>
              {alsoUsed.join(' · ')}
            </p>
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
