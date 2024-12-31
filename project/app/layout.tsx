import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Scofield - Goal & Project Management',
  description: 'A privacy-focused goal and project management application',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32x32.png'
  }
};

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function RootLayout({
  children,
  error,
}: {
  children: React.ReactNode;
  error?: Error;
}) {
  if (error) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <div>
              <h1>Error</h1>
              <p>{error.message}</p>
            </div>
          </Providers>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}