'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper';

const experiences = [
  {
    type: 'work',
    title: 'Head of Human Resource Development Division',
    organization: 'Keluarga Mahasiswa Buddhis Dharmavamsa',
    period: 'December 2024 - Present',
    description: 'Designed end-to-end program workflows, actively participated in internal and external Buddhist Student Activity Unit events, and organized routine meetings to facilitate two-way information exchange.',
  },
  {
    type: 'work',
    title: 'Head of Social Department',
    organization: 'Computer Engineering Student Association',
    period: 'March 2024 - March 2025',
    description: 'Planned social program workflows, participated in external forums and community service, and scheduled monthly meetings to track progress and generate new service ideas.',
  },
  {
    type: 'work',
    title: 'Awardee, Bakti BCA Scholarship',
    organization: 'PT Bank Central Asia Tbk.',
    period: 'January 2024 - January 2025',
    description: 'Participated in self-development programs, gained familiarity with office environments and cross-division functions, and developed a Business Impact Plan for local MSMEs.',
  },
  {
    type: 'work',
    title: 'Speaker - SPACE Event',
    organization: 'Computer Engineering Student Association',
    period: 'January 2024 - January 2025',
    description: 'Created comprehensive materials and delivered engaging seminars about the Bakti BCA Scholarship, breaking down complex application steps into clear, actionable stages.',
  },
  {
    type: 'work',
    title: 'Internal Coordinator, Consumption Division',
    organization: 'LKMMD (Student Management Skills Training)',
    period: 'January 2024 - January 2025',
    description: 'Organized and supervised food distribution for major campus events, maintaining detailed budgets and coordinating with vendors to ensure smooth operations.',
  },
];

const education = [
  {
    degree: 'Bachelor of Computer Engineering',
    institution: 'Diponegoro University',
    location: 'Tembalang, Semarang',
    period: '2022 - 2026 (Expected)',
    description: 'Focus on software development, computer systems, and engineering principles.',
  },
  {
    degree: 'Senior High School',
    institution: 'State Senior High School 1 Jakarta',
    location: 'Jakarta',
    period: '2019 - 2022',
    description: 'Graduated with strong foundation in mathematics and sciences.',
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="experience" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-40 right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : {
            x: [0, -20, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          animate={shouldReduceMotion ? {} : {
            x: [0, 30, 0],
            y: [0, -20, 0],
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
              Experience &{' '}
              <motion.span 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
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
                Education
              </motion.span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My journey through leadership roles, professional development, and academic achievements
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-8">
            <FadeIn direction="left" delay={0.1}>
              <motion.div 
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 5 }}
                >
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </motion.div>
                <h3 className="text-2xl font-bold">Experience</h3>
              </motion.div>

              <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                {experiences.map((exp, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <motion.div 
                              className="w-1 h-full bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full min-h-[100px]"
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                delay: shouldReduceMotion ? 0 : 0.2 + index * 0.1,
                                duration: 0.5,
                              }}
                              style={{ originY: 0 }}
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{exp.title}</h4>
                              <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                                {exp.organization}
                              </p>
                              <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {exp.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <motion.div 
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -5 }}
                >
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold">Education</h3>
              </motion.div>

              <StaggerContainer className="space-y-6" staggerDelay={0.15}>
                {education.map((edu, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02, x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <motion.div 
                              className="w-1 h-full bg-gradient-to-b from-green-600 to-emerald-600 rounded-full min-h-[80px]"
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{ 
                                delay: shouldReduceMotion ? 0 : 0.3 + index * 0.15,
                                duration: 0.5,
                              }}
                              style={{ originY: 0 }}
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{edu.degree}</h4>
                              <p className="text-green-600 dark:text-green-400 font-medium mb-1">
                                {edu.institution}
                              </p>
                              <p className="text-sm text-muted-foreground mb-1">
                                {edu.location} • {edu.period}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: 0.5 }}
              >
                <Card className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2 overflow-hidden">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-4">Key Achievements</h4>
                    <ul className="space-y-2">
                      {[
                        'Bakti BCA Scholarship Awardee (2024-2025)',
                        'Leadership positions in multiple student organizations',
                        'Duolingo English Test Score: 135/160',
                        'Multiple technical certifications (ORACLE, Cisco, etc.)',
                      ].map((achievement, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start gap-2 group cursor-default"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: shouldReduceMotion ? 0 : 0.6 + i * 0.1,
                            duration: 0.3,
                          }}
                          whileHover={shouldReduceMotion ? {} : { x: 5 }}
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"
                            animate={shouldReduceMotion ? {} : { scale: [1, 1.3, 1] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: i * 0.2,
                            }}
                          />
                          <p className="text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{achievement}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
