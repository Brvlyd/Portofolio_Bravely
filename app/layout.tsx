import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bravely Dirgayuska | Computer Engineering Student',
  description: 'Portfolio of Bravely Dirgayuska, a Computer Engineering student passionate about technology and software development.',
  keywords: ['Computer Engineering', 'Software Development', 'Web Development', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Bravely Dirgayuska' }],
  openGraph: {
    title: 'Bravely Dirgayuska | Computer Engineering Student',
    description: 'Portfolio of Bravely Dirgayuska, showcasing projects and expertise in software development.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
