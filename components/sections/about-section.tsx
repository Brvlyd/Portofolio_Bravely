'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { FadeIn } from '@/components/motion-wrapper';
import { profile } from '@/lib/data';
import { ease } from '@/lib/motion';

/** What "end to end" covers, plus the layers underneath the web — short enough to scan. */
const practice = [
  { label: 'Build', text: 'Full-stack products, from schema to interface.' },
  { label: 'Document', text: 'READMEs, test plans, and manuals others can follow.' },
  { label: 'Test', text: 'Automated and written tests, not a manual click-through.' },
  { label: 'Ship', text: 'SDLC discipline through CI and deployment.' },
  { label: 'Hardware', text: 'Firmware in C, sensors, and a custom PCB design.' },
  { label: 'Network', text: 'IP addressing, routing, and switching fundamentals.' },
];

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
            description="Based in Jakarta. Curious about how things work, from the web app down to the wire."
            className="mb-16"
          />

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            {/* Portrait — cut out so it sits on the panel instead of its old backdrop */}
            <FadeIn direction="right">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.4, ease: ease.out }}
                className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-slate-300/20 via-slate-500/10 to-slate-900/60 dark:from-slate-400/15 dark:via-slate-700/20 dark:to-slate-950"
              >
                {/* Soft halo behind the head so the figure separates from the panel */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-[8%] h-3/4 w-3/4 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
                />
                <img
                  src="/images/Bravely-cutout.webp"
                  alt={`Portrait of ${profile.name}`}
                  // Zoomed past `cover` around the head, then dropped a little so
                  // there's headroom above and the face sits a bit lower.
                  className="relative h-full w-full origin-[50%_22%] translate-y-[7%] scale-[1.14] object-cover object-bottom"
                  width={900}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-5 pt-14">
                  <p className="font-display text-lg font-semibold text-white">
                    {profile.name}
                  </p>
                  <p className="text-sm text-white/70">{profile.title}</p>
                </div>
              </motion.div>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <h3 className="mb-5 font-display text-2xl font-bold sm:text-3xl">
                Who <span className="text-gradient">I am</span>
              </h3>

              <div className="space-y-4 text-pretty leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m a Computer Engineering graduate who gets genuinely excited
                  about learning new technology and going deep on software, and about
                  everything around the code: the environment it runs in, how it&apos;s
                  deployed, and what keeps it maintainable.
                </p>
                <p>
                  <strong className="font-medium text-foreground">
                    What sets me apart is range.
                  </strong>{' '}
                  I work end to end: proper documentation, a real SDLC from
                  requirements to release, and testing that catches problems before
                  users do. And because my degree is Computer Engineering, I also come
                  from the layers underneath. I&apos;ve designed a PCB, written firmware
                  for a microcontroller, and studied how traffic gets routed, so the web
                  apps I build rest on an understanding of what they actually run on.
                </p>
              </div>

              <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
                {practice.map((item) => (
                  <div key={item.label} className="bg-card/80 p-4 backdrop-blur-sm">
                    <dt className="font-display text-sm font-semibold">{item.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
