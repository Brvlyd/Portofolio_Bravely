/**
 * Single source of truth for every piece of CV content on the site.
 * Mirrors CV_ATS_Bravely_Dirgayuska.pdf — keep the two in sync. Note the
 * download button now serves CV_Bravely_Dirgayuska.pdf, which is a different
 * (student-era) revision; the on-page copy below still follows the ATS one.
 */

export const profile = {
  name: 'Bravely Dirgayuska',
  initials: 'BD',
  title: 'Computer Engineering Graduate',
  location: 'Jakarta, Indonesia',
  email: 'bravelydirgayuska@gmail.com',
  phone: '+62 811-8899-743',
  phoneHref: 'tel:+628118899743',
  linkedin: 'https://www.linkedin.com/in/bravelyd/',
  github: 'https://github.com/Brvlyd',
  // Underscored filename keeps the download URL free of percent-encoding.
  resume: '/resumes/CV_Bravely_Dirgayuska.pdf',
  resumeFilename: 'CV_Bravely_Dirgayuska.pdf',
  roles: [
    'Computer Engineering Graduate',
    'Full-Stack Developer',
    'Next.js & TypeScript',
    'Embedded & Hardware',
  ],
  summary:
    'Computer Engineering graduate with a motivation to learn all about technological advancements and a constant motivation to learn new things. I combine solid technical fundamentals with well-developed communication, teamwork, and problem-solving skills to deliver value and adapt quickly in dynamic environments.',
};

export type Project = {
  title: string;
  /** Short subtitle shown under the title, e.g. "Point-of-Sale & Inventory System". */
  kind?: string;
  year: string;
  summary: string;
  highlights: string[];
  tags: string[];
  github?: string;
  demo?: string;
  /** Omitted for projects with no logo — the card falls back to `icon`. */
  image?: string;
  /** Lucide icon name used when there is no logo image. */
  icon?: 'circuit';ks). */
  imageBg?: string;
};

