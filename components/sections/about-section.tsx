'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '@/components/section-heading';
import { FadeIn } from '@/components/motion-wrapper';
import { profile } from '@/lib/data';
import { ease } from '@/lib/motion';

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
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
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
                    src="/images/Bravely.webp"
                    alt={`Portrait of ${profile.name}`}
                    /* Source is a tall full-body shot (720x1280). The 40% focal
                       point pulls the crop down onto the face, and the scale
                       zooms past `cover` so it fills the frame as a portrait. */
                    className="aspect-[3/4] w-full scale-[1.5] object-cover object-[center_40%]"
                    width={720}
                    height={1280}
                    loading="lazy"
                    decoding="async"
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
                  University who builds full-stack products on Next.js and
                  Supabase, down to embedded hardware — my final-year project was
                  a multisensor engine data logger on a custom PCB.
                </p>
                <p>
                  Most recently I spent six months as an IT intern at{' '}
                  <strong className="font-medium text-foreground">
                    PT Toyota Motor Manufacturing Indonesia
                  </strong>
                  , supporting a company-wide MFA integration and writing secure
                  coding awareness material — experience that shapes how
                  carefully I build things today.
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
        </div>
      </div>
    </section>
  );
}
