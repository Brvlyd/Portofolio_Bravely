import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { heroui } from '@heroui/react';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Content data holds class names (gradients, image backdrops) too — without
    // this glob those utilities get purged from the build.
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/components/(button|card|input|textarea|chip|accordion|navbar|modal|image|spinner|ripple|divider|avatar|tabs|link).js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        display: ['var(--font-display)', 'var(--font-sans)', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        brand: {
          1: 'hsl(var(--brand-1))',
          2: 'hsl(var(--brand-2))',
          3: 'hsl(var(--brand-3))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // HeroUI's colors mirror --brand-1 (blue) / --brand-3 (violet) from
    // globals.css — kept as literal hsl() here since this file runs outside
    // the browser and can't read CSS custom properties at build time.
    heroui({
      themes: {
        light: {
          colors: {
            background: 'hsl(210, 40%, 99%)',
            foreground: 'hsl(222, 47%, 11%)',
            divider: 'hsl(214, 32%, 91%)',
            focus: 'hsl(217, 91%, 60%)',
            content1: 'hsl(0, 0%, 100%)',
            primary: {
              DEFAULT: 'hsl(217, 91%, 60%)',
              foreground: 'hsl(210, 40%, 98%)',
            },
            secondary: {
              DEFAULT: 'hsl(258, 90%, 66%)',
              foreground: 'hsl(210, 40%, 98%)',
            },
          },
        },
        dark: {
          colors: {
            background: 'hsl(224, 47%, 5%)',
            foreground: 'hsl(210, 40%, 98%)',
            divider: 'hsl(217, 33%, 17%)',
            focus: 'hsl(213, 94%, 68%)',
            content1: 'hsl(224, 40%, 8%)',
            primary: {
              DEFAULT: 'hsl(213, 94%, 68%)',
              foreground: 'hsl(222, 47%, 11%)',
            },
            secondary: {
              DEFAULT: 'hsl(258, 90%, 74%)',
              foreground: 'hsl(222, 47%, 11%)',
            },
          },
        },
      },
    }),
  ],
};
export default config;
