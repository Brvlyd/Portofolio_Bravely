'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';
import { FadeIn } from '@/components/motion-wrapper';
import { profile } from '@/lib/data';
import { ease } from '@/lib/motion';

const socialLinks = [
  { href: profile.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: profile.github, icon: Github, label: 'GitHub' },
  { href: `mailto:${profile.email}`, icon: Mail, label: 'Email' },
  { href: profile.phoneHref, icon: Phone, label: 'Phone' },
];

const quickLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-border/60">
      <div className="container mx-auto px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <FadeIn direction="up">
            <h3 className="text-gradient mb-3 font-display text-lg font-bold">
              {profile.name}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.title} building full-stack products with Next.js,
              TypeScript, and Supabase. Open to new opportunities and
              collaborations.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.08}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navigate
            </h3>
            <div className="flex flex-col items-start gap-0.5">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  whileHover={shouldReduceMotion ? {} : { x: 4 }}
                  transition={{ duration: 0.2, ease: ease.out }}
                  /* -mx-2 px-2 keeps the text flush left while the padding
                     still gives the link a comfortable tap target. */
                  className="-mx-2 flex min-h-[40px] items-center rounded-md px-2 text-sm text-muted-foreground transition-colors hover:text-brand-1"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.16}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => (
                <MagneticButton key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    whileHover={shouldReduceMotion ? {} : { y: -3 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
                    transition={{ duration: 0.2, ease: ease.out }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-card/60 text-muted-foreground backdrop-blur-sm transition-colors hover:border-brand-1/50 hover:text-brand-1"
                  >
                    <social.icon className="h-[18px] w-[18px]" />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            className="flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-brand-1/50 hover:text-brand-1"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
