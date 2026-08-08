import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ScrollProgress } from '@/components/scroll-progress';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const title = 'Bravely Dirgayuska | Computer Engineering Graduate';
const description =
  'Portfolio of Bravely Dirgayuska — Computer Engineering graduate building full-stack products with Next.js, TypeScript, and Supabase.';

export const metadata: Metadata = {
  metadataBase: new URL('https://portfoliobravely.vercel.app'),
  title,
  description,
  keywords: [
    'Bravely Dirgayuska',
    'Computer Engineering',
    'Full-Stack Developer',
    'Next.js',
    'TypeScript',
    'Supabase',
    'Portfolio',
  ],
  authors: [{ name: 'Bravely Dirgayuska' }],
  creator: 'Bravely Dirgayuska',
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_US',
    siteName: 'Bravely Dirgayuska',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfcfe' },
    { media: '(prefers-color-scheme: dark)', color: '#070c18' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, sora.variable, 'font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
