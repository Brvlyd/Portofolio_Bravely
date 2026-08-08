/**
 * Single source of truth for every piece of CV content on the site.
 * Sections read from here so copy stays in sync with the résumé.
 */

export const profile = {
  name: 'Bravely Dirgayuska',
  initials: 'BD',
  title: 'Computer Engineering Graduate',
  location: 'Jakarta, Indonesia',
  email: 'bravelydirgayuska@gmail.com',
  phone: '+62 811-889-9743',
  phoneHref: 'tel:+628118899743',
  linkedin: 'https://www.linkedin.com/in/bravelyd/',
  github: 'https://github.com/Brvlyd',
  // Underscored filename keeps the download URL free of percent-encoding.
  resume: '/resumes/CV_ATS_Bravely_Dirgayuska.pdf',
  resumeFilename: 'CV_ATS_Bravely_Dirgayuska.pdf',
  roles: [
    'Computer Engineering Graduate',
    'Full-Stack Web Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
  ],
  summary:
    'A Computer Engineering graduate driven to keep up with every technological advancement and to keep learning. I pair solid technical fundamentals with communication, teamwork, and problem-solving skills to deliver value and adapt fast in dynamic environments.',
};

export type Project = {
  title: string;
  summary: string;
  highlights: string[];
  tags: string[];
  github?: string;
  demo?: string;
  image: string;
  /** Override for logos that need a fixed backdrop (e.g. light-on-dark marks). */
  imageBg?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: 'SITOMAS Kresno',
    summary:
      'Production point-of-sale and inventory system for a gold jewelry store, unifying sales, purchasing, stock, pawning, repair services, and receivables into a single workflow.',
    highlights: [
      'Barcode scanning and printable invoices across the full sales workflow',
      'Weight-based gold pricing per karat, buyback valuation, and monthly pawn interest with auto-generated installment schedules',
      'Secured with Supabase Auth, Row-Level Security, a server-verified PIN gate, and idle auto-logout',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL RLS', 'POS'],
    github: 'https://github.com/Brvlyd/kresno',
    demo: 'https://sitomaskresno.vercel.app',
    image: '/images/logo-kresno.png',
    featured: true,
  },
  {
    title: 'Bearion',
    summary:
      'Full-stack e-commerce platform for a clothing brand, covering a bilingual storefront, a complete order lifecycle with cancellation and shipment tracking, and an admin dashboard for products, pricing, and promotions.',
    highlights: [
      'PayPal integration with server-side capture verification, plus manual bank transfer with admin-verified proofs',
      'Multi-courier shipping rates and tracking via Biteship with live IDR/USD conversion',
      'Role-based access control backed by PostgreSQL Row-Level Security',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PayPal', 'E-commerce'],
    github: 'https://github.com/Brvlyd/bearions',
    demo: 'https://bearions.store',
    image: '/images/bearion-logo2-light.png',
    // The Bearion mark is a light outline, so it needs a dark panel in both themes.
    imageBg: 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900',
    featured: true,
  },
  {
    title: 'November Coffee',
    summary:
      'Full-stack cafe management system with multi-shift employee attendance tracking, automated payroll calculation, and real-time inventory management, deployed on Vercel with automated cron jobs.',
    highlights: [
      'AI-powered OCR receipt processing that extracts data from photos automatically',
      'Flexible 3-shift system with WIB timezone handling and multiple shifts per employee per day',
      'Admin dashboards for attendance, employees, inventory, and payroll with automatic salary slip generation',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'AI / OCR', 'Tailwind CSS'],
    github: 'https://github.com/Brvlyd/november-coffee',
    demo: 'https://november-coffee.vercel.app',
    image: '/images/november_logo.png',
    featured: true,
  },
  {
    title: 'RetenSYNC',
    summary:
      'A live, user-accessible application designed, implemented, and deployed on modern cloud infrastructure.',
    highlights: [
      'Built with Next.js and static typing for correctness, safer refactors, and clearer module/API contracts',
      'Deployed to Vercel via GitHub with configured build settings and environment variables',
      'Automatic preview deployments and production releases on push',
    ],
    tags: ['Next.js', 'TypeScript', 'Vercel', 'Cloud Deployment'],
    github: 'https://github.com/Brvlyd/RetenSYNC',
    demo: 'https://retensync.vercel.app/auth/login',
    image: '/images/RetenSYNC.png',
  },
  {
    title: 'MarvelVerse',
    summary:
      'A Marvel-universe mobile app with a UI designed for usability and engaging aesthetics for fans.',
    highlights: [
      'Cross-platform frontend engineered in React Native',
      'API-driven content for interactive, personalized user experiences',
      'Built for high accessibility and responsiveness',
    ],
    tags: ['React Native', 'API Integration', 'UI/UX', 'Mobile'],
    github: 'https://github.com/Brvlyd/MarvelVerse',
    image: '/images/marvel.png',
  },
  {
    title: 'Pekalongan Government Website Redesign',
    summary:
      'Led the UI redesign of a government website, transforming it into a modern, responsive platform that meets accessibility standards.',
    highlights: [
      'Frontend developed with HTML and Tailwind CSS for a consistent experience across devices',
      'Backend operations integrated with the Laravel PHP framework and PHPMyAdmin databases',
      'Team contributions coordinated through GitHub version control',
    ],
    tags: ['HTML', 'Tailwind CSS', 'Laravel', 'UI/UX Design'],
    github: 'https://github.com/dzikrirazzan/diskominfo_pekalongan',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lambang_Kota_Pekalongan.png',
  },
];

export type Experience = {
  role: string;
  organization: string;
  period: string;
  kind: 'internship' | 'organization' | 'experience';
  points: string[];
};

export const experiences: Experience[] = [
  {
    role: 'Infra-Security Standardization Intern',
    organization: 'PT. Toyota Motor Manufacturing Indonesia',
    period: 'February 2025 – August 2025',
    kind: 'internship',
    points: [
      'Supported the company-wide MFA Integration Project across Email OTP, WhatsApp OTP, Authenticator App (TOTP), and Device Passkey, preparing integration documentation, rollout schedules, and stakeholder presentations.',
      'Authored the MFA test documentation (IFT, BCT, UT) covering OTP timeout, failed-attempt limit, and grace-period scenarios, plus the Bahasa Indonesia end-user login manual for all four authentication paths.',
      'Developed Secure Coding Awareness training scripts and materials on input validation, SQL injection and XSS prevention, SAST/DAST with SonarQube, and vulnerability remediation flow.',
      'Automated administrative document handling with Excel VBA macros for formatting, print layout, and batch file processing, cutting repetitive manual work.',
    ],
  },
  {
    role: 'Head of Human Resource Development Division',
    organization: 'Keluarga Mahasiswa Buddhis Dharmavamsa',
    period: 'December 2024 – December 2025',
    kind: 'organization',
    points: [
      'Designed workflows for programs, from initial concept to evaluation.',
      'Attended internal and external events of the Buddhist Student Activity Unit.',
      'Organized routine meetings as a medium for two-way information exchange.',
    ],
  },
  {
    role: 'Head of Social Division',
    organization: 'Computer Engineering Student Association',
    period: 'March 2024 – March 2025',
    kind: 'organization',
    points: [
      'Planned workflows for social programs.',
      'Participated in external activities such as forums and community service.',
      'Scheduled monthly meetings for program progress and community service ideas.',
    ],
  },
  {
    role: 'Speaker, SPACE',
    organization: 'Computer Engineering Student Association',
    period: 'January 2024 – January 2025',
    kind: 'experience',
    points: [
      'Created presentations and comprehensive materials introducing the Bakti BCA Scholarship, addressing both general procedures and frequently asked questions.',
      'Delivered engaging seminars that broke complex application steps into clear, actionable stages.',
      'Shared practical strategies for interviews, document preparation, and communication skills.',
    ],
  },
  {
    role: 'Awardee, Bakti BCA Scholarship',
    organization: 'PT Bank Central Asia Tbk.',
    period: 'January 2024 – January 2025',
    kind: 'experience',
    points: [
      'Actively participated in self-development programs like mentoring, workshops, and seminars.',
      'Became familiar with office environments and the functions of company divisions.',
      'Developed a Business Impact Plan for local MSMEs.',
    ],
  },
  {
    role: 'Internal Coordinator, Consumption Division',
    organization: 'Latihan Ketrampilan Manajemen Mahasiswa Dasar',
    period: 'January 2024 – January 2025',
    kind: 'experience',
    points: [
      'Organized and supervised the distribution of food and refreshments for major campus events.',
      'Maintained a detailed budget, coordinated with vendors, and adjusted provisions based on attendance.',
      'Led a team of volunteers to ensure smooth operations during high-attendance events.',
    ],
  },
  {
    role: 'Member, Google Developer Student Club',
    organization: 'Google Developer Student Club',
    period: 'December 2023 – December 2024',
    kind: 'organization',
    points: ['Visited and observed office environments at Menara BCA, Thamrin Main Branch Office.'],
  },
  {
    role: 'Member, Software Division',
    organization: 'Computer Engineering Research Club',
    period: 'April 2023 – April 2024',
    kind: 'organization',
    points: [
      'Learned various software and coding languages, and applied programming skills in practice.',
    ],
  },
];

export const education = [
  {
    degree: "Bachelor's Degree, Computer Engineering",
    institution: 'Diponegoro University',
    location: 'Tembalang, Semarang',
    period: '2026',
    score: 'GPA 3.77 / 4.00',
  },
  {
    degree: 'Senior High School',
    institution: 'State Senior High School 1 Jakarta',
    location: 'Jakarta',
    period: '2022',
    score: 'Final Score 89.09 / 100',
  },
];

export const skillGroups = [
  {
    title: 'Frontend Development',
    icon: 'code',
    color: 'from-blue-500 to-cyan-400',
    level: 90,
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'React Native'],
  },
  {
    title: 'Backend & Database',
    icon: 'database',
    color: 'from-emerald-500 to-teal-400',
    level: 78,
    skills: ['Node.js', 'Laravel', 'Supabase', 'PostgreSQL (RLS)', 'SQL', 'PHPMyAdmin', 'REST APIs'],
  },
  {
    title: 'Security & Quality',
    icon: 'shield',
    color: 'from-indigo-500 to-violet-400',
    level: 75,
    skills: ['MFA / OTP / TOTP', 'Secure Coding', 'SAST & DAST', 'SonarQube', 'Row-Level Security'],
  },
  {
    title: 'Design',
    icon: 'palette',
    color: 'from-pink-500 to-rose-400',
    level: 85,
    skills: ['UI/UX Design', 'Figma', 'Adobe Illustrator', 'Responsive Design', 'Accessibility'],
  },
  {
    title: 'DevOps & Tools',
    icon: 'cloud',
    color: 'from-amber-500 to-orange-400',
    level: 72,
    skills: ['Git', 'GitHub', 'Vercel', 'Cron Jobs', 'VBA / Excel Automation'],
  },
  {
    title: 'Languages & Soft Skills',
    icon: 'users',
    color: 'from-cyan-500 to-sky-400',
    level: 92,
    skills: ['Python', 'Java', 'C/C++', 'PHP', 'Leadership', 'Public Speaking', 'Teamwork'],
  },
];

