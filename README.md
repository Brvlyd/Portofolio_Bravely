# 🌟 Bravely Dirgayuska's Portfolio

A modern, animated, and visually stunning portfolio website built with Next.js, featuring advanced animations, glassmorphism effects, and a sleek design.

![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-FF0055?style=for-the-badge&logo=framer)

## 🚀 Live Demo

Visit the live portfolio: [Your Vercel URL]

## ✨ Features

### 🎨 Modern Design
- **Glassmorphism Effects** - Frosted glass UI elements with backdrop blur
- **Gradient Animations** - Dynamic, rotating gradient text and backgrounds
- **Floating Bubbles** - Animated bubble background throughout the site
- **3D Card Transforms** - Interactive cards with depth and rotation effects
- **Dark/Light Mode** - Full theme switching support

### 🎭 Advanced Animations
- **Framer Motion** - Smooth, professional animations on all interactions
- **Scroll Animations** - Elements animate into view as you scroll
- **Hover Effects** - Interactive micro-animations on hover
- **Magnetic Buttons** - Buttons that follow cursor movement
- **Shimmer Effects** - Light sweep animations on cards
- **Floating Elements** - CSS-based floating animations

### 📱 Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Adaptive layouts

### 🎯 Sections
1. **Hero Section** - Eye-catching introduction with animated name, social links, and mouse-following gradient
2. **About Section** - Professional photo, personal background, and skills overview
3. **Skills Section** - Categorized technical skills with animated cards and certifications
4. **Projects Section** - Featured projects with descriptions and tech stacks
5. **Experience Section** - Work history and achievements
6. **Contact Section** - Get in touch form and information
7. **Footer** - Quick links and social connections

## 🛠️ Tech Stack

### Core
- **Next.js 13.5.1** - React framework for production
- **TypeScript 5.2.2** - Type-safe code
- **React 18.2.0** - UI library

### Styling
- **Tailwind CSS 3.3.3** - Utility-first CSS framework
- **tailwindcss-animate** - Animation utilities
- **next-themes** - Dark mode support

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon set
- **Shadcn/ui** - Re-usable component library

### Animations
- **Framer Motion** - Production-ready motion library
- **Custom CSS Animations** - Floating, shimmer, gradient effects

### Forms & Validation
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/Brvlyd/Portofolio_Bravely.git
cd Portofolio_Bravely
```

2. **Install dependencies**
```bash
npm install
```

3. **Add your profile image**
```bash
# Place your image at:
public/images/bravely.png
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 🎨 Customization

### Profile Image
Place your profile photo at `public/images/bravely.png`

### Personal Information
Edit the following files to customize your information:
- `components/sections/hero-section.tsx` - Name, title, social links
- `components/sections/about-section.tsx` - Bio and background
- `components/sections/skills-section.tsx` - Skills and certifications
- `components/sections/projects-section.tsx` - Projects showcase
- `components/sections/experience-section.tsx` - Work experience
- `components/sections/contact-section.tsx` - Contact information

### Resume/CV
Place your CV at `public/resumes/CV Kreatif_Bravely Dirgayuska.pdf`

### Colors & Theme
Modify `tailwind.config.ts` and `app/globals.css` for color schemes

## 📝 Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run typecheck
```

## 🎯 Key Features Breakdown

### Floating Bubbles (`components/floating-bubbles.tsx`)
- 15+ animated bubbles with random positions
- Smooth floating animations
- Multiple decorative gradient orbs

### Glassmorphism
- Transparent backgrounds with backdrop blur
- Light/dark mode compatible
- Used in navigation, cards, and overlays

### Scroll Animations (`hooks/use-scroll-animation.ts`)
- Intersection Observer-based
- Triggers when elements enter viewport
- Smooth, staggered animations

### 3D Card Effects
- CSS transform perspective
- Tilt on hover
- Depth and shadow effects

### Gradient Animations
- Rotating background gradients
- Animated text gradients
- Smooth color transitions

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

This is a personal portfolio, but feel free to:
- Report bugs
- Suggest improvements
- Use as inspiration for your own portfolio

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Bravely Dirgayuska**
- GitHub: [@Brvlyd](https://github.com/Brvlyd)
- LinkedIn: [Bravely Dirgayuska](https://www.linkedin.com/in/bravelyd/)
- Email: bravelydirgayuska@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [Lucide Icons](https://lucide.dev/) - Icons
- [Vercel](https://vercel.com/) - Deployment

## 📊 Performance

- ⚡ Lighthouse Score: 95+
- 🎨 First Contentful Paint: < 1.5s
- 📱 Mobile Optimized
- ♿ Accessibility Ready
- 🎭 Smooth 60fps Animations

## 🔮 Future Enhancements

- [ ] Blog section
- [ ] More project details
- [ ] Testimonials section
- [ ] Multi-language support
- [ ] Analytics integration

---

Made with ❤️ by Bravely Dirgayuska
