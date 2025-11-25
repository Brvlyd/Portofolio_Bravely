'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';
import { FadeIn } from '@/components/motion-wrapper';

const socialLinks = [
  { href: 'https://www.linkedin.com/in/bravelyd/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/Brvlyd', icon: Github, label: 'GitHub' },
  { href: 'mailto:bravelydirgayuska@gmail.com', icon: Mail, label: 'Email' },
  { href: 'tel:+628118899743', icon: Phone, label: 'Phone' },
];

const quickLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn direction="up" delay={0}>
            <motion.h3 
              className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
              style={{ backgroundSize: '200% 200%' }}
              animate={shouldReduceMotion ? {} : {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              Bravely Dirgayuska
            </motion.h3>
            <p className="text-sm text-muted-foreground">
              Computer Engineering student passionate about building innovative solutions
              and contributing to technological advancement.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                  whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: shouldReduceMotion ? 0 : 0.2 + index * 0.05,
                    duration: 0.3,
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <MagneticButton key={social.href} strength={0.3}>
                  <motion.a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-2 rounded-full bg-secondary hover:bg-blue-600 hover:text-white transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: shouldReduceMotion ? 0 : 0.3 + index * 0.05,
                      duration: 0.3,
                    }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </FadeIn>
        </div>

        <motion.div 
          className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: 0.5 }}
        >
          <p>&copy; {currentYear} Bravely Dirgayuska. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
