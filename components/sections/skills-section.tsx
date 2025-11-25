'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code2, Palette, Database, Cloud, Wrench, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import { TiltCard } from '@/components/tilt-card';

const skillCategories = [
  {
    icon: Code2,
    title: 'Frontend Development',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'React Native'],
    color: 'from-blue-600 to-cyan-600',
    level: 90,
  },
  {
    icon: Database,
    title: 'Backend & Database',
    skills: ['Node.js', 'Laravel', 'SQL', 'PHPMyAdmin', 'Oracle Database', 'API Integration'],
    color: 'from-green-600 to-emerald-600',
    level: 75,
  },
  {
    icon: Palette,
    title: 'Design',
    skills: ['UI/UX Design', 'Figma', 'Adobe Illustrator', 'Responsive Design', 'Accessibility'],
    color: 'from-pink-600 to-rose-600',
    level: 85,
  },
  {
    icon: Cloud,
    title: 'DevOps & Tools',
    skills: ['Git', 'GitHub', 'Vercel', 'Cloud Deployment', 'Version Control'],
    color: 'from-orange-600 to-amber-600',
    level: 70,
  },
  {
    icon: Wrench,
    title: 'Programming Languages',
    skills: ['Python', 'Java', 'C/C++', 'JavaScript/TypeScript', 'PHP'],
    color: 'from-violet-600 to-purple-600',
    level: 80,
  },
  {
    icon: Users,
    title: 'Soft Skills',
    skills: ['Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Project Management', 'Public Speaking'],
    color: 'from-cyan-600 to-teal-600',
    level: 95,
  },
];

const certifications = [
  'ORACLE Java Programming',
  'Cisco CCNA Networking',
  'Digital Talent Java Fundamentals',
  'Database Foundations',
  'Duolingo English Test (135/160)',
];

interface SkillBarProps {
  level: number;
  color: string;
}

function SkillBar({ level, color }: SkillBarProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-3">
      <motion.div
        className={cn('h-full rounded-full bg-gradient-to-r', color)}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={shouldReduceMotion ? { duration: 0 } : {
          duration: 1,
          delay: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
    </div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="skills" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : {
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : {
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skills &{' '}
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
                Expertise
              </motion.span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and professional competencies
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12" staggerDelay={0.1}>
            {skillCategories.map((category, index) => (
              <StaggerItem key={category.title}>
                <TiltCard maxTilt={6} scale={1.02} className="h-full">
                  <Card className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 h-full">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={shouldReduceMotion ? {} : { x: '100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      />
                    </div>

                    <CardContent className="p-6 relative z-10">
                      <motion.div 
                        className={cn(
                          `w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`
                        )}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 6 }}
                        transition={{ duration: 0.3 }}
                      >
                        <category.icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.title}
                      </h3>
                      <SkillBar level={category.level} color={category.color} />
                      <div className="flex flex-wrap gap-2 mt-4">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: shouldReduceMotion ? 0 : (index * 0.1) + (skillIndex * 0.05),
                              duration: 0.3,
                            }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="text-xs hover:scale-110 transition-transform cursor-default"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>

                    {/* Gradient border effect on hover */}
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
                  </Card>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.4}>
            <Card className="relative overflow-hidden glass dark:glass-dark border-2 shadow-xl">
              <CardContent className="p-8 relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Certifications & Training
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: shouldReduceMotion ? 0 : 0.5 + (index * 0.1),
                        duration: 0.4,
                      }}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.03, x: 5 }}
                      className="flex items-center gap-3 p-4 bg-background/80 backdrop-blur-sm rounded-xl cursor-default group border border-transparent hover:border-blue-600/50 transition-all duration-300"
                    >
                      <motion.div 
                        className="w-3 h-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex-shrink-0"
                        animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: index * 0.2,
                        }}
                      />
                      <p className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cert}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>

              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 via-cyan-600 to-violet-600"
                  style={{ backgroundSize: '400% 400%' }}
                  animate={shouldReduceMotion ? {} : {
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
