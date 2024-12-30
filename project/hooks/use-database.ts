"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/db';

export function useDatabase<T>(
  table: 'goals' | 'tasks',
  query?: () => Promise<T[]>
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000;

    async function fetchData() {
      try {
        if (!mounted) return;
        
        setIsLoading(true);

        // Ensure database is open
        if (!db.isOpen()) {
          await db.open();
        }

        // Get data
        const result = query ? await query() : await db[table].toArray();
        
        if (mounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        console.error(`Error fetching ${table}:`, err);
        
        if (mounted && retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchData, retryDelay * retryCount);
        } else if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [table, query]);

  return { data, isLoading, error };
}