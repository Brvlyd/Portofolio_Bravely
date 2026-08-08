'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ease, spring } from '@/lib/motion';
import { profile } from '@/lib/data';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 24);

    const scrollPosition = window.scrollY + 120;
    for (let i = navItems.length - 1; i >= 0; i--) {
      const section = document.getElementById(navItems[i].href.slice(1));
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(navItems[i].href.slice(1));
        break;
      }
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Prevent the page from scrolling behind the mobile overlay.
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: ease.out }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
      >
        <nav
          className={cn(
            'mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full px-3 transition-all duration-500 sm:px-4',
            isScrolled
              ? 'glass-strong shadow-lg shadow-black/5'
              : 'border border-transparent bg-transparent'
          )}
        >
          <button
            onClick={() => scrollToSection('#home')}
            className="group flex items-center gap-2.5 rounded-full pl-1 pr-3 text-left"
            aria-label="Back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-1 to-brand-3 text-xs font-bold text-white shadow-sm">
              {profile.initials}
            </span>
            <span className="hidden text-sm font-semibold tracking-tight transition-colors group-hover:text-brand-1 sm:block">
              {profile.name.split(' ')[0]}
            </span>
          </button>

          <div className="hidden items-center gap-0.5 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/[0.07] ring-1 ring-inset ring-border/60"
                      transition={shouldReduceMotion ? { duration: 0 } : spring.snappy}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {mounted && (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDark ? 'sun' : 'moon'}
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.22, ease: ease.out }}
                    className="flex"
                  >
                    {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
                  </motion.span>
                </AnimatePresence>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full md:hidden"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/90 pt-24 backdrop-blur-xl md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-1 px-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.06 + index * 0.05,
                    duration: 0.4,
                    ease: ease.out,
                  }}
                  className={cn(
                    'flex items-center justify-between rounded-xl px-4 py-4 text-left text-lg font-medium transition-colors',
                    activeSection === item.href.slice(1)
                      ? 'bg-foreground/[0.06] text-brand-1'
                      : 'text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground'
                  )}
                >
                  {item.label}
                  <span className="font-mono text-xs opacity-40">
                    0{index + 1}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
