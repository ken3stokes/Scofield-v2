'use client';

import { Inter } from 'next/font/google';
import { Button } from '@/components/ui/button';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-red-500">Something went wrong!</h1>
            <p className="text-muted-foreground">
              {error.message || 'An unexpected error occurred'}
            </p>
            <div className="space-x-4">
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
              <Button onClick={reset} variant="outline">
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
