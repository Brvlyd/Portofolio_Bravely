'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Mail, Sparkles, Code2, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/magnetic-button';
import { ScrollIndicator } from '@/components/scroll-indicator';
import { Typewriter } from '@/components/text-animations';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldReduceMotion) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const MotionWrapper = shouldReduceMotion ? 'div' : motion.div;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-purple-950/20"
        style={{ 
          backgroundSize: '400% 400%',
          y: shouldReduceMotion ? 0 : y,
        }}
        animate={shouldReduceMotion ? {} : {
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Animated orbs with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-500/30 dark:bg-blue-500/10 rounded-full blur-3xl will-change-transform"
          animate={shouldReduceMotion ? {} : {
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-cyan-500/30 dark:bg-cyan-500/10 rounded-full blur-3xl will-change-transform"
          animate={shouldReduceMotion ? {} : {
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-violet-500/30 dark:bg-violet-500/10 rounded-full blur-3xl will-change-transform"
          animate={shouldReduceMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/30 dark:bg-pink-500/10 rounded-full blur-3xl will-change-transform"
          animate={shouldReduceMotion ? {} : {
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Mouse follower effect */}
      {!shouldReduceMotion && (
        <motion.div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none will-change-transform"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 200,
          }}
        />
      )}

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity: shouldReduceMotion ? 1 : opacity }}
      >
        <MotionWrapper
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Badge with animation */}
          <MotionWrapper variants={itemVariants} className="mb-6">
            <motion.span 
              className="inline-flex items-center gap-2 px-5 py-2.5 glass dark:glass-dark text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              animate={shouldReduceMotion ? {} : {
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Sparkles className="w-4 h-4" />
              Welcome to my portfolio
              <Sparkles className="w-4 h-4" />
            </motion.span>
          </MotionWrapper>

          {/* Main heading with staggered animation */}
          <MotionWrapper variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              Hi, I&apos;m{' '}
              <span className="relative inline-block">
                <motion.span 
                  className="bg-gradient-to-r from-blue-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent"
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
                </motion.span>
                <motion.span 
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-violet-600/20 blur-2xl -z-10"
                  animate={shouldReduceMotion ? {} : { opacity: [0.5, 0.8, 0.5] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </span>
            </h1>
          </MotionWrapper>

          {/* Subtitle with typewriter effect */}
          <MotionWrapper variants={itemVariants} className="flex items-center justify-center gap-3 text-xl md:text-2xl text-muted-foreground mb-8 flex-wrap">
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Code2 className="w-6 h-6 text-blue-600" />
            </motion.div>
            <Typewriter 
              words={[
                'Computer Engineering Student',
                'Software Developer',
                'UI/UX Enthusiast',
                'Problem Solver',
              ]}
              className="font-medium"
            />
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <Rocket className="w-6 h-6 text-cyan-600" />
            </motion.div>
          </MotionWrapper>

          <MotionWrapper variants={itemVariants}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Passionate about technological advancement and continuous learning.
              I combine solid technical fundamentals with strong communication, teamwork,
              and problem-solving skills to deliver value in dynamic environments.
            </p>
          </MotionWrapper>

          {/* CTA Buttons with magnetic effect */}
          <MotionWrapper variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <MagneticButton strength={0.2}>
              <Button
                size="lg"
                onClick={scrollToContact}
                className="relative group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
                <Mail className="mr-2 h-5 w-5 relative z-10" />
                <span className="relative z-10">Get In Touch</span>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="glass dark:glass-dark transition-all duration-300 hover:shadow-lg border-2"
              >
                <a href="/resumes/CV Kreatif_Bravely Dirgayuska.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </a>
              </Button>
            </MagneticButton>
          </MotionWrapper>

          {/* Social Links with magnetic effect */}
          <MotionWrapper variants={itemVariants} className="flex items-center justify-center gap-6 mb-12">
            {[
              { href: 'https://www.linkedin.com/in/bravelyd/', icon: Linkedin, color: 'blue', rotate: -6 },
              { href: 'https://github.com/Brvlyd', icon: Github, color: 'gray', rotate: 0 },
              { href: 'mailto:bravelydirgayuska@gmail.com', icon: Mail, color: 'rose', rotate: 6 },
            ].map((social, index) => (
              <MagneticButton key={social.href} strength={0.3}>
                <motion.a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={cn(
                    "group relative w-16 h-16 flex items-center justify-center rounded-full glass dark:glass-dark transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/30",
                    social.color === 'blue' && 'hover:-rotate-6',
                    social.color === 'rose' && 'hover:rotate-6'
                  )}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.15 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                >
                  <social.icon className={cn(
                    "h-7 w-7 relative z-10 transition-transform duration-300 group-hover:scale-110",
                    social.color === 'blue' && 'text-blue-600 dark:text-blue-400',
                    social.color === 'gray' && 'text-gray-800 dark:text-gray-200',
                    social.color === 'rose' && 'text-rose-600 dark:text-rose-400'
                  )} />
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300",
                    social.color === 'blue' && 'bg-gradient-to-br from-blue-500 to-cyan-500',
                    social.color === 'gray' && 'bg-gradient-to-br from-gray-700 to-gray-900',
                    social.color === 'rose' && 'bg-gradient-to-br from-rose-500 to-pink-500'
                  )} />
                </motion.a>
              </MagneticButton>
            ))}
          </MotionWrapper>

          {/* Scroll indicator */}
          <MotionWrapper variants={itemVariants}>
            <ScrollIndicator targetSection="#about" className="mt-8" />
          </MotionWrapper>
        </MotionWrapper>
      </motion.div>
    </section>
  );
}
