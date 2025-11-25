'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, GraduationCap } from 'lucide-react';

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
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience & <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Education</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My journey through leadership roles, professional development, and academic achievements
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold">Experience</h3>
              </div>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-1 h-full bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{exp.title}</h4>
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
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold">Education</h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-1 h-full bg-gradient-to-b from-green-600 to-emerald-600 rounded-full" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{edu.degree}</h4>
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
                ))}
              </div>

              <Card className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-2">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-4">Key Achievements</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">Bakti BCA Scholarship Awardee (2024-2025)</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">Leadership positions in multiple student organizations</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">Duolingo English Test Score: 135/160</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">Multiple technical certifications (ORACLE, Cisco, etc.)</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
