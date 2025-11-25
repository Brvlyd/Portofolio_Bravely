'use client';

import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Award, Users, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const highlights = [
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Bachelor in Computer Engineering at Diponegoro University (Expected 2026)',
  },
  {
    icon: Award,
    title: 'Scholarship',
    description: 'Bakti BCA Scholarship Awardee (2024-2025)',
  },
  {
    icon: Users,
    title: 'Leadership',
    description: 'Head of Social Department & HRD Division in student organizations',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Built and deployed multiple web applications with modern tech stacks',
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-reverse" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent animate-gradient-rotate" style={{ backgroundSize: '200% 200%' }}>Me</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn more about my background, education, and what drives my passion for technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className={cn(
              "transition-all duration-700",
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            )} style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Who I Am</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a Computer Engineering student at Diponegoro University with a strong
                enthusiasm for technological advancements and a constant motivation to learn
                new things.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I combine solid technical fundamentals with well-developed communication,
                teamwork, and problem-solving skills to deliver value and adapt quickly in
                dynamic environments.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Beyond academics, I'm actively involved in student organizations where I lead
                social programs and human resource development initiatives, helping to create
                meaningful impact in my community.
              </p>
            </div>

            <div className={cn(
              "transition-all duration-700",
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            )} style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">What I Do</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground group-hover:text-blue-600 transition-colors">Frontend Development:</strong> Building
                    responsive and user-friendly web applications using React, Next.js, and modern CSS frameworks
                  </p>
                </li>
                <li className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground group-hover:text-cyan-600 transition-colors">UI/UX Design:</strong> Creating intuitive
                    and visually appealing user interfaces with a focus on accessibility
                  </p>
                </li>
                <li className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground group-hover:text-emerald-600 transition-colors">Full-Stack Projects:</strong> Developing
                    end-to-end solutions with integration of APIs, databases, and cloud deployment
                  </p>
                </li>
                <li className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground group-hover:text-violet-600 transition-colors">Community Leadership:</strong> Leading
                    teams and organizing programs that drive social impact and professional development
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card 
                key={highlight.title} 
                className={cn(
                  "border-2 hover:border-blue-600 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl card-3d group relative overflow-hidden",
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ animationDelay: `${0.6 + (index * 0.1)}s` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <CardContent className="p-6 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <highlight.icon className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">{highlight.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                </CardContent>
                
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
