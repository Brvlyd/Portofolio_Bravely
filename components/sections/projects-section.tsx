'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { TiltCard } from '@/components/tilt-card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';

const projects = [
  {
    title: 'RetenSYNC',
    description: 'A live cloud application built with Next.js featuring static typing for correctness and safer refactors. Deployed on Vercel with configured builds, environment variables, and automatic preview/production releases on push.',
    tags: ['Next.js', 'TypeScript', 'Vercel', 'Cloud Deployment', 'GitHub'],
    github: 'https://github.com/Brvlyd/RetenSYNC',
    demo: 'https://retensync.vercel.app/auth/login',
    image: '/images/RetenSYNC.png',
  },
  {
    title: 'MarvelVerse',
    description: 'A user-centered Marvel-themed mobile app with visually engaging UI built in React Native. Features API integration to deliver interactive, personalized content with high accessibility and responsiveness.',
    tags: ['React Native', 'API Integration', 'UI/UX', 'Mobile Development'],
    github: 'https://github.com/Brvlyd/MarvelVerse',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1200px-Marvel_Logo.svg.png',
  },
  {
    title: 'Pekalongan Government Website Redesign',
    description: 'Complete redesign and frontend implementation for the Pekalongan Government website using HTML and Tailwind CSS. Integrated with Laravel backend and PHPMyAdmin database, managed through GitHub.',
    tags: ['HTML', 'Tailwind CSS', 'Laravel', 'UI/UX Design', 'Government Project'],
    github: 'https://github.com/dzikrirazzan/diskominfo_pekalongan',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lambang_Kota_Pekalongan.png',
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-40 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : {
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : {
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured{' '}
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
                Projects
              </motion.span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work demonstrating technical skills and problem-solving abilities
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
            {projects.map((project, index) => (
              <StaggerItem key={project.title}>
                <TiltCard maxTilt={8} scale={1.02} className="h-full">
                  <Card className="flex flex-col relative overflow-hidden hover:shadow-2xl transition-all duration-500 group border-2 h-full">
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={shouldReduceMotion ? {} : { x: '100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      />
                    </div>

                    <CardHeader className="relative">
                      <motion.div 
                        className="h-52 rounded-xl mb-4 relative overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-contain p-4"
                          onError={(e) => {
                            // Fallback to gradient background if image fails to load
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              parent.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-cyan-500');
                            }
                          }}
                        />
                        
                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                      <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <motion.div
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="text-xs hover:scale-110 transition-transform cursor-default hover:bg-blue-600/20"
                            >
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                      {project.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 glass dark:glass-dark hover:scale-105 transition-all duration-300"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.demo && (
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:scale-105 transition-all duration-300 shadow-lg"
                          asChild
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
