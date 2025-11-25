'use client';

import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Palette, Database, Cloud, Wrench, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend Development',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'React Native'],
    color: 'from-blue-600 to-cyan-600',
  },
  {
    icon: Database,
    title: 'Backend & Database',
    skills: ['Node.js', 'Laravel', 'SQL', 'PHPMyAdmin', 'Oracle Database', 'API Integration'],
    color: 'from-green-600 to-emerald-600',
  },
  {
    icon: Palette,
    title: 'Design',
    skills: ['UI/UX Design', 'Figma', 'Adobe Illustrator', 'Responsive Design', 'Accessibility'],
    color: 'from-pink-600 to-rose-600',
  },
  {
    icon: Cloud,
    title: 'DevOps & Tools',
    skills: ['Git', 'GitHub', 'Vercel', 'Cloud Deployment', 'Version Control'],
    color: 'from-orange-600 to-amber-600',
  },
  {
    icon: Wrench,
    title: 'Programming Languages',
    skills: ['Python', 'Java', 'C/C++', 'JavaScript/TypeScript', 'PHP'],
    color: 'from-violet-600 to-purple-600',
  },
  {
    icon: Users,
    title: 'Soft Skills',
    skills: ['Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Project Management', 'Public Speaking'],
    color: 'from-cyan-600 to-teal-600',
  },
];

const certifications = [
  'ORACLE Java Programming',
  'Cisco CCNA Networking',
  'Digital Talent Java Fundamentals',
  'Database Foundations',
  'Duolingo English Test (135/160)',
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skills & <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-violet-600 bg-clip-text text-transparent animate-gradient-rotate" style={{ backgroundSize: '200% 200%' }}>Expertise</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and professional competencies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {skillCategories.map((category, index) => (
              <Card 
                key={category.title} 
                className={cn(
                  "group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-3d border-2",
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                <CardContent className="p-6 relative z-10">
                  <div className={cn(
                    `w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`
                  )}>
                    <category.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className={cn(
                          "text-xs hover:scale-110 transition-transform cursor-default",
                          `hover:bg-gradient-to-r hover:${category.color} hover:text-white`
                        )}
                        style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
              </Card>
            ))}
          </div>

          <Card className={cn(
            "relative overflow-hidden glass dark:glass-dark border-2 shadow-xl transition-all duration-700",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )} style={{ animationDelay: '0.8s' }}>
            <CardContent className="p-8 relative z-10">
              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Certifications & Training
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <div
                    key={cert}
                    className={cn(
                      "flex items-center gap-3 p-4 bg-background/80 backdrop-blur-sm rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default group border border-transparent hover:border-blue-600/50",
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                    )}
                    style={{ animationDelay: `${0.9 + (index * 0.1)}s` }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex-shrink-0 group-hover:animate-pulse" />
                    <p className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cert}</p>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-cyan-600 to-violet-600 animate-gradient-rotate" style={{ backgroundSize: '400% 400%' }} />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
