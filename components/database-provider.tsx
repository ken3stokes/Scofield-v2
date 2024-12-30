"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/db';

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export function DatabaseProvider({ children }: DatabaseProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        // Close any existing connection
        if (db.isOpen()) {
          await db.close();
        }

        // Open the database
        await db.open();

        // Initialize with sample data if needed
        await db.transaction('rw', [db.goals, db.tasks], async () => {
          const goalCount = await db.goals.count();
          const taskCount = await db.tasks.count();
          
          if (goalCount === 0) {
            // Add sample goal
            const goalId = crypto.randomUUID();
            await db.goals.add({
              id: goalId,
              title: 'Welcome to Scofield',
              specific: 'Get started with goal tracking',
              measurable: 'Complete first task',
              achievable: 'Easy to start',
              relevant: 'Important for productivity',
              timebound: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
              priority: 'medium',
              category: 'career',
              status: 'not-started',
              progress: 0,
              createdAt: new Date(),
              updatedAt: new Date()
            });

            if (taskCount === 0) {
              // Add sample task
              await db.tasks.add({
                id: crypto.randomUUID(),
                goalId,
                title: 'Create your first task',
                status: 'pending',
                priority: 'medium',
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day from now
              });
            }
          }
        });

        if (mounted) {
          setIsInitialized(true);
          setError(null);
          console.log('Database initialized successfully');
        }
      } catch (err) {
        console.error('Failed to initialize database:', err);
        
        if (mounted) {
          if (retryCount < maxRetries) {
            setRetryCount(prev => prev + 1);
            setTimeout(init, 1000 * (retryCount + 1)); // Exponential backoff
          } else {
            setError(err instanceof Error ? err : new Error('Unknown error'));
          }
        }
      }
    }

    init();

    return () => {
      mounted = false;
      if (db.isOpen()) {
        db.close();
      }
    };
  }, [retryCount]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Database Error</h1>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          {retryCount < maxRetries && (
            <button
              onClick={() => setRetryCount(prev => prev + 1)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Initializing Database...</h1>
          <p className="text-muted-foreground">
            {retryCount > 0 ? `Retrying... (Attempt ${retryCount + 1}/${maxRetries})` : 'Please wait while we set up your database.'}
          </p>
        </div>
      </div>
    );
  }

  return children;
}
