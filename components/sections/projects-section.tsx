'use client';

import { useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const projects = [
  {
    title: 'RetenSYNC',
    description: 'A live cloud application built with Next.js featuring static typing for correctness and safer refactors. Deployed on Vercel with configured builds, environment variables, and automatic preview/production releases on push.',
    tags: ['Next.js', 'TypeScript', 'Vercel', 'Cloud Deployment', 'GitHub'],
    github: '#',
    demo: '#',
    image: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    title: 'MarvelVerse',
    description: 'A user-centered Marvel-themed mobile app with visually engaging UI built in React Native. Features API integration to deliver interactive, personalized content with high accessibility and responsiveness.',
    tags: ['React Native', 'API Integration', 'UI/UX', 'Mobile Development'],
    github: '#',
    image: 'bg-gradient-to-br from-red-500 to-pink-500',
  },
  {
    title: 'Pekalongan Government Website Redesign',
    description: 'Complete redesign and frontend implementation for the Pekalongan Government website using HTML and Tailwind CSS. Integrated with Laravel backend and PHPMyAdmin database, managed through GitHub.',
    tags: ['HTML', 'Tailwind CSS', 'Laravel', 'UI/UX Design', 'Government Project'],
    github: '#',
    image: 'bg-gradient-to-br from-green-500 to-emerald-500',
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float-reverse" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent animate-gradient-rotate" style={{ backgroundSize: '200% 200%' }}>Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work demonstrating technical skills and problem-solving abilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.title} 
                className={cn(
                  "flex flex-col relative overflow-hidden hover:shadow-2xl transition-all duration-500 group border-2 hover:-translate-y-2 card-3d",
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>

                <CardHeader className="relative">
                  <div className={cn(
                    `h-52 rounded-xl ${project.image} mb-4 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-all duration-500 shadow-lg`
                  )}>
                    <div className="text-white text-7xl font-bold opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      {project.title.charAt(0)}
                    </div>
                    
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="text-xs hover:scale-110 transition-transform cursor-default hover:bg-blue-600/20"
                      >
                        {tag}
                      </Badge>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