export const projects: Project[] = [
  {
  /** Override for logos that need a fixed backdrop (e.g. light-on-dark mar
    title: 'SITOMAS Kresno',
    kind: 'Point-of-Sale & Inventory System',
    year: '2026',
    summary:
      'A production system now in daily commercial use at a gold jewelry retailer, unifying sales, purchasing, stock, pawning, repair services, and receivables into a single workflow.',
    highlights: [
      'Barcode scanning and printable invoices across the full sales workflow',
      'Weight-based gold pricing per karat, buyback valuation, and monthly pawn interest with auto-generated installment schedules, plus consolidated financial reporting',
      'Secured with Supabase Auth, Row-Level Security, a server-verified PIN gate, and idle auto-logout',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL RLS'],
    github: 'https://github.com/Brvlyd/kresno',
    demo: 'https://sitomaskresno.vercel.app',
    image: '/images/logo-kresno.webp',
  },
  {
    title: 'Bearion',
    kind: 'Full-Stack E-Commerce Platform',
    year: '2026',
    summary:
      'A bilingual storefront for a clothing brand with a complete order lifecycle including cancellation and shipment tracking, plus an admin dashboard for products, pricing, and promotions.',
    highlights: [
      'PayPal integration with server-side capture verification, plus manual bank transfer with admin-verified proofs',
      'Multi-courier shipping rates and tracking, with live IDR/USD conversion',
      'Secured with role-based access control and PostgreSQL Row-Level Security',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PayPal', 'Biteship'],
    github: 'https://github.com/Brvlyd/bearions',
    demo: 'https://bearions.store',
    image: '/images/bearion-logo2-light.webp',
    // The Bearion mark is a light outline, so it needs a dark panel in both themes.
    imageBg: 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900',
  },
  {
    title: 'November Coffee',
    kind: 'Cafe Management System',
    year: '2025',
    summary:
      'Multi-shift employee attendance tracking, automated payroll calculation with salary-slip generation, and real-time inventory management.',
    highlights: [
      'Scheduled operations running through automated cron jobs on Vercel',
      'OCR-powered receipt processing that extracts data from photographs automatically',
      'Role-based authentication and a three-shift system with WIB timezone handling',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'OCR.space', 'Vercel'],
    github: 'https://github.com/Brvlyd/november-coffee',
    demo: 'https://november-coffee.vercel.app',
    image: '/images/november_logo.webp',
  },
  {
    title: 'ICE Logger',
    kind: 'Internal Combustion Engine Data Logger',
    year: '2026',
    summary:
      'Final-year project: a multisensor data-acquisition system monitoring real-time engine performance across RPM, torque, fuel consumption, temperature, and airflow.',
    highlights: [
      'Custom 2-layer PCB with modular RJ45 sensor connectors and signal-conditioning circuitry',
      'Five sensor types integrated via ADC modules and an ATmega328P microcontroller',
      'Sensor calibration and functional testing, with real-time output via LCD and UART serial communication to a PC',
    ],
    tags: ['ATmega328P', 'PCB Design', 'C/C++', 'ADC', 'UART'],
    icon: 'circuit',
  },
  {
    title: 'Pekalongan Government Website',
    kind: 'Public-Sector Redesign',
    year: '2024',
    summary:
      'Led the UI redesign of a public-sector website into a modern, responsive platform built to accessibility standards.',
    highlights: [
      'Frontend implemented in HTML and Tailwind CSS',
      'Backend operations integrated with the Laravel PHP framework, database managed through phpMyAdmin',
      'Team contributions coordinated via GitHub version control',
    ],
    tags: ['Laravel', 'PHP', 'Tailwind CSS', 'MySQL'],
    github: 'https://github.com/dzikrirazzan/diskominfo_pekalongan',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lambang_Kota_Pekalongan.png',
  },
  {
    title: 'RetenSYNC',
    kind: 'Cloud-Deployed Web App',
    year: '2025',
    summary:
      'A live, user-accessible application designed, implemented, and deployed on modern cloud infrastructure.',
    highlights: [
      'Built with Next.js and static typing for correctness and safer refactors',
      'Deployed to Vercel via GitHub with configured build settings and environment variables',
      'Automatic preview deployments and production releases on push',
    ],
    tags: ['Next.js', 'TypeScript', 'Vercel'],
    github: 'https://github.com/Brvlyd/RetenSYNC',
    demo: 'https://retensync.vercel.app/auth/login',
    image: '/images/RetenSYNC.webp',
  },
  {
    title: 'MarvelVerse',
    kind: 'Cross-Platform Mobile App',
    year: '2024',
    summary:
      'A Marvel-universe mobile app with a UI designed for usability and engaging aesthetics for fans.',
    highlights: [
      'Cross-platform frontend engineered in React Native',
      'API-driven content for interactive, personalized user experiences',
      'Built for high accessibility and responsiveness',
    ],
    tags: ['React Native', 'API Integration', 'UI/UX'],
    github: 'https://github.com/Brvlyd/MarvelVerse',
    image: '/images/marvel.webp',
  },
];

export type Experience = {
  role: string;
  organization: string;
  period: string;
  kind: 'internship' | 'organization';
  note?: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    role: 'IT Intern — Information System & Technology Division',
    organization: 'PT Toyota Motor Manufacturing Indonesia',
    period: 'Feb 2026 – Aug 2026',
    kind: 'internship',
    note: 'Infra-Security Standardization Department',
    points: [
      'Supported the company-wide MFA Integration Project across Email OTP, WhatsApp OTP, Authenticator App (TOTP), and Device Passkey — preparing integration documentation, rollout schedules, and stakeholder presentations.',
      'Authored the full MFA test documentation set (IFT, BCT, UT) covering OTP timeout, failed-attempt limit, and grace-period scenarios, plus the Bahasa Indonesia end-user login manual for all four authentication paths.',
      'Developed Secure Coding Awareness training materials for the ISTD team on input validation, SQL injection and XSS prevention, SAST/DAST with SonarQube, and the vulnerability remediation flow.',
      'Automated administrative document handling with Excel VBA macros for formatting, print layout, and batch file processing, eliminating hours of repetitive manual work each week.',
      'Produced user-facing SOPs for LAN and Wi-Fi connectivity troubleshooting, and researched open-source tooling for internal adoption across credential management, uptime monitoring, and internal documentation.',
    ],
  },
  {
    role: 'Speaker, SPACE Program',
    organization: 'Computer Engineering Student Association',
    period: 'Jan 2024 – Jan 2025',
    kind: 'organization',
    points: [
      'Designed and delivered seminars introducing the Bakti BCA Scholarship to prospective applicants, breaking a complex application process into clear, actionable stages.',
      'Coached participants on interview technique, document preparation, and communication skills.',
    ],
  },
  {
    role: 'Head of Human Resource Development Division',
    organization: 'Keluarga Mahasiswa Buddhis Dharmavamsa',
    period: 'Dec 2024 – Dec 2025',
    kind: 'organization',
    points: [
      'Led the HRD division, designing end-to-end program workflows from initial concept through execution and post-event evaluation.',
      'Established routine meetings as a structured two-way feedback channel between members and leadership.',
    ],
  },
  {
    role: 'Head of Social Division',
    organization: 'Computer Engineering Student Association',
    period: 'Mar 2024 – Mar 2025',
    kind: 'organization',
    points: [
      "Planned and ran the division's social and community service programs, coordinating monthly progress reviews.",
      'Represented the association in external forums and inter-faculty community service activities.',
    ],
  },
];

/** Smaller roles the CV groups into a single "Additional involvement" line. */
export const additionalInvolvement = [
  'Member, Google Developer Student Club (2023 – 2024)',
  'Member, Software Division, Computer Engineering Research Club (2023 – 2024)',
  'Internal Coordinator, Consumption Division, LKMM-D (2024)',
];

export const education = [
  {
    degree: 'Computer Engineering',
    institution: 'Diponegoro University',
    location: 'Semarang, Indonesia',
    period: '2022 – 2026',
    score: 'GPA 3.77 / 4.00',
    project: 'Final-Year Project — ICE Logger (Internal Combustion Engine Data Logger)',
  },
];

/** Mirrors the CV's Technical Skills table, category for category. */
export const skillGroups = [
  {
    title: 'Programming',
    icon: 'code',
    color: 'from-blue-500 to-cyan-400',
    skills: ['TypeScript', 'JavaScript', 'Java', 'SQL', 'PHP', 'C/C++ (embedded)', 'VBA'],
  },
  {
    title: 'Frameworks',
    icon: 'layers',
    color: 'from-violet-500 to-purple-400',
    skills: ['Next.js', 'React', 'React Native', 'Tailwind CSS', 'Laravel'],
  },
  {
    title: 'Backend & Data',
    icon: 'database',
    color: 'from-emerald-500 to-teal-400',
    skills: [
      'Supabase',
      'PostgreSQL',
      'Row-Level Security',
      'REST APIs',
      'Authentication & session management',
    ],
  },
  {
    title: 'Security',
    icon: 'shield',
    color: 'from-indigo-500 to-violet-400',
    skills: [
      'MFA / TOTP',
      'Secure coding',
      'SAST & DAST with SonarQube',
      'Input validation',
      'SQL injection & XSS prevention',
    ],
  },
  {
    title: 'Tools',
    icon: 'wrench',
    color: 'from-amber-500 to-orange-400',
    skills: ['Git & GitHub', 'Vercel', 'Figma', 'phpMyAdmin', 'Microsoft Excel (VBA)'],
  },
  {
    title: 'Hardware & Network',
    icon: 'cpu',
    color: 'from-rose-500 to-pink-400',
    skills: [
      'ATmega328P',
      'ADC sensor integration',
      'PCB design',
      'UART',
      'IP addressing',
      'Routing & switching',
    ],
  },
];

export const languages = [
  { name: 'Bahasa Indonesia', level: 'Native' },
  { name: 'English', level: 'Intermediate working proficiency' },
];

// The hero ticker renders brand logos from lib/tech-icons.ts (auto-generated).

export const certifications = [
  {
    name: 'Bakti BCA Scholarship Awardee',
    issuer: 'PT Bank Central Asia Tbk',
    year: '2024 – 2025',
    detail:
      'Completed mentoring, workshops, and seminars; developed a Business Impact Plan for local MSMEs.',
    award: true,
  },
  {
    name: 'Digital Talent: Java Fundamentals & Programming',
    issuer: 'Pusbang Profesi dan Sertifikasi',
    year: '2024',
  },
  { name: 'Java Programming', issuer: 'Oracle Academy', year: '2024' },
  { name: 'Java Fundamentals', issuer: 'Oracle Academy', year: '2023' },
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
    description: 'Computer Engineering, Diponegoro University — GPA 3.77/4.00 (2022–2026)',
  },
  {
    icon: 'briefcase',
    title: 'Internship',
    description:
      'IT Intern, Infra-Security Standardization at PT Toyota Motor Manufacturing Indonesia',
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
      'End-to-end apps on Next.js and Supabase — auth, role-based access, payments, and real business workflows now in daily commercial use.',
  },
  {
    title: 'Frontend Engineering',
    description:
      'Responsive, accessible interfaces with React, TypeScript, and Tailwind CSS, tuned for performance.',
  },
  {
    title: 'Security-Minded Delivery',
    description:
      'MFA rollouts, secure coding practices, and SAST/DAST review carried over from enterprise experience at Toyota.',
  },
  {
    title: 'Hardware & Embedded',
    description:
      'Multisensor data acquisition on ATmega328P, custom 2-layer PCB design, ADC integration, and UART telemetry.',
  },
];
