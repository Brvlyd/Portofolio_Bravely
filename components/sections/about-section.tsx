'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Award, Users, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';
import { TiltCard } from '@/components/tilt-card';

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : {
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : {
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About{' '}
              <motion.span 
                className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent"
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
                Me
              </motion.span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn more about my background, education, and what drives my passion for technology
            </p>
          </FadeIn>

          {/* Profile Image and Who I Am */}
          <FadeIn direction="up" delay={0.1} className="mb-12">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Profile Image */}
              <motion.div 
                className="w-full lg:w-1/3 flex justify-center lg:justify-start"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="/images/Bravely.png"
                    alt="Bravely Dirgayuska"
                    className="w-full h-96 object-cover object-top"
                    onError={(e) => {
                      // Fallback to Google Drive if local image fails
                      e.currentTarget.src = "https://drive.google.com/uc?id=1I_cnXq95bT7zK-XgN7COg7T09MpIl9T8";
                    }}
                  />
                </div>
              </motion.div>

              {/* Who I Am */}
              <div className="w-full lg:w-2/3 pt-10">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Who I Am</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I&apos;m a Computer Engineering student at Diponegoro University with a strong
                  enthusiasm for technological advancements and a constant motivation to learn
                  new things.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I combine solid technical fundamentals with well-developed communication,
                  teamwork, and problem-solving skills to deliver value and adapt quickly in
                  dynamic environments.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Beyond academics, I&apos;m actively involved in student organizations where I lead
                  social programs and human resource development initiatives, helping to create
                  meaningful impact in my community.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* What I Do - Centered */}
          <FadeIn direction="up" delay={0.2} className="mb-12">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">What I Do</h3>
              <ul className="space-y-3">
                {[
                  { color: 'from-blue-600 to-cyan-600', hoverColor: 'group-hover:text-blue-600', title: 'Frontend Development:', desc: 'Building responsive and user-friendly web applications using React, Next.js, and modern CSS frameworks' },
                  { color: 'from-cyan-600 to-emerald-600', hoverColor: 'group-hover:text-cyan-600', title: 'UI/UX Design:', desc: 'Creating intuitive and visually appealing user interfaces with a focus on accessibility' },
                  { color: 'from-emerald-600 to-teal-600', hoverColor: 'group-hover:text-emerald-600', title: 'Full-Stack Projects:', desc: 'Developing end-to-end solutions with integration of APIs, databases, and cloud deployment' },
                  { color: 'from-violet-600 to-purple-600', hoverColor: 'group-hover:text-violet-600', title: 'Community Leadership:', desc: 'Leading teams and organizing programs that drive social impact and professional development' },
                ].map((item, index) => (
                  <motion.li 
                    key={item.title}
                    className="flex items-start gap-3 group cursor-default"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: shouldReduceMotion ? 0 : 0.3 + index * 0.1,
                      duration: 0.4,
                    }}
                    whileHover={shouldReduceMotion ? {} : { x: 8 }}
                  >
                    <motion.div 
                      className={cn(`w-2 h-2 bg-gradient-to-r ${item.color} rounded-full mt-2 flex-shrink-0`)}
                      animate={shouldReduceMotion ? {} : { scale: [1, 1.3, 1] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: index * 0.3,
                      }}
                    />
                    <p className="text-muted-foreground">
                      <strong className={cn("text-foreground transition-colors", item.hoverColor)}>{item.title}</strong> {item.desc}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {highlights.map((highlight, index) => (
              <StaggerItem key={highlight.title}>
                <TiltCard maxTilt={8} scale={1.03} className="h-full">
                  <Card className="border-2 hover:border-blue-600 transition-all duration-500 hover:shadow-xl group relative overflow-hidden h-full">
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
                        className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 6 }}
                        transition={{ duration: 0.3 }}
                      >
                        <highlight.icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <h4 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">{highlight.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                    </CardContent>
                    
                    {/* Gradient border effect on hover */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
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
