'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-500">Something went wrong!</h1>
        <p className="text-muted-foreground">{error.message}</p>
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
  );
}