// The hero ticker renders brand logos from lib/tech-icons.ts (auto-generated).

export const certifications = [
  {
    name: 'Digital Talent Java Fundamentals & Programming',
    issuer: 'Pusbang Profesi dan Sertifikasi',
    year: '2024',
  },
  { name: 'Duolingo English Test — 135/160', issuer: 'Duolingo', year: '2024' },
  { name: 'Java Programming', issuer: 'ORACLE Academy', year: '2024' },
  { name: 'Java Fundamentals', issuer: 'ORACLE Academy', year: '2023' },
  {
    name: 'IT Essentials: PC Hardware and Software',
    issuer: 'Cisco Networking Academy',
    year: '2023',
  },
];

export const highlights = [
  {
    icon: 'graduation',
    title: 'Education',
    description: 'Computer Engineering, Diponegoro University — GPA 3.77/4.00 (2026)',
  },
  {
    icon: 'briefcase',
    title: 'Internship',
    description: 'Infra-Security Standardization at PT. Toyota Motor Manufacturing Indonesia',
  },
  {
    icon: 'award',
    title: 'Scholarship',
    description: 'Bakti BCA Scholarship Awardee (2024–2025)',
  },
  {
    icon: 'users',
    title: 'Leadership',
    description: 'Head of HRD Division and Head of Social Division in student organizations',
  },
];

export const whatIDo = [
  {
    title: 'Full-Stack Product Work',
    description:
      'End-to-end apps on Next.js and Supabase — auth, role-based access, payments, and real business workflows.',
  },
  {
    title: 'Frontend Engineering',
    description:
      'Responsive, accessible interfaces with React, TypeScript, and modern CSS, tuned for performance.',
  },
  {
    title: 'Security-Minded Delivery',
    description:
      'MFA rollouts, secure coding practices, and SAST/DAST review carried over from enterprise experience.',
  },
  {
    title: 'Community Leadership',
    description:
      'Leading divisions and programs that drive social impact and professional development.',
  },
];
