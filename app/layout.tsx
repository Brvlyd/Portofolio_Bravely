import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

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
      <body className="font-sans antialiased">
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
