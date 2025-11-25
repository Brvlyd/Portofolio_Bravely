'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Mail, Sparkles, Code2, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 dark:from-blue-950/20 dark:via-cyan-950/20 dark:to-purple-950/20 animate-gradient-rotate" 
           style={{ backgroundSize: '400% 400%' }} />

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-500/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-cyan-500/30 dark:bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-violet-500/30 dark:bg-violet-500/10 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/30 dark:bg-pink-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Mouse follower effect */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className={cn(
          'max-w-4xl mx-auto text-center transition-all duration-1000',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        )}>
          {/* Badge with animation */}
          <div className="mb-6 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 glass dark:glass-dark text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4 animate-glow">
              <Sparkles className="w-4 h-4" />
              Welcome to my portfolio
              <Sparkles className="w-4 h-4" />
            </span>
          </div>

          {/* Main heading with staggered animation */}
          <h1 className={cn(
            "text-5xl md:text-7xl lg:text-8xl font-bold mb-6 transition-all duration-700",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )} style={{ animationDelay: '0.4s' }}>
            Hi, I'm{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent animate-gradient-rotate" style={{ backgroundSize: '200% 200%' }}>
                Bravely Dirgayuska
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-violet-600/20 blur-2xl -z-10 animate-pulse" />
            </span>
          </h1>

          {/* Subtitle with icons */}
          <div className={cn(
            "flex items-center justify-center gap-3 text-xl md:text-2xl text-muted-foreground mb-8 transition-all duration-700 flex-wrap",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )} style={{ animationDelay: '0.6s' }}>
            <Code2 className="w-6 h-6 text-blue-600 animate-float" />
            <span>Computer Engineering Student | Software Developer</span>
            <Rocket className="w-6 h-6 text-cyan-600 animate-float-reverse" />
          </div>

          <p className={cn(
            "text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )} style={{ animationDelay: '0.8s' }}>
            Passionate about technological advancement and continuous learning.
            I combine solid technical fundamentals with strong communication, teamwork,
            and problem-solving skills to deliver value in dynamic environments.
          </p>

          {/* CTA Buttons with hover effects */}
          <div className={cn(
            "flex flex-wrap items-center justify-center gap-4 mb-12 transition-all duration-700",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )} style={{ animationDelay: '1s' }}>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="relative group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
              <Mail className="mr-2 h-5 w-5 relative z-10" />
              <span className="relative z-10">Get In Touch</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="glass dark:glass-dark hover:scale-105 transition-all duration-300 hover:shadow-lg border-2"
            >
              <a href="\resumes\CV Kreatif_Bravely Dirgayuska.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>

          {/* Social Links with 3D effect */}
          <div className={cn(
            "flex items-center justify-center gap-4 transition-all duration-700",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )} style={{ animationDelay: '1.2s' }}>
            <a
              href="https://www.linkedin.com/in/bravelyd/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 rounded-2xl glass dark:glass-dark hover:scale-110 transition-all duration-300 hover:shadow-xl hover:-rotate-6"
            >
              <Linkedin className="h-6 w-6 text-blue-600 dark:text-blue-400 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
            </a>
            <a
              href="https://github.com/Brvlyd"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 rounded-2xl glass dark:glass-dark hover:scale-110 transition-all duration-300 hover:shadow-xl"
            >
              <Github className="h-6 w-6 text-gray-800 dark:text-gray-200 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
            </a>
            <a
              href="mailto:bravelydirgayuska@gmail.com"
              className="group relative p-4 rounded-2xl glass dark:glass-dark hover:scale-110 transition-all duration-300 hover:shadow-xl hover:rotate-6"
            >
              <Mail className="h-6 w-6 text-rose-600 dark:text-rose-400 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-500 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
