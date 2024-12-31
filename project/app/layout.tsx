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
  icons: [
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png'
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png'
    },
    {
      rel: 'icon',
      url: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    }
  ]
};

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

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